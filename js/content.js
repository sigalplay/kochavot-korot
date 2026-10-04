/* כוכבות קוראות — all game content in one place.
   To swap in new illustrations, change the paths in ART / ITEMS / WORDS only. */

const ART = {
  star: 'assets/scene/star.png',            // the star, transparent, standing, base clothes
  starArms: 'assets/scene/star-arms.png',   // same size: only her forearms and hands, drawn over skirts and coats
  wardrobe: 'assets/scene/wardrobe.jpg',    // dressing room with the 7-cubby cabinet
  room: 'assets/scene/room.jpg',
  stage: 'assets/stage/stage-temp.svg',      // the concert stage (temporary)            // the star's dressing room (1600×1000, right side kept clear for her)
};

// Where the star stands on the 1600×1000 stage (same spot on every screen).
const STAR_BOX = { x: 1114, y: 216, w: 289, h: 739 };

/* Items. Positions are fractions of the star box:
   cx/cy = centre of the item on the star, w = width as a share of the star's width.
   snap: 'body' = clicks into place, 'wrist' = either wrist, 'free' = stays where dropped.
   layer: true = the image is the same size as star.png and already sits on her body (best fit);
   fit = where the item is inside that layer [x, y, w, h] as fractions (used for the fly-in animation). */
const ITEMS = {
  coat: { name: 'מעיל', img: 'assets/items/coat-on.png', fit: [.170, .273, .675, .225], card: 'assets/items/coat.png', cardAr: 0.825, layer: true, ar: 2.555, w: 1, cx: .5, cy: .5, z: 6, snap: 'body' },
  watch:    { name: 'שעון',   img: 'assets/items/watch.png',    ar: 1.878, w: .12, cx: .24,  cy: .558, z: 8, snap: 'wrist' },
  heart:    { name: 'לב',     img: 'assets/items/heart.png',    ar: .80,  w: .20,  cx: .50,  cy: .40,  z: 9, snap: 'free' },
  boots: { name: 'נעליים', img: 'assets/items/boots-on.png', fit: [.159, .852, .703, .148], card: 'assets/items/boots.png', cardAr: 0.957, layer: true, ar: 2.555, w: 1, cx: .5, cy: .5, z: 5, snap: 'body' },
  pin:      { name: 'סיכה',   img: 'assets/items/pin.png',      ar: .846, w: .20,  cx: .712, cy: .091, z: 9, snap: 'free' },
  bracelet: { name: 'צמיד',   img: 'assets/items/bracelet.png', ar: .772, w: .15,  cx: .774, cy: .552, z: 8, snap: 'wrist' },
  skirt: { name: 'חצאית', img: 'assets/items/skirt-on.png', fit: [.049, .438, .921, .223], card: 'assets/items/skirt.png', cardAr: 0.703, layer: true, ar: 2.555, w: 1, cx: .5, cy: .5, z: 5, snap: 'body' },
};
// Stage world: props the child places on the stage. stage = default centre (stage px) and width when placed.
Object.assign(ITEMS, {
  drums:     { world: 'stage', name: 'תופים',    img: 'assets/stage/drums.svg',     ar: .8,  stage: { x: 450, y: 640, w: 300 }, z: 10 },
  guitar:    { world: 'stage', name: 'גיטרה',    img: 'assets/stage/guitar.svg',    ar: 2.2, stage: { x: 1110, y: 620, w: 150 }, z: 11 },
  audience:  { world: 'stage', name: 'קהל',      img: 'assets/stage/audience.svg',  ar: .3,  stage: { x: 800, y: 905, w: 1150 }, z: 14 },
  fireworks: { world: 'stage', name: 'זיקוקים',  img: 'assets/stage/fireworks.svg', ar: .5,  stage: { x: 800, y: 175, w: 640 }, z: 5 },
  speaker:   { world: 'stage', name: 'רמקול',    img: 'assets/stage/speaker.svg',   ar: 1.5, stage: { x: 1380, y: 640, w: 190 }, z: 11 },
});
const STAGE_CENTER = 800; // where the star stands on the stage

