// Atomi's Space Quest: a solo story campaign. Atomi's ship crashed; beat each planet's boss with science to rebuild it.
"use strict";
const STORY = [
  {id:"lab", planet:"Lab Moon", s:"prac", part:"Engine", boss:"Captain Spill", bossCol:"#ffe490", hp:80,
    intro:[["Atomi","Ugh… where are we? The ship's engine is in pieces!"],["Captain Spill","Ha! Welcome to Lab Moon. I knocked over every beaker on this moon, and I took your engine too."],["Atomi","We'll win it back. Lab safety and good experiments, that's our superpower."]],
    taunts:["Spill splashes mystery liquid at you!","Spill forgets the goggles and charges!","Spill reads the meniscus from an angle. Ouch!"],
    outro:[["Captain Spill","Fine, fine. Take your engine. I'll go clean up…"],["Atomi","Engine back! Next stop: that crackling blue planet."]]},
  {id:"volt", planet:"Voltara", s:"phy", topicHint:["elec","circ","current","charge","magnet"], part:"Wings", boss:"Static Storm", bossCol:"#9fd8ff", hp:100,
    intro:[["Atomi","Everything here is buzzing. My antennae are standing on end!"],["Static Storm","ZZZAP! I've charged up your wings. Touch them and you'll be fried."],["Atomi","Physics will earth this storm out. Let's go!"]],
    taunts:["Static Storm fires a lightning bolt!","A wave of charge crackles toward you!","Static Storm shorts the circuit!"],
    outro:[["Static Storm","My charge… it's all flowing away…"],["Atomi","Wings back on! Now we can actually steer."]]},
  {id:"react", planet:"Reactia", s:"chem", part:"Fuel Cell", boss:"Acid Slime", bossCol:"#a8f0d0", hp:110,
    intro:[["Atomi","This planet smells like a chemistry lab after a really bad day."],["Acid Slime","Blorp. Your fuel cell is in my belly. pH 1, little atom. Come and get it."],["Atomi","Time to neutralise you. Chemistry, assemble!"]],
    taunts:["Acid Slime sprays corrosive goo!","Acid Slime fizzes and bubbles at you!","A cloud of fumes rolls over you!"],
    outro:[["Acid Slime","Neutralised… I'm just salt and water now…"],["Atomi","Fuel cell recovered. The ship hums again!"]]},
  {id:"verd", planet:"Verdantis", s:"bio", part:"Life Support", boss:"Virus Swarm", bossCol:"#ffb3e1", hp:120,
    intro:[["Atomi","A jungle planet! Wait… why are all the plants wilting?"],["Virus Swarm","We infected everything. And we've hijacked your life support."],["Atomi","Then we'll be the immune system. Biology, let's fight!"]],
    taunts:["The Virus Swarm multiplies and attacks!","The swarm invades your cells!","The swarm mutates and strikes again!"],
    outro:[["Virus Swarm","Antibodies… everywhere… retreat!"],["Atomi","Life support restored, and the jungle is turning green again."]]},
  {id:"grav", planet:"Gravitas", s:"phy", part:"Shield", boss:"Gravity Golem", bossCol:"#ffad9e", hp:130,
    intro:[["Atomi","I can barely lift my rings. Gravity here is enormous!"],["Gravity Golem","I am MASS. I am WEIGHT. Your shield is crushed beneath me."],["Atomi","Forces, energy and motion. Let's knock this golem down."]],
    taunts:["Gravity Golem stomps. The ground shakes!","The Golem throws a boulder at terminal velocity!","The Golem's pull drags you down!"],
    outro:[["Gravity Golem","I… am… falling…"],["Atomi","Shield back! One more part and we can fly home."]]},
  {id:"core", planet:"Nebula Core", s:"all", part:"Star Map", boss:"The Entropy King", bossCol:"#cdb6ff", hp:160,
    intro:[["Atomi","The centre of the nebula. It's so dark and messy."],["The Entropy King","Everything falls into disorder. Your star map is mine. You'll never find home."],["Atomi","Physics, chemistry, biology and lab skills, all at once. This is the final battle!"]],
    taunts:["The Entropy King scatters everything into chaos!","A wave of disorder washes over you!","The King summons a black hole!"],
    outro:[["The Entropy King","Order… restored? Impossible…"],["Atomi","We did it! The ship is whole. Thank you, scientist. Let's fly home!"]]}
];
const STORY_HEARTS = 3, STORY_TIME = 20;
let SQ = null, SQ_TICK = null;

