"""Temporary art for the stage world (props, stage backdrop, word cards).
Replace each file with a painted PNG and update the path in js/content.js.
Run from the repo root: python3 tools/make-stage-placeholders.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SH = '<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#5a3a6a" flood-opacity=".28"/></filter>'


def svg(vb, defs, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><defs>{SH}{defs}</defs><g filter="url(#sh)">{body}</g></svg>\n'


def g(gid, *stops, x2=0, y2=1):
    return f'<linearGradient id="{gid}" x1="0" y1="0" x2="{x2}" y2="{y2}">' + ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops) + '</linearGradient>'


FILES = {}

FILES['assets/stage/drums.svg'] = svg('0 0 300 240', g('dp', (0, '#ffd6e6'), (1, '#e58fb7')) + g('dg', (0, '#fff1bf'), (1, '#d9a441')), '''
  <ellipse cx="88" cy="70" rx="58" ry="16" fill="#fff6e8" stroke="#c99236" stroke-width="5"/>
  <path d="M30 70 L30 120 Q88 140 146 120 L146 70" fill="url(#dp)" stroke="#b9618f" stroke-width="5"/>
  <ellipse cx="214" cy="70" rx="58" ry="16" fill="#fff6e8" stroke="#c99236" stroke-width="5"/>
  <path d="M156 70 L156 120 Q214 140 272 120 L272 70" fill="url(#dp)" stroke="#b9618f" stroke-width="5"/>
  <ellipse cx="150" cy="150" rx="96" ry="26" fill="#fff6e8" stroke="#c99236" stroke-width="6"/>
  <path d="M54 150 L54 205 Q150 238 246 205 L246 150" fill="url(#dp)" stroke="#b9618f" stroke-width="6"/>
  <path d="M70 162 L110 214 L150 166 L190 214 L230 162" fill="none" stroke="url(#dg)" stroke-width="8" stroke-linejoin="round"/>
  <path d="M100 40 L150 140 M200 40 L150 140" stroke="#d9a441" stroke-width="8" stroke-linecap="round"/>
''')

FILES['assets/stage/guitar.svg'] = svg('0 0 140 310', g('gb', (0, '#ffc6dc'), (1, '#d9739f')) + g('gn', (0, '#f6dcb4'), (1, '#c9925a')), '''
  <rect x="58" y="10" width="24" height="36" rx="6" fill="#c9925a" stroke="#8a5a2e" stroke-width="4"/>
  <rect x="62" y="40" width="16" height="140" fill="url(#gn)" stroke="#8a5a2e" stroke-width="4"/>
  <path d="M70 160 C30 160 18 196 34 222 C12 246 22 296 70 300 C118 296 128 246 106 222 C122 196 110 160 70 160 Z" fill="url(#gb)" stroke="#b9618f" stroke-width="6"/>
  <circle cx="70" cy="228" r="16" fill="#7a3e63"/>
  <rect x="50" y="268" width="40" height="8" rx="3" fill="#7a3e63"/>
  <path d="M66 46 L66 270 M74 46 L74 270" stroke="#fff6e8" stroke-width="1.5"/>
  <path d="M40 190 C36 210 40 222 48 232" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round"/>
''')

FILES['assets/stage/speaker.svg'] = svg('0 0 200 300', g('sb', (0, '#e9dcf8'), (1, '#9f84d4')), '''
  <rect x="14" y="10" width="172" height="280" rx="22" fill="url(#sb)" stroke="#7a5fae" stroke-width="6"/>
  <circle cx="100" cy="82" r="40" fill="#5b4468" stroke="#f3c86b" stroke-width="6"/><circle cx="100" cy="82" r="14" fill="#8f76b8"/>
  <circle cx="100" cy="204" r="62" fill="#5b4468" stroke="#f3c86b" stroke-width="7"/><circle cx="100" cy="204" r="22" fill="#8f76b8"/>
  <path d="M100 254 l6 13 14 1 -11 9 4 14 -13 -8 -13 8 4 -14 -11 -9 14 -1z" fill="#f3c86b" transform="translate(0 -6) scale(1 .7)"/>
''')

def burst(cx, cy, r, color):
    rays = ''.join(f'<path d="M{cx} {cy} L{cx + r * c:.0f} {cy + r * s:.0f}" stroke="{color}" stroke-width="7" stroke-linecap="round"/><circle cx="{cx + r * 1.12 * c:.0f}" cy="{cy + r * 1.12 * s:.0f}" r="7" fill="{color}"/>'
                   for c, s in [(1, 0), (.71, .71), (0, 1), (-.71, .71), (-1, 0), (-.71, -.71), (0, -1), (.71, -.71)])
    return rays + f'<circle cx="{cx}" cy="{cy}" r="12" fill="#fff8d6"/>'

FILES['assets/stage/fireworks.svg'] = svg('0 0 640 320', '', burst(150, 150, 95, '#f29cc3') + burst(330, 110, 80, '#f3c86b') + burst(500, 170, 100, '#b69add') +
    ''.join(f'<circle cx="{x}" cy="{y}" r="5" fill="#fff8d6"/>' for x, y in [(60, 60), (250, 260), (420, 40), (600, 280), (380, 250), (250, 40)]))

heads = []
for i, x in enumerate(range(40, 1160, 80)):
    color = ['#f6c7a4', '#d9a07a', '#f1d1b5', '#b98262'][i % 4]
    hair = ['#3d2b2b', '#6b4630', '#2b2233', '#8a5a2e'][i % 4]
    stick = ['#f29cc3', '#b69add', '#f3c86b', '#9fd8c6'][i % 4]
    up = i % 3 == 0
    heads.append(f'<g transform="translate({x} {i % 2 * 14})">'
                 + (f'<path d="M30 70 L46 8" stroke="{stick}" stroke-width="10" stroke-linecap="round"/><circle cx="46" cy="8" r="9" fill="#fff8d6"/>' if up else '')
                 + f'<path d="M-14 330 L-14 150 Q0 120 30 120 Q60 120 74 150 L74 330 Z" fill="#7a5fae"/>'
                 + f'<circle cx="30" cy="96" r="38" fill="{color}"/><path d="M-8 92 Q-6 52 30 54 Q66 52 68 92 Q52 70 30 70 Q8 70 -8 92 Z" fill="{hair}"/></g>')
FILES['assets/stage/audience.svg'] = svg('0 0 1200 360', '', ''.join(heads))

FILES['assets/stage/stage-temp.svg'] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs>
{g('sky', (0, '#2c1f4a'), (.6, '#6b3f86'), (1, '#c46aa0'))}{g('floor', (0, '#f7c4da'), (1, '#c97aa7'))}{g('cur', (0, '#e25d93'), (1, '#9b2f63'), x2=1, y2=0)}
<radialGradient id="spot" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff6d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
{''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff8e0" opacity=".8"/>' for x, y, r in [(220, 90, 3), (400, 160, 2), (610, 70, 3), (980, 120, 2), (1200, 60, 3), (1380, 170, 2), (1500, 80, 3), (90, 220, 2)])}
<path d="M560 0 L420 860 L1180 860 L1040 0 Z" fill="url(#spot)"/>
<path d="M0 0 L250 0 Q200 300 260 700 Q120 720 0 760 Z" fill="url(#cur)"/><path d="M1600 0 L1350 0 Q1400 300 1340 700 Q1480 720 1600 760 Z" fill="url(#cur)"/>
<rect x="0" y="0" width="1600" height="60" fill="#c7477e"/>{''.join(f'<path d="M{x} 60 q40 50 80 0" fill="#c7477e"/>' for x in range(0, 1600, 80))}
<path d="M120 760 L1480 760 L1600 1000 L0 1000 Z" fill="url(#floor)"/>
<rect x="120" y="742" width="1360" height="22" rx="8" fill="#fff1cf"/>
{''.join(f'<circle cx="{x}" cy="753" r="6" fill="#ffe7a8"/>' for x in range(150, 1460, 46))}
</svg>
'''

WORD = {'tapuach': 'תפוח', 'tut': 'תות', 'tik': 'תיק', 'glida': 'גלידה', 'gamal': 'גמל', 'gezer': 'גזר', 'koof': 'קוף', 'keshet': 'קשת', 'kaktus': 'קקטוס',
        'zebra': 'זברה', 'zer': 'זר פרחים', 'zayit': 'זית', 'rakevet': 'רכבת', 'rimon': 'רימון', 'robot': 'רובוט'}
for k, w in WORD.items():
    FILES[f'assets/words/{k}.svg'] = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect x="20" y="40" width="260" height="220" rx="40" fill="#fff" stroke="#e8c9dc" stroke-width="6" stroke-dasharray="14 10"/>'
                                      f'<text x="150" y="170" text-anchor="middle" font-family="Arial" font-weight="700" font-size="{58 if len(w) < 6 else 44}" fill="#a07fb8">{w}</text>'
                                      f'<text x="150" y="226" text-anchor="middle" font-family="Arial" font-size="22" fill="#c9b1d6">ציור זמני</text></svg>\n')

for rel, text in FILES.items():
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding='utf-8')
print(len(FILES), 'files')