const WRISTS = [{ cx: .24, cy: .558 }, { cx: .774, cy: .558 }];

// Cubby for each item in the dressing room (stage px, centre-bottom + width).
const CUBBIES = {
  skirt: { x: 234, b: 372, w: 195 }, coat: { x: 519, b: 372, w: 200 }, boots: { x: 796, b: 372, w: 175 },
  watch: { x: 198, b: 664, w: 64 },  heart: { x: 412, b: 664, w: 125 }, pin: { x: 623, b: 664, w: 130 }, bracelet: { x: 830, b: 664, w: 130 },
};

const WORDS = {
  mafteach: ['מפתח', 'assets/words/mafteach.png'], mara: ['מראה', 'assets/words/mara.png'], mitriya: ['מטרייה', 'assets/words/mitriya.png'],
  tof: ['תוף', 'assets/words/tof.png'], kadur: ['כדור', 'assets/words/kadur.png'], shaon: ['שעון', 'assets/words/shaon.png'],
  shemesh: ['שמש', 'assets/words/shemesh.png'], perach: ['פרח', 'assets/words/perach.png'], shokolad: ['שוקולד', 'assets/words/shokolad.png'],
  limon: ['לימון', 'assets/words/limon.png'], lechem: ['לחם', 'assets/words/lechem.png'], lev: ['לב', 'assets/words/lev.png'],
  ner: ['נר', 'assets/words/ner.png'], notza: ['נוצה', 'assets/words/notza.png'], nachash: ['נחש', 'assets/words/nachash.png'],
  sefer: ['ספר', 'assets/words/sefer.png'], sira: ['סירה', 'assets/words/sira.png'], sukariya: ['סוכרייה', 'assets/words/sukariya.png'],
  tzav: ['צב', 'assets/words/tzav.png'], tzalachat: ['צלחת', 'assets/words/tzalachat.png'], tzipor: ['ציפור', 'assets/words/tzipor.png'],
  tapuach: ['תפוח', 'assets/words/tapuach.svg'], tut: ['תות', 'assets/words/tut.svg'], tik: ['תיק', 'assets/words/tik.svg'],
  glida: ['גלידה', 'assets/words/glida.svg'], gamal: ['גמל', 'assets/words/gamal.svg'], gezer: ['גזר', 'assets/words/gezer.svg'],
  koof: ['קוף', 'assets/words/koof.svg'], keshet: ['קשת', 'assets/words/keshet.svg'], kaktus: ['קקטוס', 'assets/words/kaktus.svg'],
  zebra: ['זברה', 'assets/words/zebra.svg'], zer: ['זר פרחים', 'assets/words/zer.svg'], zayit: ['זית', 'assets/words/zayit.svg'],
  rakevet: ['רכבת', 'assets/words/rakevet.svg'], rimon: ['רימון', 'assets/words/rimon.svg'], robot: ['רובוט', 'assets/words/robot.svg'],
  chalon: ['חלון', 'assets/words/chalon.png'], chatul: ['חתול', 'assets/words/chatul.png'], chalav: ['חלב', 'assets/words/chalav.png'],
};

