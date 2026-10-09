/* כוכבות קוראות — game engine (tablet, landscape). */

const W = 1600, H = 1000;
const stage = document.getElementById('stage');
let scale = 1;

/* ---------- layout: one 1600×1000 stage, scaled to fit any screen ---------- */
function fit() {
  scale = Math.min(innerWidth / W, innerHeight / H);
  stage.style.transform = `scale(${scale})`;
  stage.style.left = (innerWidth - W * scale) / 2 + 'px';
  stage.style.top = (innerHeight - H * scale) / 2 + 'px';
}
addEventListener('resize', fit); fit();
// no pinch-zoom or double-tap zoom on tablets and phones (iOS ignores user-scalable=no)
['gesturestart', 'gesturechange'].forEach(t => document.addEventListener(t, e => e.preventDefault()));
document.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
let lastTouch = 0; document.addEventListener('touchend', e => { const now = Date.now(); if (now - lastTouch < 300) e.preventDefault(); lastTouch = now; }, { passive: false });
function toStage(e) { const r = stage.getBoundingClientRect(); return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale }; }
function rectOf(el) { const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); return { x: (r.left - s.left) / scale, y: (r.top - s.top) / scale, w: r.width / scale, h: r.height / scale }; }

/* ---------- per-game settings: a game can override any of these in its content file (const GAME = {...}) ---------- */
const CFG = Object.assign({
  autoPlace: true, saveKey: 'kochavot-v2', title: 'כוכבות קוראות', subtitle: 'הכנה משחקית לכיתה א׳', heroAlt: 'הכוכבת', worksheets: true,
  colors: { ink: '#d0619b', path: '#efe2f5', path2: '#f5edf8', dots: '#c58fc0', dotsOff: '#dcc4e2', confetti: ['#f29cc3', '#b69add', '#f3c86b', '#9fd8c6', '#ffd2e4'] },
}, typeof GAME !== 'undefined' ? GAME : {});
const T = Object.assign({
  next: 'ממשיכות', find3: 'מצאי', findAll: 'מצאי את כל האותיות', writing: 'כותבות את האות', restart: 'מתחילות מחדש',
  won: 'איזו כוכבת! הרווחת', collected: 'אספת', dress: 'בואי נלביש את הכוכבת!', undressAll: 'הכול חוזר לארון', start: 'בואי<br>נשחק!',
  parentsReward: 'ו<b>פרס</b> שהכוכבת לובשת מיד', parentsHint: 'אחרי שתי טעויות מופיע רמז מנצנץ, כך שאף ילדה לא נתקעת.',
}, CFG.text || {});

/* ---------- saved progress ---------- */
const SAVE_KEY = CFG.saveKey;
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch {}
  if (!s || typeof s !== 'object') s = { done: {}, inv: [], outfit: {}, stage: {} };
  s.done ||= {}; s.inv ||= []; s.outfit ||= {}; s.stage ||= {};
  if (!s.migrated && SAVE_KEY === 'kochavot-v2') { // bring over progress from the earlier prototype
    try {
      const old = JSON.parse(localStorage.getItem('kochavot-group1-inventory') || '[]');
      const byName = Object.fromEntries(Object.entries(ITEMS).map(([k, v]) => [v.name, k]));
      for (const n of old) { const k = byName[n === 'לק' ? 'לב' : n]; if (k && !s.inv.includes(k)) s.inv.push(k); }
      for (const u of UNITS) if (localStorage.getItem('star-' + u.letter)) s.done[u.key] = true;
    } catch {}
    s.migrated = true;
  }
  s.inv = s.inv.filter(k => ITEMS[k]);
  return s;
}
let state = loadState();
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }

/* ---------- small helpers ---------- */
const $ = sel => stage.querySelector(sel);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const wait = ms => new Promise(r => setTimeout(r, ms));
const ICON = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5" fill="none" stroke="#a7679d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10v9.5h13V10" fill="#fde3ee" stroke="#a7679d" stroke-width="2.2" stroke-linejoin="round"/><path d="M10 19.5v-5h4v5" fill="#fff" stroke="#a7679d" stroke-width="2"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="#a7679d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  speak: '<svg viewBox="0 0 24 24"><path d="M4 9.5h4l5-4v13l-5-4H4z" fill="#c2558f"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="#c2558f" stroke-width="2.2" stroke-linecap="round"/></svg>',
  erase: '<svg viewBox="0 0 24 24"><path d="M4 15.5 13.5 6l5 5L9 20.5H5.5z" fill="#fde3ee" stroke="#a7679d" stroke-width="2" stroke-linejoin="round"/><path d="M9 20.5h11" stroke="#a7679d" stroke-width="2" stroke-linecap="round"/></svg>',
  closet: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2.5" fill="#fde3ee" stroke="#a7679d" stroke-width="2"/><path d="M12 3v18M10 12h-.5M14 12h.5" stroke="#a7679d" stroke-width="2" stroke-linecap="round"/></svg>',
  print: '<svg viewBox="0 0 24 24"><path d="M7 8V3.5h10V8" fill="#fff" stroke="#a7679d" stroke-width="2"/><rect x="3.5" y="8" width="17" height="8" rx="2" fill="#fde3ee" stroke="#a7679d" stroke-width="2"/><path d="M7 13h10v7.5H7z" fill="#fff" stroke="#a7679d" stroke-width="2"/></svg>',
  undress: '<svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 1-7.5 5.2" fill="none" stroke="#a7679d" stroke-width="2.4" stroke-linecap="round"/><path d="M3 4.5 4.6 9.4 9.4 8" fill="none" stroke="#a7679d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const say = (...ids) => Voice.say(...ids);
let lastPrompt = [];
function prompt(ids) { lastPrompt = ids; return say(ids); }
const yay = () => `yay-${1 + Math.floor(Math.random() * 4)}`;

