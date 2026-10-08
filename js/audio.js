/* Voice + sound effects.
   Order of preference for every line: a recording made in studio.html on this device
   → a recording uploaded with the site (audio/rec-<group>-<n>.json files, exported from studio.html)
   → a file in audio/ listed in audio/manifest.json (e.g. "open-mem.mp3") → the computer voice. */

// which upload file a spoken line belongs to: one per world, plus shared words and general lines
function recGroups() { return ['general', 'words', 'plural', 'football', ...WORLDS.map(w => w.key)]; }
function recGroupOf(id) {
  if (id.startsWith('pl/')) return 'plural';
  if (id.startsWith('fb/')) return 'football';
  if (/^(w|i|letter)-/.test(id)) return 'words';
  const u = UNITS.find(u => id.endsWith('-' + u.key));
  return u ? u.world : 'general';
}

// recordings play a bit faster than they were recorded
const RECORDING_SPEED = 1.25;

const Voice = (() => {
  const DB = 'kochavot-voice', STORE = 'clips';
  let db = null, files = new Map(), bundle = {}, current = null, token = 0, voices = [];

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
    // recordings uploaded with the site come in several small files (GitHub refuses one big file)
    const load = async name => { try { const r = await fetch(`audio/${name}`, { cache: 'no-cache' }); if (r.ok) { Object.assign(bundle, await r.json()); return true; } } catch {} return false; };
    let index = null; try { const r = await fetch('audio/rec-index.json', { cache: 'no-cache' }); if (r.ok) index = await r.json(); } catch {}
    if (index) await Promise.all(index.map(load));
    else await Promise.all(['recordings.json'].map(load).concat(recGroups().map(async g => { for (let n = 1; n < 20 && await load(`rec-${g}-${n}.json`); n++); })));
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
  // iPad/iPhone only let a page play sound right after a tap. One audio element is "unlocked"
  // on the first tap and then reused for every line, so later lines are allowed to play.
  const el = new Audio(); el.preload = 'auto'; el.setAttribute('playsinline', '');
  // a real 0.1 s silent WAV (an empty one is rejected by Safari)
  const SILENT = (() => { const n = 800, b = new Uint8Array(44 + n), v = new DataView(b.buffer), w = (o, t) => [...t].forEach((c, i) => b[o + i] = c.charCodeAt(0));
    w(0, 'RIFF'); v.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true); w(36, 'data'); v.setUint32(40, n, true); b.fill(128, 44);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' })); })();
  // recordings arrive as text (data URLs). Safari refuses some of them, e.g. "audio/mp4; codecs=…" with a space,
  // so each one is turned into a real audio file in memory before it is played.
  const blobs = new Map();
  function playable(url) {
    if (!url.startsWith('data:')) return url;
    if (blobs.has(url)) return blobs.get(url);
    try {
      const comma = url.indexOf(','), type = url.slice(5, comma).split(';')[0].trim() || 'audio/mp4', bin = atob(url.slice(comma + 1)), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const out = URL.createObjectURL(new Blob([bytes], { type })); blobs.set(url, out); return out;
    } catch { return url; }
  }
  let unlocked = false, pending = null;
  function unlock() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch {} // iPad: play even when the device is on silent
    if (unlocked) return; unlocked = true;
    try { el.src = SILENT; el.play().catch(() => { unlocked = false; }); } catch { unlocked = false; }
    try { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch {}
  }
  function playUrl(url) {
    return new Promise(res => {
      const a = el; current = a;
      if (pending) pending(false); pending = res; // the line that was playing is cut off
      try { a.pause(); } catch {}
      a.onended = () => res(true); a.onerror = () => res(false);
      a.preservesPitch = a.webkitPreservesPitch = a.mozPreservesPitch = true; // faster, same voice (no chipmunk)
      a.src = playable(url); a.defaultPlaybackRate = RECORDING_SPEED; a.playbackRate = RECORDING_SPEED;
      a.onloadedmetadata = () => { a.playbackRate = RECORDING_SPEED; };
      a.play().catch(() => res(false));
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
    if (clip) { const url = URL.createObjectURL(clip), ok = await playUrl(url); URL.revokeObjectURL(url); if (ok || my !== token) return; }
    if (bundle[id] && (await playUrl(bundle[id]) || my !== token)) return;
    if (files.has(id) && (await playUrl(`audio/${files.get(id)}`) || my !== token)) return;
    return tts(line[1] || line[0]);
  }
  /** Say one or more line ids in a row; a new call interrupts the previous one. */
  async function say(...ids) {
    stop(); const my = token;
    document.body.classList.add('talking');
    // a game can say one line with recordings from the shared banks, e.g. 'done-mem' → ['pl/done-mem', 'pl/won', 'i-shorts']
    const alias = typeof VOICE_ALIAS !== 'undefined' ? VOICE_ALIAS : {};
    for (const id of ids.flat().flatMap(i => alias[i] || [i])) { if (my !== token) return; await one(id, my); }
    if (my === token) document.body.classList.remove('talking');
  }
  return { ready, say, stop, unlock, getClip, putClip, delClip, listClips, playUrl, bundle: () => bundle };
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
    unlock() { try { const c = ac(); if (c.state !== 'running') c.resume(); if (!this.primed) { const s = c.createBufferSource(); s.buffer = c.createBuffer(1, 1, 22050); s.connect(c.destination); s.start(0); this.primed = true; } } catch {} },
    tap() { tone(660, 0, .08, 'triangle', .08); },
    good() { [523, 659, 784].forEach((f, i) => tone(f, i * .09, .35, 'triangle')); },
    soft() { tone(330, 0, .18, 'sine', .1); tone(262, .13, .25, 'sine', .1); },
    fly() { for (let i = 0; i < 6; i++) tone(700 + i * 120, i * .04, .1, 'sine', .06); },
    done() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * .12, .4, 'triangle', .14)); },
    snap() { tone(880, 0, .07, 'square', .05); tone(1320, .05, .12, 'triangle', .08); },
  };
})();

// every tap keeps sound alive on tablets (iOS suspends audio after the app goes to the background)
['pointerdown', 'touchend'].forEach(t => document.addEventListener(t, () => { Voice.unlock(); Sfx.unlock(); }, { capture: true, passive: true }));
