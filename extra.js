// Atomi Science Quiz: topic explorer, quiz builder, notes-to-quiz decks and science mini games.
// Loaded before the main script; it uses the main script's globals (S, render, go, save…) only when called.
"use strict";
let SAMPLE = null, ROOM = null, SAMPLE_IMAGES = null;

/* ---------- shared helpers ---------- */
function subjName(s){ return (SUBJ[s] && SUBJ[s].name) || "My notes"; }
// One question by id: built-in "topic#i" or from a notes deck "deck:<deckId>#i"
function getQ(qid){
  if(typeof qid !== "string") return null;
  if(qid.startsWith("deck:")){
    const m = /^deck:([a-z0-9]+)#(\d+)$/.exec(qid); if(!m) return null;
    const d = (S.decks || []).find(x => x.id === m[1]); if(!d || !d.qs[+m[2]]) return null;
    return {t:{id:"deck-"+d.id, s:"notes", name:d.title, y:0, qs:d.qs}, i:+m[2]};
  }
  if(qid.startsWith("rdeck#")){ const i = +qid.slice(6); return REMOTE_DECK && REMOTE_DECK.qs[i] ? {t:{id:"rdeck", s:"notes", name:REMOTE_DECK.title, y:0, qs:REMOTE_DECK.qs}, i} : null; }
  return QMAP[qid] || null;
}
function awardGame(xp, extra){
  const boxesBefore = S.boxes || 0;
  addXp(xp); markStudied();
  S.games = (S.games || 0) + 1;
  if(extra) extra();
  const badges = checkBadges();
  const boxes = Math.max(0, (S.boxes || 0) - boxesBefore);
  save(); pushBoard();
  return {badges, boxes, looks:[]};
}
function rewardHtml(r){
  let h = '';
  if(r.badges.length) h += '<p class="bubble">New badge: '+r.badges.map(id => esc((BADGES.find(b => b.id === id) || {}).name || id)).join(", ")+'!</p>';
  if(r.boxes) h += '<p class="bubble">You earned '+(r.boxes > 1 ? r.boxes + ' blind boxes' : 'a blind box')+' for Atomi! <button class="btn btn-sm btn-primary" data-act="go" data-v="dress">Open it</button></p>';
  return h;
}
function subjChips(cur, act, withAll, extra){
  const keys = Object.keys(SUBJ);
  return '<div class="tabs" role="group" aria-label="Subject">'+(withAll ? '<button data-act="'+act+'" data-s="all" aria-pressed="'+(cur==="all")+'">All subjects</button>' : '')+
    keys.map(s => '<button data-act="'+act+'" data-s="'+s+'" aria-pressed="'+(cur===s)+'">'+SUBJ[s].name+'</button>').join("")+(extra || '')+'</div>';
}

/* ---------- topic explorer: learn any topic, in any order ---------- */
let EXP = {s:"all", y:"all", q:""};
function exploreList(){
  const q = EXP.q.trim().toLowerCase();
  const ts = stageSort(TOPICS).filter(t => (EXP.s === "all" || t.s === EXP.s) && (EXP.y === "all" || String(t.y) === EXP.y) && (!q || t.name.toLowerCase().includes(q)));
  if(!ts.length) return '<p class="muted">No topics match "'+esc(EXP.q)+'". Try another word.</p>';
  return ts.map(t => '<div class="trow s-'+t.s+'"><div style="display:flex;flex-direction:column;gap:4px"><b>'+esc(t.name)+'</b><div class="row" style="gap:8px"><span class="tag">'+SUBJ[t.s].name+'</span><span class="tag" style="--cs:var(--panel);--c:var(--muted)">Year '+t.y+'</span>'+statusChip(t.id)+'</div></div>'+
    '<div class="barcell">'+(tried(t.id) ? '<div class="small muted" style="text-align:right">Quiz '+mastery(t.id)+'%</div>'+bar(mastery(t.id)) : '<span class="small muted">No quiz yet</span>')+'</div>'+
    '<div class="acts"><button class="btn btn-sm'+(lstatus(t.id)==="learned"?'':' btn-primary')+'" data-act="learn" data-arg="'+t.id+'">'+(lstatus(t.id)==="learned"?'Re-learn':'Learn')+'</button><button class="btn btn-sm" data-act="quiz" data-k="topic" data-arg="'+t.id+'">Quick quiz</button></div></div>').join("");
}
function vExplore(){
  const yb = (v,l) => '<button data-act="exp-y" data-y="'+v+'" aria-pressed="'+(EXP.y===v)+'">'+l+'</button>';
  return '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div><h1>Choose a topic</h1><p class="muted">Learn any topic you like, in any order. Pick what your class is doing, or what you want to get better at.</p></div>'+
    '<div><label for="exp-q" class="sr">Search topics</label><input type="text" id="exp-q" placeholder="Search, e.g. enzymes, moles, pressure" value="'+esc(EXP.q)+'" style="max-width:100%" autocomplete="off"></div>'+
    subjChips(EXP.s, "exp-s", true)+
    '<div class="seg" role="group" aria-label="Filter by year" style="align-self:flex-start">'+yb("all","All years")+yb("1","Year 1")+yb("2","Year 2")+yb("3","Year 3")+yb("4","Year 4")+'</div>'+
    '<div id="exp-list">'+exploreList()+'</div></section>';
}

/* ---------- quiz builder: a quick quiz for any subject or topics ---------- */
let QB = {s:"all", topics:[], n:10};
function vBuilder(){
  const ts = QB.s === "all" ? [] : TOPICS.filter(t => t.s === QB.s);
  const nb = n => '<button data-act="qb-n" data-n="'+n+'" aria-pressed="'+(QB.n===n)+'">'+n+' questions</button>';
  const pool = builderPool();
  let h = '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div><h1>Quick quiz</h1><p class="muted">Pick a subject, then one or more topics, for a quiz made just for them.</p></div>'+
    '<div><h3 style="margin-bottom:8px">1. Subject</h3>'+subjChips(QB.s, "qb-s", true, (S.decks && S.decks.length ? '<button data-act="qb-s" data-s="notes" aria-pressed="'+(QB.s==="notes")+'">My notes</button>' : ''))+'</div>';
  if(QB.s === "all") h += '<p class="small muted">Mixed questions from every topic you have switched on.</p>';
  else if(QB.s === "notes") h += '<div><h3 style="margin-bottom:8px">2. Notes</h3><div class="tabs">'+S.decks.map(d => '<button data-act="qb-t" data-t="deck-'+d.id+'" aria-pressed="'+QB.topics.includes("deck-"+d.id)+'">'+esc(d.title)+'</button>').join("")+'</div><p class="small muted" style="margin-top:6px">Pick none for all your notes.</p></div>';
  else h += '<div><h3 style="margin-bottom:8px">2. Topics <span class="small muted">(pick none for the whole subject)</span></h3><div class="tabs">'+ts.map(t => '<button data-act="qb-t" data-t="'+t.id+'" aria-pressed="'+QB.topics.includes(t.id)+'">'+esc(t.name)+'</button>').join("")+'</div></div>';
  h += '<div><h3 style="margin-bottom:8px">3. Length</h3><div class="seg" role="group">'+nb(5)+nb(10)+nb(15)+'</div></div>'+
    '<div class="row"><button class="btn btn-primary btn-big" data-act="qb-go"'+(pool.length?'':' disabled')+'>Start quiz ('+Math.min(QB.n, pool.length)+' questions)</button><span class="small muted">'+pool.length+' questions to pick from</span></div></section>';
  return h;
}
function builderPool(){
  if(QB.s === "notes"){
    const ds = (S.decks || []).filter(d => !QB.topics.length || QB.topics.includes("deck-"+d.id));
    const out = []; ds.forEach(d => d.qs.forEach((_, i) => out.push("deck:"+d.id+"#"+i))); return out;
  }
  let ts;
  if(QB.s === "all") ts = TOPICS.filter(isOn);
  else if(QB.topics.length) ts = TOPICS.filter(t => QB.topics.includes(t.id));
  else ts = TOPICS.filter(t => t.s === QB.s);
  return poolFor(ts);
}

