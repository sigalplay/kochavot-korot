/* כוכבות קוראות — all game content in one place.
   To swap in new illustrations, change the paths in ART / ITEMS / WORDS only. */

const ART = {
  star: 'assets/scene/star.png',            // the star, transparent, standing, base clothes
  starArms: 'assets/scene/star-arms.png',   // same size: only her forearms and hands, drawn over skirts and coats
  room: 'assets/scene/room.jpg',            // the star's dressing room (1600×1000, right side kept clear for her)
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
const WRISTS = [{ cx: .24, cy: .558 }, { cx: .774, cy: .558 }];

// Cubby for each item in the dressing room (stage px, centre-bottom + width).
const CUBBIES = {
  skirt: { x: 230, b: 450, w: 190 }, coat: { x: 535, b: 450, w: 210 }, boots: { x: 840, b: 450, w: 170 },
  watch: { x: 192, b: 850, w: 70 },  heart: { x: 422, b: 850, w: 130 }, pin: { x: 652, b: 850, w: 140 }, bracelet: { x: 882, b: 850, w: 140 },
};
// the glowing cabinet in the dressing room: [x, y, w, h] per cubby (top row 3, bottom row 4)
const CABINET = [[90, 150, 280, 330], [395, 150, 280, 330], [700, 150, 280, 330], [90, 540, 205, 330], [320, 540, 205, 330], [550, 540, 205, 330], [780, 540, 205, 330]];

const WORDS = {
  mafteach: ['מפתח', 'assets/words/mafteach.png'], mara: ['מראה', 'assets/words/mara.png'], mitriya: ['מטרייה', 'assets/words/mitriya.png'],
  tof: ['תוף', 'assets/words/tof.png'], kadur: ['כדור', 'assets/words/kadur.png'], shaon: ['שעון', 'assets/words/shaon.png'],
  shemesh: ['שמש', 'assets/words/shemesh.png'], perach: ['פרח', 'assets/words/perach.png'], shokolad: ['שוקולד', 'assets/words/shokolad.png'],
  limon: ['לימון', 'assets/words/limon.png'], lechem: ['לחם', 'assets/words/lechem.png'], lev: ['לב', 'assets/words/lev.png'],
  ner: ['נר', 'assets/words/ner.png'], notza: ['נוצה', 'assets/words/notza.png'], nachash: ['נחש', 'assets/words/nachash.png'],
  sefer: ['ספר', 'assets/words/sefer.png'], sira: ['סירה', 'assets/words/sira.png'], sukariya: ['סוכרייה', 'assets/words/sukariya.png'],
  tzav: ['צב', 'assets/words/tzav.png'], tzalachat: ['צלחת', 'assets/words/tzalachat.png'], tzipor: ['ציפור', 'assets/words/tzipor.png'],
  chalon: ['חלון', 'assets/words/chalon.png'], chatul: ['חתול', 'assets/words/chatul.png'], chalav: ['חלב', 'assets/words/chalav.png'],
};

/* Writing paths: strokes in a 100×100 box (y down), in the order they are written. */
const UNITS = [
  { key: 'mem', letter: 'מ', name: 'מֵם', sound: 'מְ', item: 'coat',
    options: ['coat', 'watch', 'boots'], words: ['mafteach', 'mara', 'mitriya'], wrong: ['tof', 'kadur', 'shaon'],
    near: ['ט', 'ש', 'נ', 'ס', 'ב', 'כ', 'ת', 'ל', 'ע', 'ה'],
    strokes: [[[30, 34], [41, 47]], [[41, 47], [50, 35, 1], [73, 35, 1], [73, 58], [73, 80], [55, 80]], [[41, 49], [37, 64], [33, 80]]] },
  { key: 'shin', letter: 'ש', name: 'שִׁין', sound: 'שְׁ', item: 'watch',
    options: ['watch', 'skirt', 'boots'], words: ['shemesh', 'shaon', 'shokolad'], wrong: ['kadur', 'perach', 'mafteach'],
    near: ['ע', 'צ', 'ט', 'מ', 'ת', 'ס', 'נ', 'ב', 'ג', 'ר'],
    strokes: [[[69, 35], [69, 58], [69, 80, 1], [31, 80, 1], [31, 58], [31, 35]], [[46, 35], [46, 52], [46, 61, 1], [33, 63]]] },
  { key: 'lamed', letter: 'ל', name: 'לָמֶד', sound: 'לְ', item: 'heart',
    options: ['heart', 'watch', 'skirt'], words: ['limon', 'lechem', 'lev'], wrong: ['tof', 'shemesh', 'mafteach'],
    near: ['ר', 'ד', 'ו', 'ז', 'כ', 'ב', 'נ', 'מ', 'ת', 'ה'],
    strokes: [[[36, 23], [36, 40], [52, 40], [67, 39], [59, 60], [50, 80]]] },
  { key: 'nun', letter: 'נ', name: 'נוּן', sound: 'נְ', item: 'boots',
    options: ['boots', 'coat', 'pin'], words: ['ner', 'notza', 'nachash'], wrong: ['kadur', 'perach', 'mara'],
    near: ['ג', 'כ', 'ב', 'ו', 'ז', 'ר', 'ד', 'ל', 'מ', 'ת'],
    strokes: [[[40, 36], [56, 36, 1], [56, 52], [56, 80], [38, 80]]] },
  { key: 'samech', letter: 'ס', name: 'סָמֶךְ', sound: 'סְ', item: 'pin',
    options: ['pin', 'bracelet', 'heart'], words: ['sefer', 'sira', 'sukariya'], wrong: ['tof', 'perach', 'mitriya'],
    near: ['ט', 'ו', 'ש', 'מ', 'ע', 'ה', 'ת', 'ב', 'נ', 'פ'],
    strokes: [[[30, 36], [58, 36], [72, 36, 1], [72, 80, 1], [30, 80, 1], [30, 40]]] },
  { key: 'tsadi', letter: 'צ', name: 'צָדִי', sound: 'צְ', item: 'bracelet',
    options: ['bracelet', 'pin', 'watch'], words: ['tzav', 'tzalachat', 'tzipor'], wrong: ['kadur', 'shemesh', 'mafteach'],
    near: ['ע', 'ש', 'ט', 'מ', 'ג', 'נ', 'ב', 'ס', 'ת', 'ל'],
    strokes: [[[31, 35], [49, 55], [66, 75], [66, 80], [48, 80], [31, 80]], [[69, 35], [67, 54, 1], [54, 62]]] },
  { key: 'chet', letter: 'ח', name: 'חֵית', sound: 'חְ', item: 'skirt',
    options: ['skirt', 'coat', 'boots'], words: ['chalon', 'chatul', 'chalav'], wrong: ['shemesh', 'tof', 'mara'],
    near: ['ה', 'ת', 'ר', 'ד', 'ו', 'כ', 'ב', 'מ', 'נ', 'ל'],
    strokes: [[[28, 36], [52, 36], [66, 36, 1], [66, 56], [66, 80]], [[36, 40], [36, 60], [36, 80]]] },
];

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
    'this-is': ['זאת האות'], 'look-for': ['ואנחנו מחפשות את האות'],
  };
  for (const [ch, key] of Object.entries(LETTER_KEYS)) L[`letter-${key}`] = [LETTER_NAMES[ch]];
  for (const u of UNITS) {
    const item = ITEMS[u.item].name;
    L[`open-${u.key}`] = [`איזה פריט מתחיל בצליל ${u.sound}?`, `איזה פריט מתחיל בצליל של האות ${u.name}?`];
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
