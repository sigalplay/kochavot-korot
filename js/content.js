/* כוכבות קוראות — all game content in one place.
   To swap in new illustrations, change the paths in ART / ITEMS / WORDS only. */

const ART = {
  star: 'assets/scene/star.png',            // the star, transparent, standing, base clothes
  starArms: 'assets/scene/star-arms.png',   // same size: only her forearms and hands, drawn over skirts and coats
  wardrobe: 'assets/scene/wardrobe.jpg',    // dressing room with the 7-cubby cabinet
  room: 'assets/scene/room.jpg',
  stage: 'assets/stage/stage.jpg',           // the concert stage            // the star's dressing room (1600×1000, right side kept clear for her)
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
  watch:    { name: 'שעון',   img: 'assets/items/watch.png',    ar: 1.878, w: .082, cx: .216, cy: .527, turn: 90, z: 8, snap: 'wrist' },
  heart:    { name: 'לב',     img: 'assets/items/heart.png',    ar: .80,  w: .20,  cx: .50,  cy: .40,  z: 9, snap: 'free' },
  boots: { name: 'נעליים', img: 'assets/items/boots-on.png', fit: [.159, .852, .703, .148], card: 'assets/items/boots.png', cardAr: 0.957, layer: true, ar: 2.555, w: 1, cx: .5, cy: .5, z: 5, snap: 'body' },
  pin:      { name: 'סיכה',   img: 'assets/items/pin.png',      ar: .846, w: .20,  cx: .712, cy: .091, z: 9, snap: 'free' },
  bracelet: { name: 'צמיד',   img: 'assets/items/bracelet.png', ar: .772, w: .15,  cx: .779, cy: .548, z: 8, snap: 'wrist' },
  skirt: { name: 'חצאית', img: 'assets/items/skirt-on.png', fit: [.049, .438, .921, .223], card: 'assets/items/skirt.png', cardAr: 0.703, layer: true, ar: 2.555, w: 1, cx: .5, cy: .5, z: 5, snap: 'body' },
};
// Stage world: props the child places on the stage. stage = default centre (stage px) and width when placed.
Object.assign(ITEMS, {
  drums:     { world: 'stage', name: 'תופים',    img: 'assets/stage/drums.png',     ar: .843, stage: { x: 450, y: 650, w: 330 }, z: 10 },
  guitar:    { world: 'stage', name: 'גיטרה',    img: 'assets/stage/guitar.png',    ar: 2.336, stage: { x: 1100, y: 640, w: 130 }, z: 11 },
  audience:  { world: 'stage', name: 'קהל',      img: 'assets/stage/audience.png',  ar: .34,  stage: { x: 800, y: 950, w: 660 }, z: 14 },
  fireworks: { world: 'stage', name: 'זיקוקים',  img: 'assets/stage/fireworks.png', ar: .492, stage: { x: 800, y: 170, w: 720 }, z: 5 },
  speaker:   { world: 'stage', name: 'רמקול',    img: 'assets/stage/speaker.png',   ar: 2.587, stage: { x: 1360, y: 610, w: 140 }, z: 11 },
});
Object.assign(ITEMS, {
  door:       { world: 'room',  name: 'דלת',      img: 'assets/room/door.png',       ar: 1.752, stage: { x: 810, y: 528, w: 190 }, z: 6 },
  curtain:    { world: 'room',  name: 'וילון',    img: 'assets/room/curtain.png',    ar: 1.357, stage: { x: 1020, y: 420, w: 220 }, z: 7 },
  tv:         { world: 'room',  name: 'טלוויזיה', img: 'assets/room/tv.png',         ar: 1.168, stage: { x: 560, y: 820, w: 210 }, z: 10 },
  vegetables: { world: 'food',  name: 'ירקות',    img: 'assets/food/vegetables.png', ar: .797, stage: { x: 320, y: 530, w: 230 }, z: 10 },
  hamburger:  { world: 'food',  name: 'המבורגר',  img: 'assets/food/hamburger.png',  ar: .963, stage: { x: 600, y: 530, w: 190 }, z: 10 },
  popsicle:   { world: 'food',  name: 'ארטיק',    img: 'assets/food/popsicle.png',   ar: 1.678, stage: { x: 860, y: 528, w: 110 }, z: 10 },
  earrings:   { world: 'gifts', name: 'עגילים',   img: 'assets/gifts/earrings.png',  ar: .803, stage: { x: 300, y: 492, w: 170 }, z: 10 },
  balloon:    { world: 'gifts', name: 'בלון',     img: 'assets/gifts/balloon.png',   ar: 1.938, stage: { x: 700, y: 250, w: 150 }, z: 11 },
  flower:     { world: 'gifts', name: 'פרח',      img: 'assets/gifts/flower.png',    ar: 1.626, stage: { x: 560, y: 438, w: 150 }, z: 10 },
  hat:        { world: 'gifts', name: 'כובע',     img: 'assets/gifts/hat.png',       ar: .663, stage: { x: 830, y: 490, w: 210 }, z: 10 },
});

