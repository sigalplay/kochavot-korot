import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage as nd
import sys
R='/home/user/kochavot-korot/football/assets/'
src=np.array(Image.open(R+'player.png').convert('RGBA')).astype(float)
H,W=src.shape[:2]
r,g,b,al=[src[...,i] for i in range(4)]
mx=src[...,:3].max(-1); mn=src[...,:3].min(-1); sat=mx-mn; L=src[...,:3].mean(-1)
yy,xx=np.mgrid[:H,:W]
skin=(al>0)&(r>g+12)&(g>b)&(sat>25)
ROYAL=np.array([30,78,196.])
def layer(mask,rgb):
    out=np.zeros((H,W,4)); out[...,:3]=rgb; out[...,3]=np.where(mask,al,0); return out
def save(out,name): Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(R+'items/'+name)

# ---- jersey: the white shirt turned royal blue, white collar/sleeve trim, a white 7
shirt=(al>0)&(yy>=250)&(yy<=502)&(sat<40)&~skin&~((b>r+12)&(L<120))
shirt=nd.binary_fill_holes(nd.binary_closing(shirt,iterations=2))&(al>0)
lab,n=nd.label(shirt); sizes=nd.sum(shirt,lab,range(1,n+1)); shirt=lab==(1+int(np.argmax(sizes)))
shade=np.clip(L/238,0,1.08)[...,None]
rgb=ROYAL*shade**1.3
near_skin=nd.binary_dilation(skin,iterations=5)
trim=shirt&near_skin&(yy<400)&(L>150)
rgb[trim]=np.array([248,248,250])*np.clip(L[trim]/240,.7,1)[:,None]
j=layer(shirt,rgb)
im=Image.fromarray(np.clip(j,0,255).astype(np.uint8))
d=ImageDraw.Draw(im); f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',92)
d.text((137,378),'7',font=f,fill=(250,250,252,255),anchor='mm',stroke_width=2,stroke_fill=(20,50,140,255))
im.save(R+'items/jersey-on.png')

# ---- shorts: the navy shorts turned royal blue with a white stripe on each outer side
sh=(al>0)&(yy>=492)&(yy<=618)&~skin&((b>r+8)|(L<70))
sh=nd.binary_fill_holes(nd.binary_closing(sh,iterations=2))&(al>0)
lab,n=nd.label(sh); sizes=nd.sum(sh,lab,range(1,n+1)); sh=lab==(1+int(np.argmax(sizes)))
med=np.median(L[sh]); rgb=ROYAL*np.clip(L/med,0,1.5)[...,None]**1.1
stripe=np.zeros_like(sh)
for y in range(H):
    xs=np.where(sh[y])[0]
    if len(xs)<20: continue
    stripe[y,xs[0]+5:xs[0]+12]=True; stripe[y,xs[-1]-11:xs[-1]-4]=True
stripe&=sh&(yy>505)
rgb[stripe]=[246,246,250]
save(layer(sh,rgb),'shorts-on.png')

# ---- socks + boots on the legs
legs=(al>0)&(yy>=640)
lab,n=nd.label(legs); comps=sorted(range(1,n+1),key=lambda i:-nd.sum(legs,lab,i))[:2]
out=np.zeros((H,W,4))
SOCK_TOP,ANKLE=700,842
for c in comps:
    m=lab==c
    sock=m&(yy>=SOCK_TOP)&(yy<ANKLE+8)
    shade=np.clip(L/np.median(L[sock&skin]),0,1.3)[...,None]
    srgb=ROYAL*shade**1.2
    st=sock&(((yy>=SOCK_TOP+12)&(yy<SOCK_TOP+19))|((yy>=SOCK_TOP+25)&(yy<SOCK_TOP+32)))
    srgb[st]=[246,246,250]
    out[sock,:3]=srgb[sock]; out[sock,3]=al[sock]
# boots: the foot's own outline, filled solid (no toes), as a blue cleat with a white stripe and a dark sole
for c in comps:
    m=(lab==c)&(yy>=ANKLE-4)&(al>160)
    f=np.zeros_like(m)
    for y in range(H):
        xs=np.where(m[y])[0]
        if len(xs): f[y,xs[0]-1:xs[-1]+2]=True
    f=nd.gaussian_filter(f.astype(float),2.2)>.5
    ys,xs=np.where(f); y0,y1=ys.min(),ys.max(); x0,x1=xs.min(),xs.max(); cx=(x0+x1)/2
    inner=nd.binary_erosion(f,iterations=3)
    t=((yy-y0)/(y1-y0))
    col=np.zeros((H,W,3)); col[:]=np.array([22,46,140.])*(1.25-.35*t[...,None])
    col[(yy<y0+5)]=[14,22,60]; col[(yy>=y0+5)&(yy<y0+7)]=[246,246,250]
    col[~inner]=[20,28,60]
    sole=f&(yy>=y1-6); col[sole]=[28,28,36]
    outer=-1 if cx<W/2 else 1
    u=(xx-cx)*outer/((x1-x0)/2)
    stripe=inner&~sole&(np.abs(u-(0.15+0.9*t))<.16)&(t>.25)
    col[stripe]=[246,246,250]
    for k in range(3):
        ly=y0+14+k*8
        lace=inner&(np.abs(yy-ly)<1.2)&(np.abs(xx-cx)<7)
        col[lace]=[246,246,250]
    out[f,:3]=col[f]; out[f,3]=255
    out[(lab==c)&(yy>=ANKLE-4)&~f,3]=0
save(out,'boots-on.png')
