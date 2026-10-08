/* Shared by every game: the 22 letters (names, sounds, look-alikes, the way each one is written)
   and the word pictures used to practise each opening sound. Each game picks its own reward items. */

const WORDS = {
  mafteach: ['מפתח', 'assets/words/mafteach.png'],
  mara: ['מראה', 'assets/words/mara.png'],
  mitriya: ['מטרייה', 'assets/words/mitriya.png'],
  tof: ['תוף', 'assets/words/tof.png'],
  kadur: ['כדור', 'assets/words/kadur.png'],
  shaon: ['שעון', 'assets/words/shaon.png'],
  shemesh: ['שמש', 'assets/words/shemesh.png'],
  perach: ['פרח', 'assets/words/perach.png'],
  shokolad: ['שוקולד', 'assets/words/shokolad.png'],
  limon: ['לימון', 'assets/words/limon.png'],
  lechem: ['לחם', 'assets/words/lechem.png'],
  lev: ['לב', 'assets/words/lev.png'],
  ner: ['נר', 'assets/words/ner.png'],
  notza: ['נוצה', 'assets/words/notza.png'],
  nachash: ['נחש', 'assets/words/nachash.png'],
  sefer: ['ספר', 'assets/words/sefer.png'],
  sira: ['סירה', 'assets/words/sira.png'],
  sukariya: ['סוכרייה', 'assets/words/sukariya.png'],
  tzav: ['צב', 'assets/words/tzav.png'],
  tzalachat: ['צלחת', 'assets/words/tzalachat.png'],
  tzipor: ['ציפור', 'assets/words/tzipor.png'],
  tapuach: ['תפוח', 'assets/words/tapuach.png'],
  tut: ['תות', 'assets/words/tut.png'],
  tik: ['תיק', 'assets/words/tik.png'],
  glida: ['גלידה', 'assets/words/glida.png'],
  gamal: ['גמל', 'assets/words/gamal.png'],
  gezer: ['גזר', 'assets/words/gezer.png'],
  koof: ['קוף', 'assets/words/koof.png'],
  keshet: ['קשת', 'assets/words/keshet.png'],
  kaktus: ['קקטוס', 'assets/words/kaktus.png'],
  zebra: ['זברה', 'assets/words/zebra.png'],
  zer: ['זר פרחים', 'assets/words/zer.png'],
  zayit: ['זית', 'assets/words/zayit.png'],
  rakevet: ['רכבת', 'assets/words/rakevet.png'],
  rimon: ['רימון', 'assets/words/rimon.png'],
  robot: ['רובוט', 'assets/words/robot.png'],
  dag: ['דג', 'assets/words/dag.png'],
  dvora: ['דבורה', 'assets/words/dvora.png'],
  dubi: ['דובי', 'assets/words/dubi.png'],
  vered: ['ורד', 'assets/words/vered.png'],
  vafel: ['ופל', 'assets/words/vafel.png'],
  veterinarit: ['וטרינרית', 'assets/words/veterinarit.png'],
  telefon: ['טלפון', 'assets/words/telefon.png'],
  traktor: ['טרקטור', 'assets/words/traktor.png'],
  tavas: ['טווס', 'assets/words/tavas.png'],
  yona: ['יונה', 'assets/words/yona.png'],
  yanshuf: ['ינשוף', 'assets/words/yanshuf.png'],
  yalkut: ['ילקוט', 'assets/words/yalkut.png'],
  har: ['הר', 'assets/words/har.png'],
  hipopotam: ['היפופוטם', 'assets/words/hipopotam.png'],
  helikopter: ['הליקופטר', 'assets/words/helikopter.png'],
  arye: ['אריה', 'assets/words/arye.png'],
  avatiach: ['אבטיח', 'assets/words/avatiach.png'],
  otobus: ['אוטובוס', 'assets/words/otobus.png'],
  uga: ['עוגה', 'assets/words/uga.png'],
  achbar: ['עכבר', 'assets/words/achbar.png'],
  anan: ['ענן', 'assets/words/anan.png'],
  banana: ['בננה', 'assets/words/banana.png'],
  barvaz: ['ברווז', 'assets/words/barvaz.png'],
  bayit: ['בית', 'assets/words/bayit.png'],
  pil: ['פיל', 'assets/words/pil.png'],
  parpar: ['פרפר', 'assets/words/parpar.png'],
  pinguin: ['פינגווין', 'assets/words/pinguin.png'],
  kelev: ['כלב', 'assets/words/kelev.png'],
  kochav: ['כוכב', 'assets/words/kochav.png'],
  kos: ['כוס', 'assets/words/kos.png'],
  chalon: ['חלון', 'assets/words/chalon.png'],
  chatul: ['חתול', 'assets/words/chatul.png'],
  chalav: ['חלב', 'assets/words/chalav.png'],
};