/* ---------- the star (same figure, same outfit, on every screen) ---------- */
function itemBox(key, pos) {
  const it = ITEMS[key];
  if (it.layer) return { ...STAR_BOX }; // full-size layer drawn on the star's own canvas
  const p = pos || it, w = it.w * STAR_BOX.w, h = w * it.ar;
  return { x: STAR_BOX.x + p.cx * STAR_BOX.w - w / 2, y: STAR_BOX.y + p.cy * STAR_BOX.h - h / 2, w, h };
}
// wrist items always sit exactly on one of the two wrists (also fixes outfits saved before the wrists were measured)
function nearestWrist(p) { return WRISTS.reduce((a, b) => Math.hypot(a.cx - p.cx, a.cy - p.cy) <= Math.hypot(b.cx - p.cx, b.cy - p.cy) ? a : b); }
function starHTML() {
  const worn = Object.entries(state.outfit).filter(([k]) => ITEMS[k] && !ITEMS[k].world && state.inv.includes(k))
    .map(([k, p]) => { p = ITEMS[k].snap === 'wrist' ? nearestWrist(p) : p; const b = itemBox(k, p), rot = (ITEMS[k].turn || 0) + (p.rot || 0); return `<img class="worn" data-item="${k}" src="${ITEMS[k].img}" alt="${ITEMS[k].name}" style="left:${b.x - STAR_BOX.x}px;top:${b.y - STAR_BOX.y}px;width:${b.w}px;z-index:${ITEMS[k].z};transform:rotate(${rot}deg)">`; }).join('');
  // an item can swap the figure underneath it (football boots: the player without bare feet, so no toes peek out)
  const base = Object.keys(state.outfit).filter(k => ITEMS[k] && !ITEMS[k].world && state.inv.includes(k)).map(k => ITEMS[k].base).find(Boolean) || ART.star;
  return `<div class="star" id="star" style="left:${STAR_BOX.x}px;top:${STAR_BOX.y}px;width:${STAR_BOX.w}px;height:${STAR_BOX.h}px"><img src="${base}" alt="${CFG.heroAlt}" style="left:0;top:0;width:100%;height:100%;z-index:4">${worn && ART.starArms ? `<img src="${ART.starArms}" alt="" style="left:0;top:0;width:100%;height:100%;z-index:7">` : ''}${worn}</div>`;
}
function hop() { const s = $('#star'); if (!s) return; s.classList.remove('hop'); void s.offsetWidth; s.classList.add('hop'); }
function sparkle(x, y, n = 14) {
  const box = document.createElement('div'); box.className = 'sparkles'; box.style.left = x + 'px'; box.style.top = y + 'px';
  for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90, s = document.createElement('i'); s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px'); s.style.animationDelay = Math.random() * .15 + 's'; box.appendChild(s); }
  stage.appendChild(box); setTimeout(() => box.remove(), 1300);
}
function sparkleOn(el, n) { const r = rectOf(el); sparkle(r.x + r.w / 2, r.y + r.h / 2, n); }
function confetti() {
  const box = document.createElement('div'); box.className = 'confetti';
  const colors = CFG.colors.confetti;
  for (let i = 0; i < 70; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 100 + '%'; c.style.background = colors[i % colors.length]; c.style.animationDuration = 2 + Math.random() * 2 + 's'; c.style.animationDelay = Math.random() * .8 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`; box.appendChild(c); }
  stage.appendChild(box); setTimeout(() => box.remove(), 5000);
}

/* ---------- screen scaffolding ---------- */
function topbar({ home = true, back = null, title = '', steps = null, replay = true } = {}) {
  return `<div class="topbar">${home ? `<button class="round" onclick="go.home()" aria-label="לעולמות">${ICON.home}</button>` : ''}${back ? `<button class="round" onclick="${back}" aria-label="חזרה">${ICON.back}</button>` : ''}
  <div class="title">${title}</div>${steps !== null ? `<div class="steps">${[0, 1, 2, 3, 4].map(i => `<i class="${i <= steps ? 'on' : ''} ${i === steps ? 'now' : ''}"></i>`).join('')}</div>` : ''}${replay ? `<button class="round say-btn" onclick="say(lastPrompt)" aria-label="להשמיע שוב">${ICON.speak}</button>` : ''}</div>`;
}
function screen(html, { bg = ART.room, bgClass = '' } = {}) {
  Voice.stop();
  stage.innerHTML = `<img class="bg ${bgClass}" src="${bg}" alt="">${bg === ART.room ? builtHTML() : ''}<div class="veil"></div>${html}`;
}
// A game can grow its menu background as the child builds it (football: the stadium starts as a bare pitch and
// shows every piece already placed in the worlds listed in CFG.roomWorlds, exactly where it was placed).
function builtHTML() {
  if (!CFG.roomWorlds) return '';
  return '<div class="bg-built">' + CFG.roomWorlds.flatMap(unitsOf).map(u => u.item).filter(k => state.inv.includes(k) && state.stage[k]).map(k => {
    const it = ITEMS[k], at = it.slot ? it.stage : state.stage[k], w = it.stage.w, h = w * it.ar;
    return `<img class="bg-piece" src="${it.img}" alt="" style="left:${at.x - w / 2}px;top:${at.y - h / 2}px;width:${w}px;z-index:${it.z}">`;
  }).join('') + '</div>';
}
function promptRow(text, ids) { return `<div class="prompt"><span>${text}</span><button class="say-btn" onclick="say(${JSON.stringify(ids).replace(/"/g, "'")})" aria-label="להשמיע">${ICON.speak}</button></div>`; }
function showNext(onclick, label = T.next) {
  const p = $('.panel'); if (!p || p.querySelector('.next')) return;
  p.insertAdjacentHTML('beforeend', `<button class="next" onclick="${onclick}">${label} ${ICON.next}</button>`);
}

