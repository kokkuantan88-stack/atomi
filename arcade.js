// Atomi Arcade: Gimkit / Blooket-style science game modes. Answer questions to power the game.
// Stardust Rush (earn + shop), Orbit Gold (mystery planets), Rocket Race. Solo vs bots, or live with friends.
"use strict";
const ARC_MODES = {
  rush: {name:"Stardust Rush", tag:"Earn, upgrade, get rich", desc:"Answer to earn stardust. Spend it in the shop on upgrades and power-ups. Most stardust after 3 minutes wins.", dur:180},
  gold: {name:"Orbit Gold", tag:"Open mystery planets", desc:"Every right answer opens a mystery planet: gold, double, triple, steal from a rival, swap scores… or a black hole.", dur:180},
  race: {name:"Rocket Race", tag:"Blast to the finish", desc:"Every right answer boosts your rocket. Get a streak to fire your thrusters. First to the finish line wins.", dur:0}
};
const RACE_LEN = 20;
const BOT_NAMES = [["Proton Pete",{theme:"neon",hat:"wizard"}],["Neutron Nina",{theme:"pastel",band:"bunny"}],["Electron Eli",{theme:"nature",glasses:"pixel"}],["Quark Quinn",{theme:"cosmic",scarf:"yellow"}],["Ion Ivy",{theme:"seasonal",hat:"santa"}]];
const RUSH_UP = {
  perQ:{name:"Stardust per answer", vals:[10,20,50,100,250,500,1000,2500], costs:[0,40,180,700,2200,7000,20000,60000], fmt:v => "+"+v},
  mult:{name:"Multiplier", vals:[1,1.5,2,3,5,8], costs:[0,150,600,2500,9000,30000], fmt:v => "×"+v},
  streak:{name:"Streak bonus", vals:[0,5,15,40,100,250], costs:[0,100,400,1600,6000,20000], fmt:v => "+"+v+" per streak"},
  ins:{name:"Insurance", vals:[1,0.75,0.5,0.25,0], costs:[0,100,450,1800,7000], fmt:v => "lose "+Math.round(v*100)+"% on a miss"}
};
const RUSH_POW = {
  boost:{name:"Supernova Boost", desc:"Double stardust for your next 5 right answers", cost:400},
  shield:{name:"Force Field", desc:"Lose nothing on your next 3 mistakes", cost:250}
};
let ARC = null, ARC_TICK = null;
let SFX_CTX = null;

/* ---------- sound effects (tiny synth, no files) ---------- */
function sfx(kind){
  if(S.mute) return;
  try{
    SFX_CTX = SFX_CTX || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = SFX_CTX, now = ctx.currentTime;
    const notes = {right:[[660,0],[880,0.08]], wrong:[[200,0],[150,0.1]], coin:[[988,0],[1319,0.06]], buy:[[523,0],[659,0.06],[784,0.12]], win:[[523,0],[659,0.1],[784,0.2],[1047,0.3]], bad:[[300,0],[180,0.12]], whoosh:[[330,0],[495,0.05],[660,0.1]]}[kind] || [[440,0]];
    notes.forEach(([f, t]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = kind === "wrong" || kind === "bad" ? "square" : "triangle";
      o.frequency.value = f; g.gain.setValueAtTime(0.0001, now + t);
      g.gain.exponentialRampToValueAtTime(0.12, now + t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.18);
      o.connect(g).connect(ctx.destination); o.start(now + t); o.stop(now + t + 0.2);
    });
  }catch(e){}
}
function floatText(text, good){
  const host = document.getElementById("arc-score"); if(!host) return;
  const el = document.createElement("span"); el.className = "floaty " + (good ? "up" : "down"); el.textContent = text;
  host.appendChild(el); setTimeout(() => el.remove(), 1100);
}
function confetti(){
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = document.createElement("div"); box.className = "confetti"; box.setAttribute("aria-hidden", "true");
  const cols = ["#ffe490","#ffb3e1","#9fd8ff","#a8f0d0","#cdb6ff","#ffad9e"];
  for(let i=0;i<60;i++){ const p = document.createElement("i"); p.style.left = Math.random()*100 + "%"; p.style.background = cols[i % cols.length]; p.style.animationDelay = (Math.random()*0.6) + "s"; p.style.transform = "rotate(" + (Math.random()*360) + "deg)"; box.appendChild(p); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 3200);
}
const fmtN = n => Math.round(n).toLocaleString();

