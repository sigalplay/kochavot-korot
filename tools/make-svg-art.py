"""Builds the vector illustrations for group 1 (rewards + word cards).

Run from the repo root: python3 tools/make-svg-art.py
Every drawing shares the same soft style as assets/item-heart.svg:
warm outlines, gradient fills, a white highlight and a few sparkles.
"""
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SHADOW = '<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#6f466e" flood-opacity=".24"/></filter>'


def grad(gid, *stops, x2=1, y2=1):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{gid}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>'


def rgrad(gid, *stops, cx=.4, cy=.35, r=.75):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<radialGradient id="{gid}" cx="{cx}" cy="{cy}" r="{r}">{s}</radialGradient>'


PINK = grad('pink', (0, '#ffd6e6'), (.55, '#f39cc2'), (1, '#d277aa'))
PINK_SOFT = grad('pinks', (0, '#fff0f6'), (.6, '#fbc4da'), (1, '#ee9fc2'))
GOLD = grad('gold', (0, '#fff1bf'), (.5, '#f1c66a'), (1, '#c99236'))
LILAC = grad('lilac', (0, '#efe4ff'), (.6, '#c9b1ee'), (1, '#9f84d4'))


def sparkles(*pts):
    out = []
    for x, y, r in pts:
        if r >= 8:
            out.append(f'<path d="M{x} {y-r}l{r*.28:.1f} {r*.72:.1f} {r*.72:.1f} {r*.28:.1f}-{r*.72:.1f} {r*.28:.1f}-{r*.28:.1f} {r*.72:.1f}-{r*.28:.1f}-{r*.72:.1f}-{r*.72:.1f}-{r*.28:.1f} {r*.72:.1f}-{r*.28:.1f}z"/>')
        else:
            out.append(f'<circle cx="{x}" cy="{y}" r="{r}"/>')
    return '<g fill="#fff8d6">' + ''.join(out) + '</g>'