// measured on star.png: the narrowest point of each forearm, and the arm's tilt.
// turn = how much the item's own picture is rotated to lie across the wrist (the watch picture is drawn upright)
const WRISTS = [{ cx: .216, cy: .527, rot: 10 }, { cx: .779, cy: .536, rot: -10 }];

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
  tapuach: ['תפוח', 'assets/words/tapuach.png'], tut: ['תות', 'assets/words/tut.png'], tik: ['תיק', 'assets/words/tik.png'],
  glida: ['גלידה', 'assets/words/glida.png'], gamal: ['גמל', 'assets/words/gamal.png'], gezer: ['גזר', 'assets/words/gezer.png'],
  koof: ['קוף', 'assets/words/koof.png'], keshet: ['קשת', 'assets/words/keshet.png'], kaktus: ['קקטוס', 'assets/words/kaktus.png'],
  zebra: ['זברה', 'assets/words/zebra.png'], zer: ['זר פרחים', 'assets/words/zer.png'], zayit: ['זית', 'assets/words/zayit.png'],
  rakevet: ['רכבת', 'assets/words/rakevet.png'], rimon: ['רימון', 'assets/words/rimon.png'], robot: ['רובוט', 'assets/words/robot.png'],
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
  chalon: ['חלון', 'assets/words/chalon.png'], chatul: ['חתול', 'assets/words/chatul.png'], chalav: ['חלב', 'assets/words/chalav.png'],
};

