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
for rel, text in ART.items():
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    print('wrote', rel)
