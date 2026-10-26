/* מפלצות האותיות — a letter-practice game for כוכבות קוראות.
   Cute monsters crowd the stage, each holding a letter. "פגעי במפלצת עם האות מֵם": the star sends a beam of
   music and light at the right one, and it bursts into sparkles. Every round practises the letters the child
   has met least, so over a few rounds all 22 letters come up. The monsters are drawn here (SVG) until
   illustrated ones arrive. */

const Monsters = {
  ROUND: 8,
  SPOTS: [{ x: 260, y: 470 }, { x: 560, y: 560 }, { x: 860, y: 470 }],
  COLORS: [['#b69add', '#8c6cc0'], ['#7fd1c2', '#4fa996'], ['#f6a7c1', '#d97a9d'], ['#ffc96b', '#e0a13d'], ['#8fc1f0', '#5e95cf']],
  open() {
    this.hits = 0; this.turn = 0;
    state.mon ||= {};
    const keys = shuffle(Object.keys(LETTERS)).sort((a, b) => (state.mon[a] || 0) - (state.mon[b] || 0));
    this.round = keys.slice(0, this.ROUND);
    screen(`${topbar({ title: 'מפלצות האותיות' })}
      <div class="mon-score" id="monScore"></div>
      <div class="mon-call" id="monCall"></div>
      <div id="monField"></div>${starHTML()}`, { bg: ART.stage });
    stage.querySelector('.veil')?.remove();
    this.showScore();
    say('mon-intro');
    setTimeout(() => this.next(), 2800);
  },
  showScore() { $('#monScore').innerHTML = `✨ ${this.hits} <small>מפלצות</small> · ${Math.min(this.turn + 1, this.ROUND)} מתוך ${this.ROUND}`; },
  // a round, friendly monster: soft body, little horns, big eyes, a smile, and the letter on its tummy
  monsterSVG(i) {
    const [c, d] = this.COLORS[i % this.COLORS.length];
    return `<svg viewBox="0 0 200 220" class="mon-body">
      <path d="M58 52 L46 14 L84 40Z M142 52 L154 14 L116 40Z" fill="${d}" stroke="#4a3550" stroke-width="5" stroke-linejoin="round"/>
      <path d="M100 30 C160 30 188 80 188 135 C188 190 150 212 100 212 C50 212 12 190 12 135 C12 80 40 30 100 30Z" fill="${c}" stroke="#4a3550" stroke-width="6"/>
      <path d="M30 150 C10 140 8 120 18 110 M170 150 C190 140 192 120 182 110" fill="none" stroke="#4a3550" stroke-width="7" stroke-linecap="round"/>
      <circle cx="72" cy="88" r="20" fill="#fff" stroke="#4a3550" stroke-width="4"/><circle cx="128" cy="88" r="20" fill="#fff" stroke="#4a3550" stroke-width="4"/>
      <circle class="pupil" cx="76" cy="92" r="9" fill="#2e2238"/><circle class="pupil" cx="132" cy="92" r="9" fill="#2e2238"/>
      <circle cx="79" cy="88" r="3" fill="#fff"/><circle cx="135" cy="88" r="3" fill="#fff"/>
      <path class="mouth" d="M84 118 Q100 130 116 118" fill="none" stroke="#4a3550" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 122 L95 128 L98 123 M102 123 L105 128 L108 122" fill="#fff" stroke="#4a3550" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="50" cy="108" rx="11" ry="7" fill="#ff8fb3" opacity=".6"/><ellipse cx="150" cy="108" rx="11" ry="7" fill="#ff8fb3" opacity=".6"/>
    </svg>`;
  },
  next() {
    if (this.turn >= this.ROUND) return this.finish();
    const key = this.round[this.turn], L = LETTERS[key];
    const near = shuffle(L.near.filter(ch => LETTER_KEYS[ch] && ch !== L.letter)).slice(0, 2);
    this.key = key; this.misses = 0; this.busy = false;
    const letters = shuffle([L.letter, ...near]), first = Math.floor(Math.random() * 5);
    $('#monField').innerHTML = letters.map((ch, i) => { const p = this.SPOTS[i];
      return `<button class="mon arrive" data-ch="${ch}" style="left:${p.x - 110}px;top:${p.y - 120}px;animation-delay:${i * .12}s" aria-label="${ch}">
        ${this.monsterSVG(first + i)}<b>${ch}</b></button>`; }).join('');
    stage.querySelectorAll('.mon').forEach(m => m.addEventListener('pointerdown', e => { e.preventDefault(); this.hit(m); }));
    $('#monCall').innerHTML = `פגעי במפלצת עם האות <b>${L.letter}</b>`;
    this.showScore();
    prompt(['mon-hit', `name-${key}`]);
  },
  // the star sends a beam of light from her hand to the monster
  beam(to, good) {
    const s = rectOf($('#star')), from = { x: s.x + s.w * .22, y: s.y + s.h * .5 };
    const b = document.createElement('div'); b.className = 'mon-beam' + (good ? '' : ' miss');
    const dx = to.x - from.x, dy = to.y - from.y, len = Math.hypot(dx, dy);
    Object.assign(b.style, { left: from.x + 'px', top: from.y + 'px', width: len + 'px', transform: `rotate(${Math.atan2(dy, dx)}rad)` });
    stage.appendChild(b); setTimeout(() => b.remove(), 600);
    for (let i = 1; i <= 4; i++) setTimeout(() => sparkle(from.x + dx * i / 4, from.y + dy * i / 4, 5), i * 60);
  },
  hit(m) {
    if (this.busy || m.classList.contains('gone')) return;
    this.busy = true; Sfx.fly(); hop();
    const L = LETTERS[this.key], right = m.dataset.ch === L.letter, r = rectOf(m), to = { x: r.x + r.w / 2, y: r.y + r.h / 2 };
    this.beam(to, right);
    setTimeout(() => {
      if (right) {
        this.hits++; state.mon[this.key] = (state.mon[this.key] || 0) + 1; save();
        m.classList.add('poof'); Sfx.done(); sparkle(to.x, to.y, 30);
        stage.querySelectorAll('.mon:not(.poof)').forEach(o => o.classList.add('flee'));
        say('mon-yes', `name-${this.key}`);
        setTimeout(() => { this.turn++; this.next(); }, 2300);
      } else {
        this.misses++; Sfx.soft(); m.classList.remove('tease'); void m.offsetWidth; m.classList.add('tease');
        if (this.misses >= 2) stage.querySelector(`.mon[data-ch="${L.letter}"]`)?.classList.add('hint');
        say('this-is', `letter-${LETTER_KEYS[m.dataset.ch]}`, 'mon-again'); this.busy = false;
      }
    }, 380);
  },
  finish() {
    $('#monField').innerHTML = ''; $('#monCall').innerHTML = ''; this.turn = this.ROUND - 1; this.showScore();
    confetti(); Sfx.done(); hop();
    stage.insertAdjacentHTML('beforeend', `<div class="overlay"><div class="sheet" style="text-align:center">
      <h2>✨ הבמה נקייה!</h2><p style="font-size:40px;margin:10px 0 24px">ניצחת <b>${this.hits}</b> מפלצות</p>
      <div class="row" style="justify-content:center"><button class="next" style="position:static;transform:none;animation:none" onclick="Monsters.open()">עוד סיבוב</button>
      <button class="pill" onclick="go.home()">חזרה</button></div></div></div>`);
    say('mon-done');
  },
};
go.monsters = () => Monsters.open();