/* ---------- notes → flashcards and quizzes (Claude) ---------- */
let NOTES = {busy:false, msg:"", images:[], ctl:null};
function uid6(){ return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4); }
function vNotes(){
  const decks = S.decks || [];
  let h = '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div><h1>My notes</h1><p class="muted">Paste your class notes or upload photos of them. Atomi turns them into flashcards and a quiz you can practise any time.</p></div>';
  if(!SAMPLE){
    h += '<p class="notice">Making quizzes from notes uses Claude, so it only works when the app is opened on claude.ai while signed in.</p>';
  } else {
    h += '<form id="notesform" style="display:flex;flex-direction:column;gap:10px">'+
      '<label for="notes-text" style="font-weight:800">Your notes</label>'+
      '<textarea id="notes-text" rows="8" placeholder="Paste your notes here, e.g. everything from today\'s lesson on rates of reaction" style="width:100%;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:12px;padding:10px 12px;font:inherit"'+(NOTES.busy?' disabled':'')+'></textarea>'+
      '<div class="row"><label class="btn btn-sm" for="notes-file" style="cursor:pointer">Upload a text file'+(SAMPLE_IMAGES ? ' or photos' : '')+'</label>'+
      '<input type="file" id="notes-file" multiple accept=".txt,.md,text/plain,text/markdown'+(SAMPLE_IMAGES ? ','+SAMPLE_IMAGES.mediaTypes.join(",") : '')+'" class="sr">'+
      '<span class="small muted" id="notes-files">'+(NOTES.images.length ? NOTES.images.length+' photo'+(NOTES.images.length>1?'s':'')+' added' : (SAMPLE_IMAGES ? 'Text files (.txt, .md) or up to '+SAMPLE_IMAGES.maxCount+' photos of your notes' : 'Text files (.txt, .md)'))+'</span></div>'+
      '<div class="row"><button class="btn btn-primary btn-big" type="submit"'+(NOTES.busy?' disabled':'')+'>'+(NOTES.busy?'Making your cards…':'Make flashcards and quiz')+'</button>'+(NOTES.busy?'<button class="btn" type="button" data-act="notes-stop">Stop</button>':'')+'</div>'+
      (NOTES.msg ? '<p class="small" role="status" style="font-weight:700">'+esc(NOTES.msg)+'</p>' : '')+
      '<p class="small muted">Uses your own Claude account. The first time, Claude asks you to allow it.</p></form>';
  }
  h += '</section>';
  h += '<section class="card" style="display:flex;flex-direction:column;gap:6px"><h2>Your decks ('+decks.length+')</h2>';
  if(!decks.length) h += '<p class="muted">No decks yet. Your first one will appear here.</p>';
  decks.forEach(d => {
    h += '<div class="trow"><div style="display:flex;flex-direction:column;gap:4px"><b>'+esc(d.title)+'</b><span class="small muted">'+d.cards.length+' flashcards · '+d.qs.length+' questions · made '+esc(d.made)+'</span></div><div></div>'+
      '<div class="acts"><button class="btn btn-sm btn-primary" data-act="cards" data-id="'+d.id+'">Flashcards</button><button class="btn btn-sm" data-act="quiz" data-k="deck" data-arg="'+d.id+'">Quiz me</button><button class="btn btn-sm" data-act="game-match" data-deck="'+d.id+'">Match game</button><button class="btn btn-sm" data-act="src-play" data-deck="'+d.id+'">Arcade games</button><button class="btn btn-sm" data-act="deck-del" data-id="'+d.id+'" aria-label="Delete '+esc(d.title)+'">Delete</button></div></div>';
  });
  h += '</section>';
  return h;
}
async function readNoteFiles(files){
  let added = 0;
  for(const f of files){
    if(/^image\//.test(f.type)){
      if(!SAMPLE_IMAGES){ toast("Photos can't be read here. Try a text file."); continue; }
      if(NOTES.images.length >= SAMPLE_IMAGES.maxCount){ toast("That's the most photos for one deck."); break; }
      NOTES.images.push(f); added++;
    } else {
      const t = await f.text().catch(() => "");
      const box = document.getElementById("notes-text");
      if(box && t) box.value = (box.value ? box.value + "\n\n" : "") + t.slice(0, 40000);
    }
  }
  const lbl = document.getElementById("notes-files");
  if(lbl && NOTES.images.length) lbl.textContent = NOTES.images.length + " photo" + (NOTES.images.length>1?"s":"") + " added";
}
async function makeDeck(text){
  if(!SAMPLE) return;
  if(!text.trim() && !NOTES.images.length){ NOTES.msg = "Paste some notes or add a file first."; render(); return; }
  if((S.decks || []).length >= 20){ NOTES.msg = "You have 20 decks, the most you can keep. Delete one to make another."; render(); return; }
  NOTES.busy = true; NOTES.msg = "Atomi is reading your notes. This can take up to a minute."; render();
  NOTES.ctl = new AbortController();
  const prompt = "You are making study material for a Year "+S.level+" (Secondary "+S.level+") science student in a Singapore Integrated Programme school, from the student's own notes. "+
    "Use ONLY the notes below"+(NOTES.images.length ? " and the attached photos of the student's notes" : "")+". "+
    'Reply with only a JSON object of this shape: {"title": string (at most 40 characters, names the topic), "subject": one of "physics", "chemistry", "biology", "practical", "other", '+
    '"flashcards": [{"front": string (a term or short question, at most 80 characters), "back": string (the answer, at most 160 characters)}] (10 to 15 cards), '+
    '"questions": [{"question": string, "correct": string, "wrong": [string, string, string], "explanation": string (at most 200 characters)}] (8 to 10 questions)}. '+
    "Every question is multiple choice with exactly one correct answer and three plausible wrong answers. Everything must be scientifically accurate and use SI units. "+
    'If the notes are not school study material, reply {"error": "a short reason"} instead.\n\nNOTES:\n' + (text.trim() ? text.slice(0, 30000) : "(see the attached photos)");
  try{
    const r = await SAMPLE.json(prompt, {signal:NOTES.ctl.signal, images:NOTES.images.length ? NOTES.images : undefined, cache:false});
    if(!r || typeof r !== "object" || r.error){ NOTES.msg = r && r.error ? "Atomi couldn't make cards: " + String(r.error).slice(0,160) : "Atomi couldn't read that. Try clearer notes."; }
    else {
      const str = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
      const cards = (Array.isArray(r.flashcards) ? r.flashcards : []).map(c => [str(c.front, 120), str(c.back, 240)]).filter(c => c[0] && c[1]).slice(0, 20);
      const qs = (Array.isArray(r.questions) ? r.questions : []).map(q => {
        const w = Array.isArray(q.wrong) ? q.wrong.map(x => str(x, 160)).filter(Boolean) : [];
        return [str(q.question, 300), str(q.correct, 160), w[0], w[1], w[2], str(q.explanation, 300) || "From your notes."];
      }).filter(q => q[0] && q[1] && q[2] && q[3] && q[4] && new Set([q[1],q[2],q[3],q[4]]).size === 4).slice(0, 15);
      if(!cards.length && !qs.length) NOTES.msg = "Atomi couldn't make cards from that. Try adding more detail.";
      else {
        const d = {id:uid6(), title:str(r.title, 40) || "My notes", subject:["physics","chemistry","biology","practical"].includes(r.subject) ? r.subject : "other", made:today(), cards, qs};
        S.decks = [d].concat(S.decks || []);
        const bb = S.boxes || 0; addXp(20); const nb = checkBadges(); const looks = (S.boxes || 0) > bb;
        save(); pushBoard();
        NOTES.images = [];
        NOTES.msg = "Made \"" + d.title + "\": " + cards.length + " flashcards and " + qs.length + " questions. +20 XP" + (nb.length ? ". New badge!" : "") + (looks ? ". You earned a blind box!" : "");
        const box = document.getElementById("notes-text"); if(box) box.value = "";
      }
    }
  }catch(e){
    const code = e && e.code;
    NOTES.msg = code === "cancelled" ? "Stopped." : code === "not_granted" || code === "sampling_disabled" ? "Claude isn't allowed for this app, so notes can't be turned into cards." :
      code === "rate_limited" ? "Atomi needs a short break. Try again in a little while." : code === "image_rejected" ? "One of the photos couldn't be read. Try a different photo." :
      code === "prompt_too_large" ? "Those notes are too long. Try one topic at a time." : "Something went wrong. Try again.";
  }
  NOTES.busy = false; NOTES.ctl = null; render();
}

