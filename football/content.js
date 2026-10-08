/* אלופי האותיות — hands the football content (football/data.js) to the shared engine (js/game.js),
   and says every engine line with the plural voice bank or a football line. */

const GAME = {
  colors: { ink: '#1f5fc4', path: '#dde9f8', path2: '#e9f1fb', dots: '#5b8fd6', dotsOff: '#bcd0ea', confetti: ['#3a7bd5', '#ffffff', '#f2c230', '#4caf6a', '#9cc3f5'] },
  autoPlace: false, // the child places every prize himself
  saveKey: 'alufim-v1', title: 'אלופי האותיות', subtitle: 'הכנה משחקית לכיתה א׳', heroAlt: 'השחקן', worksheets: false,
  text: {
    next: 'ממשיכים', find3: 'מצאו', findAll: 'מצאו את כל האותיות', writing: 'כותבים את האות', restart: 'מתחילים מחדש',
    won: 'איזה אלופים! הרווחתם', collected: 'אספתם', dress: 'בואו נלביש את השחקן!', undressAll: 'הכול חוזר לארונית', start: 'בואו<br>נשחק!',
    parentsReward: 'ו<b>פרס</b> שהשחקן לובש או שמקבל מקום במגרש', parentsHint: 'אחרי שתי טעויות מופיע רמז מנצנץ, כך שאף ילד לא נתקע.',
  },
};
const { ART, STAR_BOX, ITEMS, CUBBIES, UNITS, WORLDS } = FB;
const WRISTS = [];
const unitsOf = w => UNITS.filter(u => u.world === w);

const itemVoice = k => FB.SAME_ITEM[k] || `fb/i-${k}`;

/* Engine line id → what to say. Text is shown on screen and used by the computer voice;
   VOICE_ALIAS says which recordings to play instead. */
const LINES = {}, VOICE_ALIAS = {};
(() => {
  const shared = buildSharedLines(), fb = FB.lines(), plural = buildPluralLines();
  const use = (id, ...ids) => { VOICE_ALIAS[id] = ids; LINES[id] = [ids.map(i => (shared[i] || fb[i] || plural[i] || [''])[0]).join(' ')]; };
  Object.assign(LINES, shared, fb, plural);
  for (const k of ['home', 'wardrobe', 'wardrobe-empty', 'wardrobe-new', 'dressed', 'back-shelf']) use(k, `fb/${k}`);
  for (const k of ['not-this', 'hint', 'next-step', 'write-again', 'write-good', 'trace-start', 'place-empty', 'look-for']) use(k, `pl/${k}`);
  for (const w of WORLDS) { use(`world-${w.key}`, `fb/world-${w.key}`); use(`done-world-${w.key}`, `fb/done-world-${w.key}`); if (w.place) use(`place-${w.key}`, `fb/place-${w.key}`); }
  for (const u of UNITS) {
    for (const s of ['words', 'hunt', 'write', 'write2']) use(`${s}-${u.key}`, `pl/${s}-${u.key}`);
    use(`yes-${u.key}`, `fb/yes-${u.key}`);
    use(`done-${u.key}`, `fb/done-${u.key}`);
  }
  for (const [k, it] of Object.entries(ITEMS)) { use(`i-${k}`, itemVoice(k)); LINES[`i-${k}`] = [it.name]; }
})();