/* Writing paths: strokes in a 100×100 box (y down), in the order they are written.
   words = three pictures that start with the sound, wrong = three that don't, near = look-alike letters for the hunt. */
const LETTERS = {
  mem: { letter: 'מ', name: 'מֵם', sound: 'מְ', words: ['mafteach','mara','mitriya'], wrong: ['tof','kadur','shaon'],
    near: ['ט','ש','נ','ס','ב','כ','ת','ל','ע','ה'],
    strokes: [[[41, 47], [50, 35, 1], [73, 35, 1], [73, 58], [73, 80], [55, 80]], [[41, 49], [37, 64], [33, 80]], [[30, 34], [41, 47]]] }, // the small slanted line comes last
  shin: { letter: 'ש', name: 'שִׁין', sound: 'שְׁ', words: ['shemesh','shaon','shokolad'], wrong: ['kadur','perach','mafteach'],
    near: ['ע','צ','ט','מ','ת','ס','נ','ב','ג','ר'],
    strokes: [[[69, 35], [69, 58], [69, 80, 1], [31, 80, 1], [31, 58], [31, 35]], [[46, 35], [46, 52], [46, 61, 1], [33, 63]]] },
  lamed: { letter: 'ל', name: 'לָמֶד', sound: 'לְ', words: ['limon','lechem','lev'], wrong: ['tof','shemesh','mafteach'],
    near: ['ר','ד','ו','ז','כ','ב','נ','מ','ת','ה'],
    strokes: [[[36, 23], [36, 40], [52, 40], [67, 39], [59, 60], [50, 80]]] },
  nun: { letter: 'נ', name: 'נוּן', sound: 'נְ', words: ['ner','notza','nachash'], wrong: ['kadur','perach','mara'],
    near: ['ג','כ','ב','ו','ז','ר','ד','ל','מ','ת'],
    strokes: [[[40, 36], [56, 36, 1], [56, 52], [56, 80], [38, 80]]] },
  samech: { letter: 'ס', name: 'סָמֶךְ', sound: 'סְ', words: ['sefer','sira','sukariya'], wrong: ['tof','perach','mitriya'],
    near: ['ט','ו','ש','מ','ע','ה','ת','ב','נ','פ'],
    strokes: [[[30, 36], [58, 36], [72, 36, 1], [72, 80, 1], [30, 80, 1], [30, 40]]] },
  tsadi: { letter: 'צ', name: 'צָדִי', sound: 'צְ', words: ['tzav','tzalachat','tzipor'], wrong: ['kadur','shemesh','mafteach'],
    near: ['ע','ש','ט','מ','ג','נ','ב','ס','ת','ל'],
    strokes: [[[31, 35], [49, 55], [66, 75], [66, 80], [48, 80], [31, 80]], [[69, 35], [67, 54, 1], [54, 62]]] },
  chet: { letter: 'ח', name: 'חֵית', sound: 'חְ', words: ['chalon','chatul','chalav'], wrong: ['shemesh','tof','mara'],
    near: ['ה','ת','ר','ד','ו','כ','ב','מ','נ','ל'],
    strokes: [[[28, 36], [52, 36], [66, 36, 1], [66, 56], [66, 80]], [[36, 40], [36, 60], [36, 80]]] },
  tav: { letter: 'ת', name: 'תָּו', sound: 'תְּ', words: ['tapuach','tut','tik'], wrong: ['kadur','perach','ner'],
    near: ['ח','ה','ר','ד','כ','ב','נ','מ','ו','ט'],
    strokes: [[[28, 38], [56, 38], [67, 38, 1], [67, 58], [67, 80]], [[39, 42], [39, 68], [39, 77, 1], [27, 77]]] },
  gimel: { letter: 'ג', name: 'גִּימֶל', sound: 'גְּ', words: ['glida','gamal','gezer'], wrong: ['shemesh','limon','tzav'],
    near: ['נ','ז','ו','ר','ד','כ','ב','פ','ל','ת'],
    strokes: [[[41, 38], [56, 38, 1], [56, 63], [59, 79]], [[51, 65], [46, 75, 1], [36, 79]]] },
  kof: { letter: 'ק', name: 'קוּף', sound: 'קְ', words: ['koof','keshet','kaktus'], wrong: ['shemesh','perach','sira'],
    near: ['ה','ח','ר','ף','ך','פ','ל','ת','ו','ד'],
    strokes: [[[30, 26], [52, 26], [72, 26, 1], [63, 48], [55, 70]], [[36, 45], [36, 64], [36, 82]]] },
  zayin: { letter: 'ז', name: 'זַיִן', sound: 'זְ', words: ['zebra','zer','zayit'], wrong: ['mafteach','sefer','chatul'],
    near: ['ו','ן','ר','ד','ג','נ','י','ט','ל','ת'],
    strokes: [[[39, 38], [61, 38]], [[57, 42], [48, 50, 1], [48, 62], [50, 80]]] },
  resh: { letter: 'ר', name: 'רֵישׁ', sound: 'רְ', words: ['rakevet','rimon','robot'], wrong: ['limon','kadur','tzipor'],
    near: ['ד','ך','ה','ו','ז','כ','ב','ח','ת','נ'],
    strokes: [[[33, 38], [50, 38], [61, 38, 1], [61, 58], [61, 80]]] },
  dalet: { letter: 'ד', name: 'דָּלֶת', sound: 'דְּ', words: ['dag','dvora','dubi'], wrong: ['kadur','perach','ner'],
    near: ['ר','ך','ה','ו','ז','כ','ב','ח','ת','נ'],
    strokes: [[[31, 38], [50, 38], [69, 38]], [[57, 41], [57, 60], [57, 80]]] },
  vav: { letter: 'ו', name: 'וָו', sound: 'וְ', words: ['vered','vafel','veterinarit'], wrong: ['kadur','shemesh','tzav'],
    near: ['ז','ן','י','ר','ד','נ','ג','ט','ל','ת'],
    strokes: [[[42, 38], [52, 38, 1], [52, 58], [52, 80]]] },
  tet: { letter: 'ט', name: 'טֵית', sound: 'טְ', words: ['telefon','traktor','tavas'], wrong: ['shemesh','perach','limon'],
    near: ['מ','ש','ע','צ','ס','ב','נ','ת','ה','פ'],
    strokes: [[[32, 36], [32, 61], [32, 80, 1], [67, 80, 1], [67, 49], [67, 38, 1], [53, 38], [53, 43]]] },
  yod: { letter: 'י', name: 'יוּד', sound: 'יְ', words: ['yona','yanshuf','yalkut'], wrong: ['kadur','perach','shemesh'],
    near: ['ו','ז','ן','ר','ד','נ','ג','ט','ל','ת'],
    strokes: [[[42, 38], [52, 38, 1], [52, 50], [52, 60]]] },
  he: { letter: 'ה', name: 'הֵא', sound: 'הְ', words: ['har','hipopotam','helikopter'], wrong: ['kadur','sira','limon'],
    near: ['ח','ת','ר','ד','כ','ק','ב','פ','ו','ן'],
    strokes: [[[30, 38], [50, 38], [66, 38, 1], [66, 58], [66, 80]], [[35, 55], [35, 68], [35, 80]]] },
  alef: { letter: 'א', name: 'אָלֶף', sound: 'אְ', words: ['arye','avatiach','otobus'], wrong: ['shemesh','kadur','tzav'],
    near: ['ע','צ','ט','מ','ש','ג','נ','ב','ס','ה'],
    strokes: [[[32, 35], [50, 57], [68, 79]], [[67, 35], [64, 47], [57, 54]], [[42, 52], [33, 62, 1], [31, 79]]] },
  ayin: { letter: 'ע', name: 'עַיִן', sound: 'עְ', words: ['uga','achbar','anan'], wrong: ['kadur','perach','sira'],
    near: ['צ','ש','ט','מ','א','ג','נ','ב','ס','ת'],
    strokes: [[[44, 35], [47, 53], [50, 71]], [[66, 35], [64, 56], [61, 73, 1], [29, 79]]] },
  bet: { letter: 'ב', name: 'בֵּית', sound: 'בְּ', words: ['banana','barvaz','bayit'], wrong: ['kadur','shemesh','limon'],
    near: ['כ','נ','ג','פ','מ','ר','ד','ת','ו','ה'],
    strokes: [[[33, 38], [50, 38], [60, 38, 1], [60, 60], [60, 79]], [[70, 79], [50, 79], [30, 79]]] },
  pe: { letter: 'פ', name: 'פֵּא', sound: 'פְּ', words: ['pil','parpar','pinguin'], wrong: ['kadur','shemesh','sira'],
    near: ['ב','כ','ר','ד','ה','ק','ס','ו','נ','ת'],
    strokes: [[[46, 57], [36, 55, 1], [37, 38, 1], [69, 38, 1], [69, 62], [69, 79, 1], [31, 79]]] },
  kaf: { letter: 'כ', name: 'כָּף', sound: 'כְּ', words: ['kochav','kelev','kos'], wrong: ['shemesh','perach','sira'],
    near: ['ב','נ','פ','ג','מ','ר','ד','ת','ק','ה'],
    strokes: [[[33, 38], [52, 38], [66, 38, 1], [66, 79, 1], [52, 79], [33, 79]]] },
};