/* ---------- navigation ---------- */
const go = {
  home() {
    screen(`${topbar({ home: false, replay: true })}
      <button class="round" style="position:absolute;bottom:28px;left:28px;z-index:31;width:auto;padding:0 26px;border-radius:999px;font-size:28px;font-weight:700" onclick="openParents()">להורים</button>
      <div class="hero-title"><h1>${CFG.title}</h1><p>${CFG.subtitle}</p></div>
      <div class="worlds">${WORLDS.map(w => w.soon ? `<button class="world soon" onclick="Sfx.soft()">${w.icon ? `<img src="${w.icon}" alt="">` : `<span class="emoji">${w.emoji}</span>`}<b>${w.title}</b><small>בקרוב</small></button>` : `<button class="world ${worldDone(w.key) ? 'done' : 'active'}" onclick="Sfx.tap();go.world('${w.key}')"><img src="${w.icon}" alt=""><b>${w.title}</b><small>${doneCount(w.key)} מתוך ${unitsOf(w.key).length} אותיות</small></button>`).join('')}
      </div>${starHTML()}`);
    prompt(['home']);
  },
  world(key = 'clothes') {
    const W = WORLDS.find(w => w.key === key), list = unitsOf(key), all = worldDone(key), owned = list.filter(u => state.inv.includes(u.item)).length;
    const placeBtn = `<button class="unit wardrobe-btn" onclick="Sfx.tap();go.place('${key}')"><span class="count">${owned}</span><img src="${W.bg}" style="height:96px;border-radius:16px;object-fit:cover;width:80%;margin:0 0 10px" alt=""><b>${W.placeName}</b></button>`;
    screen(`${topbar({ title: W.title })}<div class="panel">
      <div class="units">${list.map(u => `<button class="unit ${state.done[u.key] ? 'done' : ''}" onclick="Sfx.tap();Unit.start('${u.key}')" aria-label="האות ${u.letter}"><span class="big">${u.letter}</span><img src="${ITEMS[u.item].card || ITEMS[u.item].img}" alt="${ITEMS[u.item].name}"></button>`).join('')}
        ${placeBtn}</div>
      ${all ? `<div class="banner">${W.doneText}</div>` : ''}</div>${starHTML()}`);
    prompt(all ? [`done-world-${key}`] : [`world-${key}`]);
  },
  place(key) { key === 'clothes' ? Wardrobe.open() : Place.open(key); },
};
const doneCount = w => unitsOf(w).filter(u => state.done[u.key]).length;
const worldDone = w => unitsOf(w).every(u => state.done[u.key]);

