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

/* The letter units of this game: which world, which reward item, and the three items offered in the first step.
   Everything about the letter itself comes from js/letters.js. */
const UNITS = [
  { key: 'mem', world: 'clothes', item: 'coat', options: ['coat','watch','boots'] },
  { key: 'shin', world: 'clothes', item: 'watch', options: ['watch','skirt','boots'] },
  { key: 'lamed', world: 'clothes', item: 'heart', options: ['heart','watch','skirt'] },
  { key: 'nun', world: 'clothes', item: 'boots', options: ['boots','coat','pin'] },
  { key: 'samech', world: 'clothes', item: 'pin', options: ['pin','bracelet','heart'] },
  { key: 'tsadi', world: 'clothes', item: 'bracelet', options: ['bracelet','pin','watch'] },
  { key: 'chet', world: 'clothes', item: 'skirt', options: ['skirt','coat','boots'] },
  { key: 'tav', world: 'stage', item: 'drums', options: ['drums','guitar','speaker'] },
  { key: 'gimel', world: 'stage', item: 'guitar', options: ['guitar','drums','fireworks'] },
  { key: 'kof', world: 'stage', item: 'audience', options: ['audience','speaker','guitar'] },
  { key: 'zayin', world: 'stage', item: 'fireworks', options: ['fireworks','drums','audience'] },
  { key: 'resh', world: 'stage', item: 'speaker', options: ['speaker','fireworks','guitar'] },
  { key: 'dalet', world: 'room', item: 'door', options: ['door','curtain','tv'] },
  { key: 'vav', world: 'room', item: 'curtain', options: ['curtain','door','tv'] },
  { key: 'tet', world: 'room', item: 'tv', options: ['tv','curtain','door'] },
  { key: 'yod', world: 'food', item: 'vegetables', options: ['vegetables','hamburger','popsicle'] },
  { key: 'he', world: 'food', item: 'hamburger', options: ['hamburger','popsicle','vegetables'] },
  { key: 'alef', world: 'food', item: 'popsicle', options: ['popsicle','vegetables','hamburger'] },
  { key: 'ayin', world: 'gifts', item: 'earrings', options: ['earrings','balloon','hat'] },
  { key: 'bet', world: 'gifts', item: 'balloon', options: ['balloon','flower','earrings'] },
  { key: 'pe', world: 'gifts', item: 'flower', options: ['flower','hat','balloon'] },
  { key: 'kaf', world: 'gifts', item: 'hat', options: ['hat','earrings','flower'] },
].map(u => ({ ...LETTERS[u.key], ...u }));

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
    'not-this': ['לא, זה לא מתחיל בצליל הזה. נסי שוב.'],
    'hint': ['רמז: חפשי את מה שמנצנץ.'],
    'next-step': ['ממשיכות!'],
    'write-again': ['כמעט! נסי לעבור עוד קצת על האות.'],
    'write-good': ['כתבת יפה מאוד!'],
    'trace-start': ['שימי את האצבע על הכוכב.'],
    'place-empty': ['עוד אין כאן כלום. סיימי יחידה וקבלי את הדבר הראשון!'],
    'look-for': ['ואנחנו מחפשות את האות'],
  };
  for (const w of WORLDS) { L[`world-${w.key}`] = [w.intro]; L[`done-world-${w.key}`] = [w.doneLine]; if (w.place) L[`place-${w.key}`] = [w.place]; }
  for (const u of UNITS) {
    const item = ITEMS[u.item].name;
    L[`words-${u.key}`] = [`מצאי שלוש תמונות שמתחילות בצליל ${u.sound}`, `מצאי שלוש תמונות שמתחילות כמו ${item}`];
    L[`hunt-${u.key}`] = [`מצאי את כל האותיות ${u.name}`];
    L[`write-${u.key}`] = [`בואי נכתוב את האות ${u.name}. מתחילות בכוכב ועוברות לאט על הדרך.`];
    L[`write2-${u.key}`] = [`עכשיו לבד! כתבי ${u.name} על האות הבהירה.`];
    L[`done-${u.key}`] = [`איזו כוכבת! למדת את האות ${u.name} והרווחת ${item}!`];
    L[`yes-${u.key}`] = [`נכון! ${u.sound}${u.sound}${item}`, `נכון! ${item} מתחיל ב${u.name}`];
  }
  for (const [k, it] of Object.entries(ITEMS)) L[`i-${k}`] = [it.name];
  return Object.assign(buildSharedLines(), L);
}
const PLURAL_LINES = buildPluralLines();
const LINES = Object.assign(buildLines(), PLURAL_LINES);