const LETTER_NAMES = { 'א': 'אָלֶף', 'ב': 'בֵּית', 'ג': 'גִּימֶל', 'ד': 'דָּלֶת', 'ה': 'הֵא', 'ו': 'וָו', 'ז': 'זַיִן', 'ח': 'חֵית', 'ט': 'טֵית', 'י': 'יוּד', 'כ': 'כָּף', 'ל': 'לָמֶד', 'מ': 'מֵם', 'נ': 'נוּן', 'ס': 'סָמֶךְ', 'ע': 'עַיִן', 'פ': 'פֵּא', 'צ': 'צָדִי', 'ק': 'קוּף', 'ר': 'רֵישׁ', 'ש': 'שִׁין', 'ת': 'תָּו' };
const LETTER_KEYS = { 'א': 'alef', 'ב': 'bet', 'ג': 'gimel', 'ד': 'dalet', 'ה': 'he', 'ו': 'vav', 'ז': 'zayin', 'ח': 'chet', 'ט': 'tet', 'י': 'yod', 'כ': 'kaf', 'ל': 'lamed', 'מ': 'mem', 'נ': 'nun', 'ס': 'samech', 'ע': 'ayin', 'פ': 'pe', 'צ': 'tsadi', 'ק': 'kof', 'ר': 'resh', 'ש': 'shin', 'ת': 'tav' };

