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

/* Engine line id → what to say. Text is shown on screen and used by the computer voice;
   VOICE_ALIAS says which recordings to play instead. The football game is voiced by a boy:
   his recordings are kept apart from the girls' game under ids starting with 'boy/' (VOICE_PREFIX). */
const VOICE = FB.voice(buildSharedLines(), buildPluralLines());
const LINES = VOICE.lines, VOICE_ALIAS = VOICE.alias, VOICE_PREFIX = 'boy/';