/* ---------- start / end ---------- */
/* ---------- question source: subject, chosen topics, or your own notes ---------- */
let SRC = {s:"all", topics:[], deck:null};
let REMOTE_DECK = null; // a notes deck a friend shared into a battle
function srcClean(src){
  src = src || {};
  const s = src.s === "notes" || src.s === "all" || SUBJ[src.s] ? src.s : "all";
  const topics = Array.isArray(src.topics) ? src.topics.filter(id => TBYID[id] && (s === "all" || TBYID[id].s === s)).slice(0, 30) : [];
  const deck = src.deck === "remote" ? (REMOTE_DECK ? "remote" : null) : ((S.decks || []).some(d => d.id === src.deck) ? src.deck : null);
  return {s:deck ? "notes" : (s === "notes" ? "all" : s), topics:deck ? [] : topics, deck};
}
function srcPool(src){
  src = srcClean(src);
  if(src.deck === "remote") return shuffle(REMOTE_DECK.qs.map((_, i) => "rdeck#" + i));
  if(src.deck){ const d = S.decks.find(x => x.id === src.deck); return shuffle(d.qs.map((_, i) => "deck:" + d.id + "#" + i)); }
  if(src.topics.length) return shuffle(poolFor(src.topics.map(id => TBYID[id])));
  const ts = src.s === "all" ? TOPICS.filter(isOn) : TOPICS.filter(t => t.s === src.s);
  return shuffle(poolFor(ts.length ? ts : TOPICS));
}
function srcLabel(src){
  src = srcClean(src);
  if(src.deck === "remote") return "Notes: " + REMOTE_DECK.title;
  if(src.deck){ const d = S.decks.find(x => x.id === src.deck); return "Your notes: " + d.title; }
  if(src.topics.length === 1) return TBYID[src.topics[0]].name;
  if(src.topics.length) return src.topics.length + " topics" + (src.s !== "all" ? " in " + subjName(src.s) : "");
  return src.s === "all" ? "All subjects (your year)" : "All of " + subjName(src.s);
}
// The picker: subject tabs, then topic chips (pick any) or your notes decks.
function srcPicker(){
  const src = srcClean(SRC); SRC = src;
  const decks = S.decks || [];
  let h = '<div class="src"><div class="tabs" role="group" aria-label="Questions from"><button data-act="src-s" data-s="all" aria-pressed="'+(src.s==="all")+'">All subjects</button>'+
    Object.keys(SUBJ).map(k => '<button data-act="src-s" data-s="'+k+'" aria-pressed="'+(src.s===k)+'">'+SUBJ[k].name+'</button>').join("")+
    '<button data-act="src-s" data-s="notes" aria-pressed="'+(src.s==="notes" || SRC_NOTES)+'">My notes</button></div>';
  if(SRC_NOTES || src.s === "notes"){
    if(!decks.length) h += '<p class="small muted">You have no notes decks yet. Paste or snap your notes and Atomi turns them into questions you can play with.</p><div><button class="btn btn-sm btn-primary" data-act="go" data-v="notes">Make a deck from my notes</button></div>';
    else h += '<p class="small muted">Pick one of your decks:</p><div class="tabs src-topics">'+decks.map(d => '<button data-act="src-d" data-id="'+d.id+'" aria-pressed="'+(src.deck===d.id)+'">'+esc(d.title)+' <span class="muted">('+d.qs.length+')</span></button>').join("")+'</div>';
  } else if(src.s !== "all"){
    const ts = TOPICS.filter(t => t.s === src.s);
    h += '<p class="small muted">Tap topics to focus on them, or leave them all off to use every '+esc(subjName(src.s))+' topic.</p><div class="tabs src-topics">'+
      ts.map(t => '<button data-act="src-t" data-t="'+t.id+'" aria-pressed="'+src.topics.includes(t.id)+'">'+esc(t.name)+' <span class="muted">Y'+t.y+'</span></button>').join("")+'</div>'+
      (src.topics.length ? '<div><button class="btn btn-sm" data-act="src-clear">Clear topics</button></div>' : '');
  }
  h += '<p class="small"><b>Playing with:</b> '+esc(srcLabel(src))+'</p></div>';
  return h;
}
let SRC_NOTES = false;
function remoteDeckFrom(d){
  if(!d || typeof d !== "object" || !Array.isArray(d.qs)) return null;
  const str = (x, n) => typeof x === "string" ? x.slice(0, n) : "";
  const qs = d.qs.slice(0, 15).filter(q => Array.isArray(q) && q.length >= 5 && q.slice(0, 5).every(x => typeof x === "string" && x.trim()))
    .map(q => [str(q[0], 200), str(q[1], 90), str(q[2], 90), str(q[3], 90), str(q[4], 90), str(q[5], 200)]);
  return qs.length ? {title:str(d.title, 40) || "Shared notes", qs} : null;
}
function packDeck(id){
  const d = (S.decks || []).find(x => x.id === id); if(!d) return null;
  const out = {title:String(d.title).slice(0, 40), qs:[]};
  for(const q of shuffle(d.qs)){
    const t = q.slice(0, 6).map((x, i) => String(x || "").slice(0, i === 0 || i === 5 ? 160 : 70));
    if(JSON.stringify(out).length + JSON.stringify(t).length > 3300) break;
    out.qs.push(t);
  }
  return out.qs.length ? out : null;
}
function startArcade(mode, src, multi, left){
  stopArcade();
  const m = ARC_MODES[mode] || ARC_MODES.rush;
  src = srcClean(src);
  ARC = {mode, src, multi:!!multi, pool:srcPool(src), qi:0, q:null, phase:"q", picked:null,
    score:0, pos:0, streak:0, best:0, correct:0, wrong:0, ends:m.dur ? Date.now() + (left || m.dur)*1000 : 0, started:Date.now(),
    up:{perQ:0, mult:0, streak:0, ins:0}, boost:0, shield:0, shop:false, picks:null, reveal:null, log:[], result:null,
    bots:multi ? [] : shuffle(BOT_NAMES).slice(0, 3).map((b, i) => ({name:b[0], look:b[1], stage:1 + (i % 3), score:0, pos:0, skill:0.55 + Math.random()*0.35, bot:true}))};
  ARC.q = makeQ(ARC.pool[0]);
  ARC_TICK = setInterval(arcTick, 1000);
  arcPresence();
  sfx("whoosh");
  GAME = {type:"arcade"};
  go("game");
}
function stopArcade(){ if(ARC_TICK){ clearInterval(ARC_TICK); ARC_TICK = null; } }
function arcTick(){
  const A = ARC; if(!A || A.result){ stopArcade(); return; }
  const el = Math.max(0, (Date.now() - A.started) / 1000);
  // bots play along in solo games
  A.bots.forEach(b => {
    if(A.mode === "rush"){ if(Math.random() < b.skill * 0.5) b.score += Math.round((10 + el * el * 0.012) * (0.6 + Math.random())); }
    else if(A.mode === "gold"){
      if(Math.random() < b.skill * 0.35){ const r = Math.random(); b.score = Math.max(0, r < 0.62 ? b.score + [20,50,100][Math.floor(Math.random()*3)] : r < 0.72 ? b.score * 2 : r < 0.86 ? Math.round(b.score * 0.75) : b.score + 200); b.score = Math.min(b.score, 20000); }
    } else if(A.mode === "race"){ if(Math.random() < b.skill * 0.32) b.pos = Math.min(RACE_LEN, b.pos + (Math.random() < 0.2 ? 2 : 1)); }
  });
  if(A.mode === "race" && arcPlayers().some(p => (p.pos || 0) >= RACE_LEN)) return arcFinish();
  if(A.ends && Date.now() >= A.ends) return arcFinish();
  const t = document.getElementById("arc-time"); if(t && A.ends) t.textContent = Math.max(0, Math.ceil((A.ends - Date.now())/1000)) + "s";
  const bd = document.getElementById("arc-board"); if(bd) bd.innerHTML = arcBoardHtml();
  const tr = document.getElementById("arc-track"); if(tr) tr.outerHTML = arcTrackHtml();
}
function arcFinish(){
  const A = ARC; if(!A || A.result) return;
  stopArcade();
  A.phase = "done";
  const ps = arcPlayers();
  const rank = ps.findIndex(p => p.me) + 1;
  A.rank = rank;
  const place = rank === 1 ? 50 : rank === 2 ? 30 : rank === 3 ? 15 : 0;
  A.xp = A.correct * 10 + 20 + (ps.length > 1 ? place : 0);
  A.result = awardGame(A.xp, () => {
    S.best = S.best || {}; const key = "arc_" + A.mode;
    const val = A.mode === "race" ? A.correct : A.score;
    if(A.mode !== "race" && (!S.best[key] || val > S.best[key])) S.best[key] = Math.round(val);
    if(rank === 1 && ps.length > 1) S.wins = (S.wins || 0) + (A.multi ? 1 : 0);
  });
  arcPresence();
  if(rank === 1) sfx("win");
  render();
  if(rank === 1) confetti();
}
function arcQuit(){ stopArcade(); ARC = null; GAME = null; if(BT && BT.phase === "arcade"){ battleLeave(true); } go("games"); }

