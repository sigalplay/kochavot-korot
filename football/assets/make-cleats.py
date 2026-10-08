import numpy as np, sys
from PIL import Image
from scipy import ndimage as nd
D='/tmp/claude-0/-home-user/c23b6031-30d2-5e3e-9252-b776b3864c53/scratchpad/fb/'
R='/home/user/kochavot-korot/football/assets/'
sc=float(sys.argv[1]); cut=int(sys.argv[2]); cxs=[int(sys.argv[3]),int(sys.argv[4])]
lay=np.array(Image.open(D+'boots-orig.png')).copy()
lay[cut:,:,3]=0
L=Image.fromarray(lay)
for i,cx in enumerate(cxs):
    c=np.array(Image.open(D+f'cleat{i}.png')).astype(int)
    # the sock above the shoe's collar goes; the drawn sock layer shows there instead
    # start the shoe at its white collar; the drawn sock layer shows above it
    white=(c[...,:3].min(-1)>200)&(c[...,3]>200)
    rows=np.where(white.sum(1)>=3)[0]; r0=rows[0]
    top=c[:r0+5]; sock=(top[...,2]>top[...,0]+40)&~white[:r0+5]
    top[...,3]=np.where(sock,0,top[...,3]); c[:r0+5]=top
    rows=np.where(c[...,3].max(1)>100)[0]; c=c[rows[0]:]
    print('collar row',rows[0])
    c=Image.fromarray(c.astype(np.uint8))
    w,h=int(c.size[0]*sc),int(c.size[1]*sc); c=np.array(c.resize((w,h),Image.LANCZOS))
    # the sole: fill the gaps between the studs so no toes show through
    for y in range(h-int(14*sc/2.5),h):
        xs=np.where(c[y,:,3]>120)[0]
        if len(xs)>1:
            gap=c[y,xs[0]:xs[-1]+1]; m=gap[...,3]<=120; gap[m]=[38,38,46,255]
    # thin leftovers of the sock outline above the shoe go
    solid=nd.binary_opening(c[...,3]>120,structure=np.ones((5,5)))
    solid=nd.binary_dilation(solid,iterations=1)
    c[...,3]=np.where(solid,c[...,3],0)
    c=Image.fromarray(c)
    L.alpha_composite(c,(int(cx-w/2),924-h))
L.save(R+'items/boots-on.png')
p=Image.open(R+'player.png').convert('RGBA')
for l in ['jersey','shorts','boots']: p.alpha_composite(Image.open(R+f'items/{l}-on.png'))
bg=Image.new('RGBA',p.size,(120,200,120,255));bg.alpha_composite(p)
bg.crop((0,640,271,924)).resize((542,568)).save(D+'feet2.png')