/* ---------- a letter unit: five steps ---------- */
const Unit = {
  u: null, step: 0, misses: 0, found: 0,
  start(key) { this.u = UNITS.find(x => x.key === key); this.step = 0; this.render(); },
  next() { Sfx.tap(); this.step++; this.render(); },
  render() {
    this.misses = 0; this.found = 0;
    const u = this.u, item = ITEMS[u.item];
    screen(`${topbar({ back: `go.world('${u.world}')`, title: `${u.letter} — ${item.name}`, steps: this.step })}<div class="panel" id="panel"></div>${starHTML()}`);
    [this.opening, this.words, this.hunt, this.write, this.finish][this.step].call(this);
  },
  wrongTap(el, ids) {
    Sfx.soft(); el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong');
    this.misses++;
    const hint = this.misses >= 2 ? [...$('#panel').querySelectorAll('[data-ok="1"]:not(.correct):not(.found)')][0] : null;
    if (hint) { hint.classList.add('hint'); say([...ids, 'hint']); } else say(ids);
  },
  rightTap(el) { Sfx.good(); hop(); sparkleOn(el); this.misses = 0; $('#panel').querySelectorAll('.hint').forEach(x => x.classList.remove('hint')); },

  /* 1 — which item starts with the sound */
  opening() {
    const u = this.u;
    $('#panel').innerHTML = `${promptRow(`מה מתחיל בצליל <b>${u.sound}</b>?`, [`open-${u.key}`])}
      <div class="cards three">${shuffle(u.options).map(k => `<button class="card" data-ok="${k === u.item ? 1 : 0}" onclick="Unit.pickItem(this,'${k}')"><img src="${ITEMS[k].card || ITEMS[k].img}" alt=""><span class="label">${ITEMS[k].name}</span></button>`).join('')}</div>`;
    prompt([`open-${u.key}`]);
  },
  pickItem(el, k) {
    if (el.disabled) return;
    if (k === this.u.item) {
      this.rightTap(el); el.classList.add('correct');
      $('#panel').querySelectorAll('.card').forEach(c => { c.disabled = true; if (c !== el) c.classList.add('dim'); });
      say(`yes-${this.u.key}`); showNext('Unit.next()');
    } else this.wrongTap(el, [`i-${k}`, 'not-this']);
  },

  /* 2 — three more words with the same opening sound */
  words() {
    const u = this.u, cards = shuffle([...u.words.map(w => [w, 1]), ...u.wrong.map(w => [w, 0])]);
    $('#panel').innerHTML = `${promptRow(`${T.find3} <b>3</b> תמונות שמתחילות בצליל <b>${u.sound}</b>`, [`words-${u.key}`])}
      <div class="cards six">${cards.map(([w, ok]) => `<button class="card" data-ok="${ok}" onclick="Unit.pickWord(this,'${w}',${ok})" aria-label="${WORDS[w][0]}"><img src="${WORDS[w][1]}" alt="${WORDS[w][0]}"></button>`).join('')}</div>`;
    prompt([`words-${u.key}`]);
  },
  pickWord(el, w, ok) {
    if (el.disabled) return;
    if (ok) {
      el.disabled = true; el.classList.add('correct'); this.rightTap(el); this.found++;
      if (this.found === 3) { say(`w-${w}`, yay()); $('#panel').querySelectorAll('.card:not(.correct)').forEach(c => { c.disabled = true; c.classList.add('dim'); }); showNext('Unit.next()'); }
      else say(`w-${w}`);
    } else this.wrongTap(el, [`w-${w}`, 'not-this']);
  },

  /* 3 — find the letter five times among look-alikes */
  hunt() {
    const u = this.u, bank = shuffle([...Array(5).fill(u.letter), ...u.near]);
    $('#panel').innerHTML = `${promptRow(`${T.findAll} <b>${u.letter}</b>`, [`hunt-${u.key}`])}
      <div class="collect" style="top:150px">${[0, 1, 2, 3, 4].map(i => `<div class="slot" id="slot${i}"></div>`).join('')}</div>
      <div class="bank">${bank.map(ch => `<button class="tile" data-ok="${ch === u.letter ? 1 : 0}" style="transform:rotate(${(Math.random() * 14 - 7).toFixed(1)}deg) translate(${(Math.random() * 16 - 8).toFixed(0)}px,${(Math.random() * 12 - 6).toFixed(0)}px)" onclick="Unit.pickLetter(this,'${ch}')">${ch}</button>`).join('')}</div>`;
    prompt([`hunt-${u.key}`]);
  },
  pickLetter(el, ch) {
    if (el.classList.contains('found')) return;
    const u = this.u;
    if (ch !== u.letter) return this.wrongTap(el, ['this-is', `letter-${LETTER_KEYS[ch]}`, 'look-for', `name-${u.key}`]);
    el.classList.add('found'); this.rightTap(el); el.classList.remove('hint');
    const slot = $(`#slot${this.found++}`), a = rectOf(el), b = rectOf(slot), f = document.createElement('div');
    f.className = 'fly'; f.textContent = ch; stage.appendChild(f);
    const fr = rectOf(f); f.style.left = a.x + a.w / 2 - fr.w / 2 + 'px'; f.style.top = a.y + a.h / 2 - fr.h / 2 + 'px';
    Sfx.fly();
    requestAnimationFrame(() => requestAnimationFrame(() => { f.style.transform = `translate(${b.x + b.w / 2 - a.x - a.w / 2}px,${b.y + b.h / 2 - a.y - a.h / 2}px)`; }));
    const last = this.found === 5;
    setTimeout(() => { f.remove(); slot.textContent = ch; slot.classList.add('filled'); if (last) { say(yay()); showNext('Unit.next()'); } else say(`name-${u.key}`); }, 720);
  },

  /* 4 — writing: round 1 follows the dotted path, round 2 on a faint letter */
  write() {
    $('#panel').innerHTML = `${promptRow(`${T.writing} <b>${this.u.letter}</b>`, [`write-${this.u.key}`])}<div class="round-tag" id="roundTag">1 / 2</div>
      <div class="board"><canvas id="guide" width="730" height="600"></canvas><canvas id="ink" class="trace" width="730" height="600"></canvas></div>
      <div class="write-tools"><button class="pill" onclick="Writer.reset()">${ICON.erase} ${T.restart}</button><button class="pill" onclick="Writer.done()">סיימתי ✓</button></div>`;
    Writer.begin(this.u, 1);
  },

  /* 5 — reward: the item flies onto the star */
  finish() {
    const u = this.u, k = u.item, it = ITEMS[k], list = unitsOf(u.world), next = list.slice(list.indexOf(u) + 1).concat(list).find(x => !state.done[x.key] && x !== u), onStage = u.world !== 'clothes', W = WORLDS.find(w => w.key === u.world);
    const fresh = !state.inv.includes(k);
    state.done[u.key] = true; if (fresh) state.inv.push(k); if (onStage && CFG.autoPlace && !state.stage[k]) state.stage[k] = { x: it.stage.x, y: it.stage.y }; save();
    $('#panel').innerHTML = `<div class="finish-title">${T.won} ${it.name}</div><div class="reward-card" id="rewardCard"><img src="${it.card || it.img}" alt="${it.name}"></div>
      <div class="collection-label">${T.collected} ${list.filter(x => state.inv.includes(x.item)).length} מתוך ${list.length} ${onStage ? 'דברים' : 'פריטים'}</div>
      <div class="collection">${list.map(x => `<span class="${state.inv.includes(x.item) ? (x.item === k && fresh ? 'new' : '') : 'miss'}"><img src="${ITEMS[x.item].card || ITEMS[x.item].img}" alt=""></span>`).join('')}</div>
      <div class="finish-actions" id="finishActions" style="opacity:0;transition:opacity .4s">
        ${!onStage && !state.outfit[k] ? `<button class="next" style="position:static;transform:none;animation:none;height:84px;font-size:32px" onclick="Sfx.tap();Wardrobe.open('${k}')">${ICON.closet} ${T.dress}</button>` : ''}
        ${next ? `<button class="${!onStage && !state.outfit[k] ? 'pill' : 'next'}" style="position:static;transform:none;animation:none;height:84px;font-size:32px" onclick="Sfx.tap();Unit.start('${next.key}')">לאות ${next.letter} ${!onStage && !state.outfit[k] ? '' : ICON.next}</button>` : ''}
        ${onStage || state.outfit[k] ? `<button class="pill" onclick="Sfx.tap();go.place('${u.world}')">${ICON.closet} ${W.placeName}</button>` : ''}
        <button class="pill" onclick="go.world('${u.world}')">כל האותיות</button>
        ${CFG.worksheets ? '' : '<!--'}<a class="pill" style="text-decoration:none;color:inherit" href="worksheets/letter-worksheet.html?l=${encodeURIComponent(u.letter)}" target="_blank" rel="noopener">${ICON.print} דף עבודה</a>${CFG.worksheets ? '' : '-->'}</div>`;
    Sfx.done(); confetti(); say(`done-${u.key}`);
    setTimeout(() => this.toStage(), 1500);
  },
  toStage() {
    const rc = $('#rewardCard'); if (rc) { sparkleOn(rc, 24); Sfx.snap(); }
    const a = $('#finishActions'); if (a) a.style.opacity = 1;
  },
  dress(k) {
    const card = $('#rewardCard img'); if (!card) return;
    const from = rectOf(card), it = ITEMS[k];
    if (!state.outfit[k]) { state.outfit[k] = defaultPos(k); save(); }
    const box = itemBox(k, state.outfit[k]), to = it.fit ? { x: box.x + it.fit[0] * box.w, y: box.y + it.fit[1] * box.h, w: it.fit[2] * box.w, h: it.fit[3] * box.h } : box, f = document.createElement('img');
    f.src = it.layer ? it.card : it.img; f.className = 'flying-item'; Object.assign(f.style, { left: from.x + 'px', top: from.y + 'px', width: from.w + 'px' });
    stage.appendChild(f); card.style.visibility = 'hidden'; Sfx.fly();
    requestAnimationFrame(() => requestAnimationFrame(() => Object.assign(f.style, { left: to.x + 'px', top: to.y + 'px', width: to.w + 'px' })));
    setTimeout(() => { f.remove(); const rc = $('#rewardCard'); if (rc) { rc.style.transition = 'opacity .5s'; rc.style.opacity = 0; } const s = $('#star'); if (s) s.outerHTML = starHTML(); hop(); sparkle(to.x + to.w / 2, to.y + to.h / 2, 22); Sfx.snap(); const a = $('#finishActions'); if (a) a.style.opacity = 1; }, 1150);
  },
};
function defaultPos(k) { const it = ITEMS[k]; return { cx: it.cx, cy: it.cy }; }