/* flashcards */
let FC = null;
function openCards(id){
  const d = (S.decks || []).find(x => x.id === id); if(!d || !d.cards.length){ toast("This deck has no flashcards."); return; }
  FC = {id, order:shuffle(d.cards.map((_, i) => i)), i:0, flip:false, known:0, again:[]};
  go("cards");
}
function vCards(){
  const d = (S.decks || []).find(x => x.id === FC.id); if(!d) return '<p>Deck not found.</p>';
  if(FC.i >= FC.order.length){
    return '<section class="card hero"><div style="width:170px">'+me(stageOf(S.xp), "happy")+'</div><div style="display:flex;flex-direction:column;gap:12px"><h1>Deck done!</h1><p>You knew <b>'+FC.known+'</b> of '+FC.order.length+' cards.</p>'+
      '<div class="row">'+(FC.again.length ? '<button class="btn btn-primary" data-act="cards-again">Practise the '+FC.again.length+' you missed</button>' : '')+'<button class="btn" data-act="cards" data-id="'+d.id+'">Start over</button><button class="btn" data-act="quiz" data-k="deck" data-arg="'+d.id+'">Quiz me</button><button class="btn" data-act="go" data-v="notes">Back to notes</button></div></div></section>';
  }
  const c = d.cards[FC.order[FC.i]];
  return '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><span class="tag" style="--cs:var(--accent-soft);--c:var(--accent)">'+esc(d.title)+'</span><span class="small muted">Card '+(FC.i+1)+' of '+FC.order.length+'</span></div>'+
    bar(Math.round(FC.i / FC.order.length * 100))+
    '<button class="flash'+(FC.flip?' flipped':'')+'" data-act="cards-flip" aria-label="'+(FC.flip?'Answer showing. Tap to see the question':'Question showing. Tap to see the answer')+'"><span class="eyebrow">'+(FC.flip?'Answer':'Question')+'</span><span class="flash-text">'+esc(FC.flip ? c[1] : c[0])+'</span><span class="small muted">'+(FC.flip?'':'Tap to flip')+'</span></button>'+
    (FC.flip ? '<div class="row"><button class="btn btn-primary btn-big" data-act="cards-know">I knew it</button><button class="btn btn-big" data-act="cards-miss">Still learning</button></div>' : '<div class="row"><button class="btn btn-primary btn-big" data-act="cards-flip">Show answer</button></div>')+
    '</section><div><button class="btn btn-sm" data-act="go" data-v="notes">Back to notes</button></div>';
}

/* ---------- mini games (all science) ---------- */
const PAIRS = {
  phy:[["Speed","distance ÷ time"],["Acceleration","change in velocity ÷ time"],["Force","mass × acceleration"],["Weight","mass × g"],["Density","mass ÷ volume"],["Pressure","force ÷ area"],["Moment","force × perpendicular distance"],["Power","work done ÷ time"],["Wave speed","frequency × wavelength"],["Resistance","voltage ÷ current"],["Kinetic energy","½mv²"],["Charge","current × time"]],
  chem:[["Proton","+1 charge, in the nucleus"],["Electron","−1 charge, in shells"],["Isotopes","same protons, different neutrons"],["Ionic bond","electrons transferred"],["Covalent bond","shared pair of electrons"],["Oxidation","loss of electrons"],["Reduction","gain of electrons"],["Catalyst","lowers activation energy"],["Alkane","only C–C single bonds"],["Alkene","has a C=C double bond"],["Acid","H⁺ ions in water"],["Mole","6.02 × 10²³ particles"]],
  bio:[["Mitochondrion","aerobic respiration"],["Ribosome","makes proteins"],["Chloroplast","photosynthesis"],["Osmosis","water across a partially permeable membrane"],["Enzyme","biological catalyst"],["Xylem","carries water up the plant"],["Phloem","carries sugars"],["Insulin","lowers blood glucose"],["Alveoli","gas exchange in the lungs"],["Glomerulus","ultrafiltration"],["Allele","a version of a gene"],["Mitosis","two identical cells"]],
  prac:[["Pipette","measures exactly 25.0 cm³"],["Burette","adds liquid in a titration"],["Independent variable","what you change"],["Dependent variable","what you measure"],["Anomaly","a result that doesn't fit"],["Zero error","reads non-zero when empty"],["Parallax error","reading a scale at an angle"],["Iodine","starch turns blue-black"],["Benedict's","reducing sugar, brick-red"],["Biuret","protein turns violet"],["Limewater","turns milky with CO₂"],["Glowing splint","relights in oxygen"]]
};
const ELEMENTS = [["H","Hydrogen",1,1],["He","Helium",4,2],["Li","Lithium",7,3],["C","Carbon",12,6],["N","Nitrogen",14,7],["O","Oxygen",16,8],["F","Fluorine",19,9],["Ne","Neon",20,10],["Na","Sodium",23,11],["Mg","Magnesium",24,12],["Al","Aluminium",27,13],["Si","Silicon",28,14],["P","Phosphorus",31,15],["S","Sulfur",32,16],["Cl","Chlorine",35,17],["Ar","Argon",40,18],["K","Potassium",39,19],["Ca","Calcium",40,20]];
const IONS = {Li:1,Na:1,K:1,Mg:2,Ca:2,Al:3,O:-2,S:-2,F:-1,Cl:-1,N:-3};
let GAME = null;

function vGames(){ return vArcadeHub(); }
function vGamesOld(){
  const best = S.best || {};
  const card = (act, title, sci, desc, bestTxt, extra) => '<div class="card game"><div><h2>'+title+'</h2><span class="tag" style="--cs:var(--accent-soft);--c:var(--accent)">'+sci+'</span></div><p class="muted">'+desc+'</p>'+(bestTxt ? '<p class="small"><b>Your best:</b> '+bestTxt+'</p>' : '')+(extra || '<button class="btn btn-primary" data-act="'+act+'">Play</button>')+'</div>';
  let h = '<section style="display:flex;flex-direction:column;gap:6px"><h1>Games</h1><p class="muted">Science mini games. Every game earns XP for Atomi.</p></section><div class="grid g2">';
  h += card("", "Formula Match", "Terms, formulas, definitions", "Flip tiles to match science terms with their meanings and formulas. Fewer moves, more XP.", best.match ? best.match + " moves" : "",
    '<div class="tabs">'+Object.keys(PAIRS).map(s => '<button data-act="game-match" data-s="'+s+'">'+SUBJ[s].name+'</button>').join("")+'</div>');
  h += card("game-atom", "Atom Builder", "Atomic structure", "Build atoms and ions: count the protons, neutrons and electrons from the proton and nucleon numbers.", best.atom ? best.atom + " / 6 correct" : "");
  h += card("", "Speed Blitz", "60-second challenge", "Answer as many science questions as you can in 60 seconds. Streaks score double.", best.blitz ? best.blitz + " points" : "",
    '<div class="tabs"><button data-act="game-blitz" data-s="all">All</button>'+Object.keys(SUBJ).map(s => '<button data-act="game-blitz" data-s="'+s+'">'+SUBJ[s].name+'</button>').join("")+'</div>');
  h += card("go-battle", "Quiz Battle", "Play with friends", "Race your friends live on the same science questions. Share a room code and see everyone's score update as you play.", (S.wins ? S.wins + " win" + (S.wins>1?"s":"") : ""),
    '<button class="btn btn-primary" data-act="go" data-v="battle">Battle friends</button>');
  h += '</div><section class="card row between"><div><h2>Weekly leaderboard</h2><p class="muted">See how your XP compares with your friends this week.</p></div><button class="btn" data-act="go" data-v="board">Open leaderboard</button></section>';
  return h;
}

