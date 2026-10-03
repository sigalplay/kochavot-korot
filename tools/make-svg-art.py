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
ART['assets/words/limon.svg'] = svg(grad('y', (0, '#fff6b8'), (.55, '#ffe066'), (1, '#e8b52e')) + grad('lf', (0, '#bfe8a8'), (1, '#6fb36a')), '''
  <path d="M150 62 Q190 40 214 70" fill="none" stroke="#7a9c4e" stroke-width="7" stroke-linecap="round"/>
  <path d="M188 60 C220 30 258 42 262 56 C236 78 206 78 188 60 Z" fill="url(#lf)" stroke="#5c8f4e" stroke-width="5"/>
  <path d="M40 168 C36 112 92 72 150 72 C208 72 264 112 260 168 C264 222 208 252 150 250 C92 252 36 222 40 168 Z" fill="url(#y)" stroke="#c99a2a" stroke-width="6"/>
  <path d="M30 168 L44 162 L44 176 Z M270 168 L256 162 L256 176 Z" fill="#e8b52e" stroke="#c99a2a" stroke-width="4" stroke-linejoin="round"/>
  <path d="M80 130 C96 108 120 100 140 100" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="10" stroke-linecap="round"/>
  <g fill="#e2b13a" opacity=".5"><circle cx="110" cy="170" r="3"/><circle cx="170" cy="150" r="3"/><circle cx="200" cy="200" r="3"/><circle cx="140" cy="215" r="3"/></g>
''')

ART['assets/words/lechem.svg'] = svg(grad('br', (0, '#ffe2b0'), (.55, '#eab06a'), (1, '#c27c3a')), '''
  <path d="M38 196 C30 120 70 86 150 86 C230 86 270 120 262 196 Q262 232 230 232 L70 232 Q38 232 38 196 Z" fill="url(#br)" stroke="#a5652c" stroke-width="6"/>
  <path d="M96 116 Q110 150 98 186 M150 106 Q166 146 152 186 M204 116 Q218 150 206 186" fill="none" stroke="#fff3dc" stroke-width="9" stroke-linecap="round"/>
  <path d="M60 150 C66 124 86 108 110 102" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="8" stroke-linecap="round"/>
''')

ART['assets/words/ner.svg'] = svg(PINK + grad('fl', (0, '#fff7c0'), (.5, '#ffc94d'), (1, '#f08a3c'), x2=0) + GOLD, '''
  <ellipse cx="150" cy="128" rx="44" ry="20" fill="#fff4b8" opacity=".55"/>
  <path d="M150 34 C176 66 178 94 150 112 C122 94 124 66 150 34 Z" fill="url(#fl)" stroke="#df8a32" stroke-width="5"/>
  <path d="M150 70 C160 84 158 96 150 102 C142 96 140 84 150 70 Z" fill="#fff8d6"/>
  <path d="M150 112 L150 128" stroke="#6b4c55" stroke-width="5" stroke-linecap="round"/>
  <path d="M112 132 Q150 120 188 132 L188 246 L112 246 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="6" stroke-linejoin="round"/>
  <path d="M124 140 L124 236" stroke="#fff" stroke-opacity=".7" stroke-width="8" stroke-linecap="round"/>
  <path d="M172 132 Q178 150 170 160" fill="none" stroke="#fbd6e6" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="150" cy="252" rx="78" ry="18" fill="url(#gold)" stroke="#b5832f" stroke-width="5"/>
''')

ART['assets/words/notza.svg'] = svg(LILAC + PINK_SOFT, '''
  <path d="M70 250 C110 200 150 120 236 46 C258 92 238 168 176 206 C140 228 104 236 70 250 Z" fill="url(#pinks)" stroke="#c4709c" stroke-width="5" stroke-linejoin="round"/>
  <path d="M70 250 C120 190 170 120 236 46" fill="none" stroke="#b9618f" stroke-width="5" stroke-linecap="round"/>
  <path d="M110 214 L140 222 M130 186 L170 196 M150 160 L196 166 M172 132 L216 130 M192 104 L228 98 M120 196 L118 166 M146 168 L148 128 M170 140 L176 100 M196 110 L206 76" stroke="#e9a3c4" stroke-width="4" stroke-linecap="round"/>
  <path d="M60 260 L76 244" stroke="#b9618f" stroke-width="7" stroke-linecap="round"/>
''' + sparkles((250, 160, 13), (90, 120, 5), (230, 220, 4)))