/* Writing paths: strokes in a 100×100 box (y down), in the order they are written. */
const UNITS = [
  { key: 'mem', world: 'clothes', letter: 'מ', name: 'מֵם', sound: 'מְ', item: 'coat',
    options: ['coat', 'watch', 'boots'], words: ['mafteach', 'mara', 'mitriya'], wrong: ['tof', 'kadur', 'shaon'],
    near: ['ט', 'ש', 'נ', 'ס', 'ב', 'כ', 'ת', 'ל', 'ע', 'ה'],
    strokes: [[[30, 34], [41, 47]], [[41, 47], [50, 35, 1], [73, 35, 1], [73, 58], [73, 80], [55, 80]], [[41, 49], [37, 64], [33, 80]]] },
  { key: 'shin', world: 'clothes', letter: 'ש', name: 'שִׁין', sound: 'שְׁ', item: 'watch',
    options: ['watch', 'skirt', 'boots'], words: ['shemesh', 'shaon', 'shokolad'], wrong: ['kadur', 'perach', 'mafteach'],
    near: ['ע', 'צ', 'ט', 'מ', 'ת', 'ס', 'נ', 'ב', 'ג', 'ר'],
    strokes: [[[69, 35], [69, 58], [69, 80, 1], [31, 80, 1], [31, 58], [31, 35]], [[46, 35], [46, 52], [46, 61, 1], [33, 63]]] },
  { key: 'lamed', world: 'clothes', letter: 'ל', name: 'לָמֶד', sound: 'לְ', item: 'heart',
    options: ['heart', 'watch', 'skirt'], words: ['limon', 'lechem', 'lev'], wrong: ['tof', 'shemesh', 'mafteach'],
    near: ['ר', 'ד', 'ו', 'ז', 'כ', 'ב', 'נ', 'מ', 'ת', 'ה'],
    strokes: [[[36, 23], [36, 40], [52, 40], [67, 39], [59, 60], [50, 80]]] },
  { key: 'nun', world: 'clothes', letter: 'נ', name: 'נוּן', sound: 'נְ', item: 'boots',
    options: ['boots', 'coat', 'pin'], words: ['ner', 'notza', 'nachash'], wrong: ['kadur', 'perach', 'mara'],
    near: ['ג', 'כ', 'ב', 'ו', 'ז', 'ר', 'ד', 'ל', 'מ', 'ת'],
    strokes: [[[40, 36], [56, 36, 1], [56, 52], [56, 80], [38, 80]]] },
  { key: 'samech', world: 'clothes', letter: 'ס', name: 'סָמֶךְ', sound: 'סְ', item: 'pin',
    options: ['pin', 'bracelet', 'heart'], words: ['sefer', 'sira', 'sukariya'], wrong: ['tof', 'perach', 'mitriya'],
    near: ['ט', 'ו', 'ש', 'מ', 'ע', 'ה', 'ת', 'ב', 'נ', 'פ'],
    strokes: [[[30, 36], [58, 36], [72, 36, 1], [72, 80, 1], [30, 80, 1], [30, 40]]] },
  { key: 'tsadi', world: 'clothes', letter: 'צ', name: 'צָדִי', sound: 'צְ', item: 'bracelet',
    options: ['bracelet', 'pin', 'watch'], words: ['tzav', 'tzalachat', 'tzipor'], wrong: ['kadur', 'shemesh', 'mafteach'],
    near: ['ע', 'ש', 'ט', 'מ', 'ג', 'נ', 'ב', 'ס', 'ת', 'ל'],
    strokes: [[[31, 35], [49, 55], [66, 75], [66, 80], [48, 80], [31, 80]], [[69, 35], [67, 54, 1], [54, 62]]] },
  { key: 'chet', world: 'clothes', letter: 'ח', name: 'חֵית', sound: 'חְ', item: 'skirt',
    options: ['skirt', 'coat', 'boots'], words: ['chalon', 'chatul', 'chalav'], wrong: ['shemesh', 'tof', 'mara'],
    near: ['ה', 'ת', 'ר', 'ד', 'ו', 'כ', 'ב', 'מ', 'נ', 'ל'],
    strokes: [[[28, 36], [52, 36], [66, 36, 1], [66, 56], [66, 80]], [[36, 40], [36, 60], [36, 80]]] },
  { key: 'tav', world: 'stage', letter: 'ת', name: 'תָּו', sound: 'תְּ', item: 'drums',
    options: ['drums', 'guitar', 'speaker'], words: ['tapuach', 'tut', 'tik'], wrong: ['kadur', 'perach', 'ner'],
    near: ['ח', 'ה', 'ר', 'ד', 'כ', 'ב', 'נ', 'מ', 'ו', 'ט'],
    strokes: [[[28, 38], [56, 38], [67, 38, 1], [67, 58], [67, 80]], [[39, 42], [39, 68], [39, 77, 1], [27, 77]]] },
  { key: 'gimel', world: 'stage', letter: 'ג', name: 'גִּימֶל', sound: 'גְּ', item: 'guitar',
    options: ['guitar', 'drums', 'fireworks'], words: ['glida', 'gamal', 'gezer'], wrong: ['shemesh', 'limon', 'tzav'],
    near: ['נ', 'ז', 'ו', 'ר', 'ד', 'כ', 'ב', 'פ', 'ל', 'ת'],
    strokes: [[[41, 38], [56, 38, 1], [56, 63], [59, 79]], [[51, 65], [46, 75, 1], [36, 79]]] },
  { key: 'kof', world: 'stage', letter: 'ק', name: 'קוּף', sound: 'קְ', item: 'audience',
    options: ['audience', 'speaker', 'guitar'], words: ['koof', 'keshet', 'kaktus'], wrong: ['shemesh', 'perach', 'sira'],
    near: ['ה', 'ח', 'ר', 'ף', 'ך', 'פ', 'ל', 'ת', 'ו', 'ד'],
    strokes: [[[30, 26], [52, 26], [72, 26, 1], [63, 48], [55, 70]], [[36, 45], [36, 64], [36, 82]]] },
  { key: 'zayin', world: 'stage', letter: 'ז', name: 'זַיִן', sound: 'זְ', item: 'fireworks',
    options: ['fireworks', 'drums', 'audience'], words: ['zebra', 'zer', 'zayit'], wrong: ['mafteach', 'sefer', 'chatul'],
    near: ['ו', 'ן', 'ר', 'ד', 'ג', 'נ', 'י', 'ט', 'ל', 'ת'],
    strokes: [[[39, 38], [61, 38]], [[57, 42], [48, 50, 1], [48, 62], [50, 80]]] },
  { key: 'resh', world: 'stage', letter: 'ר', name: 'רֵישׁ', sound: 'רְ', item: 'speaker',
    options: ['speaker', 'fireworks', 'guitar'], words: ['rakevet', 'rimon', 'robot'], wrong: ['limon', 'kadur', 'tzipor'],
    near: ['ד', 'ך', 'ה', 'ו', 'ז', 'כ', 'ב', 'ח', 'ת', 'נ'],
    strokes: [[[33, 38], [50, 38], [61, 38, 1], [61, 58], [61, 80]]] },
];

