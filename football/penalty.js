/* פנדלים — a letter-practice game for אלופי האותיות.
   "בעטו בכדור עם האות מֵם": three balls lie on the grass, each with a letter; kicking the right one scores a goal.
   Every round practises the letters the child has kicked least, so over a few rounds all 22 letters come up. */

const Penalty = {
  KICKS: 8,
  BALLS: [{ x: 470, y: 745 }, { x: 760, y: 765 }, { x: 1050, y: 745 }],   // on the grass, in front of the goal
  GOAL: { x: 470, y: 250, w: 580, h: 300 },   // the goal mouth on the 1600×1000 stage
  open() {
    this.score = 0; this.kick = 0; this.misses = 0;
    // the letters kicked least so far come first, so every letter gets its turn
    this.round = Practice.plan('pen', this.KICKS);   // hard letters first, then the least practised
    screen(`${topbar({ title: 'פנדלים' })}
      <img class="bg pen-layer" src="football/assets/stadium/grass-on.png" alt="">
      <img class="bg pen-layer pen-fans" src="football/assets/stadium/fans-on.png" alt="">
      ${this.goalSVG()}
      <div class="pen-score" id="penScore"></div>
      <div class="pen-call" id="penCall"></div>
      <div id="penBalls"></div>${starHTML()}`, { bg: 'football/assets/stadium/base.jpg' });
    stage.querySelector('.veil')?.remove();
    this.showScore();
    say('fb/pen-intro');
    setTimeout(() => this.next(), 2600);
  },
  goalSVG() {
    const { x, y, w, h } = this.GOAL, net = [];
    for (let i = 1; i < 16; i++) net.push(`<line x1="${i * w / 16}" y1="0" x2="${i * w / 16}" y2="${h}"/>`);
    for (let i = 1; i < 9; i++) net.push(`<line x1="0" y1="${i * h / 9}" x2="${w}" y2="${i * h / 9}"/>`);
    return `<svg class="pen-goal" id="penGoal" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px" viewBox="-14 -14 ${w + 28} ${h + 14}">
      <rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff22"/><g stroke="#ffffffaa" stroke-width="2">${net.join('')}</g>
      <path d="M0 ${h} V0 H${w} V${h}" fill="none" stroke="#2b2b35" stroke-width="22" stroke-linejoin="round"/>
      <path d="M0 ${h} V0 H${w} V${h}" fill="none" stroke="#fff" stroke-width="15" stroke-linejoin="round"/></svg>`;
  },
  showScore() { $('#penScore').innerHTML = `⚽ ${this.score} <small>גולים</small> · בעיטה ${Math.min(this.kick + 1, this.round.length)} מתוך ${this.round.length}`; },
  next() {
    if (this.kick >= this.round.length) return this.finish();
    const key = this.round[this.kick], L = LETTERS[key];
    const near = shuffle(L.near.filter(ch => LETTER_KEYS[ch] && ch !== L.letter)).slice(0, 2);
    this.key = key; this.misses = 0; this.busy = false;
    const letters = shuffle([L.letter, ...near]);
    $('#penBalls').innerHTML = letters.map((ch, i) => { const p = this.BALLS[i];
      return `<button class="pen-ball arrive" data-ch="${ch}" style="left:${p.x - 70}px;top:${p.y - 70}px" aria-label="${ch}"><img src="football/assets/field/ball.png" alt=""><b>${ch}</b></button>`; }).join('');
    stage.querySelectorAll('.pen-ball').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); this.shoot(b); }));
    $('#penCall').innerHTML = `בעטו בכדור עם האות <b>${L.letter}</b>`;
    this.showScore();
    prompt(['fb/pen-kick', `name-${key}`]);
  },
  shoot(ball) {
    if (this.busy || ball.classList.contains('out')) return;
    this.busy = true; Sfx.tap();
    const L = LETTERS[this.key], right = ball.dataset.ch === L.letter, g = this.GOAL, r = rectOf(ball);
    const to = right ? { x: g.x + 90 + Math.random() * (g.w - 180), y: g.y + 70 + Math.random() * (g.h - 140) }
                     : { x: Math.random() < .5 ? g.x - 160 : g.x + g.w + 160, y: g.y - 120 };
    ball.classList.remove('arrive');
    ball.style.transform = `translate(${to.x - (r.x + r.w / 2)}px,${to.y - (r.y + r.h / 2)}px) scale(.45) rotate(540deg)`;
    ball.classList.add('flying');
    setTimeout(() => {
      if (right) {
        this.score++; Practice.done('pen', this.key, this.misses, this.round, this.kick);
        $('#penGoal').classList.add('shake'); Sfx.done(); hop(); sparkle(to.x, to.y, 26); confetti();
        say('fb/pen-goal', `name-${this.key}`);
        setTimeout(() => { this.kick++; this.next(); }, 2300);
      } else {
        this.misses++; Sfx.soft(); ball.classList.add('out');
        const ids = ['this-is', `letter-${LETTER_KEYS[ball.dataset.ch]}`, 'fb/pen-again'];
        if (this.misses >= 2) stage.querySelector(`.pen-ball[data-ch="${L.letter}"]`)?.classList.add('hint');
        say(...ids); this.busy = false;
      }
    }, 650);
  },
  finish() {
    $('#penBalls').innerHTML = ''; $('#penCall').innerHTML = ''; this.kick = this.round.length - 1; this.showScore();
    confetti(); Sfx.done(); hop();
    stage.insertAdjacentHTML('beforeend', `<div class="overlay" id="penEnd"><div class="sheet" style="text-align:center">
      <h2>⚽ איזה אלופים!</h2><p style="font-size:40px;margin:10px 0 24px">כבשתם <b>${this.score}</b> גולים</p>
      <div class="row" style="justify-content:center"><button class="next" style="position:static;transform:none;animation:none" onclick="Penalty.open()">עוד פנדלים</button>
      <button class="pill" onclick="go.home()">חזרה</button></div></div></div>`);
    say('fb/pen-done');
  },
};
go.penalty = () => Penalty.open();