ART['assets/words/nachash.svg'] = svg(grad('gr', (0, '#d8f2c2'), (.55, '#9bd38a'), (1, '#5fa266')), '''
  <path d="M58 230 C40 200 70 178 120 186 C176 194 222 196 226 166 C230 134 186 128 150 132 C110 136 86 116 98 92 C108 72 140 66 170 74" fill="none" stroke="#4f8a57" stroke-width="40" stroke-linecap="round"/>
  <path d="M58 230 C40 200 70 178 120 186 C176 194 222 196 226 166 C230 134 186 128 150 132 C110 136 86 116 98 92 C108 72 140 66 170 74" fill="none" stroke="url(#gr)" stroke-width="30" stroke-linecap="round"/>
  <path d="M90 194 C120 188 160 200 200 188 M118 120 C130 128 150 128 170 124" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="190" cy="76" rx="34" ry="26" fill="url(#gr)" stroke="#4f8a57" stroke-width="5"/>
  <circle cx="196" cy="68" r="7" fill="#3d3045"/><circle cx="198" cy="66" r="2.5" fill="#fff"/>
  <path d="M222 82 L242 84 M242 84 L250 78 M242 84 L250 90" stroke="#e46b8f" stroke-width="4" stroke-linecap="round"/>
  <circle cx="184" cy="88" r="5" fill="#f6a8c2" opacity=".8"/>
''')

ART['assets/words/sefer.svg'] = svg(LILAC + PINK, '''
  <path d="M40 92 Q96 70 150 96 L150 244 Q96 220 40 240 Z" fill="#fffaf2" stroke="#9f84d4" stroke-width="5" stroke-linejoin="round"/>
  <path d="M260 92 Q204 70 150 96 L150 244 Q204 220 260 240 Z" fill="#fffaf2" stroke="#9f84d4" stroke-width="5" stroke-linejoin="round"/>
  <path d="M30 100 L30 252 Q90 228 150 256 Q210 228 270 252 L270 100" fill="none" stroke="url(#lilac)" stroke-width="14" stroke-linejoin="round"/>
  <path d="M64 120 Q96 110 128 124 M64 146 Q96 136 128 150 M64 172 Q96 162 128 176 M172 124 Q204 110 236 120 M172 150 Q204 136 236 146" stroke="#d8c8ef" stroke-width="6" stroke-linecap="round"/>
  <path d="M206 168 C200 160 186 160 186 172 C186 184 206 194 206 194 C206 194 226 184 226 172 C226 160 212 160 206 168 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="3"/>
  <path d="M150 96 L150 256" stroke="#9f84d4" stroke-width="5"/>
''' + sparkles((240, 60, 13), (60, 66, 5)))

ART['assets/words/sira.svg'] = svg(grad('sea', (0, '#d7f0f8'), (1, '#8ccbe3'), x2=0) + PINK + grad('wd', (0, '#ffe5c4'), (1, '#d9a06a')), '''
  <path d="M150 50 L150 196" stroke="#a5652c" stroke-width="7" stroke-linecap="round"/>
  <path d="M158 56 Q216 112 232 180 L158 180 Z" fill="url(#pink)" stroke="#b9618f" stroke-width="5" stroke-linejoin="round"/>
  <path d="M142 80 Q100 132 92 180 L142 180 Z" fill="#fffaf2" stroke="#c4a3c9" stroke-width="5" stroke-linejoin="round"/>
  <path d="M58 196 L242 196 Q236 238 196 242 L104 242 Q64 238 58 196 Z" fill="url(#wd)" stroke="#a5652c" stroke-width="6" stroke-linejoin="round"/>
  <path d="M80 212 L220 212" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round"/>
  <path d="M30 256 Q60 240 90 256 Q120 272 150 256 Q180 240 210 256 Q240 272 270 256" fill="none" stroke="url(#sea)" stroke-width="12" stroke-linecap="round"/>
''')

SPIRAL = 'M' + ' L'.join(f'{150+r*math.cos(t):.1f} {118+r*math.sin(t):.1f}' for t, r in ((i/12, 4+i/12*4.3) for i in range(0, 170)))
ART['assets/words/sukariya.svg'] = svg(PINK + LILAC + rgrad('cd', (0, '#fff'), (.5, '#ffc3dc'), (1, '#e98bb6')), '''
  <path d="M150 156 L150 270" stroke="#e7d5c0" stroke-width="12" stroke-linecap="round"/>
  <path d="M150 156 L150 270" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <circle cx="150" cy="118" r="84" fill="url(#cd)" stroke="#b9618f" stroke-width="6"/>
  <path d="{SPIRAL}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
  <path d="{SPIRAL}" fill="none" stroke="#c9b1ee" stroke-width="3" stroke-linecap="round" opacity=".8"/>
  <path d="M136 186 L150 172 L164 186 L174 214 L150 200 L126 214 Z" fill="url(#lilac)" stroke="#8d6bc0" stroke-width="4" stroke-linejoin="round"/>
'''.replace('{SPIRAL}', SPIRAL))