/* Formula Match (memory pairs) */
function startMatch(s, deckId){
  let pairs;
  if(deckId){ const d = (S.decks || []).find(x => x.id === deckId); if(!d || d.cards.length < 3){ toast("This deck needs at least 3 flashcards."); return; } pairs = shuffle(d.cards).slice(0, 6).map(c => [c[0].slice(0, 60), c[1].slice(0, 70)]); }
  else pairs = shuffle(PAIRS[s] || PAIRS.phy).slice(0, 6);
  const tiles = shuffle(pairs.flatMap((p, i) => [{p:i, side:0, text:p[0]}, {p:i, side:1, text:p[1]}]));
  GAME = {type:"match", s:deckId ? "notes" : s, title:deckId ? "Your notes" : SUBJ[s].name, tiles, open:[], done:new Set(), moves:0, start:Date.now(), lock:false, result:null};
  go("game");
}
function matchTap(i){
  const G = GAME; if(!G || G.lock || G.done.has(G.tiles[i].p) || G.open.includes(i)) return;
  G.open.push(i);
  if(G.open.length === 2){
    G.moves++;
    const [a, b] = G.open.map(k => G.tiles[k]);
    if(a.p === b.p && a.side !== b.side){ G.done.add(a.p); G.open = []; if(G.done.size * 2 === G.tiles.length) finishMatch(); }
    else { G.lock = true; setTimeout(() => { if(GAME === G){ G.open = []; G.lock = false; render(); } }, 900); }
  }
  render();
}
function finishMatch(){
  const G = GAME, pairs = G.tiles.length / 2;
  const xp = 20 + Math.max(0, (pairs * 3 - G.moves)) * 5;
  G.result = awardGame(xp, () => { S.best = S.best || {}; if(!S.best.match || G.moves < S.best.match) S.best.match = G.moves; });
  G.xp = xp; G.secs = Math.round((Date.now() - G.start) / 1000);
}
function vMatch(){
  const G = GAME;
  let h = '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><div><h1>Formula Match</h1><p class="muted">'+esc(G.title)+' · match each term with its meaning</p></div><div class="stats"><span class="chip"><b>'+G.moves+'</b> moves</span><span class="chip"><b>'+G.done.size+'</b> / '+(G.tiles.length/2)+' pairs</span></div></div>';
  if(G.result){
    h += '<div class="row" style="flex-wrap:nowrap"><div style="width:110px;flex:none">'+me(stageOf(S.xp), "happy")+'</div><div style="display:flex;flex-direction:column;gap:8px"><h2>All matched in '+G.moves+' moves!</h2><p><b>+'+G.xp+' XP</b> · '+G.secs+' seconds</p>'+rewardHtml(G.result)+'</div></div>'+
      '<div class="row"><button class="btn btn-primary" data-act="game-match" data-s="'+(G.s==="notes"?"phy":G.s)+'">Play again</button><button class="btn" data-act="go" data-v="games">All games</button></div>';
  }
  h += '<div class="match-grid">'+G.tiles.map((t, i) => {
    const shown = G.open.includes(i) || G.done.has(t.p), done = G.done.has(t.p);
    return '<button class="mtile'+(shown?' up':'')+(done?' done':'')+(t.side?' def':'')+'" data-act="match" data-i="'+i+'"'+(done?' disabled':'')+' aria-label="'+(shown?esc(t.text):'Hidden tile')+'">'+(shown ? esc(t.text) : '<span aria-hidden="true">?</span>')+'</button>';
  }).join("")+'</div></section>';
  return h;
}

/* Atom Builder */
function startAtom(){
  const rounds = shuffle(ELEMENTS).slice(0, 6).map(e => {
    const ion = Math.random() < 0.4 && IONS[e[0]] !== undefined ? IONS[e[0]] : 0;
    return {sym:e[0], name:e[1], A:e[2], Z:e[3], charge:ion};
  });
  GAME = {type:"atom", rounds, i:0, p:0, n:0, e:0, checked:null, score:0, result:null};
  go("game");
}
function atomCharge(c){ if(!c) return ""; const m = Math.abs(c) === 1 ? "" : String(Math.abs(c)); return m + (c > 0 ? "+" : "−"); }
function vAtom(){
  const G = GAME;
  if(G.result){
    return '<section class="card hero"><div style="width:170px">'+me(stageOf(S.xp), "happy")+'</div><div style="display:flex;flex-direction:column;gap:10px"><h1>Atom Builder</h1><div class="score">'+G.score+' / '+G.rounds.length+'</div><p><b>+'+G.xp+' XP</b></p>'+rewardHtml(G.result)+
      '<div class="row"><button class="btn btn-primary" data-act="game-atom">Play again</button><button class="btn" data-act="learn" data-arg="chem-atomic">Learn atomic structure</button><button class="btn" data-act="go" data-v="games">All games</button></div></div></section>';
  }
  const r = G.rounds[G.i], ok = G.checked;
  const ctr = (k, label) => '<div class="counter"><span class="small muted">'+label+'</span><div class="row" style="gap:8px;flex-wrap:nowrap"><button class="btn btn-sm" data-act="atom-adj" data-k="'+k+'" data-d="-1" aria-label="One fewer '+label.toLowerCase()+'"'+(ok?' disabled':'')+'>−</button><b class="ctr-num">'+G[k]+'</b><button class="btn btn-sm" data-act="atom-adj" data-k="'+k+'" data-d="1" aria-label="One more '+label.toLowerCase()+'"'+(ok?' disabled':'')+'>+</button><button class="btn btn-sm" data-act="atom-adj" data-k="'+k+'" data-d="10" aria-label="Ten more '+label.toLowerCase()+'"'+(ok?' disabled':'')+'>+10</button></div></div>';
  // a little nucleus + shells picture that follows the counts
  const shells = [], ec = Math.max(0, G.e); let left = ec; [2, 8, 8, 8].forEach(cap => { if(left > 0){ shells.push(Math.min(cap, left)); left -= cap; } });
  let svg = '<svg viewBox="0 0 200 200" role="img" aria-label="Your atom: '+G.p+' protons, '+G.n+' neutrons, '+G.e+' electrons" style="width:200px;max-width:100%">';
  shells.forEach((cnt, si) => { const R = 40 + si * 22; svg += '<circle cx="100" cy="100" r="'+R+'" fill="none" stroke="var(--line)" stroke-width="2"/>'; for(let j=0;j<cnt;j++){ const a = j / cnt * Math.PI * 2 - Math.PI/2; svg += '<circle cx="'+(100+R*Math.cos(a))+'" cy="'+(100+R*Math.sin(a))+'" r="5" fill="var(--phy)"/>'; } });
  svg += '<circle cx="100" cy="100" r="26" fill="var(--panel)" stroke="var(--line)"/><text x="100" y="97" text-anchor="middle" font-size="11" font-weight="800" fill="var(--chem)">'+G.p+' p</text><text x="100" y="112" text-anchor="middle" font-size="11" font-weight="800" fill="var(--muted)">'+G.n+' n</text></svg>';
  let h = '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><div><h1>Atom Builder</h1><p class="muted">Round '+(G.i+1)+' of '+G.rounds.length+' · score '+G.score+'</p></div>'+bar(Math.round(G.i / G.rounds.length * 100)).replace('class="bar"','class="bar" style="width:160px"')+'</div>'+
    '<div class="row" style="align-items:flex-start;gap:24px"><div class="nuclide" aria-label="'+r.name+(r.charge?' ion':' atom')+'"><span class="nA">'+r.A+'</span><span class="nZ">'+r.Z+'</span><span class="nS">'+r.sym+'<sup>'+atomCharge(r.charge)+'</sup></span><span class="small muted" style="grid-column:1/-1">'+r.name+(r.charge ? ' ion' : ' atom')+'</span></div>'+svg+'</div>'+
    '<p>Set how many of each particle this '+(r.charge ? 'ion' : 'atom')+' has.</p><div class="row" style="gap:18px">'+ctr("p","Protons")+ctr("n","Neutrons")+ctr("e","Electrons")+'</div>';
  if(ok){
    const right = ok === "right", eNeed = r.Z - r.charge;
    h += '<div class="feedback '+(right?'good':'bad')+'"><h3>'+(right?'Correct, +10 XP':'Not quite')+'</h3><p>Protons = proton number = '+r.Z+'. Neutrons = nucleon number − proton number = '+r.A+' − '+r.Z+' = '+(r.A-r.Z)+'. Electrons = '+r.Z+(r.charge ? (r.charge>0?' − ':' + ')+Math.abs(r.charge)+' (a '+Math.abs(r.charge)+(r.charge>0?'+':'−')+' ion has '+(r.charge>0?'lost':'gained')+' '+Math.abs(r.charge)+')' : ' (a neutral atom)')+' = '+eNeed+'.</p></div>'+
      '<div><button class="btn btn-primary btn-big" data-act="atom-next" id="next">'+(G.i < G.rounds.length - 1 ? 'Next element' : 'See results')+'</button></div>';
  } else h += '<div><button class="btn btn-primary btn-big" data-act="atom-check">Check my atom</button></div>';
  h += '</section><div><button class="btn btn-sm" data-act="go" data-v="games">Quit game</button></div>';
  return h;
}