function storyDone(){ return (S.story && S.story.done) || {}; }
function storyUnlocked(i){ return i === 0 || !!storyDone()[STORY[i-1].id]; }
function storyPool(ch){
  const mine = t => S.level <= 2 ? t.y <= 2 : (t.y >= 3 && t.y <= S.level);
  let ts = TOPICS.filter(t => (ch.s === "all" || t.s === ch.s) && mine(t));
  if(ch.id === "lab" && ts.length < 2) ts = ts.concat(TOPICS.filter(t => mine(t) && /separation|physical/.test(t.id)));
  if(ch.id === "volt"){ const e = ts.filter(t => /elec|circ|current|charge|magnet|resist|volt|light/i.test(t.id + " " + t.name)); if(e.length >= 2) ts = e; }
  if(ch.id === "grav"){ const f = ts.filter(t => /force|motion|energy|pressure|moment|mass|weight|speed|kinem|dynam|work|power|gravit|heat/i.test(t.id + " " + t.name)); if(f.length >= 2) ts = f; }
  return shuffle(poolFor(ts.length ? ts : TOPICS));
}
function storyStart(i){
  if(!storyUnlocked(i)) return;
  storyStop();
  const ch = STORY[i];
  SQ = {i, ch, phase:"intro", line:0, hp:ch.hp, hearts:STORY_HEARTS, pool:storyPool(ch), qi:0, q:null, picked:null, streak:0, correct:0, msg:"", hit:"", deadline:0, result:null};
  GAME = {type:"story"}; go("game");
}
function storyStop(){ if(SQ_TICK){ clearInterval(SQ_TICK); SQ_TICK = null; } }
function storyFight(){
  SQ.phase = "fight"; SQ.q = makeQ(SQ.pool[0]); SQ.deadline = Date.now() + STORY_TIME*1000;
  storyStop(); SQ_TICK = setInterval(storyTick, 200);
  sfx("whoosh"); render();
}
function storyTick(){
  if(!SQ || SQ.phase !== "fight"){ storyStop(); return; }
  if(SQ.picked !== null) return;
  const left = SQ.deadline - Date.now();
  const b = document.getElementById("sq-timer"); if(b) b.style.width = Math.max(0, left / (STORY_TIME*10)) + "%";
  if(left <= 0) storyAnswer(-1);
}
function storyAnswer(k){
  const Q = SQ; if(!Q || Q.phase !== "fight" || Q.picked !== null) return;
  const q = Q.q, ok = k === q.ans;
  Q.picked = k;
  const ts = tstate(q.t.id); ts.a.push(ok ? 1 : 0); if(ts.a.length > 10) ts.a.shift();
  S.answered++; if(ok) S.correct++; else S.review[q.qid] = {due:addDays(today(),1), c:0, step:0};
  let dmg = 0;
  if(ok){
    Q.streak++; Q.correct++;
    const fast = Q.deadline - Date.now() > STORY_TIME*1000/2;
    dmg = 20 + (Q.streak >= 3 ? 10 : 0) + (fast ? 5 : 0);
    Q.hp = Math.max(0, Q.hp - dmg);
    Q.msg = (Q.streak >= 3 ? "Combo x" + Q.streak + "! " : "") + (fast ? "Quick hit! " : "") + "You deal " + dmg + " damage.";
    Q.hit = "boss"; sfx(Q.streak >= 3 ? "win" : "right");
  } else {
    Q.streak = 0; Q.hearts--;
    Q.msg = (k === -1 ? "Too slow! " : "") + Q.ch.taunts[Math.floor(Math.random() * Q.ch.taunts.length)];
    Q.hit = "me"; sfx("bad");
  }
  render();
  if(ok) storyFloat("−" + dmg);
  const wait = ok ? 1100 : 2600;
  setTimeout(() => {
    if(SQ !== Q) return;
    if(Q.hp <= 0) return storyWin();
    if(Q.hearts <= 0){ Q.phase = "lose"; storyStop(); save(); render(); return; }
    Q.qi = (Q.qi + 1) % Q.pool.length; Q.q = makeQ(Q.pool[Q.qi]); Q.picked = null; Q.hit = ""; Q.msg = ""; Q.deadline = Date.now() + STORY_TIME*1000;
    render();
  }, wait);
}
function storyFloat(t){
  const host = document.getElementById("sq-boss"); if(!host) return;
  const el = document.createElement("span"); el.className = "floaty down dmg"; el.textContent = t; host.appendChild(el); setTimeout(() => el.remove(), 1100);
}
function storyWin(){
  const Q = SQ; storyStop();
  Q.phase = "outro"; Q.line = 0;
  const stars = Q.hearts;
  const first = !storyDone()[Q.ch.id];
  Q.xp = Q.correct * 10 + 40 + stars * 10 + (first ? 30 : 0);
  Q.stars = stars;
  Q.result = awardGame(Q.xp, () => {
    S.story = S.story || {done:{}}; S.story.done = S.story.done || {};
    S.story.done[Q.ch.id] = Math.max(S.story.done[Q.ch.id] || 0, stars);
  });
  sfx("win"); render(); confetti();
}