/* Lines that sound the same in every game (no boy/girl wording), recorded once. */
function buildSharedLines() {
  const L = {
    'yay-1': ['יופי!'], 'yay-2': ['נכון מאוד!'], 'yay-3': ['מעולה!'], 'yay-4': ['כל הכבוד!'],
    'placed': ['איזה יופי!'], 'place-back': ['החזרתי לארגז.'], 'this-is': ['זאת האות'],
    'write-on-letter': ['אופס, יצאנו מהאות. נכתוב שוב, הפעם על האות עצמה.'],
  };
  for (const [ch, key] of Object.entries(LETTER_KEYS)) L[`letter-${key}`] = [LETTER_NAMES[ch]];
  for (const [key, u] of Object.entries(LETTERS)) {
    L[`open-${key}`] = [`מה מתחיל בצליל ${u.sound}?`, `מה מתחיל בצליל של האות ${u.name}?`];
    L[`name-${key}`] = [u.name];
    L[`sound-${key}`] = [u.sound, u.name];
  }
  for (const [k, [w]] of Object.entries(WORDS)) L[`w-${k}`] = [w];
  return L;
}

/* The plural bank (לשון רבים): instructions and feedback that speak to the child, for every game after the first.
   Recorded once, shared by all characters. Lines that are already neutral (letter names, words, "יופי!") are reused as is. */
function buildPluralLines() {
  const L = {
    'pl/not-this': ['לא, זה לא מתחיל בצליל הזה. נסו שוב.'],
    'pl/hint': ['רמז: חפשו את מה שמנצנץ.'],
    'pl/next-step': ['ממשיכים!'],
    'pl/write-again': ['כמעט! נסו לעבור עוד קצת על האות.'],
    'pl/write-good': ['כתבתם יפה מאוד!'],
    'pl/trace-start': ['שימו את האצבע על הכוכב.'],
    'pl/look-for': ['ואנחנו מחפשים את האות'],
    'pl/place-empty': ['עוד אין כאן כלום. סיימו יחידה וקבלו את הדבר הראשון!'],
    'pl/choose-letter': ['בחרו אות!'],
    'pl/yes': ['נכון!'],
    'pl/won': ['הרווחתם'],
    'pl/new-item': ['הפרס החדש מחכה לכם! גררו אותו למקום.'],
    'pl/drag': ['גררו את הדברים למקום שאתם רוצים.'],
  };
  for (const [key, u] of Object.entries(LETTERS)) {
    L[`pl/words-${key}`] = [`מצאו שלוש תמונות שמתחילות בצליל ${u.sound}`];
    L[`pl/hunt-${key}`] = [`מצאו את כל האותיות ${u.name}`];
    L[`pl/write-${key}`] = [`בואו נכתוב את האות ${u.name}. מתחילים בכוכב ועוברים לאט על הדרך.`];
    L[`pl/write2-${key}`] = [`עכשיו לבד! כתבו ${u.name} על האות הבהירה.`];
    L[`pl/done-${key}`] = [`כל הכבוד! למדתם את האות ${u.name}!`];
  }
  return L;
}
