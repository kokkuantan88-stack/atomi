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
  // Students log in with email and password, so their progress follows them to any device.
  function loadLib(){
    return new Promise((resolve, reject) => {
      const sc = document.createElement("script");
      sc.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      sc.onload = () => { try{ resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}})); }catch(e){ reject(e); } };
      sc.onerror = reject;
      document.head.appendChild(sc);
    });
  }
  const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const here = () => location.origin + location.pathname;
  function friendlyError(e){
    const m = String((e && e.message) || e || "");
    if(/invalid login credentials/i.test(m)) return "Wrong email or password.";
    if(/already registered|already exists/i.test(m)) return "That email already has an account. Log in instead.";
    if(/not confirmed/i.test(m)) return "Check your email and click the link we sent first, then log in.";
    if(/rate limit|too many/i.test(m)) return "Too many tries. Wait a few minutes and try again.";
    if(/password/i.test(m) && /least|short|weak/i.test(m)) return "Pick a longer password (at least 8 characters).";
    if(/valid email|invalid email|email address/i.test(m)) return "That doesn't look like an email address.";
    if(/fetch|network/i.test(m)) return "Couldn't reach Atomi. Check your internet.";
    return "Something went wrong: " + m.slice(0, 120);
  }
  // The login screen sits on top of the app until the student logs in (or chooses to play without an account).
  function authScreen(sb, startMode){
    return new Promise(resolve => {
      const box = document.createElement("div");
      box.id = "auth";
      box.style.cssText = "position:fixed;inset:0;z-index:50;overflow:auto;background:var(--bg);display:flex;align-items:flex-start;justify-content:center;padding:32px 16px";
      document.body.appendChild(box);
      let mode = startMode || "login", msg = "", busy = false;
      const draw = () => {
        const title = {login:"Log in to Atomi", signup:"Create your Atomi account", forgot:"Reset your password", reset:"Choose a new password"}[mode];
        box.innerHTML = '<section class="card" style="width:100%;max-width:440px;display:flex;flex-direction:column;gap:14px">'+
          '<div style="display:flex;align-items:center;gap:12px"><img src="atomi-hero.png" alt="" style="width:64px;height:64px;object-fit:contain"><div><h1 style="font-size:1.4rem">'+title+'</h1>'+
          '<p class="small muted">'+(mode === "signup" ? "Your progress, friends and Atomi's looks are saved to your account." : mode === "login" ? "Welcome back! Your progress is waiting." : mode === "forgot" ? "We'll email you a link to set a new password." : "Type your new password twice.")+'</p></div></div>'+
          (mode !== "login" && mode !== "reset" ? '' : '')+
          '<form id="authform" style="display:flex;flex-direction:column;gap:10px">'+
          (mode !== "reset" ? '<label for="au-email" class="small" style="font-weight:800">Email</label><input type="email" id="au-email" autocomplete="email" required>' : '')+
          (mode !== "forgot" ? '<label for="au-pw" class="small" style="font-weight:800">'+(mode === "reset" ? "New password" : "Password")+'</label><input type="password" id="au-pw" minlength="8" autocomplete="'+(mode === "login" ? "current-password" : "new-password")+'" required>' : '')+
          (mode === "signup" || mode === "reset" ? '<label for="au-pw2" class="small" style="font-weight:800">Type the password again</label><input type="password" id="au-pw2" minlength="8" autocomplete="new-password" required><span class="small muted">At least 8 characters. Don\'t use the same password as other websites.</span>' : '')+
          (msg ? '<p class="notice" role="status">'+esc(msg)+'</p>' : '')+
          '<div><button class="btn btn-primary btn-big" type="submit"'+(busy ? ' disabled' : '')+'>'+(busy ? "Please wait…" : {login:"Log in", signup:"Create account", forgot:"Email me a link", reset:"Save new password"}[mode])+'</button></div></form>'+
          '<div style="display:flex;flex-direction:column;gap:6px" class="small">'+
          (mode === "login" ? '<button class="btn btn-sm" data-au="signup">New here? Create an account</button><button class="btn btn-sm" data-au="forgot">Forgot your password?</button>' : '')+
          (mode === "signup" || mode === "forgot" ? '<button class="btn btn-sm" data-au="login">I already have an account</button>' : '')+
          (mode !== "reset" ? '<button class="btn btn-sm" data-au="guest" style="border-style:dashed">Play without an account (progress stays on this device only)</button>' : '')+
          '</div><p class="small muted">Only your nickname is shown to other students. Your email is never shown.</p></section>';
        const f = box.querySelector("#authform input"); if(f) f.focus();
      };
      box.addEventListener("click", e => {
        const b = e.target.closest("[data-au]"); if(!b || busy) return;
        if(b.dataset.au === "guest"){ box.remove(); resolve(null); return; }
        mode = b.dataset.au; msg = ""; draw();
      });
      box.addEventListener("submit", async e => {
        e.preventDefault(); if(busy) return;
        const email = (box.querySelector("#au-email") || {}).value, pw = (box.querySelector("#au-pw") || {}).value, pw2 = (box.querySelector("#au-pw2") || {}).value;
        if((mode === "signup" || mode === "reset") && pw !== pw2){ msg = "The two passwords don't match."; draw(); return; }
        if(pw !== undefined && pw.length < 8){ msg = "Pick a longer password (at least 8 characters)."; draw(); return; }
        busy = true; msg = ""; draw();
        try{
          if(mode === "login"){
            const {data, error} = await sb.auth.signInWithPassword({email, password:pw}); if(error) throw error;
            box.remove(); resolve(data.session); return;
          }
          if(mode === "signup"){
            const {data, error} = await sb.auth.signUp({email, password:pw, options:{emailRedirectTo:here()}}); if(error) throw error;
            if(data.session){ box.remove(); resolve(data.session); return; }
            mode = "login"; msg = "Almost done! We emailed you a link. Click it, then come back here and log in.";
          } else if(mode === "forgot"){
            const {error} = await sb.auth.resetPasswordForEmail(email, {redirectTo:here()}); if(error) throw error;
            mode = "login"; msg = "If that email has an account, we've sent a link to reset the password.";
          } else if(mode === "reset"){
            const {error} = await sb.auth.updateUser({password:pw}); if(error) throw error;
            const {data:{session}} = await sb.auth.getSession();
            box.remove(); resolve(session); return;
          }
        }catch(err){ msg = friendlyError(err); }
        busy = false; draw();
      });
      draw();
    });
  }
  window.ATOMI_AUTH = (async () => {
    const recovering = /type=recovery/.test(location.hash);
    const sb = await loadLib();
    let {data:{session}} = await sb.auth.getSession();
    if(session && recovering) session = await authScreen(sb, "reset");
    else if(!session) session = await authScreen(sb, "login");
    if(recovering) history.replaceState(null, "", location.pathname + location.search);
    if(!session) throw new Error("guest");
    window.ATOMI_ACCOUNT = {email:session.user.email || "", async signOut(){ await sb.auth.signOut(); location.reload(); }};
    return {sb, uid:session.user.id};
  })();
  window.ATOMI_AUTH.catch(() => {});
  const client = () => window.ATOMI_AUTH;
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

  /* ---------- sample: notes → flashcards, through the make-deck server function ---------- */
  // Photos are shrunk to at most 1568 px and sent as JPEG, which keeps them small and fast.
  function photoData(file){
    return new Promise((resolve, reject) => {
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => {
        const sc = Math.min(1, 1568 / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        resolve({type:"image/jpeg", data:c.toDataURL("image/jpeg", 0.85).split(",")[1]});
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(Object.assign(new Error("bad image"), {code:"image_rejected"})); };
      img.src = url;
    });
  }
  const sample = {
    note:"Uses Atomi's AI. You can make 5 decks a day.",
    async limits(){ return {images:{maxCount:4, mediaTypes:["image/jpeg","image/png","image/webp","image/gif"]}}; },
    async makeDeck({notes, images, level, signal}){
      const {sb} = await client();
      const {data:{session}} = await sb.auth.getSession();
      const pics = [];
      for(const f of (images || []).slice(0, 4)) pics.push(await photoData(f));
      let res;
      try{
        res = await fetch(SUPABASE_URL + "/functions/v1/make-deck", {method:"POST", signal,
          headers:{"Content-Type":"application/json", apikey:SUPABASE_KEY, Authorization:"Bearer " + (session ? session.access_token : SUPABASE_KEY)},
          body:JSON.stringify({notes:String(notes || "").slice(0, 30000), images:pics, level})});
      }catch(e){ throw Object.assign(new Error("network"), {code:e && e.name === "AbortError" ? "cancelled" : "network"}); }
      const out = await res.json().catch(() => null);
      if(!res.ok || !out) throw Object.assign(new Error("make-deck failed"), {code:(out && out.error_code) || "ai_failed"});
      return out;
    }
  };

  const caps = {db, user, room:lobby, sample};
  window.claude = {use(name){
    if(!caps[name]) return Promise.resolve(null);
    return client().then(() => caps[name], () => null);
  }};
})();