/* ---------- players: you + bots, or you + friends ---------- */
function arcPlayers(){
  const A = ARC; if(!A) return [];
  const me = {name:(S.name || "You").slice(0, 20), look:S.look, stage:stageOf(S.xp), score:A.score, pos:A.pos, me:true};
  let others;
  if(A.multi && BT){
    others = BT.peers.filter(p => !(p.isMe && p.sameTab) && p.presence && typeof p.presence.nick === "string" && p.presence.mode === A.mode).map(p => ({
      name:String(p.presence.nick).slice(0, 20), look:p.presence.look, stage:Math.max(0, Math.min(4, Number(p.presence.stage) || 0)),
      score:Math.max(0, Math.min(1e9, Number(p.presence.score) || 0)), pos:Math.max(0, Math.min(RACE_LEN, Number(p.presence.pos) || 0)), peer:p.peer, done:!!p.presence.done}));
  } else others = A.bots;
  const key = A.mode === "race" ? "pos" : "score";
  return [me].concat(others).sort((a, b) => b[key] - a[key] || (a.me ? -1 : 1));
}
function arcPresence(){
  if(!ARC || !ARC.multi || !BT) return;
  BT.room.presence({nick:String(S.name || "Player").slice(0, 20), stage:stageOf(S.xp), look:cleanLook(S.look), mode:ARC.mode, src:srcLabel(ARC.src).slice(0, 60), score:Math.round(ARC.score), pos:ARC.pos, done:!!ARC.result}).catch(() => {});
}
function myPeer(){ if(!BT) return null; const p = BT.peers.find(x => x.isMe && x.sameTab); return p ? p.peer : null; }
// steal / swap messages from friends (Orbit Gold)
function arcOnMessage(d){
  const A = ARC; if(!A || A.mode !== "gold" || !A.multi || A.result) return;
  if(d.to !== myPeer()) return;
  const from = String(d.from || "Someone").slice(0, 20);
  if(d.type === "steal"){ const amt = Math.round(A.score * Math.max(0, Math.min(0.5, Number(d.pct) || 0))); A.score -= amt; A.log.unshift(from + " stole " + fmtN(amt) + " gold from you!"); sfx("bad"); floatText("−" + fmtN(amt), false); }
  else if(d.type === "swap"){ const theirs = Math.max(0, Math.min(1e9, Number(d.amount) || 0)); A.log.unshift(from + " swapped gold with you! You now have " + fmtN(theirs) + "."); A.score = theirs; sfx("bad"); }
  arcPresence(); if(view === "game") render();
}