/* ---------- art ---------- */
function bossSvg(ch, hurt){
  const c = ch.bossCol, i = STORY.indexOf(ch);
  const feats = [
    '<path d="M28 30 Q50 6 72 30" fill="#2a2150"/><rect x="30" y="24" width="40" height="7" rx="3" fill="#2a2150"/>', // captain hat
    '<path d="M30 18 L40 32 L34 32 L44 46" fill="none" stroke="#ffe490" stroke-width="4" stroke-linejoin="round"/><path d="M70 18 L60 32 L66 32 L56 46" fill="none" stroke="#ffe490" stroke-width="4" stroke-linejoin="round"/>', // bolts
    '<circle cx="30" cy="22" r="5" fill="'+c+'" stroke="#2a2150" stroke-width="2.5"/><circle cx="72" cy="18" r="4" fill="'+c+'" stroke="#2a2150" stroke-width="2.5"/>', // bubbles
    '<g stroke="#2a2150" stroke-width="3">'+[0,1,2,3,4,5,6,7].map(k => { const a = k/8*Math.PI*2; return '<line x1="'+(50+Math.cos(a)*30)+'" y1="'+(56+Math.sin(a)*30)+'" x2="'+(50+Math.cos(a)*40)+'" y2="'+(56+Math.sin(a)*40)+'"/>'; }).join("")+'</g>', // spikes
    '<rect x="18" y="40" width="12" height="26" rx="5" fill="'+c+'" stroke="#2a2150" stroke-width="3"/><rect x="70" y="40" width="12" height="26" rx="5" fill="'+c+'" stroke="#2a2150" stroke-width="3"/>', // arms
    '<path d="M30 30 L34 14 L42 26 L50 10 L58 26 L66 14 L70 30 Z" fill="#ffe490" stroke="#2a2150" stroke-width="2.5"/>' // crown
  ][i] || '';
  const body = i === 2 ? '<path d="M20 80 Q16 40 50 34 Q84 40 80 80 Q72 74 64 80 Q56 74 50 80 Q42 74 34 80 Q26 74 20 80Z" fill="'+c+'" stroke="#2a2150" stroke-width="3"/>'
    : i === 4 ? '<rect x="26" y="32" width="48" height="50" rx="10" fill="'+c+'" stroke="#2a2150" stroke-width="3"/>'
    : '<circle cx="50" cy="56" r="28" fill="'+c+'" stroke="#2a2150" stroke-width="3"/>';
  const eyes = hurt ? '<path d="M38 50 l6 6 M44 50 l-6 6 M56 50 l6 6 M62 50 l-6 6" stroke="#2a2150" stroke-width="3" stroke-linecap="round"/>'
    : '<path d="M36 46 L46 50" stroke="#2a2150" stroke-width="3" stroke-linecap="round"/><path d="M64 46 L54 50" stroke="#2a2150" stroke-width="3" stroke-linecap="round"/><circle cx="42" cy="55" r="4" fill="#2a2150"/><circle cx="58" cy="55" r="4" fill="#2a2150"/>';
  const mouth = hurt ? '<ellipse cx="50" cy="68" rx="6" ry="4" fill="#2a2150"/>' : '<path d="M40 66 Q50 72 60 66" fill="none" stroke="#2a2150" stroke-width="3" stroke-linecap="round"/><path d="M44 67 l2 4 2 -4 M52 67 l2 4 2 -4" fill="#fff"/>';
  return '<svg viewBox="0 0 100 96" aria-hidden="true">'+(i === 3 ? feats : '')+body+(i !== 3 ? feats : '')+eyes+mouth+'</svg>';
}
function shipSvg(){
  const d = storyDone(), has = k => !!d[STORY[k].id];
  const col = k => has(k) ? "" : ' opacity=".18" stroke-dasharray="4 4"';
  return '<svg viewBox="0 0 240 120" class="ship" role="img" aria-label="Atomi\'s ship, '+Object.keys(d).length+' of 6 parts repaired">'+
    '<path d="M30 60 L10 48 L10 72 Z" fill="#ffad9e" stroke="#2a2150" stroke-width="2.5"'+col(0)+'/>'+ // engine flame
    '<path d="M90 40 L120 8 L150 40 Z" fill="#9fd8ff" stroke="#2a2150" stroke-width="2.5"'+col(1)+'/><path d="M90 80 L120 112 L150 80 Z" fill="#9fd8ff" stroke="#2a2150" stroke-width="2.5"'+col(1)+'/>'+ // wings
    '<path d="M30 42 Q130 20 210 60 Q130 100 30 78 Z" fill="#f8f4ff" stroke="#2a2150" stroke-width="3"/>'+
    '<rect x="44" y="52" width="30" height="16" rx="5" fill="#a8f0d0" stroke="#2a2150" stroke-width="2.5"'+col(2)+'/>'+ // fuel cell
    '<circle cx="104" cy="60" r="9" fill="#ffb3e1" stroke="#2a2150" stroke-width="2.5"'+col(3)+'/>'+ // life support
    '<path d="M150 42 Q200 60 150 78" fill="none" stroke="#ffad9e" stroke-width="5"'+col(4)+'/>'+ // shield
    '<circle cx="168" cy="60" r="10" fill="#9fd8ff" stroke="#2a2150" stroke-width="2.5"/><path d="M190 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#ffe490" stroke="#2a2150" stroke-width="1.5"'+col(5)+'/>'+ // star map
    '</svg>';
}

