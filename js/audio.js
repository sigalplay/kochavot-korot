/* Voice + sound effects.
   Order of preference for every line: a recording made in studio.html (kept on this device)
   → a file in audio/ listed in audio/manifest.json (e.g. "open-mem.mp3") → the computer voice. */

const Voice = (() => {
  const DB = 'kochavot-voice', STORE = 'clips';
  let db = null, files = new Map(), current = null, token = 0, voices = [];

  function openDb() {
    return new Promise(res => {
      if (!('indexedDB' in window)) return res(null);
      try {
        const r = indexedDB.open(DB, 1);
        r.onupgradeneeded = () => r.result.createObjectStore(STORE);
        r.onsuccess = () => res(r.result);
        r.onerror = () => res(null);
      } catch { res(null); }
    });
  }
  async function ready() {
    db = await openDb();
    try { const r = await fetch('audio/manifest.json', { cache: 'no-cache' }); if (r.ok) files = new Map((await r.json()).map(f => [f.replace(/\.[^.]+$/, ''), f])); } catch {}
  }
  function tx(mode, fn) {
    return new Promise(res => {
      if (!db) return res(null);
      try { const t = db.transaction(STORE, mode), q = fn(t.objectStore(STORE)); q.onsuccess = () => res(q.result); q.onerror = () => res(null); } catch { res(null); }
    });
  }
  const getClip = id => tx('readonly', s => s.get(id));
  const putClip = (id, blob) => tx('readwrite', s => s.put(blob, id));
  const delClip = id => tx('readwrite', s => s.delete(id));
  const listClips = () => tx('readonly', s => s.getAllKeys());

  function loadVoices() { if ('speechSynthesis' in window) voices = speechSynthesis.getVoices() || []; }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.addEventListener?.('voiceschanged', loadVoices); }

  function tts(text) {
    return new Promise(res => {
      if (!('speechSynthesis' in window) || !text) return res();
      const u = new SpeechSynthesisUtterance(text.replace(/[׳"]/g, ''));
      const he = voices.find(v => /^he([-_]|$)/i.test(v.lang)) || voices.find(v => /hebrew|עברית|carmit/i.test(v.name));
      if (he) u.voice = he;
      u.lang = 'he-IL'; u.rate = .85; u.pitch = 1.1;
      u.onend = u.onerror = () => res();
      speechSynthesis.speak(u);
      setTimeout(res, 9000);
    });
  }
  function playUrl(url) {
    return new Promise(res => {
      const a = new Audio(url); current = a;
      a.onended = a.onerror = () => res();
      a.play().catch(() => res());
    });
  }
  function stop() {
    token++;
    if (current) { try { current.pause(); } catch {} current = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
  async function one(id, my) {
    const line = LINES[id];
    if (!line) return;
    const clip = await getClip(id);
    if (my !== token) return;
    if (clip) { const url = URL.createObjectURL(clip); await playUrl(url); URL.revokeObjectURL(url); return; }
    if (files.has(id)) return playUrl(`audio/${files.get(id)}`);
    return tts(line[1] || line[0]);
  }
  /** Say one or more line ids in a row; a new call interrupts the previous one. */
  async function say(...ids) {
    stop(); const my = token;
    document.body.classList.add('talking');
    for (const id of ids.flat()) { if (my !== token) return; await one(id, my); }
    if (my === token) document.body.classList.remove('talking');
  }
  return { ready, say, stop, getClip, putClip, delClip, listClips, playUrl };
})();

/* Little synthesized sound effects — no files needed. */
const Sfx = (() => {
  let ctx = null;
  const ac = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
  function tone(freq, at, dur, type = 'sine', vol = .16) {
    try {
      const c = ac(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime + at;
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .05);
    } catch {}
  }
  return {
    unlock() { try { ac().resume(); } catch {} },
    tap() { tone(660, 0, .08, 'triangle', .08); },
    good() { [523, 659, 784].forEach((f, i) => tone(f, i * .09, .35, 'triangle')); },
    soft() { tone(330, 0, .18, 'sine', .1); tone(262, .13, .25, 'sine', .1); },
    fly() { for (let i = 0; i < 6; i++) tone(700 + i * 120, i * .04, .1, 'sine', .06); },
    done() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * .12, .4, 'triangle', .14)); },
    snap() { tone(880, 0, .07, 'square', .05); tone(1320, .05, .12, 'triangle', .08); },
  };
})();
