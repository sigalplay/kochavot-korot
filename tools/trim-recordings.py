"""Trim the silence at the start and end of every recording in audio/rec-*.json.
Each recording keeps a short breath before (0.08 s) and after (0.15 s) the voice, so lines said one after
another ("זאת האות" + "בֵּית") follow each other naturally. Run it after adding new recording files:
    python3 tools/trim-recordings.py
Recordings that are already trimmed are left as they are."""
import base64, json, os, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
import numpy as np

AUDIO = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'audio')
BEFORE, AFTER = 0.08, 0.15

def trim(data_url):
    head, b64 = data_url.split(',', 1)
    with tempfile.TemporaryDirectory() as d:
        src, out = os.path.join(d, 'in'), os.path.join(d, 'out.m4a')
        open(src, 'wb').write(base64.b64decode(b64))
        pcm = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
        x = np.frombuffer(pcm, np.int16).astype(float)
        if len(x) < 1600: return data_url, 0
        env = np.convolve(np.abs(x), np.ones(320) / 320, 'same')
        voice = np.where(env > max(400, env.max() * .06))[0]
        if not len(voice): return data_url, 0
        start = max(0, voice[0] / 16000 - BEFORE); end = min(len(x) / 16000, voice[-1] / 16000 + AFTER)
        cut = start + (len(x) / 16000 - end)
        if cut < .15: return data_url, 0          # already tight
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{start:.3f}', '-to', f'{end:.3f}', '-i', src,
                        '-ac', '1', '-c:a', 'aac', '-b:a', '96k', '-af', 'afade=t=in:d=0.02', out], check=True)
        return 'data:audio/mp4;base64,' + base64.b64encode(open(out, 'rb').read()).decode(), cut

for name in sorted(os.listdir(AUDIO)):
    if not (name.startswith('rec-') and name.endswith('.json')) or name == 'rec-index.json': continue
    path = os.path.join(AUDIO, name); clips = json.load(open(path))
    with ThreadPoolExecutor(8) as ex: done = dict(zip(clips, ex.map(trim, clips.values())))
    saved = sum(c for _, c in done.values())
    json.dump({k: v for k, (v, _) in done.items()}, open(path, 'w'))
    print(f'{name}: {len(clips)} recordings, {saved:.1f} s of silence removed', flush=True)
