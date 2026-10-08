/* אלופי האותיות — the football game's own content, kept in one object (FB) so the recording studio
   can load it next to the girls' game. football/content.js turns it into the globals the engine reads.
   All paths are from the site root (football/index.html sets <base href="../">). */

const FB = (() => {
  const A = 'football/assets/';
  const ART = {
    star: A + 'player.png',              // the player, transparent, standing, white shirt and navy shorts
    wardrobe: A + 'locker-room.jpg',     // dressing room with the cubbies (1600×1000)
    room: A + 'locker-room.jpg',         // home screen background until the stadium picture arrives
  };
  // where the player stands on the 1600×1000 stage (same spot on every screen); player.png is 351×924 (40px of empty room on each side, for the boots)
  const STAR_BOX = { x: 1190, y: 212, w: 281, h: 740 };

  // Dressing room: every item is a full-size layer drawn over player.png (made by football/assets/make-layers.py,
  // armband and wristband placed by measurement). fit = where the item is inside the layer, for the fly-in.
  const L = (name, k, fit, cardAr, z) => ({ name, img: `${A}items/${k}-on.png`, card: `${A}items/${k}.png`, cardAr, fit, layer: true, ar: 924 / 351, w: 1, cx: .5, cy: .5, z, snap: 'body' });
  const ITEMS = {
    jersey:    L('חולצה',     'jersey',    [.128, .271, .741, .274], .979, 6),
    shorts:    L('מכנסיים',   'shorts',    [.236, .534, .530, .126], .893, 5),
    boots:     { ...L('נעליים',    'boots',     [.071, .758, .883, .242], .612, 5), base: A + 'player-nofeet.png' }, // shown on the player without bare feet
    armband:   L('סרט קפטן',  'armband',   [.154, .408, .148, .030], .669, 8),
    wristband: L('צמיד',      'wristband', [.123, .525, .111, .030], 1.079, 8),
  };
  // the other worlds: things the child places on the picture. stage = where it lands first (centre, stage px) and its width
  const P = (world, name, k, ar, x, y, w, z = 10) => ({ world, name, img: `${A}${world}/${k}.png`, ar, stage: { x, y, w }, z });
  Object.assign(ITEMS, {
    goal: P('field', 'שער', 'goal', 1.057, 640, 560, 330, 6), grass: P('field', 'דשא', 'grass', .764, 640, 800, 600, 2),
    cones: P('field', 'קונוסים', 'cones', .336, 900, 800, 260, 8), scoreboard: P('field', 'לוח תוצאות', 'scoreboard', .695, 420, 230, 240, 5),
    ball: P('field', 'כדור', 'ball', 1.097, 1000, 900, 110, 9),
    fans: P('fans', 'אוהדים', 'fans', .716, 520, 700, 400, 9), stand: P('fans', 'יציע', 'stand', .425, 700, 430, 560, 4),
    drum: P('fans', 'תוף', 'drum', .93, 900, 830, 190, 10), speaker: P('fans', 'רמקול', 'speaker', 1.672, 1060, 470, 150, 5),
    screen: P('fans', 'טלוויזיה', 'screen', .878, 330, 330, 300, 3),
    hamburger: P('snack', 'המבורגר', 'hamburger', .956, 420, 760, 230), popcorn: P('snack', 'פופקורן', 'popcorn', 1.429, 680, 720, 180),
    waffle: P('snack', 'ופל', 'waffle', .986, 930, 780, 200),
    cup: P('party', 'גביע', 'cup', 1.386, 845, 470, 130, 8), cake: P('party', 'עוגה', 'cake', 1.062, 660, 420, 130, 8),
    balloons: P('party', 'בלונים', 'balloons', 1.799, 330, 470, 230, 9), fireworks: { ...P('party', 'זיקוקים', 'fireworks', 2.687, 1000, 330, 230, 1), card: A + 'party/fireworks-card.png' }, // see-through: a dark card for the menus
  });
  // cubby for each item in the locker room (stage px, centre-bottom + width)
  const CUBBIES = {
    jersey: { x: 339, b: 292, w: 200 }, shorts: { x: 625, b: 318, w: 150 },
    boots: { x: 289, b: 655, w: 190 }, armband: { x: 503, b: 624, w: 130 }, wristband: { x: 672, b: 600, w: 95 },
  };

  const UNITS = [
    { key: 'chet', world: 'clothes', item: 'jersey', options: ['jersey', 'shorts', 'boots'] },
    { key: 'mem', world: 'clothes', item: 'shorts', options: ['shorts', 'jersey', 'wristband'] },
    { key: 'nun', world: 'clothes', item: 'boots', options: ['boots', 'jersey', 'armband'] },
    { key: 'samech', world: 'clothes', item: 'armband', options: ['armband', 'wristband', 'shorts'] },
    { key: 'tsadi', world: 'clothes', item: 'wristband', options: ['wristband', 'armband', 'boots'] },
    { key: 'shin', world: 'field', item: 'goal', options: ['goal', 'ball', 'cones'] },
    { key: 'dalet', world: 'field', item: 'grass', options: ['grass', 'goal', 'scoreboard'] },
    { key: 'kof', world: 'field', item: 'cones', options: ['cones', 'ball', 'grass'] },
    { key: 'lamed', world: 'field', item: 'scoreboard', options: ['scoreboard', 'cones', 'goal'] },
    { key: 'kaf', world: 'field', item: 'ball', options: ['ball', 'goal', 'scoreboard'] },
    { key: 'alef', world: 'fans', item: 'fans', options: ['fans', 'drum', 'stand'] },
    { key: 'yod', world: 'fans', item: 'stand', options: ['stand', 'speaker', 'fans'] },
    { key: 'tav', world: 'fans', item: 'drum', options: ['drum', 'screen', 'speaker'] },
    { key: 'resh', world: 'fans', item: 'speaker', options: ['speaker', 'drum', 'stand'] },
    { key: 'tet', world: 'fans', item: 'screen', options: ['screen', 'fans', 'drum'] },
    { key: 'he', world: 'snack', item: 'hamburger', options: ['hamburger', 'popcorn', 'waffle'] },
    { key: 'pe', world: 'snack', item: 'popcorn', options: ['popcorn', 'waffle', 'hamburger'] },
    { key: 'vav', world: 'snack', item: 'waffle', options: ['waffle', 'hamburger', 'popcorn'] },
    { key: 'gimel', world: 'party', item: 'cup', options: ['cup', 'cake', 'balloons'] },
    { key: 'ayin', world: 'party', item: 'cake', options: ['cake', 'cup', 'fireworks'] },
    { key: 'bet', world: 'party', item: 'balloons', options: ['balloons', 'fireworks', 'cake'] },
    { key: 'zayin', world: 'party', item: 'fireworks', options: ['fireworks', 'balloons', 'cup'] },
  ].map(u => ({ ...LETTERS[u.key], ...u }));

  const WORLDS = [
    { key: 'clothes', title: 'חדר ההלבשה', icon: A + 'items/jersey.png', placeName: 'הארונית', bg: A + 'locker-room.jpg',
      intro: 'בחדר ההלבשה כל אות נותנת לי עוד חלק מהמדים. בחרו אות!', doneText: 'השחקן לבוש ומוכן למשחק! ⚽', doneLine: 'יש לי מדים מלאים! אני מוכן לעלות למגרש!' },
    { key: 'field', title: 'המגרש', icon: A + 'field/goal.png', placeName: 'המגרש', bg: A + 'field/field.jpg', intro: 'במגרש כל אות מוסיפה משהו למשחק. בחרו אות!', place: 'גררו דברים למגרש, ותסדרו לי אותו!', doneText: 'המגרש מוכן! ⚽', doneLine: 'המגרש מוכן! בואו נשחק!' },
    { key: 'fans', title: 'האוהדים', icon: A + 'fans/drum.png', placeName: 'היציע', bg: A + 'fans/stands.jpg', intro: 'ביציע כל אות מביאה עוד עידוד. בחרו אות!', place: 'גררו דברים ליציע, ותמלאו אותו בשמחה!', doneText: 'היציע מלא! ⚽', doneLine: 'איזה עידוד! תודה!' },
    { key: 'snack', title: 'הדוכן', icon: A + 'snack/hamburger.png', placeName: 'דוכן האוכל', bg: A + 'snack/stand.jpg', intro: 'בדוכן כל אות מביאה משהו טעים. בחרו אות!', place: 'גררו אוכל לדוכן!', doneText: 'הדוכן מלא! בתיאבון! ⚽', doneLine: 'איזה דוכן! בתיאבון!' },
    { key: 'party', title: 'החגיגה', icon: A + 'party/cup.png', placeName: 'החגיגה', bg: A + 'party/party.jpg', noVeil: true, intro: 'בחגיגה כל אות מביאה עוד הפתעה. בחרו אות!', place: 'גררו דברים לחגיגה!', doneText: 'ניצחנו! ⚽', doneLine: 'ניצחנו! זאת החגיגה הכי שווה!' },
  ];

  // item names that the girls' game already recorded (same word), so they are not recorded twice
  const SAME_ITEM = { boots: 'i-boots', speaker: 'i-speaker', fireworks: 'i-fireworks', hamburger: 'i-hamburger', screen: 'i-tv', wristband: 'i-bracelet',
    ball: 'w-kadur', drum: 'w-tof', cake: 'w-uga', waffle: 'w-vafel' };

  /* Football-only lines (ids fb/...). Everything else is said with the shared banks: pl/... (plural), w-... (words),
     name-/sound-/letter-... (letters) and yay-... */
  function lines() {
    const L = {
      'fb/home': ['שלום! אני אלוף האותיות. בחרו עולם ובואו נשחק!'],
      'fb/wardrobe': ['גררו פריט מהארונית אליי, ואני אלבש אותו.'],
      'fb/wardrobe-empty': ['הארונית עוד ריקה. סיימו אות וקבלו את הפריט הראשון!'],
      'fb/wardrobe-new': ['הפריט החדש מחכה בארונית! גררו אותו אליי ותלבישו אותי.'],
      'fb/dressed': ['יש! תודה!'],
      'fb/back-shelf': ['החזרתי לארונית.'],
    };
    for (const w of WORLDS) { L[`fb/world-${w.key}`] = [w.intro]; L[`fb/done-world-${w.key}`] = [w.doneLine]; if (w.place) L[`fb/place-${w.key}`] = [w.place]; }
    for (const u of UNITS) {
      const item = ITEMS[u.item].name;
      L[`fb/yes-${u.key}`] = [`נכון! ${u.sound}${u.sound}${item}`, `נכון! ${item} מתחיל ב${u.name}`];
      L[`fb/done-${u.key}`] = [`איזה אלופים! למדתם את האות ${u.name} והרווחתם ${item}!`];
    }
    for (const [k, it] of Object.entries(ITEMS)) if (!SAME_ITEM[k]) L[`fb/i-${k}`] = [it.name];
    return L;
  }
  return { ART, STAR_BOX, ITEMS, CUBBIES, UNITS, WORLDS, SAME_ITEM, lines };
})();