/* ---------- answering ---------- */
function arcAnswer(k){
  const A = ARC; if(!A || A.phase !== "q" || A.result) return;
  const q = A.q, ok = k === q.ans;
  A.picked = k;
  if(!q.qid.startsWith("rdeck")){
    const ts = tstate(q.t.id); ts.a.push(ok ? 1 : 0); if(ts.a.length > 10) ts.a.shift();
    if(!ok) S.review[q.qid] = {due:addDays(today(),1), c:0, step:0};
  }
  S.answered++; if(ok) S.correct++;
  if(ok){ A.correct++; A.streak++; A.best = Math.max(A.best, A.streak); sfx("right"); }
  else { A.wrong++; A.streak = 0; sfx("wrong"); }
  if(A.mode === "rush"){
    const per = RUSH_UP.perQ.vals[A.up.perQ], mult = RUSH_UP.mult.vals[A.up.mult], sb = RUSH_UP.streak.vals[A.up.streak] * Math.max(0, A.streak - 1);
    if(ok){ let gain = (per + sb) * mult; if(A.boost > 0){ gain *= 2; A.boost--; } A.score += gain; A.gain = "+" + fmtN(gain); }
    else { let loss = per * mult * RUSH_UP.ins.vals[A.up.ins]; if(A.shield > 0){ loss = 0; A.shield--; } loss = Math.min(loss, A.score); A.score -= loss; A.gain = loss ? "−" + fmtN(loss) : "Saved by your Force Field!"; }
    A.phase = "fb";
  } else if(A.mode === "gold"){
    if(ok){ A.phase = "pick"; A.picks = [goldOutcome(), goldOutcome(), goldOutcome()]; A.reveal = null; }
    else { A.phase = "fb"; A.gain = "No planet this time"; }
  } else {
    if(ok){ const step = A.streak >= 3 ? 2 : 1; A.pos = Math.min(RACE_LEN, A.pos + step); A.gain = step === 2 ? "Thrusters! +2" : "+1"; if(step === 2) sfx("whoosh"); }
    else A.gain = "Engine stalled";
    A.phase = "fb";
    if(A.pos >= RACE_LEN){ arcPresence(); return arcFinish(); }
  }
  arcPresence();
  render();
  if(A.gain && A.mode !== "gold") floatText(A.gain, ok);
  if(A.phase === "fb") setTimeout(() => { if(ARC === A && A.phase === "fb"){ arcNext(); } }, ok ? 900 : 1700);
}
function arcNext(){
  const A = ARC; if(!A || A.result) return;
  A.qi = (A.qi + 1) % A.pool.length; A.q = makeQ(A.pool[A.qi]); A.picked = null; A.phase = "q"; A.gain = ""; A.picks = null; A.reveal = null;
  render();
}
function goldOutcome(){
  const opts = arcPlayers().filter(p => !p.me);
  const richer = opts.filter(p => p.score > ARC.score);
  const table = [["add",20,16],["add",50,15],["add",100,10],["add",250,4],["double",0,8],["triple",0,3],["lose",0.25,8],["lose",0.5,3],["nothing",0,5]];
  if(opts.some(p => p.score > 0)) table.push(["steal",0.25,10]);
  if(richer.length) table.push(["swap",0,4]);
  const total = table.reduce((n, r) => n + r[2], 0); let x = Math.random() * total;
  for(const r of table){ x -= r[2]; if(x <= 0) return {kind:r[0], v:r[1]}; }
  return {kind:"add", v:20};
}
function goldLabel(o){
  return {add:"+" + o.v + " gold", double:"Double gold!", triple:"Triple gold!", lose:"Lose " + Math.round(o.v*100) + "%", steal:"Steal 25%!", swap:"Swap scores!", nothing:"Black hole: nothing"}[o.kind];
}
function goldPick(i){
  const A = ARC; if(!A || A.phase !== "pick" || A.reveal) return;
  const o = A.picks[i]; A.reveal = {i, o};
  let good = true, msg = goldLabel(o);
  if(o.kind === "add"){ A.score += o.v; sfx("coin"); }
  else if(o.kind === "double"){ A.score *= 2; sfx("coin"); }
  else if(o.kind === "triple"){ A.score *= 3; sfx("win"); }
  else if(o.kind === "lose"){ const l = Math.round(A.score * o.v); A.score -= l; good = false; sfx("bad"); msg = "−" + fmtN(l) + " gold"; }
  else if(o.kind === "nothing"){ good = false; sfx("wrong"); }
  else { A.phase = "target"; render(); return; }
  A.score = Math.round(A.score);
  arcPresence(); render(); floatText(msg, good);
  setTimeout(() => { if(ARC === A && A.reveal) arcNext(); }, 1400);
}
function goldTarget(idx){
  const A = ARC; if(!A || A.phase !== "target") return;
  const opps = arcPlayers().filter(p => !p.me), t = opps[idx]; if(!t) return;
  const o = A.reveal.o; let msg;
  if(o.kind === "steal"){
    const amt = Math.round(t.score * 0.25); A.score += amt; msg = "Stole " + fmtN(amt) + " from " + t.name + "!";
    if(t.bot) t.score -= amt; else if(BT) BT.room.emit("battle", {type:"steal", to:t.peer, pct:0.25, from:String(S.name || "Someone").slice(0, 20)}).catch(() => {});
  } else {
    const mine = A.score; A.score = t.score; msg = "Swapped with " + t.name + "!";
    if(t.bot) t.score = mine; else if(BT) BT.room.emit("battle", {type:"swap", to:t.peer, amount:Math.round(mine), from:String(S.name || "Someone").slice(0, 20)}).catch(() => {});
  }
  A.log.unshift(msg); sfx("coin");
  A.phase = "pick"; arcPresence(); render(); floatText(msg, true);
  setTimeout(() => { if(ARC === A) arcNext(); }, 1400);
}
function rushBuy(key){
  const A = ARC; if(!A) return;
  if(RUSH_UP[key]){
    const u = RUSH_UP[key], lvl = A.up[key]; if(lvl >= u.vals.length - 1) return;
    const cost = u.costs[lvl + 1]; if(A.score < cost){ sfx("wrong"); return; }
    A.score -= cost; A.up[key]++; sfx("buy");
  } else if(RUSH_POW[key]){
    const p = RUSH_POW[key]; if(A.score < p.cost){ sfx("wrong"); return; }
    A.score -= p.cost; if(key === "boost") A.boost += 5; else A.shield += 3; sfx("buy");
  }
  arcPresence(); render();
}

