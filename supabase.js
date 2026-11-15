// Supabase backend for Atomi when it runs outside claude.ai (e.g. the Vercel site from GitHub).
// On claude.ai the page gets window.claude from the platform and this file does nothing.
// Elsewhere it provides the same small API the app already uses: db (saves, leaderboard, friends),
// user (who is signed in) and room (live battles, online friends, invites) on top of Supabase.
"use strict";
const SUPABASE_URL = "https://rjazdwtatjrumblqmopg.supabase.co";
// The project's public "anon" / publishable key (Supabase → Project Settings → API). It is safe in
// a web page because Row Level Security in supabase/schema.sql decides what each player may do.
const SUPABASE_KEY = "sb_publishable_6XwN6XUeJTdUwUM-oNxCPQ_9-w66WLN";

(function(){
  if(window.claude || !SUPABASE_KEY) return;
  let clientP = null;
  function client(){
    if(clientP) return clientP;
    clientP = new Promise((resolve, reject) => {
      const sc = document.createElement("script");
      sc.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      sc.onload = async () => {
        try{
          const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {auth:{persistSession:true, autoRefreshToken:true}});
          let {data:{session}} = await sb.auth.getSession();
          if(!session){ const r = await sb.auth.signInAnonymously(); if(r.error) throw r.error; session = r.data.session; }
          resolve({sb, uid:session.user.id});
        }catch(e){ console.warn("Supabase sign-in failed", e); reject(e); }
      };
      sc.onerror = reject;
      document.head.appendChild(sc);
    });
    return clientP;
  }
  const snap = (id, row) => ({id, exists:!!row, data:() => row ? row.data : undefined});

  /* ---------- db: the two paths the app uses ---------- */
  // data/users/<uid>/state → table user_state (private);  players/<uid> → table players (everyone can read)
  function tableFor(path){
    let m = /^data\/users\/([^/]+)\/state$/.exec(path); if(m) return {table:"user_state", id:m[1]};
    m = /^players\/([^/]+)$/.exec(path); if(m) return {table:"players", id:m[1]};
    throw new Error("Unknown path " + path);
  }
  const db = {
    doc(path){
      const {table, id} = tableFor(path);
      return {
        async get(){ const {sb} = await client(); const {data, error} = await sb.from(table).select("data").eq("id", id).maybeSingle(); if(error) throw error; return snap(id, data); },
        async set(d){ const {sb} = await client(); const {error} = await sb.from(table).upsert({id, data:d, updated_at:new Date().toISOString()}); if(error) throw error; },
        async delete(){ const {sb} = await client(); const {error} = await sb.from(table).delete().eq("id", id); if(error) throw error; }
      };
    },
    collection(name){
      if(name !== "players") throw new Error("Unknown collection " + name);
      const q = {filters:[], lim:null,
        where(field, op, value){ const n = Object.assign({}, q, {filters:q.filters.concat([[field, value]])}); n.where = q.where; n.limit = q.limit; n.get = q.get; n.onSnapshot = q.onSnapshot; return n; },
        limit(n){ this.lim = n; return this; },
        async get(){
          const {sb} = await client();
          let r = sb.from("players").select("id,data");
          this.filters.forEach(([f, v]) => { r = r.eq("data->>" + f, String(v)); });
          if(this.lim) r = r.limit(this.lim);
          const {data, error} = await r; if(error) throw error;
          const docs = (data || []).map(row => snap(row.id, row));
          return {docs, empty:!docs.length, size:docs.length};
        },
        onSnapshot(next, onError){
          let stopped = false, ch = null;
          const load = async () => { try{ const s = await q.get.call({filters:[], lim:null}); if(!stopped) next(s); }catch(e){ if(onError) onError(e); } };
          client().then(({sb}) => {
            if(stopped) return;
            load();
            ch = sb.channel("players-feed").on("postgres_changes", {event:"*", schema:"public", table:"players"}, () => load()).subscribe();
          }, e => onError && onError(e));
          return () => { stopped = true; if(ch) ch.unsubscribe(); };
        }
      };
      return q;
    }
  };

  /* ---------- user ---------- */
  const user = {async id(){ return (await client()).uid; }};

  /* ---------- room: lobby + named rooms on Supabase Realtime ---------- */
  const PEER = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  function makeRoom(name){
    let ch = null, ready = null, mine = {}, peerHandlers = [], topicHandlers = {}, last = new Map(), listened = new Set();
    function peersNow(uid){
      const state = ch ? ch.presenceState() : {};
      const out = [];
      Object.keys(state).forEach(key => {
        const meta = state[key][state[key].length - 1] || {};
        const prev = last.get(key);
        const presence = Object.freeze(Object.assign({}, meta.p || {}));
        out.push(Object.freeze({peer:key, by:typeof meta.by === "string" ? meta.by : null, isMe:meta.by === uid, sameTab:key === PEER, kind:"viewer", guest:false, presence,
          updatedAt:prev && JSON.stringify(prev.presence) === JSON.stringify(presence) ? prev.updatedAt : Date.now()}));
      });
      if(!out.some(p => p.sameTab)) out.push(Object.freeze({peer:PEER, by:uid, isMe:true, sameTab:true, kind:"viewer", guest:false, presence:Object.freeze(Object.assign({}, mine)), updatedAt:Date.now()}));
      return out;
    }
    function connect(){
      if(ready) return ready;
      ready = client().then(({sb, uid}) => new Promise((resolve, reject) => {
        ch = sb.channel("atomi-" + name, {config:{presence:{key:PEER}, broadcast:{self:true}}});
        ch.on("presence", {event:"sync"}, () => {
          const now = peersNow(uid), prevKeys = new Set(last.keys());
          const joined = now.filter(p => !prevKeys.has(p.peer)), left = [...last.values()].filter(p => !now.some(n => n.peer === p.peer));
          const updated = now.filter(p => prevKeys.has(p.peer) && last.get(p.peer).updatedAt !== p.updatedAt);
          last = new Map(now.map(p => [p.peer, p]));
          peerHandlers.forEach(h => { try{ h({peers:now, joined, left, updated}); }catch(e){ console.error(e); } });
        });
        Object.keys(topicHandlers).forEach(t => listen(t, uid));
        ch.subscribe(status => {
          if(status === "SUBSCRIBED"){ ch.track({by:uid, p:mine}); resolve({sb, uid}); }
          else if(status === "CHANNEL_ERROR" || status === "TIMED_OUT") reject(new Error(status));
        });
      }));
      return ready;
    }
    function listen(topic, uid){
      if(!ch || listened.has(topic)) return;
      listened.add(topic);
      ch.on("broadcast", {event:topic}, msg => {
        const pl = msg.payload || {};
        const m = {topic, data:pl.data, peer:String(pl.peer || ""), by:typeof pl.by === "string" ? pl.by : null, isMe:pl.by === uid, sameTab:pl.peer === PEER, kind:"viewer", guest:false};
        (topicHandlers[topic] || []).forEach(h => { try{ h(m); }catch(e){ console.error(e); } });
      });
    }
    const api = {
      name,
      async emit(topic, data){ const {uid} = await connect(); listen(topic, uid); await ch.send({type:"broadcast", event:topic, payload:{data, peer:PEER, by:uid}}); },
      on(topic, fn){ (topicHandlers[topic] = topicHandlers[topic] || []).push(fn); connect().then(({uid}) => listen(topic, uid)).catch(() => {}); return () => { topicHandlers[topic] = (topicHandlers[topic] || []).filter(f => f !== fn); }; },
      async presence(patch){ Object.keys(patch || {}).forEach(k => { if(patch[k] === null) delete mine[k]; else mine[k] = patch[k]; }); const {uid} = await connect(); await ch.track({by:uid, p:mine}); },
      peers(){ return [...last.values()]; },
      onPeers(fn){ peerHandlers.push(fn); connect().then(({uid}) => { const now = peersNow(uid); fn({peers:now, joined:now, left:[], updated:[]}); }).catch(() => {}); return () => { peerHandlers = peerHandlers.filter(f => f !== fn); }; },
      connected(){ return !!ch && ch.state === "joined"; },
      onConnection(fn){ connect().then(() => fn(true), () => fn(false)); return () => {}; },
      async leave(){ if(ch){ try{ await ch.untrack(); }catch(e){} await ch.unsubscribe(); } ch = null; ready = null; last = new Map(); listened = new Set(); topicHandlers = {}; peerHandlers = []; mine = {}; if(rooms[name] === api) delete rooms[name]; }
    };
    return api;
  }
  const rooms = {};
  const lobby = makeRoom("lobby");
  lobby.join = async name => { if(!/^[a-z0-9][a-z0-9_.-]{0,47}$/.test(name)) throw Object.assign(new Error("bad name"), {code:"invalid_argument"}); const r = rooms[name] || (rooms[name] = makeRoom(name)); await r.presence({}); return r; };

  const caps = {db, user, room:lobby};
  window.claude = {use(name){
    if(!caps[name]) return Promise.resolve(null);
    return client().then(() => caps[name], () => null);
  }};
})();