/* ---------- guided writing ---------- */
const Writer = {
  u: null, round: 1, strokes: [], si: 0, pi: 0, down: false, ink: null, g: null,
  P(p) { return [365 + (p[0] - 50) * 8, 300 + (p[1] - 52) * 8]; }, // 100×100 letter box → 730×600 board
  begin(u, round, help = false) {
    this.u = u; this.round = round; this.si = 0; this.pi = 0; this.tries = 0; this.finished = false; this.complete = false; this.help = !!help; this.inkAll = 0; this.inkOn = 0;
    // resample each stroke every ~14px so progress can be checked point by point
    this.strokes = u.strokes.map(st => { const pts = this.smooth(st).map(p => this.P(p)), out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / 14)); for (let j = 1; j <= n; j++) out.push([x0 + (x1 - x0) * j / n, y0 + (y1 - y0) * j / n]); } return out; });
    this.covered = this.strokes.map(s => s.map(() => false));
    const tag = $('#roundTag'); if (tag) tag.textContent = `${round} / 2`;
    this.ink = $('#ink').getContext('2d'); this.g = $('#guide').getContext('2d');
    this.ink.clearRect(0, 0, 730, 600); this.drawGuide();
    const c = $('#ink');
    c.onpointerdown = e => { this.down = true; c.setPointerCapture?.(e.pointerId); this.last = this.pt(e); this.move(e); };
    c.onpointermove = e => { if (this.down) this.move(e); };
    c.onpointerup = c.onpointercancel = () => { this.down = false; this.last = null; this.check(); };
    prompt([round === 1 ? `write-${u.key}` : `write2-${u.key}`]);
  },
  smooth(st) {
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], out = [st[0]];
    for (let i = 1; i < st.length; i++) {
      const p = st[i];
      if (p[2] !== 1 || i === st.length - 1) { out.push(p); continue; }
      const a = st[i - 1][2] === 1 ? mid(st[i - 1], p) : mid(st[i - 1], p), b = mid(p, st[i + 1]);
      if (st[i - 1][2] !== 1) out.push(a);
      for (let t = .2; t <= 1.001; t += .2) { const q = 1 - t; out.push([q * q * a[0] + 2 * q * t * p[0] + t * t * b[0], q * q * a[1] + 2 * q * t * p[1] + t * t * b[1]]); }
    }
    return out;
  },
  pt(e) { const r = $('#ink').getBoundingClientRect(); return [(e.clientX - r.left) * 730 / r.width, (e.clientY - r.top) * 600 / r.height]; },
  path(ctx, st) { ctx.beginPath(); st.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); },
  drawGuide() {
    const g = this.g; g.clearRect(0, 0, 730, 600); g.lineCap = g.lineJoin = 'round';
    for (const st of this.strokes) { this.path(g, st); g.strokeStyle = this.round === 1 ? CFG.colors.path : CFG.colors.path2; g.lineWidth = 64; g.stroke(); }
    if (this.round !== 1 && !this.help) return;
    this.strokes.forEach((st, si) => {
      // dotted centre line
      g.setLineDash([2, 18]); this.path(g, st); g.strokeStyle = si === this.si ? CFG.colors.dots : CFG.colors.dotsOff; g.lineWidth = 9; g.stroke(); g.setLineDash([]);
      // arrow at the end
      const [x1, y1] = st[st.length - 1], [x0, y0] = st[st.length - 2], a = Math.atan2(y1 - y0, x1 - x0);
      g.fillStyle = si === this.si ? CFG.colors.dots : CFG.colors.dotsOff; g.beginPath(); g.moveTo(x1 + Math.cos(a) * 22, y1 + Math.sin(a) * 22); g.lineTo(x1 + Math.cos(a + 2.5) * 20, y1 + Math.sin(a + 2.5) * 20); g.lineTo(x1 + Math.cos(a - 2.5) * 20, y1 + Math.sin(a - 2.5) * 20); g.fill();
    });
    const st = this.strokes[this.si]; if (!st) return;
    const [sx, sy] = st[Math.min(this.pi, st.length - 1)];
    this.star(g, sx, sy, 26); g.fillStyle = '#fff'; g.font = '800 24px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(this.si + 1, sx, sy + 2);
  },
  star(g, x, y, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .5 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fillStyle = '#f0b54a'; g.fill(); },
  // Two checks, both kind to small hands:
  //  coverage — the finger passed near most of every line of the letter (any order, any direction);
  //  accuracy — most of what the child drew is ON the letter, so scribbling over the whole board does not count.
  NEAR: 55, ON: 62, STROKE_OK: .6, ROUND2_OK: .6, ACCURACY_OK: .7,
  share(i) { const c = this.covered[i]; return c.filter(Boolean).length / c.length; },
  total() { const all = this.covered.flat(); return all.filter(Boolean).length / all.length; },
  accuracy() { return this.inkAll ? this.inkOn / this.inkAll : 0; },
  move(e) {
    const p = this.pt(e), ink = this.ink;
    ink.lineCap = ink.lineJoin = 'round'; ink.strokeStyle = CFG.colors.ink; ink.lineWidth = 34;
    // sample the drawn line every few pixels so fast and slow fingers count the same
    const from = this.last || p, steps = Math.max(1, Math.ceil(Math.hypot(p[0] - from[0], p[1] - from[1]) / 8));
    if (this.last) { ink.beginPath(); ink.moveTo(...this.last); ink.lineTo(...p); ink.stroke(); }
    this.last = p;
    for (let k = 1; k <= steps; k++) {
      const q = [from[0] + (p[0] - from[0]) * k / steps, from[1] + (p[1] - from[1]) * k / steps];
      let best = Infinity;
      this.strokes.forEach((st, i) => st.forEach((g, j) => { const d = Math.hypot(g[0] - q[0], g[1] - q[1]); if (d < best) best = d; if (d < this.NEAR) this.covered[i][j] = true; }));
      this.inkAll++; if (best < this.ON) this.inkOn++;
    }
    if (this.round === 1) {
      const before = this.si;
      while (this.si < this.strokes.length && this.share(this.si) >= this.STROKE_OK) this.si++;
      if (this.si !== before) Sfx.snap();
      const st = this.strokes[this.si]; this.pi = st ? Math.max(0, st.findIndex((_, j) => !this.covered[this.si][j])) : 0;
      // every line is covered: wait for the finger to lift, so the child can finish the line they are drawing
      if (this.si >= this.strokes.length) { this.complete = true; return; }
      this.drawGuide();
    }
  },
  check() {
    if (this.finished) return;
    if (this.round === 1) { if (this.complete) { this.complete = false; if (this.accuracy() >= this.ACCURACY_OK) this.passed(); else this.offLetter(); } return; }
    if (this.total() >= this.ROUND2_OK && this.covered.every((_, i) => this.share(i) >= .4)) {
      if (this.accuracy() >= this.ACCURACY_OK) this.passed(); else this.offLetter();
    }
  },
  // drew all over the board: wipe it and ask again; after two tries the dotted path comes back to help
  offLetter() {
    this.down = false; this.tries++;
    Sfx.soft(); say('write-on-letter');
    const help = this.help || this.tries >= 2;
    setTimeout(() => { const t = this.tries; this.begin(this.u, this.round, help); this.tries = t; }, 700);
  },
  done() {
    if (this.finished) return;
    if (this.total() >= .45 && this.accuracy() >= this.ACCURACY_OK - .05) return this.passed();
    if (this.accuracy() < this.ACCURACY_OK - .05 && this.inkAll > 20) return this.offLetter();
    this.tries++; Sfx.soft(); say('write-again');
    if (this.tries >= 2 && !this.help) { this.help = true; this.drawGuide(); }
  },
  reset() { Sfx.tap(); this.begin(this.u, this.round); },
  passed() {
    if (this.finished) return; this.finished = true;
    const c = $('#ink'); c.onpointerdown = c.onpointermove = c.onpointerup = null; this.down = false;
    Sfx.good(); hop(); sparkleOn($('.board'), 24);
    if (this.round === 1) { say(yay()); setTimeout(() => { this.begin(this.u, 2); }, 1300); }
    else { say('write-good'); showNext('Unit.next()'); }
  },
};