/* ---------- views ---------- */
function arcBoardHtml(){
  const A = ARC, ps = arcPlayers();
  return ps.map((p, i) => '<div class="arc-p'+(p.me?' me':'')+'"><span class="arc-rank">'+(i+1)+'</span><span style="width:34px;flex:none">'+atomi(p.stage, p.me ? "happy" : "ready", {look:p.look})+'</span><span class="arc-name">'+esc(p.name)+(p.me?' (you)':'')+'</span><b class="arc-val">'+(A.mode === "race" ? p.pos + "/" + RACE_LEN : fmtN(p.score))+'</b></div>').join("");
}
function arcTrackHtml(){
  const ps = arcPlayers();
  return '<div class="track" id="arc-track" aria-label="Race positions">'+ps.map(p => '<div class="lane'+(p.me?' me':'')+'"><span class="lane-name">'+esc(p.name)+'</span><div class="lane-road"><span class="flag" aria-hidden="true"></span><span class="rocket" style="left:calc('+(p.pos / RACE_LEN * 100)+'% - '+(p.pos / RACE_LEN * 46)+'px)">'+
    '<svg viewBox="0 0 60 30" width="46" height="23" aria-hidden="true"><path d="M2 15 L14 9 L14 21 Z" fill="#ffad9e"/><path d="M14 8 Q40 2 56 15 Q40 28 14 22 Z" fill="'+(p.me ? "#ffe490" : "#cdb6ff")+'" stroke="#2a2150" stroke-width="2"/><circle cx="38" cy="15" r="4" fill="#9fd8ff" stroke="#2a2150" stroke-width="1.5"/></svg></span></div></div>').join("")+'</div>';
}
function planetSvg(i, o, shown){
  const fills = ["#9fd8ff","#ffb3e1","#a8f0d0"], f = fills[i];
  return '<svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true"><ellipse cx="50" cy="56" rx="46" ry="12" fill="none" stroke="#cdb6ff" stroke-width="4" opacity=".8"/><circle cx="50" cy="50" r="30" fill="'+(shown ? (["lose","nothing"].includes(o.kind) ? "#4a4084" : "#ffe490") : f)+'" stroke="#2a2150" stroke-width="3"/><circle cx="40" cy="40" r="6" fill="#fff" opacity=".5"/>'+(shown ? '' : '<text x="50" y="62" text-anchor="middle" font-family="Lexend,sans-serif" font-size="34" font-weight="700" fill="#2a2150">?</text>')+'<path d="M4 56 Q50 74 96 56" fill="none" stroke="#cdb6ff" stroke-width="4"/></svg>';
}
function vArcade(){
  const A = ARC; if(!A) return vGames();
  const m = ARC_MODES[A.mode];
  if(A.result){
    const ps = arcPlayers();
    const pod = ps.slice(0, 3);
    const order = pod.length === 3 ? [pod[1], pod[0], pod[2]] : pod;
    return '<section class="card" style="display:flex;flex-direction:column;gap:16px;text-align:center;align-items:center"><span class="eyebrow">'+m.name+'</span><h1>'+(A.rank === 1 ? 'You win!' : 'You came ' + ["1st","2nd","3rd","4th","5th","6th"][A.rank-1] + '!')+'</h1>'+
      '<div class="podium">'+order.map(p => { const place = ps.indexOf(p) + 1; return '<div class="pod pod'+place+(p.me?' me':'')+'"><span style="width:'+(place===1?96:72)+'px">'+atomi(p.stage, place === 1 ? "happy" : "ready", {look:p.look})+'</span><b>'+esc(p.name)+'</b><span class="small">'+(A.mode === "race" ? p.pos + "/" + RACE_LEN : fmtN(p.score))+'</span><div class="pod-block">'+place+'</div></div>'; }).join("")+'</div>'+
      '<p>'+A.correct+' right · best streak '+A.best+' · <b>+'+A.xp+' XP</b></p>'+rewardHtml(A.result)+
      '<div class="row" style="justify-content:center">'+(A.multi ? '<button class="btn btn-primary" data-act="bt-again">New battle</button>' : '<button class="btn btn-primary" data-act="arc-start" data-mode="'+A.mode+'">Play again</button>')+'<button class="btn" data-act="arc-quit">Back to arcade</button></div></section>';
  }
  const q = A.q, pk = A.picked;
  let h = '<section class="card arc" style="display:flex;flex-direction:column;gap:14px">'+
    '<div class="arc-hud"><div><span class="eyebrow">'+m.name+(A.multi ? ' · live' : ' · vs bots')+' · '+esc(srcLabel(A.src))+'</span><div class="arc-score" id="arc-score"><b>'+(A.mode === "race" ? A.pos + '<small>/'+RACE_LEN+'</small>' : fmtN(A.score))+'</b><span class="small muted">'+(A.mode === "rush" ? 'stardust' : A.mode === "gold" ? 'gold' : 'steps')+'</span></div></div>'+
    '<div class="row" style="gap:8px"><span class="chip'+(A.streak >= 3 ? ' hot' : '')+'"><b>'+A.streak+'</b> streak</span>'+(A.ends ? '<span class="chip"><b id="arc-time">'+Math.max(0, Math.ceil((A.ends - Date.now())/1000))+'s</b></span>' : '')+
    (A.mode === "rush" ? '<button class="btn btn-sm btn-brand" data-act="arc-shop">'+(A.shop ? 'Back to questions' : 'Shop')+'</button>' : '')+
    '<button class="btn btn-sm" data-act="arc-mute" aria-label="'+(S.mute ? 'Turn sound on' : 'Turn sound off')+'">'+(S.mute ? 'Sound off' : 'Sound on')+'</button></div></div>';
  if(A.mode === "race") h += arcTrackHtml();
  h += '<div class="arc-main"><div class="arc-play">';
  if(A.mode === "rush" && A.shop){
    h += '<h2>Shop</h2><p class="small muted">Upgrades last for this game. You have '+fmtN(A.score)+' stardust.'+(A.boost ? ' Boost: '+A.boost+' answers left.' : '')+(A.shield ? ' Force Field: '+A.shield+' left.' : '')+'</p><div class="shop">';
    Object.entries(RUSH_UP).forEach(([k, u]) => {
      const lvl = A.up[k], max = lvl >= u.vals.length - 1, cost = max ? 0 : u.costs[lvl+1];
      h += '<div class="shop-item"><b>'+u.name+'</b><span class="small muted">Now: '+u.fmt(u.vals[lvl])+(max ? '' : ' → next: '+u.fmt(u.vals[lvl+1]))+'</span><div class="pips">'+u.vals.map((_, i) => '<i class="'+(i<=lvl?'on':'')+'"></i>').join("")+'</div>'+
        (max ? '<span class="small" style="font-weight:800;color:var(--good)">Maxed out</span>' : '<button class="btn btn-sm'+(A.score>=cost?' btn-primary':'')+'" data-act="arc-buy" data-k="'+k+'"'+(A.score>=cost?'':' disabled')+'>Buy for '+fmtN(cost)+'</button>')+'</div>';
    });
    Object.entries(RUSH_POW).forEach(([k, p]) => {
      h += '<div class="shop-item pow"><b>'+p.name+'</b><span class="small muted">'+p.desc+'</span><button class="btn btn-sm'+(A.score>=p.cost?' btn-brand':'')+'" data-act="arc-buy" data-k="'+k+'"'+(A.score>=p.cost?'':' disabled')+'>Buy for '+fmtN(p.cost)+'</button></div>';
    });
    h += '</div>';
  } else if(A.mode === "gold" && (A.phase === "pick" || A.phase === "target")){
    if(A.phase === "target"){
      const opps = arcPlayers().filter(p => !p.me);
      h += '<h2>'+(A.reveal.o.kind === "steal" ? 'Who do you want to steal from?' : 'Who do you want to swap with?')+'</h2><div class="opts">'+
        opps.map((p, i) => '<button class="opt" data-act="arc-target" data-i="'+i+'"><span style="width:30px">'+atomi(p.stage, "ready", {look:p.look})+'</span><span>'+esc(p.name)+' · '+fmtN(p.score)+' gold</span></button>').join("")+'</div>';
    } else {
      h += '<h2>Correct! Pick a planet</h2><div class="planets">'+A.picks.map((o, i) => {
        const shown = A.reveal && A.reveal.i === i;
        return '<button class="planet'+(shown?' open':'')+'" data-act="arc-pick" data-i="'+i+'"'+(A.reveal?' disabled':'')+'>'+planetSvg(i, o, shown)+'<span>'+(shown ? esc(goldLabel(o)) : 'Planet '+(i+1))+'</span></button>';
      }).join("")+'</div>'+(A.reveal ? '' : '<p class="small muted" style="text-align:center">Gold, double, triple, steal, swap… or a black hole.</p>');
    }
  } else {
    h += '<span class="tag s-'+q.t.s+'">'+esc(subjName(q.t.s))+' · '+esc(q.t.name)+'</span><p class="qtext">'+esc(q.text)+'</p><div class="opts">'+q.opts.map((o, k) => {
      let c = "opt"; if(pk !== null && pk !== undefined){ if(k === q.ans) c += " right"; else if(k === pk) c += " wrong"; }
      return '<button class="'+c+'" data-act="arc-ans" data-k="'+k+'"'+(pk !== null && pk !== undefined ? ' disabled' : '')+'><span class="k">'+"ABCD"[k]+'</span><span>'+esc(o)+'</span></button>';
    }).join("")+'</div>';
    if(A.phase === "fb" && pk !== q.ans) h += '<p class="small"><b>Answer:</b> '+esc(q.opts[q.ans])+'. '+esc(q.expl)+'</p>';
  }
  h += '</div><aside class="arc-side"><h3>'+(A.multi ? 'Live scores' : 'Leaderboard')+'</h3><div id="arc-board">'+arcBoardHtml()+'</div>'+
    (A.log.length ? '<div class="arc-log">'+A.log.slice(0, 3).map(x => '<p class="small">'+esc(x)+'</p>').join("")+'</div>' : '')+'</aside></div></section>'+
    '<div><button class="btn btn-sm" data-act="arc-quit">Quit game</button></div>';
  return h;
}