def svg(defs, body, vb='0 0 300 300'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><defs>{SHADOW}{defs}</defs><g filter="url(#sh)">{body}</g></svg>\n'


ART = {}

# ---------- rewards ----------
ART['assets/item-boots.svg'] = svg(PINK + PINK_SOFT + GOLD, ''.join(
    f'''<g transform="translate({dx} 0) scale(.78 1)">
  <path d="M-38 40 Q-40 30 -28 28 L28 28 Q40 30 38 40 L40 160 Q44 176 54 186 Q64 198 62 214 L62 226 Q62 236 50 236 L-50 236 Q-62 236 -62 226 L-62 214 Q-64 198 -54 186 Q-44 176 -40 160 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-62 216 L62 216 L62 226 Q62 236 50 236 L-50 236 Q-62 236 -62 226 Z" fill="#f7d5e4" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-38 40 Q-40 30 -28 28 L28 28 Q40 30 38 40 L38 58 L-38 58 Z" fill="url(#pinks)" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-12 62 L-12 172 Q0 180 12 172 L12 62" fill="#fbe3ee" stroke="#c97aa3" stroke-width="4"/>
  {''.join(f'<path d="M-16 {y} L16 {y+12} M16 {y} L-16 {y+12}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="-17" cy="{y}" r="4" fill="url(#gold)"/><circle cx="17" cy="{y}" r="4" fill="url(#gold)"/>' for y in (76, 102, 128, 154))}
  <path d="M-28 48 Q-32 100 -30 160" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/>
  <path d="M26 92l4 9 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1z" fill="#fff4c9" stroke="#e1b65b" stroke-width="2"/>
</g>''' for dx in (52, 248)
), vb='0 0 300 250')

ART['assets/item-pin.svg'] = svg(PINK + GOLD + PINK_SOFT, '''
  <rect x="44" y="150" width="212" height="26" rx="13" fill="url(#gold)" stroke="#b5832f" stroke-width="5"/>
  <path d="M150 140 C112 92 52 78 42 118 C34 152 70 178 150 160 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M150 140 C188 92 248 78 258 118 C266 152 230 178 150 160 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M138 160 L112 226 L136 216 L146 236 L152 166 Z" fill="url(#pinks)" stroke="#b9618f" stroke-width="5" stroke-linejoin="round"/>
  <path d="M162 160 L188 226 L164 216 L154 236 L148 166 Z" fill="url(#pinks)" stroke="#b9618f" stroke-width="5" stroke-linejoin="round"/>
  <path d="M60 116 C70 100 96 104 112 116" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="8" stroke-linecap="round"/>
  <path d="M150 104 l11 24 26 2 -20 17 6 26 -23 -14 -23 14 6 -26 -20 -17 26 -2z" fill="url(#gold)" stroke="#b5832f" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="146" cy="140" r="5" fill="#fff"/>
''' + sparkles((232, 70, 14), (60, 66, 5), (250, 200, 4)))

ART['assets/item-bracelet.svg'] = svg(PINK + GOLD + LILAC, '''
  <ellipse cx="150" cy="160" rx="112" ry="62" fill="none" stroke="#b5832f" stroke-width="30"/>
  <ellipse cx="150" cy="160" rx="112" ry="62" fill="none" stroke="url(#gold)" stroke-width="22"/>
  <path d="M58 140 C80 108 130 98 170 100" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/>
''' + ''.join(
    f'<circle cx="{150+112*c:.1f}" cy="{160+62*s:.1f}" r="15" fill="url(#{g})" stroke="{st}" stroke-width="4"/><circle cx="{146+112*c:.1f}" cy="{155+62*s:.1f}" r="4" fill="#fff" opacity=".8"/>'
    for c, s, g, st in [(-.94, .34, 'pink', '#b9618f'), (-.6, .8, 'lilac', '#8d6bc0'), (0, 1, 'pink', '#b9618f'), (.6, .8, 'lilac', '#8d6bc0'), (.94, .34, 'pink', '#b9618f')]
) + '''
  <path d="M150 236 C138 224 110 210 112 192 C114 178 132 174 150 190 C168 174 186 178 188 192 C190 210 162 224 150 236 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="5" transform="translate(0 4)"/>
''' + sparkles((236, 74, 14), (70, 76, 5), (256, 236, 4)))

ART['assets/item-skirt.svg'] = svg(PINK + PINK_SOFT + GOLD, '''
  <path d="M86 70 L214 70 L262 214 Q150 246 38 214 Z" fill="url(#pinks)" stroke="#c4709c" stroke-width="5" stroke-linejoin="round"/>
  <path d="M76 110 Q150 132 224 110 L272 236 Q236 262 200 246 Q176 266 150 250 Q124 266 100 246 Q64 262 28 236 Z" fill="url(#pink)" fill-opacity=".85" stroke="#b9618f" stroke-width="5" stroke-linejoin="round"/>
  <path d="M100 140 L80 236 M150 146 L150 246 M200 140 L220 236" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>
  <rect x="80" y="52" width="140" height="30" rx="12" fill="url(#pink)" stroke="#b9618f" stroke-width="6"/>
  <path d="M150 67 C134 50 116 54 120 68 C116 82 134 84 150 67 C166 50 184 54 180 68 C184 82 166 84 150 67 Z" fill="url(#gold)" stroke="#b5832f" stroke-width="4"/>
  <path d="M90 120 Q72 170 56 220" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="7" stroke-linecap="round"/>
''' + sparkles((120, 190, 5), (186, 170, 4), (210, 214, 5), (100, 218, 3), (244, 60, 13)), vb='0 0 300 280')

# ---------- word cards ----------

SPIRAL = 'M' + ' L'.join(f'{150+r*math.cos(t):.1f} {118+r*math.sin(t):.1f}' for t, r in ((i/12, 4+i/12*4.3) for i in range(0, 170)))
ART['assets/words/chalon.svg'] = svg(grad('sky', (0, '#cdebfa'), (1, '#fde3ef'), x2=0) + PINK_SOFT + LILAC, '''
  <path d="M60 254 L60 120 Q60 46 150 46 Q240 46 240 120 L240 254 Z" fill="url(#sky)" stroke="#9f84d4" stroke-width="14" stroke-linejoin="round"/>
  <path d="M150 50 L150 254 M64 150 L236 150" stroke="url(#lilac)" stroke-width="10"/>
  <ellipse cx="108" cy="110" rx="22" ry="10" fill="#fff"/><ellipse cx="124" cy="104" rx="16" ry="10" fill="#fff"/>
  <path d="M190 190 l7 15 16 1 -12 10 4 16 -15 -9 -15 9 4 -16 -12 -10 16 -1z" fill="#fff4c9" stroke="#e1b65b" stroke-width="3"/>
  <path d="M40 254 L260 254" stroke="url(#pinks)" stroke-width="18" stroke-linecap="round"/>
  <path d="M40 254 L260 254" stroke="#c4709c" stroke-width="3" stroke-linecap="round" opacity=".5"/>
''')

ART['assets/words/chatul.svg'] = svg(grad('ct', (0, '#fff0d8'), (.55, '#f6c58c'), (1, '#d9925a')), '''
  <path d="M200 236 C250 240 266 190 240 168" fill="none" stroke="#b56f3a" stroke-width="20" stroke-linecap="round"/>
  <path d="M200 236 C250 240 266 190 240 168" fill="none" stroke="url(#ct)" stroke-width="12" stroke-linecap="round"/>
  <path d="M90 250 C70 190 96 150 150 150 C204 150 230 190 210 250 Z" fill="url(#ct)" stroke="#b56f3a" stroke-width="6" stroke-linejoin="round"/>
  <path d="M84 70 L96 122 L130 94 Z M216 70 L204 122 L170 94 Z" fill="url(#ct)" stroke="#b56f3a" stroke-width="6" stroke-linejoin="round"/>
  <path d="M92 86 L100 110 L116 98 Z M208 86 L200 110 L184 98 Z" fill="#f6b3c9"/>
  <ellipse cx="150" cy="134" rx="70" ry="56" fill="url(#ct)" stroke="#b56f3a" stroke-width="6"/>
  <ellipse cx="124" cy="128" rx="8" ry="11" fill="#3d3045"/><ellipse cx="176" cy="128" rx="8" ry="11" fill="#3d3045"/>
  <circle cx="127" cy="124" r="3" fill="#fff"/><circle cx="179" cy="124" r="3" fill="#fff"/>
  <path d="M144 146 L156 146 L150 153 Z" fill="#e46b8f"/>
  <path d="M150 153 Q142 162 134 158 M150 153 Q158 162 166 158" fill="none" stroke="#7a4b3a" stroke-width="3" stroke-linecap="round"/>
  <path d="M96 146 L66 140 M96 154 L68 160 M204 146 L234 140 M204 154 L232 160" stroke="#7a4b3a" stroke-width="3" stroke-linecap="round"/>
  <circle cx="110" cy="152" r="7" fill="#f6a8c2" opacity=".7"/><circle cx="190" cy="152" r="7" fill="#f6a8c2" opacity=".7"/>
  <path d="M120 182 Q150 196 180 182" fill="none" stroke="#e46b8f" stroke-width="7" stroke-linecap="round"/>
''')

ART['assets/words/chalav.svg'] = svg(grad('ml', (0, '#ffffff'), (1, '#e6eef7')) + PINK + grad('bl', (0, '#bfe3f6'), (1, '#7db8dc')), '''
  <path d="M90 100 L120 52 L180 52 L210 100 Z" fill="url(#bl)" stroke="#4a86ad" stroke-width="6" stroke-linejoin="round"/>
  <rect x="122" y="34" width="56" height="22" rx="5" fill="url(#pink)" stroke="#b9618f" stroke-width="5"/>
  <rect x="90" y="100" width="120" height="152" rx="10" fill="url(#ml)" stroke="#4a86ad" stroke-width="6"/>
  <path d="M90 150 Q150 130 210 150 L210 200 Q150 218 90 200 Z" fill="url(#bl)" opacity=".9"/>
  <path d="M150 156 C142 146 128 148 128 160 C128 172 150 184 150 184 C150 184 172 172 172 160 C172 148 158 146 150 156 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="3"/>
  <path d="M106 116 L106 236" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
''')

for rel, text in ART.items():
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    print('wrote', rel)
