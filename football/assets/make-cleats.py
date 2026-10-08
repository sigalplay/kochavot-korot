# boots layer: the drawn socks (from make-layers.py) + the cleats cut from the sheet where the player wears them
import numpy as np, sys
from PIL import Image
D='/tmp/claude-0/-home-user/c23b6031-30d2-5e3e-9252-b776b3864c53/scratchpad/fb/'
R='/home/user/kochavot-korot/football/assets/'
sc=float(sys.argv[1]); cut=int(sys.argv[2]); cxs=[float(sys.argv[3]),float(sys.argv[4])]; bottom=int(sys.argv[5])
lay=np.array(Image.open(D+'boots-orig-pad.png')).copy()
lay[cut:,:,3]=0
L=Image.fromarray(lay)
for i,cx in enumerate(cxs):
    c=np.array(Image.open(D+f'cleat{i}.png')); c[:6,:,3]=0; c=Image.fromarray(c)  # its own sock goes; the drawn sock runs into the shoe
    w,h=round(c.size[0]*sc),round(c.size[1]*sc); c=np.array(c.resize((w,h),Image.LANCZOS))
    # the sock inside the cleat picture is centred at x≈31.5 (left shoe) or 13 (right shoe) of 46; it goes right under the drawn sock
    L.alpha_composite(Image.fromarray(c),(round(cx-[31.5,13][i]*sc),bottom-h))
L.save(R+'items/boots-on.png')
p=Image.open(R+'player-nofeet.png').convert('RGBA')
for l in ['jersey','shorts','boots']: p.alpha_composite(Image.open(R+f'items/{l}-on.png'))
bg=Image.new('RGBA',p.size,(150,150,150,255));bg.alpha_composite(p)
bg.crop((0,640,351,924)).resize((702,568)).save(D+'feet2.png')