ART['assets/words/tzav.svg'] = svg(grad('sh2', (0, '#d8f2c2'), (.55, '#9bd38a'), (1, '#5fa266')) + grad('sk', (0, '#e9f7d8'), (1, '#b7dd9c')), '''
  <ellipse cx="78" cy="226" rx="20" ry="16" fill="url(#sk)" stroke="#4f8a57" stroke-width="5"/>
  <ellipse cx="208" cy="226" rx="20" ry="16" fill="url(#sk)" stroke="#4f8a57" stroke-width="5"/>
  <path d="M56 180 L40 186" stroke="#4f8a57" stroke-width="12" stroke-linecap="round"/>
  <circle cx="238" cy="168" r="32" fill="url(#sk)" stroke="#4f8a57" stroke-width="5"/>
  <circle cx="246" cy="160" r="6" fill="#3d3045"/><circle cx="248" cy="158" r="2" fill="#fff"/>
  <path d="M244 180 Q252 186 260 178" fill="none" stroke="#4f8a57" stroke-width="4" stroke-linecap="round"/>
  <circle cx="236" cy="178" r="5" fill="#f6a8c2" opacity=".8"/>
  <path d="M50 206 C50 124 100 92 144 92 C190 92 230 128 228 206 Z" fill="url(#sh2)" stroke="#4f8a57" stroke-width="6" stroke-linejoin="round"/>
  <path d="M100 120 L120 150 L168 150 L188 120 M120 150 L104 204 M168 150 L182 204 M78 160 L120 150 M168 150 L216 160" fill="none" stroke="#4f8a57" stroke-width="4" stroke-linejoin="round" opacity=".7"/>
  <path d="M42 206 L236 206" stroke="#4f8a57" stroke-width="7" stroke-linecap="round"/>
  <path d="M76 140 C86 118 106 106 124 102" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/>
''')

ART['assets/words/tzalachat.svg'] = svg(PINK + GOLD, '''
  <ellipse cx="150" cy="160" rx="124" ry="92" fill="#fffaf4" stroke="#c4a3c9" stroke-width="6"/>
  <ellipse cx="150" cy="160" rx="110" ry="80" fill="none" stroke="url(#pink)" stroke-width="9"/>
  <ellipse cx="150" cy="166" rx="74" ry="50" fill="#fff4ee" stroke="#ead9e6" stroke-width="4"/>
  <g fill="url(#gold)">''' + ''.join(f'<circle cx="{150+110*c:.1f}" cy="{160+80*s:.1f}" r="5"/>' for c, s in [(1, 0), (-1, 0), (0, 1), (0, -1), (.71, .71), (-.71, .71), (.71, -.71), (-.71, -.71)]) + '''</g>
  <path d="M70 120 C90 96 120 86 150 84" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="7" stroke-linecap="round"/>
''')

ART['assets/words/tzipor.svg'] = svg(grad('bd', (0, '#d9f1fb'), (.55, '#9cd4ee'), (1, '#5ea6cf')) + GOLD, '''
  <path d="M230 120 L276 102 L262 140 Z" fill="url(#bd)" stroke="#4a86ad" stroke-width="5" stroke-linejoin="round"/>
  <path d="M54 150 C54 102 92 70 132 70 C170 70 196 92 212 118 C240 130 248 164 232 190 C212 228 160 236 120 230 C78 224 54 196 54 150 Z" fill="url(#bd)" stroke="#4a86ad" stroke-width="6"/>
  <path d="M120 148 C152 136 192 146 206 176 C176 194 140 188 120 148 Z" fill="#c4e6f6" stroke="#4a86ad" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="100" cy="122" r="9" fill="#3d3045"/><circle cx="103" cy="119" r="3" fill="#fff"/>
  <path d="M60 128 L28 140 L60 150 Z" fill="url(#gold)" stroke="#b5832f" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="92" cy="150" r="8" fill="#f6a8c2" opacity=".8"/>
  <path d="M118 230 L112 262 M150 232 L152 264 M104 262 L122 262 M144 264 L162 264" stroke="#d99a3a" stroke-width="5" stroke-linecap="round"/>
  <path d="M84 92 C96 82 112 78 128 80" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="7" stroke-linecap="round"/>
''')

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