/* ---------- dressing room ---------- */
const Wardrobe = {
  open(fresh = null) {
    const loose = state.inv.filter(k => !ITEMS[k].world && !state.outfit[k]);
    this.fresh = fresh;
    screen(`${topbar({ back: "go.world('clothes')", title: WORLDS.find(w => w.key === 'clothes').placeName })}
      ${loose.map(k => this.cubbyImg(k)).join('')}${starHTML()}<div class="drop-glow" id="dropGlow" style="left:${STAR_BOX.x - 60}px;top:${STAR_BOX.y - 40}px;width:${STAR_BOX.w + 120}px;height:${STAR_BOX.h + 60}px"></div>
      <div class="wardrobe-bar">${Object.keys(state.outfit).length ? `<button class="pill" onclick="Wardrobe.undressAll()">${ICON.undress} ${T.undressAll}</button>` : ''}</div>`, { bg: ART.wardrobe });
    this.bindStar();
    stage.querySelectorAll('.closet-item').forEach(el => this.draggable(el));
    if (fresh) stage.querySelector(`.closet-item[data-item="${fresh}"]`)?.classList.add('hint');
    prompt([fresh ? 'wardrobe-new' : state.inv.length ? 'wardrobe' : 'wardrobe-empty']);
  },
  cubbyRect(k) { const c = CUBBIES[k], it = ITEMS[k], ar = it.cardAr || it.ar, h = c.w * ar; return { x: c.x - c.w / 2, y: c.b - h, w: c.w }; },
  cubbyImg(k) { const r = this.cubbyRect(k), it = ITEMS[k]; return `<img class="closet-item arrive" data-item="${k}" src="${it.card || it.img}" alt="${it.name}" draggable="false" style="left:${r.x}px;top:${r.y}px;width:${r.w}px">`; },
  // what the item looks like while dragged: full-size layers travel as their card picture
  view(k, over) {
    const it = ITEMS[k];
    if (it.layer) return { src: it.card, ar: it.cardAr, w: this.cubbyRect(k).w * (over ? 1.25 : 1.1) };
    const worn = itemBox(k); return { src: it.img, ar: it.ar, w: over ? worn.w : Math.max(worn.w, this.cubbyRect(k).w) };
  },
  alpha: {},
  async alphaOf(src) {
    if (this.alpha[src]) return this.alpha[src];
    const img = new Image(); img.src = src; await img.decode().catch(() => {});
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    try { this.alpha[src] = { w: c.width, h: c.height, d: x.getImageData(0, 0, c.width, c.height).data }; } catch { this.alpha[src] = null; }
    return this.alpha[src];
  },
  // tapping the star picks the top-most worn item under the finger
  bindStar() {
    const star = $('#star'); if (!star) return;
    star.style.pointerEvents = 'auto'; star.style.touchAction = 'none';
    stage.querySelectorAll('#star .worn').forEach(im => this.alphaOf(im.getAttribute('src')));
    star.addEventListener('pointerdown', async e => {
      e.preventDefault(); const p = toStage(e);
      const worn = [...star.querySelectorAll('.worn')].sort((a, b) => b.style.zIndex - a.style.zIndex);
      for (const im of worn) {
        const r = rectOf(im); if (p.x < r.x || p.y < r.y || p.x > r.x + r.w || p.y > r.y + r.h) continue;
        const A = this.alpha[im.getAttribute('src')];
        if (A) { const ax = Math.floor((p.x - r.x) / r.w * A.w), ay = Math.floor((p.y - r.y) / r.h * A.h); if (A.d[(ay * A.w + ax) * 4 + 3] < 60) continue; }
        const k = im.dataset.item; im.remove();
        const n = document.createElement('img'); n.className = 'closet-item'; n.dataset.item = k; n.draggable = false; stage.appendChild(n);
        this.draggable(n); this.startDrag(n, e); return;
      }
    });
  },
  draggable(el) { el.addEventListener('pointerdown', e => { e.preventDefault(); this.startDrag(el, e); }); },
  startDrag(el, e) {
    if (this.active) return;
    Sfx.tap(); const k = el.dataset.item, id = e.pointerId;
    this.active = true; el.classList.remove('arrive', 'hint'); el.classList.add('dragging');
    const glow = $('#dropGlow');
    const place = ev => { const p = toStage(ev), over = this.overStar(p), v = this.view(k, over), h = v.w * v.ar; if (el.getAttribute('src') !== v.src) el.src = v.src; Object.assign(el.style, { width: v.w + 'px', left: p.x - v.w / 2 + 'px', top: p.y - h / 2 + 'px' }); glow?.classList.toggle('on', over); };
    const move = ev => { if (ev.pointerId === id) place(ev); };
    const up = ev => { if (ev.pointerId !== id) return; removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); glow?.classList.remove('on'); this.active = false; this.drop(el, k, toStage(ev)); };
    place(e); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
  },
  overStar(p) { return p.x > STAR_BOX.x - 70 && p.x < STAR_BOX.x + STAR_BOX.w + 70 && p.y > STAR_BOX.y - 50 && p.y < STAR_BOX.y + STAR_BOX.h + 20; },
  drop(el, k, p) {
    const it = ITEMS[k];
    if (this.overStar(p)) {
      let pos;
      if (it.snap === 'body') pos = defaultPos(k);
      else if (it.snap === 'wrist') { const fx = (p.x - STAR_BOX.x) / STAR_BOX.w, fy = (p.y - STAR_BOX.y) / STAR_BOX.h; pos = { ...nearestWrist({ cx: fx, cy: fy }) }; }
      else pos = { cx: +((p.x - STAR_BOX.x) / STAR_BOX.w).toFixed(3), cy: +((p.y - STAR_BOX.y) / STAR_BOX.h).toFixed(3) };
      state.outfit[k] = pos; save(); el.remove();
      const s = $('#star'); s.outerHTML = starHTML(); this.bindStar();
      const b = itemBox(k, pos); sparkle(b.x + b.w / 2, b.y + b.h / 2, 16); Sfx.snap(); hop(); say('dressed');
    } else {
      delete state.outfit[k]; save(); const r = this.cubbyRect(k);
      el.classList.remove('dragging'); el.src = it.card || it.img; Object.assign(el.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', transition: 'all .35s ease' });
      setTimeout(() => { el.style.transition = ''; }, 400); Sfx.soft(); say('back-shelf');
    }
    const bar = $('.wardrobe-bar'); if (bar) bar.innerHTML = Object.keys(state.outfit).length ? `<button class="pill" onclick="Wardrobe.undressAll()">${ICON.undress} ${T.undressAll}</button>` : '';
  },
  undressAll() { state.outfit = {}; save(); this.open(); say('back-shelf'); },
};