/* Speed Blitz */
function startBlitz(s, given){
  const ts = s === "all" ? TOPICS.filter(isOn) : TOPICS.filter(t => t.s === s);
  const pool = given && given.length ? given : shuffle(poolFor(ts.length ? ts : TOPICS));
  GAME = {type:"blitz", s, pool, i:0, q:makeQ(pool[0]), score:0, streak:0, correct:0, wrong:0, ends:Date.now() + 60000, flash:null, result:null, timer:null};
  GAME.timer = setInterval(() => { if(!GAME || GAME.type !== "blitz"){ return; } if(Date.now() >= GAME.ends) finishBlitz(); else { const el = document.getElementById("blitz-time"); if(el) el.textContent = Math.ceil((GAME.ends - Date.now())/1000) + "s"; const b = document.getElementById("blitz-bar"); if(b) b.style.width = Math.max(0, (GAME.ends - Date.now()) / 600) + "%"; } }, 250);
  go("game");
}
function blitzAnswer(k){
  const G = GAME; if(!G || G.result) return;
  const ok = k === G.q.ans;
  const ts = tstate(G.q.t.id); ts.a.push(ok ? 1 : 0); if(ts.a.length > 10) ts.a.shift();
  S.answered++; if(ok) S.correct++;
  if(ok){ G.streak++; G.correct++; G.score += G.streak >= 3 ? 2 : 1; G.flash = "good"; }
  else { G.streak = 0; G.wrong++; G.flash = "bad"; }
  G.i++; if(G.i >= G.pool.length) G.i = 0;
  G.q = makeQ(G.pool[G.i]);
  render();
}
function finishBlitz(){
  const G = GAME; if(!G || G.result) return;
  clearInterval(G.timer);
  G.xp = G.correct * 5 + 10;
  G.result = awardGame(G.xp, () => { S.best = S.best || {}; if(!S.best.blitz || G.score > S.best.blitz) S.best.blitz = G.score; });
  render();
}
function vBlitz(){
  const G = GAME;
  if(G.result){
    return '<section class="card hero"><div style="width:170px">'+me(stageOf(S.xp), "happy")+'</div><div style="display:flex;flex-direction:column;gap:10px"><h1>Time\'s up!</h1><div class="score">'+G.score+' points</div><p>'+G.correct+' correct, '+G.wrong+' wrong · <b>+'+G.xp+' XP</b></p>'+(S.best && S.best.blitz === G.score && G.score > 0 ? '<p class="bubble">New best score!</p>' : '')+rewardHtml(G.result)+
      '<div class="row"><button class="btn btn-primary" data-act="game-blitz" data-s="'+G.s+'">Play again</button><button class="btn" data-act="go" data-v="games">All games</button></div></div></section>';
  }
  const q = G.q, left = Math.max(0, Math.ceil((G.ends - Date.now())/1000));
  return '<section class="card s-'+q.t.s+'" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><div class="stats"><span class="chip"><b>'+G.score+'</b> points</span><span class="chip'+(G.streak>=3?' done':'')+'"><b>'+G.streak+'</b> streak'+(G.streak>=3?' · double points':'')+'</span></div><span class="chip"><b id="blitz-time">'+left+'s</b></span></div>'+
    '<div class="bar"><i id="blitz-bar" style="width:'+Math.max(0,(G.ends-Date.now())/600)+'%;background:var(--star)"></i></div>'+
    (G.flash ? '<p class="small" style="font-weight:800;color:var(--'+G.flash+')">'+(G.flash==="good"?'Correct!':'Wrong, keep going!')+'</p>' : '')+
    '<span class="tag">'+esc(subjName(q.t.s))+' · '+esc(q.t.name)+'</span><p class="qtext">'+esc(q.text)+'</p><div class="opts">'+
    q.opts.map((o,k) => '<button class="opt" data-act="blitz-ans" data-k="'+k+'"><span class="k">'+"ABCD"[k]+'</span><span>'+esc(o)+'</span></button>').join("")+'</div></section>'+
    '<div><button class="btn btn-sm" data-act="blitz-end">End game</button></div>';
}

function vGame(){
  if(!GAME) return vGames();
  if(GAME.type === "arcade") return vArcade();
  if(GAME.type === "story") return vStory();
  if(GAME.type === "match") return vMatch();
  if(GAME.type === "atom") return vAtom();
  if(GAME.type === "blitz") return vBlitz();
  return vGames();
}