/* Writing paths: strokes in a 100×100 box (y down), in the order they are written. */
const UNITS = [
  { key: 'mem', world: 'clothes', letter: 'מ', name: 'מֵם', sound: 'מְ', item: 'coat',
    options: ['coat', 'watch', 'boots'], words: ['mafteach', 'mara', 'mitriya'], wrong: ['tof', 'kadur', 'shaon'],
    near: ['ט', 'ש', 'נ', 'ס', 'ב', 'כ', 'ת', 'ל', 'ע', 'ה'],
    strokes: [[[41, 47], [50, 35, 1], [73, 35, 1], [73, 58], [73, 80], [55, 80]], [[41, 49], [37, 64], [33, 80]], [[30, 34], [41, 47]]] }, // the small slanted line comes last
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
  { key: 'dalet', world: 'room', letter: 'ד', name: 'דָּלֶת', sound: 'דְּ', item: 'door',
    options: ['door', 'curtain', 'tv'], words: ['dag', 'dvora', 'dubi'], wrong: ['kadur', 'perach', 'ner'],
    near: ['ר', 'ך', 'ה', 'ו', 'ז', 'כ', 'ב', 'ח', 'ת', 'נ'],
    strokes: [[[31, 38], [50, 38], [69, 38]], [[57, 41], [57, 60], [57, 80]]] },
  { key: 'vav', world: 'room', letter: 'ו', name: 'וָו', sound: 'וְ', item: 'curtain',
    options: ['curtain', 'door', 'tv'], words: ['vered', 'vafel', 'veterinarit'], wrong: ['kadur', 'shemesh', 'tzav'],
    near: ['ז', 'ן', 'י', 'ר', 'ד', 'נ', 'ג', 'ט', 'ל', 'ת'],
    strokes: [[[42, 38], [52, 38, 1], [52, 58], [52, 80]]] },
  { key: 'tet', world: 'room', letter: 'ט', name: 'טֵית', sound: 'טְ', item: 'tv',
    options: ['tv', 'curtain', 'door'], words: ['telefon', 'traktor', 'tavas'], wrong: ['shemesh', 'perach', 'limon'],
    near: ['מ', 'ש', 'ע', 'צ', 'ס', 'ב', 'נ', 'ת', 'ה', 'פ'],
    strokes: [[[32, 36], [32, 61], [32, 80, 1], [67, 80, 1], [67, 49], [67, 38, 1], [53, 38], [53, 43]]] },
  { key: 'yod', world: 'food', letter: 'י', name: 'יוּד', sound: 'יְ', item: 'vegetables',
    options: ['vegetables', 'hamburger', 'popsicle'], words: ['yona', 'yanshuf', 'yalkut'], wrong: ['kadur', 'perach', 'shemesh'],
    near: ['ו', 'ז', 'ן', 'ר', 'ד', 'נ', 'ג', 'ט', 'ל', 'ת'],
    strokes: [[[42, 38], [52, 38, 1], [52, 50], [52, 60]]] },
  { key: 'he', world: 'food', letter: 'ה', name: 'הֵא', sound: 'הְ', item: 'hamburger',
    options: ['hamburger', 'popsicle', 'vegetables'], words: ['har', 'hipopotam', 'helikopter'], wrong: ['kadur', 'sira', 'limon'],
    near: ['ח', 'ת', 'ר', 'ד', 'כ', 'ק', 'ב', 'פ', 'ו', 'ן'],
    strokes: [[[30, 38], [50, 38], [66, 38, 1], [66, 58], [66, 80]], [[35, 55], [35, 68], [35, 80]]] },
  { key: 'alef', world: 'food', letter: 'א', name: 'אָלֶף', sound: 'אְ', item: 'popsicle',
    options: ['popsicle', 'vegetables', 'hamburger'], words: ['arye', 'avatiach', 'otobus'], wrong: ['shemesh', 'kadur', 'tzav'],
    near: ['ע', 'צ', 'ט', 'מ', 'ש', 'ג', 'נ', 'ב', 'ס', 'ה'],
    strokes: [[[32, 35], [50, 57], [68, 79]], [[67, 35], [64, 47], [57, 54]], [[42, 52], [33, 62, 1], [31, 79]]] },
  { key: 'ayin', world: 'gifts', letter: 'ע', name: 'עַיִן', sound: 'עְ', item: 'earrings',
    options: ['earrings', 'balloon', 'hat'], words: ['uga', 'achbar', 'anan'], wrong: ['kadur', 'perach', 'sira'],
    near: ['צ', 'ש', 'ט', 'מ', 'א', 'ג', 'נ', 'ב', 'ס', 'ת'],
    strokes: [[[44, 35], [47, 53], [50, 71]], [[66, 35], [64, 56], [61, 73, 1], [29, 79]]] },
  { key: 'bet', world: 'gifts', letter: 'ב', name: 'בֵּית', sound: 'בְּ', item: 'balloon',
    options: ['balloon', 'flower', 'earrings'], words: ['banana', 'barvaz', 'bayit'], wrong: ['kadur', 'shemesh', 'limon'],
    near: ['כ', 'נ', 'ג', 'פ', 'מ', 'ר', 'ד', 'ת', 'ו', 'ה'],
    strokes: [[[33, 38], [50, 38], [60, 38, 1], [60, 60], [60, 79]], [[70, 79], [50, 79], [30, 79]]] },
  { key: 'pe', world: 'gifts', letter: 'פ', name: 'פֵּא', sound: 'פְּ', item: 'flower',
    options: ['flower', 'hat', 'balloon'], words: ['pil', 'parpar', 'pinguin'], wrong: ['kadur', 'shemesh', 'sira'],
    near: ['ב', 'כ', 'ר', 'ד', 'ה', 'ק', 'ס', 'ו', 'נ', 'ת'],
    strokes: [[[46, 57], [36, 55, 1], [37, 38, 1], [69, 38, 1], [69, 62], [69, 79, 1], [31, 79]]] },
  { key: 'kaf', world: 'gifts', letter: 'כ', name: 'כָּף', sound: 'כְּ', item: 'hat',
    options: ['hat', 'earrings', 'flower'], words: ['kochav', 'kelev', 'kos'], wrong: ['shemesh', 'perach', 'sira'],
    near: ['ב', 'נ', 'פ', 'ג', 'מ', 'ר', 'ד', 'ת', 'ק', 'ה'],
    strokes: [[[33, 38], [52, 38], [66, 38, 1], [66, 79, 1], [52, 79], [33, 79]]] },
];