/* ---------- stage, room, food, gifts: place earned items anywhere ---------- */
const Place = {
  TRAY: { x: 30, w: 170, top: 140, gap: 150 }, key: 'stage',
  owned() { return unitsOf(this.key).map(u => u.item).filter(k => state.inv.includes(k)); },
  placed() { return this.owned().filter(k => state.stage[k]); },
  slot(i) { return { x: this.TRAY.x + this.TRAY.w / 2, y: this.TRAY.top + 70 + i * this.TRAY.gap }; },
  // in the tray (and while carried) an item can show a card picture instead: e.g. a patch of grass for a layer that covers the whole field
  look(it, small) { return small && it.card ? { src: it.card, ar: it.cardAr } : { src: it.img, ar: it.ar }; },
  trayW(it) { return Math.min(130, 120 / this.look(it, true).ar); },
  // slot: the item always clicks into its own place (a goal at the end of the pitch); scene: a full-picture layer (the grass)
  propHTML(k, i) {
    const it = ITEMS[k], p = state.stage[k], v = this.look(it, !p), w = p ? it.stage.w : this.trayW(it), h = w * v.ar, at = p ? (it.slot ? it.stage : p) : this.slot(i);
    return `<img class="prop ${p ? 'placed' : 'in-tray'}${p && it.scene ? ' scene' : ''}" data-item="${k}" src="${v.src}" alt="${it.name}" draggable="false" style="left:${at.x - w / 2}px;top:${at.y - h / 2}px;width:${w}px;z-index:${p ? it.z : 21}">`;
  },
  open(key = this.key) {
    this.key = key;
    const W = WORLDS.find(w => w.key === key), owned = this.owned(), dx = (W.starX ?? STAR_BOX.x + STAR_BOX.w / 2) - (STAR_BOX.x + STAR_BOX.w / 2);
    screen(`${topbar({ back: `go.world('${key}')`, title: W.placeName })}
      <div class="tray" style="left:${this.TRAY.x}px;top:${this.TRAY.top}px;width:${this.TRAY.w}px;height:${this.TRAY.gap * 5 + 10}px"><b>הארגז</b></div>
      ${owned.map((k, i) => this.propHTML(k, i)).join('')}
      <div class="on-stage" style="transform:translateX(${dx}px)">${starHTML()}</div>
      <div class="wardrobe-bar" style="left:${this.TRAY.x + this.TRAY.w + 30}px">${this.placed().length ? `<button class="pill" onclick="Place.clear()">${ICON.undress} הכול חוזר לארגז</button>` : ''}</div>`, { bg: W.bg });
    if (W.noVeil) stage.querySelector('.veil')?.remove();
    stage.querySelectorAll('.prop:not(.scene)').forEach(el => el.addEventListener('pointerdown', e => this.drag(el, e)));
    prompt([owned.length ? `place-${key}` : 'place-empty']);
  },
  inTray(p) { return p.x < this.TRAY.x + this.TRAY.w + 20; },
  drag(el, e) {
    e.preventDefault(); if (this.active) return; this.active = true;
    const k = el.dataset.item, it = ITEMS[k], id = e.pointerId; Sfx.tap();
    el.style.zIndex = 50; el.classList.add('dragging');
    const place = ev => {
      const p = toStage(ev), small = this.inTray(p) || it.scene, v = this.look(it, small), w = small ? this.trayW(it) * (this.inTray(p) ? 1 : 1.5) : it.stage.w, h = w * v.ar;
      if (el.getAttribute('src') !== v.src) el.src = v.src;
      Object.assign(el.style, { width: w + 'px', left: p.x - w / 2 + 'px', top: p.y - h / 2 + 'px' });
    };
    const move = ev => { if (ev.pointerId === id) place(ev); };
    const up = ev => {
      if (ev.pointerId !== id) return;
      removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); this.active = false;
      const p = toStage(ev);
      if (this.inTray(p)) { delete state.stage[k]; save(); Sfx.soft(); this.open(); say('place-back'); return; }
      state.stage[k] = it.slot ? { x: it.stage.x, y: it.stage.y } : { x: Math.round(Math.max(60, Math.min(W - 60, p.x))), y: Math.round(Math.max(60, Math.min(H - 40, p.y))) }; save();
      this.open(); sparkle(state.stage[k].x, state.stage[k].y, 16); Sfx.snap(); hop(); say('placed');
    };
    place(e); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
  },
  clear() { for (const k of this.owned()) delete state.stage[k]; save(); this.open(); say('place-back'); },
};