/* ---------- Quiz Battle: play live with friends (room) ---------- */
let BT = null;
const BATTLE_N = 8;
function battleCode(){ const a = "abcdefghjkmnpqrstuvwxyz23456789"; let c = ""; for(let i=0;i<4;i++) c += a[Math.floor(Math.random()*a.length)]; return c; }
async function battleEnter(code, host){
  if(!ROOM){ toast("Battles need the app open on claude.ai."); return; }
  code = String(code || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
  if(code.length < 3){ toast("Enter the room code your friend shared."); return; }
  if(BT) await battleLeave(true);
  let room;
  try{ room = await ROOM.join("battle-" + code); }
  catch(e){ toast(e && e.code === "not_permitted" ? "You need Contributor access to play battles. Ask the app's owner." : "Couldn't join that room. Try again."); return; }
  BT = {code, host, room, phase:"wait", mode:host ? (BT_PREF.mode || "classic") : "classic", s:"all", src:null, startAt:0, qids:null, i:0, score:0, q:null, peers:[], picked:null, rewarded:false, result:null};
  room.onPeers(ch => {
    if(!BT || BT.room !== room) return;
    BT.peers = ch.peers;
    if(BT.host && BT.qids && ch.joined.length) room.emit("battle", battleStartMsg()).catch(() => {});
    if(view === "battle") render();
  });
  room.on("battle", msg => {
    if(!BT || BT.room !== room) return;
    const d = msg.data || {};
    if((d.type === "steal" || d.type === "swap") && !msg.sameTab){ arcOnMessage(d); return; }
    if(BT.qids) return;
    if(d.type !== "start" || !Array.isArray(d.qids)) return;
    const rd = remoteDeckFrom(d.deck); if(d.deck && !rd) return;
    if(rd) REMOTE_DECK = rd;
    const src = rd ? {s:"notes", topics:[], deck:"remote"} : srcClean({s:typeof d.s === "string" ? d.s : "all", topics:d.topics});
    BT.src = src;
    if(ARC_MODES[d.mode]){
      const left = Math.max(10, Math.min(300, Number(d.left) || 180));
      BT.qids = ["x"]; BT.mode = d.mode; BT.phase = "arcade";
      startArcade(d.mode, src, true, left);
      return;
    }
    const qids = d.qids.filter(id => typeof id === "string" && getQ(id) && (id.startsWith("rdeck#") || QMAP[id])).slice(0, 12);
    if(!qids.length) return;
    BT.qids = qids; BT.s = typeof d.s === "string" ? d.s : "all"; BT.phase = "play"; BT.i = 0; BT.q = makeQ(qids[0]);
    if(view === "battle") render();
  });
  battlePresence();
  go("battle");
}
function battlePresence(){
  if(!BT) return;
  BT.room.presence({nick:String(S.name || "Player").slice(0, 20), stage:stageOf(S.xp), look:cleanLook(S.look), score:BT.score, i:BT.i, n:BT.qids ? BT.qids.length : 0, done:BT.phase === "done", host:BT.host}).catch(() => {});
}
async function battleLeave(silent){
  if(!BT) return;
  const r = BT.room; BT = null;
  if(ROOM) ROOM.presence({invite:null}).catch(() => {});
  try{ await r.leave(); }catch(e){}
  if(!silent) go("games");
}
function battleStartMsg(){
  const src = BT.hostSrc || srcClean(SRC), base = {type:"start", s:src.s, topics:src.topics};
  if(BT.deckPack) base.deck = BT.deckPack;
  if(ARC_MODES[BT.mode]) return Object.assign(base, {mode:BT.mode, qids:[], left:Math.max(10, Math.round((BT.startAt + 180000 - Date.now()) / 1000))});
  return Object.assign(base, {qids:BT.sentQids || []});
}
function battleStart(){
  if(!BT || !BT.host || BT.qids) return;
  BT.hostSrc = srcClean(SRC);
  if(SRC_NOTES && !BT.hostSrc.deck){ toast("Pick one of your notes decks first."); return; }
  BT.deckPack = BT.hostSrc.deck ? packDeck(BT.hostSrc.deck) : null;
  if(BT.hostSrc.deck && !BT.deckPack){ toast("That deck has no questions to share."); return; }
  if(!ARC_MODES[BT.mode]){
    BT.sentQids = BT.deckPack ? shuffle(BT.deckPack.qs.map((_, i) => "rdeck#" + i)).slice(0, BATTLE_N) : srcPool(BT.hostSrc).slice(0, BATTLE_N);
    BT.room.emit("battle", battleStartMsg()).catch(e => toast(e && e.code === "not_permitted" ? "You need Contributor access to start battles." : "Couldn't start. Try again."));
    return;
  }
  if(ARC_MODES[BT.mode]){ BT.startAt = Date.now(); BT.room.emit("battle", battleStartMsg()).catch(e => toast(e && e.code === "not_permitted" ? "You need Contributor access to start battles." : "Couldn't start. Try again.")); return; }
  const ts = BT.s === "all" ? TOPICS.filter(isOn) : TOPICS.filter(t => t.s === BT.s && isOn(t));
  const qids = shuffle(poolFor(ts.length ? ts : TOPICS)).slice(0, BATTLE_N);
  BT.room.emit("battle", {type:"start", qids, s:BT.s}).catch(e => toast(e && e.code === "not_permitted" ? "You need Contributor access to start battles." : "Couldn't start. Try again."));
}
function battleAnswer(k){
  if(!BT || BT.phase !== "play" || BT.picked !== null) return;
  BT.picked = k;
  const ok = k === BT.q.ans;
  if(ok) BT.score += 10;
  battlePresence(); render();
  setTimeout(() => {
    if(!BT) return;
    BT.picked = null; BT.i++;
    if(BT.i >= BT.qids.length){ BT.phase = "done"; battleReward(); }
    else BT.q = makeQ(BT.qids[BT.i]);
    battlePresence(); if(view === "battle") render();
  }, 1100);
}
function battlePlayers(){
  return (BT ? BT.peers : []).filter(p => p.presence && typeof p.presence.nick === "string").map(p => ({
    me:p.isMe && p.sameTab, nick:String(p.presence.nick).slice(0, 20), stage:Math.max(0, Math.min(4, Number(p.presence.stage) || 0)),
    look:p.presence.look, score:Math.max(0, Math.min(999, Number(p.presence.score) || 0)), i:Math.max(0, Math.min(20, Number(p.presence.i) || 0)), done:!!p.presence.done, host:!!p.presence.host
  })).sort((a, b) => b.score - a.score);
}
function battleReward(){
  if(!BT || BT.rewarded) return;
  BT.rewarded = true;
  const correct = BT.score / 10;
  BT.xp = correct * 10 + 20;
  BT.result = awardGame(BT.xp);
}
function battleCheckWin(){
  if(!BT || BT.phase !== "done" || BT.winChecked) return;
  const ps = battlePlayers();
  if(ps.length < 2 || !ps.every(p => p.done)) return;
  BT.winChecked = true;
  if(ps[0].me && ps[0].score > (ps[1] ? ps[1].score : -1)){
    BT.won = true;
    const r = awardGame(30, () => { S.wins = (S.wins || 0) + 1; });
    BT.result = {badges:BT.result.badges.concat(r.badges), boxes:(BT.result.boxes || 0) + r.boxes, looks:[]};
    BT.xp += 30;
  }
}
function vBattle(){
  if(!ROOM){
    return '<section class="card" style="display:flex;flex-direction:column;gap:12px"><h1>Quiz Battle</h1><p class="notice">Live battles work when the app is opened on claude.ai and shared with your friends (as Contributors). Right now you can still play the other games on your own.</p><div><button class="btn" data-act="go" data-v="games">All games</button></div></section>';
  }
  if(!BT){
    return '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div><h1>Quiz Battle</h1><p class="muted">Race your friends on the same 8 science questions. Everyone sees the scores live.</p></div>'+
      '<div class="grid g2"><div class="card" style="display:flex;flex-direction:column;gap:10px;background:var(--panel)"><h2>Start a battle</h2><p class="small muted">Get a room code to share with your friends.</p><div><button class="btn btn-primary" data-act="bt-create">Create room</button></div></div>'+
      '<form id="btjoin" class="card" style="display:flex;flex-direction:column;gap:10px;background:var(--panel)"><h2>Join a battle</h2><label for="bt-code" class="small" style="font-weight:800">Room code</label><input type="text" id="bt-code" maxlength="8" placeholder="e.g. k7qm" autocomplete="off" style="text-transform:lowercase"><div><button class="btn btn-primary" type="submit">Join</button></div></form></div>'+
      '<p class="small muted">Everyone in a battle needs the app open at the same time.</p></section>';
  }
  const ps = battlePlayers();
  const board = '<div class="bt-board">'+ps.map((p, idx) => '<div class="bt-row'+(p.me?' me':'')+'"><span class="bt-rank">'+(idx+1)+'</span><span style="width:40px;flex:none">'+atomi(p.stage, p.done ? "happy" : "ready", {look:p.look})+'</span><span class="bt-name">'+esc(p.nick)+(p.me?' (you)':'')+(p.host?' <span class="small muted">host</span>':'')+'</span>'+
    (BT.qids ? '<span class="bt-prog">'+bar(Math.round(Math.min(p.i, BT.qids.length) / BT.qids.length * 100))+'</span>' : '')+'<b class="bt-score">'+p.score+'</b></div>').join("")+'</div>';
  let h = '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div class="row between"><div><h1>Quiz Battle</h1><p class="muted">Room code <b class="code">'+esc(BT.code)+'</b> · '+ps.length+' player'+(ps.length===1?'':'s')+'</p></div><button class="btn btn-sm" data-act="bt-leave">Leave room</button></div>';
  if(BT.phase === "wait"){
    h += '<p class="bubble">Share the code <b>'+esc(BT.code)+'</b> with your friends. '+(BT.host ? 'Pick a subject and press Start when everyone has joined.' : 'Waiting for the host to start…')+'</p>';
    const mName = ARC_MODES[BT.mode] ? ARC_MODES[BT.mode].name : "Classic Quiz Battle";
    if(BT.host) h += '<div><h3 style="margin-bottom:8px">Game mode</h3><div class="tabs" role="group" aria-label="Game mode">'+[["rush","Stardust Rush"],["gold","Orbit Gold"],["race","Rocket Race"],["classic","Classic"]].map(([k, n]) => '<button data-act="bt-mode" data-m="'+k+'" aria-pressed="'+(BT.mode===k)+'">'+n+'</button>').join("")+'</div><p class="small muted" style="margin-top:6px">'+esc(ARC_MODES[BT.mode] ? ARC_MODES[BT.mode].desc : "Everyone answers the same 8 questions. Highest score wins.")+'</p></div><div><h3 style="margin-bottom:8px">Questions from</h3>'+srcPicker()+(SRC_NOTES ? '<p class="small muted">Your friends get a copy of the questions from your deck for this game.</p>' : '')+'</div><div><button class="btn btn-primary btn-big" data-act="bt-start">Start '+esc(mName)+'</button></div>';
    h += board;
  } else if(BT.phase === "play"){
    const q = BT.q, pk = BT.picked;
    h += '<div class="row between"><span class="tag s-'+q.t.s+'">'+esc(subjName(q.t.s))+' · '+esc(q.t.name)+'</span><span class="small muted">Question '+(BT.i+1)+' of '+BT.qids.length+' · your score '+BT.score+'</span></div>'+
      '<p class="qtext">'+esc(q.text)+'</p><div class="opts">'+q.opts.map((o,k) => {
        let c = "opt"; if(pk !== null){ if(k === q.ans) c += " right"; else if(k === pk) c += " wrong"; }
        return '<button class="'+c+'" data-act="bt-ans" data-k="'+k+'"'+(pk!==null?' disabled':'')+'><span class="k">'+"ABCD"[k]+'</span><span>'+esc(o)+'</span></button>';
      }).join("")+'</div><h3>Live scores</h3>'+board;
  } else {
    battleCheckWin();
    const allDone = ps.length > 1 && ps.every(p => p.done);
    h += '<div class="row" style="flex-wrap:nowrap"><div style="width:110px;flex:none">'+me(stageOf(S.xp), "happy")+'</div><div style="display:flex;flex-direction:column;gap:8px"><h2>'+(BT.won ? 'You won the battle!' : allDone ? 'Battle over!' : 'You finished! Waiting for the others…')+'</h2><p>Your score: <b>'+BT.score+'</b> · <b>+'+(BT.xp||0)+' XP</b>'+(BT.won?' (includes +30 for winning)':'')+'</p>'+(BT.result ? rewardHtml(BT.result) : '')+'</div></div>'+board+
      '<div class="row"><button class="btn btn-primary" data-act="bt-again">New battle</button><button class="btn" data-act="go" data-v="games">All games</button></div>';
  }
  h += '</section>';
  return h;
}

/* ---------- event wiring for everything in this file ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b || b.tagName === "INPUT") return;
  const a = b.dataset.act;
  if(a === "exp-s"){ EXP.s = b.dataset.s; render(); }
  else if(a === "exp-y"){ EXP.y = b.dataset.y; render(); }
  else if(a === "qb-s"){ QB.s = b.dataset.s; QB.topics = []; render(); }
  else if(a === "qb-t"){ const t = b.dataset.t; QB.topics = QB.topics.includes(t) ? QB.topics.filter(x => x !== t) : QB.topics.concat(t); render(); }
  else if(a === "qb-n"){ QB.n = Number(b.dataset.n); render(); }
  else if(a === "qb-go"){ startQuiz("custom", {s:QB.s, topics:QB.topics.slice(), n:QB.n}); }
  else if(a === "notes-stop"){ if(NOTES.ctl) NOTES.ctl.abort(); }
  else if(a === "deck-del"){ const d = (S.decks||[]).find(x => x.id === b.dataset.id); if(d && b.dataset.confirm === "1"){ S.decks = S.decks.filter(x => x.id !== d.id); save(); render(); toast("Deck deleted"); } else if(d){ b.dataset.confirm = "1"; b.textContent = "Tap again to delete"; } }
  else if(a === "cards") openCards(b.dataset.id);
  else if(a === "cards-flip"){ FC.flip = !FC.flip; render(); }
  else if(a === "cards-know" || a === "cards-miss"){ if(a === "cards-know") FC.known++; else FC.again.push(FC.order[FC.i]); FC.i++; FC.flip = false; render(); }
  else if(a === "cards-again"){ FC = {id:FC.id, order:shuffle(FC.again), i:0, flip:false, known:0, again:[]}; render(); }
  else if(a === "game-match") startMatch(b.dataset.s, b.dataset.deck);
  else if(a === "match") matchTap(Number(b.dataset.i));
  else if(a === "game-atom") startAtom();
  else if(a === "atom-adj"){ const G = GAME; if(G && !G.checked){ G[b.dataset.k] = Math.max(0, Math.min(40, G[b.dataset.k] + Number(b.dataset.d))); render(); } }
  else if(a === "atom-check"){ const G = GAME, r = G.rounds[G.i]; const right = G.p === r.Z && G.n === r.A - r.Z && G.e === r.Z - r.charge; G.checked = right ? "right" : "wrong"; if(right) G.score++; render(); const nb = document.getElementById("next"); if(nb) nb.focus(); }
  else if(a === "atom-next"){ const G = GAME; G.i++; G.p = G.n = G.e = 0; G.checked = null; if(G.i >= G.rounds.length){ G.xp = G.score * 10 + 10; G.result = awardGame(G.xp, () => { S.best = S.best || {}; if(!S.best.atom || G.score > S.best.atom) S.best.atom = G.score; }); } render(); }
  else if(a === "game-blitz") startBlitz(b.dataset.s);
  else if(a === "blitz-ans") blitzAnswer(Number(b.dataset.k));
  else if(a === "blitz-end") finishBlitz();
  else if(a === "bt-create") battleEnter(battleCode(), true);
  else if(a === "bt-leave") battleLeave(false);
  else if(a === "bt-s"){ if(BT){ BT.s = b.dataset.s; render(); } }
  else if(a === "bt-start") battleStart();
  else if(a === "bt-mode"){ if(BT && BT.host && !BT.qids){ BT.mode = b.dataset.m; BT_PREF.mode = BT.mode; render(); } }
  else if(a === "bt-ans") battleAnswer(Number(b.dataset.k));
  else if(a === "bt-again"){ battleLeave(true).then(() => go("battle")); }
});
document.addEventListener("input", e => {
  if(e.target.id === "exp-q"){ EXP.q = e.target.value; const l = document.getElementById("exp-list"); if(l) l.innerHTML = exploreList(); }
});
document.addEventListener("change", e => {
  if(e.target.id === "notes-file" && e.target.files) readNoteFiles([...e.target.files]);
});
document.addEventListener("submit", e => {
  if(e.target.id === "notesform"){ e.preventDefault(); const t = document.getElementById("notes-text"); makeDeck(t ? t.value : ""); }
  else if(e.target.id === "btjoin"){ e.preventDefault(); battleEnter(document.getElementById("bt-code").value, false); }
});

/* ---------- Friends: add by private code, see stats, invite to battles ---------- */
let LOBBY = [];            // everyone with the app open right now (room lobby)
let FR = {msg:"", busy:false};
const FC_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function ensureFriendCode(){
  if(typeof S.friendCode === "string" && /^[A-Z2-9]{6}$/.test(S.friendCode)) return S.friendCode;
  let c = ""; for(let i=0;i<6;i++) c += FC_CHARS[Math.floor(Math.random() * FC_CHARS.length)];
  S.friendCode = c; save(); return c;
}
function friendList(){ return Array.isArray(S.friends) ? S.friends.filter(f => f && typeof f.id === "string") : []; }
function playerDoc(id){ return BOARD.find(p => p.id === id) || null; }
function onlineIds(){ return new Set(LOBBY.filter(p => p.by && !p.isMe).map(p => p.by)); }
function lobbyWatch(){
  if(!ROOM || ROOM._atomiWatched) return;
  try{
    ROOM.onPeers(ch => { LOBBY = ch.peers; if(["friends","home","explore","games","notes","dress","me","board"].includes(view)) render(); });
  }catch(e){}
}
function pendingInvites(){
  if(!ROOM || !UID) return [];
  const mine = new Set(friendList().map(f => f.id));
  const now = Date.now();
  return LOBBY.filter(p => !p.isMe && p.by && mine.has(p.by) && p.presence && p.presence.invite &&
    Array.isArray(p.presence.invite.to) && p.presence.invite.to.includes(UID) &&
    typeof p.presence.invite.code === "string" && /^[a-z0-9]{3,8}$/.test(p.presence.invite.code) &&
    now - Number(p.presence.invite.at || 0) < 10 * 60 * 1000 && !(BT && BT.code === p.presence.invite.code))
    .map(p => ({from:(friendList().find(f => f.id === p.by) || {}).nick || String(p.presence.nick || "A friend").slice(0, 20), code:p.presence.invite.code}));
}
function invitesBanner(){
  const inv = pendingInvites();
  if(!inv.length) return "";
  return inv.slice(0, 3).map(i => '<section class="card invite row between"><p><b>'+esc(i.from)+'</b> invited you to a Quiz Battle!</p><button class="btn btn-primary btn-sm" data-act="fr-join" data-code="'+esc(i.code)+'">Join battle</button></section>').join("");
}
async function addFriend(raw){
  const code = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if(code.length !== 6){ FR.msg = "Friend codes have 6 letters and numbers."; render(); return; }
  if(code === ensureFriendCode()){ FR.msg = "That's your own code. Ask a friend for theirs!"; render(); return; }
  if(mode !== "cloud" || !DB){ FR.msg = "Adding friends needs the app open on claude.ai while signed in."; render(); return; }
  FR.busy = true; FR.msg = "Looking for your friend…"; render();
  let found = BOARD.find(p => p.friendCode === code);
  if(!found){
    try{ const snap = await DB.collection("players").where("friendCode", "==", code).limit(1).get(); if(!snap.empty) found = Object.assign({id:snap.docs[0].id}, snap.docs[0].data()); }catch(e){}
  }
  FR.busy = false;
  if(!found){ FR.msg = "No one has that code. Check it with your friend (they need to have opened the app on claude.ai)."; render(); return; }
  if(found.id === UID){ FR.msg = "That's your own code."; render(); return; }
  if(friendList().some(f => f.id === found.id)){ FR.msg = String(found.name || "They").slice(0, 20) + " is already your friend."; render(); return; }
  if(friendList().length >= 50){ FR.msg = "You can have up to 50 friends."; render(); return; }
  S.friends = friendList().concat({id:found.id, nick:String(found.name || "Friend").slice(0, 20), added:today()});
  const nb = checkBadges();
  save();
  FR.msg = "Added " + String(found.name || "your friend").slice(0, 20) + "! Ask them to add your code too." + (nb.length ? " New badge!" : "");
  render();
}
function removeFriend(id){ S.friends = friendList().filter(f => f.id !== id); save(); render(); toast("Friend removed"); }
async function inviteFriend(id){
  if(!ROOM){ toast("Battles need the app open on claude.ai."); return; }
  if(!BT) await battleEnter(battleCode(), true);
  if(!BT) return;
  BT.invited = Array.from(new Set((BT.invited || []).concat(id))).slice(0, 20);
  ROOM.presence({invite:{to:BT.invited, code:BT.code, at:Date.now()}}).catch(() => {});
  toast("Invite sent! They'll see it if the app is open.");
  go("battle");
}
function vFriends(){
  const code = ensureFriendCode(), fl = friendList(), online = onlineIds(), wk = weekKey();
  let h = invitesBanner();
  h += '<section class="card" style="display:flex;flex-direction:column;gap:14px"><div><h1>Friends</h1><p class="muted">Add friends with their friend code to see their progress, compare XP and battle them.</p></div>';
  if(mode !== "cloud"){
    h += '<p class="notice">Friends work when the app is opened on claude.ai while signed in, and shared with your friends as Contributors.</p></section>';
    return h;
  }
  h += '<div class="grid g2"><div class="card" style="background:var(--panel);display:flex;flex-direction:column;gap:8px"><h2>Your friend code</h2><p class="fcode">'+esc(code)+'</p>'+
    '<p class="small muted">Share it only with people you know. Anyone with your code can add you.</p><div><button class="btn btn-sm" data-act="fr-copy">Copy code</button></div></div>'+
    '<form id="fradd" class="card" style="background:var(--panel);display:flex;flex-direction:column;gap:8px"><h2>Add a friend</h2><label for="fr-code" class="small" style="font-weight:800">Their friend code</label>'+
    '<input type="text" id="fr-code" maxlength="8" placeholder="e.g. K7QM2X" autocomplete="off" style="text-transform:uppercase"'+(FR.busy?' disabled':'')+'><div><button class="btn btn-primary" type="submit"'+(FR.busy?' disabled':'')+'>Add friend</button></div>'+
    (FR.msg ? '<p class="small" role="status" style="font-weight:700">'+esc(FR.msg)+'</p>' : '')+'</form></div></section>';
  // friends list
  h += '<section class="card" style="display:flex;flex-direction:column;gap:6px"><h2>Your friends ('+fl.length+')</h2>';
  if(!fl.length) h += '<p class="muted">No friends yet. Swap codes with a classmate to get started.</p>';
  fl.forEach(f => {
    const p = playerDoc(f.id), on = online.has(f.id);
    const stg = p ? Math.max(0, Math.min(4, Number(p.stage) || 0)) : 0;
    const name = String((p && p.name) || f.nick || "Friend").slice(0, 20);
    h += '<div class="trow fr-row"><div class="row" style="flex-wrap:nowrap;gap:10px"><span style="width:52px;flex:none">'+atomi(stg, on ? "happy" : "ready", {look:p && p.look})+'</span><div style="display:flex;flex-direction:column;gap:2px;min-width:0"><b>'+esc(name)+'</b>'+
      '<span class="small muted">'+(p ? STAGES[stg].name+' · '+(Number(p.xp)||0).toLocaleString()+' XP · '+(Number(p.streak)||0)+'-day streak' : 'Stats not shared yet')+'</span>'+
      '<span class="small" style="font-weight:800;color:'+(on?'var(--good)':'var(--muted)')+'">'+(on ? '● Online now' : '○ Offline')+'</span></div></div><div></div>'+
      '<div class="acts">'+(on && ROOM ? '<button class="btn btn-sm btn-primary" data-act="fr-invite" data-id="'+esc(f.id)+'">Invite to battle</button>' : '')+
      '<button class="btn btn-sm" data-act="fr-remove" data-id="'+esc(f.id)+'" aria-label="Remove '+esc(name)+'">Remove</button></div></div>';
  });
  h += '</section>';
  // friends leaderboard
  const rows = [{id:UID, name:S.name, xp:S.xp, weekXp:S.weekKey === wk ? S.weekXp : 0, stage:stageOf(S.xp), look:S.look, me:true}]
    .concat(fl.map(f => { const p = playerDoc(f.id); return p ? {id:f.id, name:p.name || f.nick, xp:Number(p.xp)||0, weekXp:p.weekKey === wk ? Number(p.weekXp)||0 : 0, stage:Math.max(0, Math.min(4, Number(p.stage)||0)), look:p.look} : null; }).filter(Boolean))
    .sort((a, b) => b.weekXp - a.weekXp);
  h += '<section class="card" style="display:flex;flex-direction:column;gap:10px"><div class="row between"><h2>Friends leaderboard this week</h2><button class="btn btn-sm" data-act="go" data-v="board">Everyone</button></div>'+
    '<div style="overflow-x:auto"><table><thead><tr><th>#</th><th>Player</th><th>Stage</th><th class="num">Week XP</th></tr></thead><tbody>'+
    rows.map((r, i) => '<tr'+(r.me?' class="me"':'')+'><td>'+(i+1)+'</td><td><div class="row" style="gap:8px;flex-wrap:nowrap"><span style="width:30px;flex:none">'+atomi(r.stage, "ready", {look:r.look})+'</span>'+esc(String(r.name||"Player").slice(0,20))+(r.me?' (you)':'')+'</div></td><td>'+STAGES[r.stage].name+'</td><td class="num">'+r.weekXp.toLocaleString()+'</td></tr>').join("")+
    '</tbody></table></div></section>';
  return h;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b) return;
  const a = b.dataset.act;
  if(a === "fr-copy"){ const c = ensureFriendCode(); try{ navigator.clipboard.writeText(c).then(() => toast("Copied " + c), () => toast("Your code is " + c)); }catch(err){ toast("Your code is " + c); } }
  else if(a === "fr-remove"){ if(b.dataset.confirm === "1") removeFriend(b.dataset.id); else { b.dataset.confirm = "1"; b.textContent = "Tap again to remove"; } }
  else if(a === "fr-invite") inviteFriend(b.dataset.id);
  else if(a === "fr-join") battleEnter(b.dataset.code, false);
});
document.addEventListener("submit", e => {
  if(e.target.id === "fradd"){ e.preventDefault(); addFriend(document.getElementById("fr-code").value); }
});