const WORLDS = [
  { key: 'clothes', title: 'לבוש ואביזרים', icon: 'assets/items/coat.png', placeName: 'חדר ההלבשה', bg: 'assets/scene/wardrobe.jpg',
    intro: 'בעולם הלבוש לכל אות יש פריט חדש בשבילי. בחרי אות!', doneText: 'הלבשת את הכוכבת מכף רגל ועד ראש! ✨', doneLine: 'הלבשת אותי מכף רגל ועד ראש! אני מוכנה לעלות לבמה!' },
  { key: 'stage', title: 'הבמה', icon: 'assets/stage/guitar.png', placeName: 'הבמה', bg: 'assets/stage/stage.jpg', starX: 800, noVeil: true,
    intro: 'בעולם הבמה כל אות מוסיפה משהו להופעה שלי. בחרי אות!', place: 'גררי דברים לבמה, ותסדרי לי את ההופעה!', doneText: 'הבמה מוכנה להופעה! ✨', doneLine: 'הבמה מוכנה! בואי נופיע!' },
  { key: 'room', title: 'החדר', icon: 'assets/room/tv.png', placeName: 'החדר שלי', bg: 'assets/room/room.jpg',
    intro: 'בעולם החדר כל אות מוסיפה משהו לחדר שלי. בחרי אות!', place: 'גררי דברים מהארגז, ותעצבי לי את החדר!', doneText: 'החדר מעוצב ומוכן! ✨', doneLine: 'איזה חדר יפה! תודה שעיצבת לי אותו!' },
  { key: 'food', title: 'האוכל', icon: 'assets/food/hamburger.png', placeName: 'שולחן האוכל', bg: 'assets/food/cafe.jpg',
    intro: 'בעולם האוכל כל אות מביאה לי משהו טעים. בחרי אות!', place: 'גררי אוכל מהארגז, ותערכי לי את השולחן!', doneText: 'השולחן ערוך! בתיאבון! ✨', doneLine: 'איזה שולחן! בתיאבון!' },
  { key: 'gifts', title: 'המתנות', icon: 'assets/gifts/balloon.png', placeName: 'שולחן המתנות', bg: 'assets/gifts/party.jpg',
    intro: 'בעולם המתנות כל אות מביאה לי מתנה. בחרי אות!', place: 'גררי מתנות מהארגז, ותסדרי לי את המסיבה!', doneText: 'המסיבה מוכנה! ✨', doneLine: 'כמה מתנות! זאת המסיבה הכי יפה!' },
];
const unitsOf = w => UNITS.filter(u => u.world === w);

/* Every spoken line. id → [text to show / record, text for the computer voice].
   Record your own voice for any line in studio.html — recordings always win. */
function buildLines() {
  const L = {
    'home': ['שלום! אני הכוכבת. בואי נבחר עולם ונתחיל לשחק!'],
    'wardrobe': ['גררי פריט מהארון אליי, ואני אלבש אותו.'],
    'wardrobe-empty': ['הארון עוד ריק. סיימי יחידה וקבלי את הפריט הראשון!'],
    'wardrobe-new': ['הפריט החדש מחכה לך בארון! גררי אותו אליי ותלבישי אותי.'],
    'dressed': ['איזה יופי! תודה!'],
    'back-shelf': ['החזרתי לארון.'],
    'yay-1': ['יופי!'], 'yay-2': ['נכון מאוד!'], 'yay-3': ['מעולה!'], 'yay-4': ['כל הכבוד!'],
    'not-this': ['לא, זה לא מתחיל בצליל הזה. נסי שוב.'],
    'hint': ['רמז: חפשי את מה שמנצנץ.'],
    'next-step': ['ממשיכות!'],
    'write-again': ['כמעט! נסי לעבור עוד קצת על האות.'],
    'write-good': ['כתבת יפה מאוד!'],
    'trace-start': ['שימי את האצבע על הכוכב.'],
    'place-empty': ['עוד אין כאן כלום. סיימי יחידה וקבלי את הדבר הראשון!'],
    'placed': ['איזה יופי!'],
    'place-back': ['החזרתי לארגז.'],
    'this-is': ['זאת האות'], 'look-for': ['ואנחנו מחפשות את האות'],
  };
  for (const w of WORLDS) { L[`world-${w.key}`] = [w.intro]; L[`done-world-${w.key}`] = [w.doneLine]; if (w.place) L[`place-${w.key}`] = [w.place]; }
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