/* ---------- arcade hub ---------- */
function modeArt(mode){
  if(mode === "rush") return '<svg viewBox="0 0 120 70" aria-hidden="true"><circle cx="30" cy="38" r="16" fill="#ffe490" stroke="#2a2150" stroke-width="2.5"/><text x="30" y="44" text-anchor="middle" font-family="Lexend,sans-serif" font-weight="700" font-size="16" fill="#2a2150">★</text><circle cx="62" cy="30" r="12" fill="#ffe490" stroke="#2a2150" stroke-width="2.5"/><circle cx="88" cy="44" r="9" fill="#ffe490" stroke="#2a2150" stroke-width="2.5"/><path d="M100 14 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#ffb3e1"/><path d="M14 12 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#9fd8ff"/></svg>';
  if(mode === "gold") return '<svg viewBox="0 0 120 70" aria-hidden="true"><ellipse cx="34" cy="38" rx="26" ry="7" fill="none" stroke="#cdb6ff" stroke-width="3"/><circle cx="34" cy="36" r="16" fill="#9fd8ff" stroke="#2a2150" stroke-width="2.5"/><text x="34" y="42" text-anchor="middle" font-family="Lexend,sans-serif" font-weight="700" font-size="16" fill="#2a2150">?</text><circle cx="72" cy="30" r="13" fill="#ffb3e1" stroke="#2a2150" stroke-width="2.5"/><text x="72" y="35" text-anchor="middle" font-family="Lexend,sans-serif" font-weight="700" font-size="13" fill="#2a2150">?</text><circle cx="100" cy="44" r="11" fill="#a8f0d0" stroke="#2a2150" stroke-width="2.5"/><text x="100" y="49" text-anchor="middle" font-family="Lexend,sans-serif" font-weight="700" font-size="12" fill="#2a2150">?</text></svg>';
  return '<svg viewBox="0 0 120 70" aria-hidden="true"><path d="M8 56 H112" stroke="#4a4084" stroke-width="3" stroke-dasharray="6 6"/><path d="M8 30 H112" stroke="#4a4084" stroke-width="3" stroke-dasharray="6 6"/><g transform="translate(60 34)"><path d="M-30 9 L-18 3 L-18 15 Z" fill="#ffad9e"/><path d="M-18 2 Q8 -4 24 9 Q8 22 -18 16 Z" fill="#ffe490" stroke="#2a2150" stroke-width="2"/><circle cx="6" cy="9" r="4" fill="#9fd8ff" stroke="#2a2150" stroke-width="1.5"/></g><path d="M104 10 v20 M104 10 h10 v6 h-10" stroke="#f8f4ff" stroke-width="2.5" fill="#ffb3e1"/></svg>';
}
function vArcadeHub(){
  const best = S.best || {};
  let h = '<section class="card arc-hero" style="display:flex;flex-direction:column;gap:12px"><div class="row between"><div><span class="eyebrow">Atomi Arcade</span><h1>Answer science questions. Win the game.</h1><p class="muted">Every right answer powers your game. Play solo against bots, or live against your friends.</p></div>'+
    '<div style="width:110px">'+me(stageOf(S.xp), "happy")+'</div></div><div><h3 style="margin-bottom:8px">Questions from</h3>'+srcPicker()+'</div></section>';
  const sd = Object.keys(storyDone()).length;
  h += '<section class="card story-promo row" style="flex-wrap:nowrap;gap:16px"><div class="ship-mini">'+shipSvg()+'</div><div style="flex:1;display:flex;flex-direction:column;gap:6px"><span class="eyebrow">Story mode · solo</span><h2>Atomi\'s Space Quest</h2><p class="small muted">Atomi crash-landed! Battle six science bosses across the Nebula to rebuild the ship. '+sd+' / 6 chapters done.</p><div><button class="btn btn-primary" data-act="sq-open">'+(sd ? 'Continue story' : 'Start the story')+'</button></div></div></section>';
  h += '<div class="arc-modes">';
  Object.entries(ARC_MODES).forEach(([k, m]) => {
    const b = best["arc_" + k];
    h += '<div class="card arc-mode mode-'+k+'"><div class="mode-art">'+modeArt(k)+'</div><div><h2>'+m.name+'</h2><span class="small" style="font-weight:800;color:var(--star)">'+m.tag+'</span></div><p class="small muted">'+m.desc+'</p>'+(b ? '<p class="small"><b>Your best:</b> '+fmtN(b)+'</p>' : '')+
      '<div class="row"><button class="btn btn-primary" data-act="arc-start" data-mode="'+k+'">Play solo</button><button class="btn" data-act="arc-friends" data-mode="'+k+'">With friends</button></div></div>';
  });
  h += '</div>';
  h += '<section style="display:flex;flex-direction:column;gap:10px"><h2>Quick games</h2><div class="grid g2">'+
    '<div class="card game"><h3>Formula Match</h3><p class="small muted">Flip tiles to match terms with meanings and formulas.</p><div class="tabs">'+Object.keys(PAIRS).map(s => '<button data-act="game-match" data-s="'+s+'">'+SUBJ[s].name+'</button>').join("")+'</div></div>'+
    '<div class="card game"><h3>Atom Builder</h3><p class="small muted">Count protons, neutrons and electrons to build atoms and ions.</p><div><button class="btn btn-sm" data-act="game-atom">Play</button></div></div>'+
    '<div class="card game"><h3>Speed Blitz</h3><p class="small muted">60 seconds, as many right answers as you can.</p><div><button class="btn btn-sm" data-act="blitz-src">Play</button></div></div>'+
    '<div class="card game"><h3>Classic Quiz Battle</h3><p class="small muted">Race friends on the same 8 questions.</p><div><button class="btn btn-sm" data-act="arc-friends" data-mode="classic">Battle friends</button></div></div>'+
    '</div></section>';
  return h;
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b) return;
  const a = b.dataset.act;
  if(a === "src-s"){ SRC_NOTES = b.dataset.s === "notes"; SRC = {s:b.dataset.s === "notes" ? "all" : b.dataset.s, topics:[], deck:null}; if(SRC_NOTES && (S.decks || []).length === 1) SRC.deck = S.decks[0].id; render(); }
  else if(a === "src-t"){ const t = b.dataset.t; SRC.topics = SRC.topics.includes(t) ? SRC.topics.filter(x => x !== t) : SRC.topics.concat(t); render(); }
  else if(a === "src-d"){ SRC = {s:"notes", topics:[], deck:b.dataset.id}; SRC_NOTES = true; render(); }
  else if(a === "src-clear"){ SRC.topics = []; render(); }
  else if(a === "src-play"){ SRC_NOTES = !!b.dataset.deck; SRC = b.dataset.deck ? {s:"notes", topics:[], deck:b.dataset.deck} : b.dataset.t ? {s:TBYID[b.dataset.t].s, topics:[b.dataset.t], deck:null} : {s:b.dataset.s || "all", topics:[], deck:null}; go("games"); toast("Games will use: " + srcLabel(SRC)); }
  else if(a === "blitz-src") startBlitz(SRC.s === "notes" ? "all" : SRC.s, srcPool(SRC));
  else if(a === "arc-start"){ if(SRC_NOTES && !srcClean(SRC).deck){ toast("Pick one of your notes decks first."); return; } startArcade(b.dataset.mode, SRC, false); }
  else if(a === "arc-ans") arcAnswer(Number(b.dataset.k));
  else if(a === "arc-pick") goldPick(Number(b.dataset.i));
  else if(a === "arc-target") goldTarget(Number(b.dataset.i));
  else if(a === "arc-shop"){ if(ARC){ ARC.shop = !ARC.shop; render(); } }
  else if(a === "arc-buy") rushBuy(b.dataset.k);
  else if(a === "arc-mute"){ S.mute = !S.mute; save(); render(); }
  else if(a === "arc-quit") arcQuit();
  else if(a === "arc-friends"){ BT_PREF = {mode:b.dataset.mode}; if(BT) render(); go("battle"); }
});
document.addEventListener("keydown", e => {
  if(view !== "game" || !ARC || ARC.result || e.target.tagName === "INPUT") return;
  if(ARC.phase === "q" && !ARC.shop && ["1","2","3","4"].includes(e.key)) arcAnswer(Number(e.key) - 1);
  else if(ARC.phase === "pick" && !ARC.reveal && ["1","2","3"].includes(e.key)) goldPick(Number(e.key) - 1);
});
let BT_PREF = {mode:"rush", s:"all"};