/* ---------- parents ---------- */
function openParents() {
  stage.insertAdjacentHTML('beforeend', `<div class="overlay" id="parents" onclick="if(event.target===this)this.remove()"><div class="sheet">
    <button class="round close" onclick="document.getElementById('parents').remove()">✕</button>
    <h2>מידע להורים</h2>
    <p>כל יחידת אות בנויה מאותם חמישה שלבים: <b>צליל פותח</b> (איזה פריט מתחיל בצליל), <b>אוצר מילים</b> (עוד שלוש מילים), <b>זיהוי האות</b> בין אותיות דומות, <b>כתיבה בדפוס</b> (פעם במסלול מודרך ופעם לבד), ${T.parentsReward}.</p>
    <p>${T.parentsHint} הכפתור הסגול עם הרמקול משמיע שוב את ההוראה.</p>
    <p><b>הקלטת קול:</b> אפשר להקליט את ההוראות בקול שלכם, והמשחק ישתמש בהקלטות במקום בקול הממוחשב. <a href="studio.html" target="_blank" rel="noopener">לאולפן ההקלטות</a></p>
    ${CFG.worksheets ? `<p><b>דפי עבודה להדפסה:</b></p><div class="row">${UNITS.map(u => `<a class="pill" style="text-decoration:none" href="worksheets/letter-worksheet.html?l=${encodeURIComponent(u.letter)}" target="_blank" rel="noopener">${u.letter}</a>`).join('')}</div>` : ''}
    <p><button class="pill" onclick="if(confirm('למחוק את כל ההתקדמות והפריטים?')){localStorage.removeItem('${SAVE_KEY}');state=loadState();state.migrated=true;save();document.getElementById('parents').remove();go.home()}">איפוס ההתקדמות</button></p>
  </div></div>`);
}

/* ---------- start ---------- */
Voice.ready();
stage.innerHTML = `<img class="bg" src="${ART.room}" alt="">${starHTML()}<div class="overlay" style="background:#3a284666"><button class="start-btn" id="startBtn">${T.start}</button></div>`;
document.getElementById('startBtn').onclick = () => { Sfx.unlock(); Sfx.good(); go.home(); };