const WORLDS = [
  { key: 'clothes', title: 'לבוש ואביזרים', icon: 'assets/items/coat.png', place: 'wardrobe', placeName: 'חדר ההלבשה' },
  { key: 'stage', title: 'הבמה', icon: 'assets/words/tof.png', place: 'stage', placeName: 'הבמה' },
  { key: 'room', title: 'החדר', icon: 'assets/words/mara.png', soon: 3 },
  { key: 'food', title: 'האוכל', icon: 'assets/words/shokolad.png', soon: 3 },
  { key: 'gifts', title: 'המתנות', icon: 'assets/words/perach.png', soon: 4 },
];
const unitsOf = w => UNITS.filter(u => u.world === w);

/* Every spoken line. id → [text to show / record, text for the computer voice].
   Record your own voice for any line in studio.html — recordings always win. */
function buildLines() {
  const L = {
    'home': ['שלום! אני הכוכבת. בואי נבחר עולם ונתחיל לשחק!'],
    'world-clothes': ['בעולם הלבוש לכל אות יש פריט חדש בשבילי. בחרי אות!'],
    'wardrobe': ['גררי פריט מהארון אליי, ואני אלבש אותו.'],
    'wardrobe-empty': ['הארון עוד ריק. סיימי יחידה וקבלי את הפריט הראשון!'],
    'dressed': ['איזה יופי! תודה!'],
    'back-shelf': ['החזרתי לארון.'],
    'yay-1': ['יופי!'], 'yay-2': ['נכון מאוד!'], 'yay-3': ['מעולה!'], 'yay-4': ['כל הכבוד!'],
    'not-this': ['לא, זה לא מתחיל בצליל הזה. נסי שוב.'],
    'hint': ['רמז: חפשי את מה שמנצנץ.'],
    'next-step': ['ממשיכות!'],
    'write-again': ['כמעט! נסי לעבור על כל הדרך, מהכוכב עד הסוף.'],
    'write-good': ['כתבת יפה מאוד!'],
    'trace-start': ['שימי את האצבע על הכוכב.'],
    'world-done': ['הלבשת אותי מכף רגל ועד ראש! אני מוכנה לעלות לבמה!'],
    'world-stage': ['בעולם הבמה כל אות מוסיפה משהו להופעה שלי. בחרי אות!'],
    'stage': ['גררי דברים לבמה, ותסדרי לי את ההופעה!'],
    'stage-empty': ['הבמה עוד ריקה. סיימי יחידה וקבלי את הדבר הראשון להופעה!'],
    'placed': ['איזה יופי!'],
    'stage-back': ['החזרתי לארגז.'],
    'stage-done': ['הבמה מוכנה! בואי נופיע!'],
    'this-is': ['זאת האות'], 'look-for': ['ואנחנו מחפשות את האות'],
  };
  for (const [ch, key] of Object.entries(LETTER_KEYS)) L[`letter-${key}`] = [LETTER_NAMES[ch]];
  for (const u of UNITS) {
    const item = ITEMS[u.item].name;
    L[`open-${u.key}`] = [`מה מתחיל בצליל ${u.sound}?`, `מה מתחיל בצליל של האות ${u.name}?`];
    L[`words-${u.key}`] = [`מצאי שלוש תמונות שמתחילות בצליל ${u.sound}`, `מצאי שלוש תמונות שמתחילות כמו ${item}`];
    L[`hunt-${u.key}`] = [`מצאי את כל האותיות ${u.name}`];
    L[`write-${u.key}`] = [`בואי נכתוב את האות ${u.name}. מתחילות בכוכב ועוברות לאט על הדרך.`];
    L[`write2-${u.key}`] = [`עכשיו לבד! כתבי ${u.name} על האות הבהירה.`];
    L[`done-${u.key}`] = [`איזו כוכבת! למדת את האות ${u.name} והרווחת ${item}!`];
    L[`yes-${u.key}`] = [`נכון! ${u.sound}${u.sound}${item}`, `נכון! ${item} מתחיל ב${u.name}`];
    L[`name-${u.key}`] = [u.name];
    L[`sound-${u.key}`] = [u.sound, u.name];
  }
  for (const [k, [w]] of Object.entries(WORDS)) L[`w-${k}`] = [w];
  for (const [k, it] of Object.entries(ITEMS)) L[`i-${k}`] = [it.name];
  return L;
}
const LETTER_NAMES = { 'א': 'אָלֶף', 'ב': 'בֵּית', 'ג': 'גִּימֶל', 'ד': 'דָּלֶת', 'ה': 'הֵא', 'ו': 'וָו', 'ז': 'זַיִן', 'ח': 'חֵית', 'ט': 'טֵית', 'י': 'יוּד', 'כ': 'כָּף', 'ל': 'לָמֶד', 'מ': 'מֵם', 'נ': 'נוּן', 'ס': 'סָמֶךְ', 'ע': 'עַיִן', 'פ': 'פֵּא', 'צ': 'צָדִי', 'ק': 'קוּף', 'ר': 'רֵישׁ', 'ש': 'שִׁין', 'ת': 'תָּו' };
const LETTER_KEYS = { 'א': 'alef', 'ב': 'bet', 'ג': 'gimel', 'ד': 'dalet', 'ה': 'he', 'ו': 'vav', 'ז': 'zayin', 'ח': 'chet', 'ט': 'tet', 'י': 'yod', 'כ': 'kaf', 'ל': 'lamed', 'מ': 'mem', 'נ': 'nun', 'ס': 'samech', 'ע': 'ayin', 'פ': 'pe', 'צ': 'tsadi', 'ק': 'kof', 'ר': 'resh', 'ש': 'shin', 'ת': 'tav' };
const LINES = buildLines();
