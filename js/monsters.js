/* מפלצות האותיות — a letter-practice game for כוכבות קוראות.
   Cute monsters crowd the stage, each holding a letter. "פגעי במפלצת עם האות מֵם": the star sends a beam of
   music and light at the right one, and it bursts into sparkles. Every round practises the letters the child
   has met least, so over a few rounds all 22 letters come up. Art in assets/battle: the arena, five monsters
   (each with a pale round tummy where its letter goes) and the star's two battle poses. */

const Monsters = {
  ROUND: 8,
  // where the monsters float: s = size, so the one further back is smaller and the one in front bigger (a sense of depth)
  SPOTS: [{ x: 250, y: 420, s: .82 }, { x: 520, y: 590, s: 1.12 }, { x: 800, y: 440, s: .88 }],
  // the star in battle (assets/battle): ready, facing the monsters on the left, and attacking. Both are 620px tall,
  // standing on the same spot; HAND is where the attack pose's outstretched hand is (fraction of that picture)
  HERO: { right: 1480, bottom: 960, h: 620, ready: [262, 522], attack: [396, 516], HAND: [.03, .37] },
  heroHTML() {
    const H = this.HERO, wr = H.h * H.ready[0] / H.ready[1], wa = H.h * H.attack[0] / H.attack[1];
    return `<div class="battle-hero" id="star" style="left:${H.right - wa}px;top:${H.bottom - H.h}px;width:${wa}px;height:${H.h}px">
      <img class="ready" src="assets/battle/star-ready.png" alt="הכוכבת" style="right:0;width:${wr}px;height:${H.h}px">
      <img class="attack" src="assets/battle/star-attack.png" alt="" style="right:0;width:${wa}px;height:${H.h}px"></div>`;
  },
  KINDS: 5,
  open() {
    this.hits = 0; this.turn = 0;
    this.round = Practice.plan('mon', this.ROUND);   // hard letters first, then the least practised
    screen(`${topbar({ title: 'מפלצות האותיות' })}
      <div class="mon-score" id="monScore"></div>
      <div class="mon-call" id="monCall"></div>
      <div id="monField"></div>${this.heroHTML()}`, { bg: 'assets/battle/arena.jpg' });
    stage.querySelector('.veil')?.remove();
    this.showScore();
    // the long welcome only when it is recorded, and only on the first round
    const intro = !this.played && Voice.has('mon-intro'); this.played = true;
    if (intro) say('mon-intro');
    setTimeout(() => this.next(), intro ? 2600 : 700);
  },
  showScore() { $('#monScore').innerHTML = `✨ ${this.hits} <small>מפלצות</small> · ${Math.min(this.turn + 1, this.round.length)} מתוך ${this.round.length}`; },
  monsterImg(i) { return `<img class="mon-body" src="assets/battle/monster-${i % this.KINDS}.png" alt="" draggable="false">`; },
  next() {
    if (this.turn >= this.round.length) return this.finish();
    const key = this.round[this.turn], L = LETTERS[key];
    const near = shuffle(L.near.filter(ch => LETTER_KEYS[ch] && ch !== L.letter)).slice(0, 2);
    this.key = key; this.misses = 0; this.busy = false;
    const letters = shuffle([L.letter, ...near]), first = Math.floor(Math.random() * 5);
    $('#monField').innerHTML = letters.map((ch, i) => { const p = this.SPOTS[i];
      const w = 200 * p.s, h = 340 * p.s;
      return `<button class="mon arrive" data-ch="${ch}" style="left:${p.x - w / 2}px;top:${p.y - h / 2}px;width:${w}px;height:${h}px;--s:${p.s};z-index:${Math.round(p.y / 10)};animation-delay:${i * .07}s" aria-label="${ch}">
        ${this.monsterImg(first + i)}<b>${ch}</b></button>`; }).join('');
    stage.querySelectorAll('.mon').forEach(m => m.addEventListener('pointerdown', e => { e.preventDefault(); this.hit(m); }));
    $('#monCall').innerHTML = `פגעי במפלצת עם האות <b>${L.letter}</b>`;
    this.showScore();
    // the letter's name is always recorded; the sentence around it only once it is
    prompt(Voice.has('mon-hit') ? ['mon-hit', `name-${key}`] : [`name-${key}`]);
  },
  // the star sends a beam of light from her hand to the monster
  beam(to, good) {
    const s = rectOf($('#star')), H = this.HERO, from = { x: s.x + s.w * H.HAND[0], y: s.y + s.h * H.HAND[1] };
    const hero = $('#star'); hero.classList.add('attacking'); clearTimeout(this.pose); this.pose = setTimeout(() => hero.classList.remove('attacking'), 900);
    const b = document.createElement('div'); b.className = 'mon-beam' + (good ? '' : ' miss');
    const dx = to.x - from.x, dy = to.y - from.y, len = Math.hypot(dx, dy);
    Object.assign(b.style, { left: from.x + 'px', top: from.y + 'px', width: len + 'px', transform: `rotate(${Math.atan2(dy, dx)}rad)` });
    stage.appendChild(b); setTimeout(() => b.remove(), 600);
    for (let i = 1; i <= 4; i++) setTimeout(() => sparkle(from.x + dx * i / 4, from.y + dy * i / 4, 5), i * 60);
  },
  hit(m) {
    if (this.busy || m.classList.contains('gone')) return;
    this.busy = true; Sfx.fly();
    const L = LETTERS[this.key], right = m.dataset.ch === L.letter, r = rectOf(m), to = { x: r.x + r.w / 2, y: r.y + r.h / 2 };
    this.beam(to, right);
    const bg = stage.querySelector('.bg'); bg.classList.remove('cam-shake'); void bg.offsetWidth; bg.classList.add('cam-shake');   // the stage shakes a little
    setTimeout(() => {
      if (right) {
        this.hits++; Practice.done('mon', this.key, this.misses, this.round, this.turn);
        m.classList.add('poof'); Sfx.done(); sparkle(to.x, to.y, 30);
        stage.querySelectorAll('.mon:not(.poof)').forEach(o => o.classList.add('flee'));
        say(Voice.has('mon-yes') ? 'mon-yes' : 'yay-3', `name-${this.key}`);
        setTimeout(() => { this.turn++; this.next(); }, 1400);
      } else {
        this.misses++; Sfx.soft(); m.classList.remove('tease'); void m.offsetWidth; m.classList.add('tease');
        if (this.misses >= 2) stage.querySelector(`.mon[data-ch="${L.letter}"]`)?.classList.add('hint');
        say('this-is', `letter-${LETTER_KEYS[m.dataset.ch]}`, ...(Voice.has('mon-again') ? ['mon-again'] : [])); this.busy = false;
      }
    }, 260);
  },
  finish() {
    $('#monField').innerHTML = ''; $('#monCall').innerHTML = ''; this.turn = this.round.length - 1; this.showScore();
    confetti(); Sfx.done(); hop();
    stage.insertAdjacentHTML('beforeend', `<div class="overlay"><div class="sheet" style="text-align:center">
      <h2>✨ הבמה נקייה!</h2><p style="font-size:40px;margin:10px 0 24px">ניצחת <b>${this.hits}</b> מפלצות</p>
      <div class="row" style="justify-content:center"><button class="next" style="position:static;transform:none;animation:none" onclick="Monsters.open()">עוד סיבוב</button>
      <button class="pill" onclick="go.home()">חזרה</button></div></div></div>`);
    if (Voice.has('mon-done')) say('mon-done'); else say('yay-4');
  },
};
go.monsters = () => Monsters.open();