/* ---------- views ---------- */
function vStoryMap(){
  const d = storyDone(), n = Object.keys(d).length;
  let h = '<section class="card story-hero" style="display:flex;flex-direction:column;gap:12px"><span class="eyebrow">Story mode · solo</span><h1>Atomi\'s Space Quest</h1>'+
    '<p class="muted">Atomi\'s ship crash-landed in the Nebula and six villains stole its parts. Travel planet to planet and use your science to beat each boss and rebuild the ship.</p>'+
    shipSvg()+'<p class="small"><b>'+n+' / 6</b> parts repaired'+(n === 6 ? '. Atomi made it home! Replay any planet for 3 stars.' : '')+'</p></section><div class="story-map">';
  STORY.forEach((ch, i) => {
    const open = storyUnlocked(i), st = d[ch.id];
    h += '<div class="card planet-card'+(open ? '' : ' locked')+'"><div class="row" style="flex-wrap:nowrap;gap:12px"><div class="boss-mini">'+bossSvg(ch, false)+'</div><div style="flex:1"><span class="small muted">Chapter '+(i+1)+' · '+(ch.s === "all" ? "All subjects" : esc(subjName(ch.s)))+'</span><h3>'+esc(ch.planet)+'</h3><p class="small">Boss: <b>'+esc(ch.boss)+'</b> · Win back: '+esc(ch.part)+'</p>'+
      (st ? '<p class="stars" aria-label="'+st+' of 3 stars">'+[1,2,3].map(k => '<span class="'+(k<=st?'on':'')+'">★</span>').join("")+'</p>' : '')+'</div></div>'+
      (open ? '<button class="btn '+(st ? '' : 'btn-primary')+'" data-act="sq-start" data-i="'+i+'">'+(st ? 'Replay' : 'Play chapter')+'</button>' : '<span class="small muted">Locked: beat '+esc(STORY[i-1].planet)+' first</span>')+'</div>';
  });
  h += '</div><div><button class="btn btn-sm" data-act="go" data-v="games">Back to games</button></div>';
  return h;
}
function storyTalk(lines, idx, nextAct, nextLabel){
  const [who, text] = lines[idx], isAtomi = who === "Atomi";
  return '<div class="talk'+(isAtomi ? '' : ' boss-talk')+'"><div class="talk-face">'+(isAtomi ? me(stageOf(S.xp), "happy") : bossSvg(SQ.ch, SQ.phase === "outro"))+'</div><div class="bubble talk-bubble"><b>'+esc(who)+'</b><p>'+esc(text)+'</p></div></div>'+
    '<div class="row"><button class="btn btn-primary btn-big" id="next" data-act="'+(idx < lines.length - 1 ? 'sq-line' : nextAct)+'">'+(idx < lines.length - 1 ? 'Next' : nextLabel)+'</button>'+(SQ.phase === "intro" ? '<button class="btn" data-act="sq-fight">Skip story</button>' : '')+'</div>';
}
function vStory(){
  const Q = SQ; if(!Q) return vStoryMap();
  const ch = Q.ch;
  let h = '<section class="card story" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><div><span class="eyebrow">Chapter '+(Q.i+1)+' · '+esc(ch.planet)+'</span></div><button class="btn btn-sm" data-act="arc-mute">'+(S.mute ? 'Sound off' : 'Sound on')+'</button></div>';
  if(Q.phase === "intro") h += storyTalk(ch.intro, Q.line, "sq-fight", "Battle "+ch.boss+"!");
  else if(Q.phase === "outro"){
    if(Q.line < ch.outro.length) h += storyTalk(ch.outro, Q.line, "sq-end", "Continue");
  } else if(Q.phase === "done"){
    h += '<div style="text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center"><h1>'+esc(ch.part)+' recovered!</h1><p class="stars big" aria-label="'+Q.stars+' of 3 stars">'+[1,2,3].map(k => '<span class="'+(k<=Q.stars?'on':'')+'">★</span>').join("")+'</p>'+shipSvg()+
      '<p>'+Q.correct+' right · <b>+'+Q.xp+' XP</b></p>'+rewardHtml(Q.result)+'<div class="row" style="justify-content:center">'+(STORY[Q.i+1] ? '<button class="btn btn-primary btn-big" data-act="sq-start" data-i="'+(Q.i+1)+'">Fly to '+esc(STORY[Q.i+1].planet)+'</button>' : '')+'<button class="btn" data-act="sq-map">Story map</button></div></div>';
  } else if(Q.phase === "lose"){
    h += '<div style="text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center"><div class="boss-big">'+bossSvg(ch, false)+'</div><h1>'+esc(ch.boss)+' wins this round</h1><p class="muted">Atomi is out of hearts. '+esc(ch.boss)+' has '+Q.hp+' HP left. The questions you missed are saved to Review.</p>'+
      '<div class="row" style="justify-content:center"><button class="btn btn-primary btn-big" data-act="sq-start" data-i="'+Q.i+'">Try again</button><button class="btn" data-act="sq-map">Story map</button></div></div>';
  } else {
    const q = Q.q, pk = Q.picked;
    h += '<div class="arena"><div class="fighter'+(Q.hit === "me" ? ' shake' : '')+'"><div style="width:90px">'+me(stageOf(S.xp), "ready")+'</div><div class="hearts" aria-label="'+Q.hearts+' hearts left">'+[1,2,3].map(k => '<span class="'+(k<=Q.hearts?'on':'')+'">♥</span>').join("")+'</div></div>'+
      '<div class="vs">VS</div><div class="fighter boss'+(Q.hit === "boss" ? ' shake' : '')+'" id="sq-boss"><div class="boss-big">'+bossSvg(ch, Q.hit === "boss")+'</div><b class="small">'+esc(ch.boss)+'</b><div class="hpbar" role="progressbar" aria-label="Boss health" aria-valuenow="'+Q.hp+'" aria-valuemin="0" aria-valuemax="'+ch.hp+'"><i style="width:'+(Q.hp/ch.hp*100)+'%"></i></div><span class="small muted">'+Q.hp+' / '+ch.hp+' HP</span></div></div>'+
      '<div class="timer"><i id="sq-timer" style="width:'+(pk === null ? Math.max(0, (Q.deadline - Date.now())/(STORY_TIME*10)) : 0)+'%"></i></div>'+
      (Q.msg ? '<p class="bubble" role="status">'+esc(Q.msg)+'</p>' : '<p class="small muted">Answer to attack. Fast answers and 3-in-a-row combos hit harder. Wrong or too slow and '+esc(ch.boss)+' strikes back.</p>')+
      '<span class="tag s-'+q.t.s+'">'+esc(subjName(q.t.s))+' · '+esc(q.t.name)+'</span><p class="qtext">'+esc(q.text)+'</p><div class="opts">'+q.opts.map((o, k) => {
        let c = "opt"; if(pk !== null){ if(k === q.ans) c += " right"; else if(k === pk) c += " wrong"; }
        return '<button class="'+c+'" data-act="sq-ans" data-k="'+k+'"'+(pk !== null ? ' disabled' : '')+'><span class="k">'+"ABCD"[k]+'</span><span>'+esc(o)+'</span></button>';
      }).join("")+'</div>'+(pk !== null && pk !== q.ans ? '<p class="small"><b>Answer:</b> '+esc(q.opts[q.ans])+'. '+esc(q.expl)+'</p>' : '');
  }
  h += '</section>';
  if(Q.phase === "fight" || Q.phase === "intro") h += '<div><button class="btn btn-sm" data-act="sq-map">Leave chapter</button></div>';
  return h;
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b) return;
  const a = b.dataset.act;
  if(a === "sq-open"){ storyStop(); SQ = null; GAME = {type:"story"}; go("game"); }
  else if(a === "sq-start") storyStart(Number(b.dataset.i));
  else if(a === "sq-line"){ if(SQ){ SQ.line++; render(); const n = document.getElementById("next"); if(n) n.focus(); } }
  else if(a === "sq-fight"){ if(SQ && SQ.phase === "intro") storyFight(); }
  else if(a === "sq-ans") storyAnswer(Number(b.dataset.k));
  else if(a === "sq-end"){ if(SQ){ SQ.phase = "done"; render(); } }
  else if(a === "sq-map"){ storyStop(); SQ = null; GAME = {type:"story"}; go("game"); }
});
document.addEventListener("keydown", e => {
  if(view !== "game" || !GAME || GAME.type !== "story" || !SQ || e.target.tagName === "INPUT") return;
  if(SQ.phase === "fight" && SQ.picked === null && ["1","2","3","4"].includes(e.key)) storyAnswer(Number(e.key) - 1);
});
