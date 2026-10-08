# widen the player and every worn layer so shoes can stick out past the feet; same padding everywhere
import numpy as np
from PIL import Image
R='/home/user/kochavot-korot/football/assets/'
D='/tmp/claude-0/-home-user/c23b6031-30d2-5e3e-9252-b776b3864c53/scratchpad/fb/'
PAD=40
def pad(src,dst):
    im=Image.open(src).convert('RGBA'); assert im.size==(271,924),(src,im.size)
    out=Image.new('RGBA',(271+2*PAD,924)); out.alpha_composite(im,(PAD,0)); out.save(dst)
pad(R+'player.png',R+'player.png')
for k in ['jersey','shorts','armband','wristband']: pad(R+f'items/{k}-on.png',R+f'items/{k}-on.png')
pad(D+'boots-orig.png',D+'boots-orig-pad.png')
# the player with no feet: shown while he wears the boots, so no toes can peek out
p=np.array(Image.open(R+'player.png')); p[858:,:,3]=0; Image.fromarray(p).save(R+'player-nofeet.png')
