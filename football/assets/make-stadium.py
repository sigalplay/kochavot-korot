# Layers for the football stadium, cut from five edits of one picture: each layer is what one edit added.
# Note: the far goal is cleared from stand-on.png and fans-on.png is stand+fans; see the commit that added this.
import numpy as np, sys
from PIL import Image
from scipy import ndimage as nd
U='/root/.claude/uploads/c23b6031-30d2-5e3e-9252-b776b3864c53/'; O=sys.argv[1]
names={'empty':'7fd23142','grass':'2dcab922','fans':'f1e13275','seats':'63f6b585','goals':'90f0f28f'}
im={k:np.array(Image.open(U+v+'-image.jpg').convert('RGB')) for k,v in names.items()}
def layer(new,old,thr=34,close=3,minsz=60,fill=True):
    a,b=im[new].astype(int),im[old].astype(int)
    m=np.abs(a-b).max(-1)>thr
    m=nd.binary_closing(m,iterations=close)
    if fill: m=nd.binary_fill_holes(m)
    m=nd.binary_opening(m,iterations=1)
    lab,n=nd.label(m); sz=nd.sum(m,lab,range(1,n+1)); m=np.isin(lab,[i+1 for i,s in enumerate(sz) if s>=minsz])
    al=nd.gaussian_filter(m.astype(float),.7)
    out=np.dstack([im[new],(al*255).astype(np.uint8)])
    return Image.fromarray(out).resize((1600,1000),Image.LANCZOS)
SZ=(1600,1000)
Image.fromarray(im['empty']).resize(SZ,Image.LANCZOS).save(O+'base.jpg',quality=92)
layer('grass','empty',close=4).save(O+'grass-on.png')
layer('goals','grass',thr=40,close=2).save(O+'goals-on.png')
layer('seats','goals',close=3).save(O+'stand-on.png')
layer('fans','seats',close=3).save(O+'fans-on.png')
