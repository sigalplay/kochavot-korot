# A real rectangular football pitch seen from above at an angle, drawn in the game's cartoon style (flat colours, thick dark outlines).
# Writes the base picture and the layers the child adds: grass, goals, stand, fans. All 1600×1000, all from one geometry.
import numpy as np, sys
from PIL import Image, ImageDraw, ImageFilter
OUT=sys.argv[1]
S=2; W,H=1600*S,1000*S
INK=(43,43,53,255); OW=4*S
# pitch corners on screen (far-left, far-right, near-right, near-left) and the pitch in metres
L,Wd=68.0,105.0
# corners of the pitch on screen: seen from behind the near goal, the pitch runs straight into the distance
FL,FR,NR,NL=(560,370),(900,370),(1330,950),(130,950)   # (u,v) = (0,0), (68,0), (68,105), (0,105)
def homog(src,dst):
    A=[]
    for (x,y),(X,Y) in zip(src,dst):
        A.append([x,y,1,0,0,0,-X*x,-X*y,-X]); A.append([0,0,0,x,y,1,-Y*x,-Y*y,-Y])
    _,_,v=np.linalg.svd(np.array(A,float)); return v[-1].reshape(3,3)/v[-1][-1]
Hm=homog([(0,0),(L,0),(L,Wd),(0,Wd)],[FL,FR,NR,NL])
def P(u,v):
    p=Hm@np.array([u,v,1.0]); return (p[0]/p[2]*S,p[1]/p[2]*S)
def ppm(u,v):  # screen pixels per metre here (across the pitch)
    a,b=P(u-.5,v),P(u+.5,v); return abs(b[0]-a[0])
def ppv(u,v):  # screen pixels per metre along the pitch's length
    a,b=P(u,v-.5),P(u,v+.5); return float(np.hypot(b[0]-a[0],b[1]-a[1]))
def up(u,v,h): x,y=P(u,v); return (x,y-h*1.6*ppm(u,v))
def poly(d,pts,fill,ow=OW): d.polygon(pts,fill=fill); d.line(pts+[pts[0]],fill=INK,width=ow,joint='curve')
def new(): return Image.new('RGBA',(W,H))
def save(im,name): im.resize((1600,1000),Image.LANCZOS).save(OUT+name)

# ---------- base: sky, a low far wall, sandy ground, the bare rectangular pitch of packed dirt ----------
base=new(); d=ImageDraw.Draw(base)
for y in range(0,int(300*S)):
    t=y/(300*S); d.line([(0,y),(W,y)],fill=(int(170+60*t),int(215+20*t),int(240+5*t),255))
d.rectangle([0,300*S,W,H],fill=(214,190,150,255))
d.rectangle([0,262*S,W,300*S],fill=(196,205,214,255)); d.line([(0,262*S),(W,262*S)],fill=INK,width=OW); d.line([(0,300*S),(W,300*S)],fill=INK,width=OW)
for x in range(0,1600,120): d.line([(x*S,262*S),(x*S,300*S)],fill=(150,160,172,255),width=2*S)
pitch=[P(0,0),P(L,0),P(L,Wd),P(0,Wd)]
poly(d,pitch,(196,150,98,255))
rng=np.random.default_rng(3)
for _ in range(90):  # bumps and stones in the dirt
    u,v=rng.uniform(2,L-2),rng.uniform(2,Wd-2); x,y=P(u,v); r=ppm(u,v)*rng.uniform(.4,1.0)
    d.ellipse([x-r*1.6,y-r*.6,x+r*1.6,y+r*.6],fill=(176,130,82,255))
save(base,'base.jpg'.replace('.jpg','.png')); base.convert('RGB').resize((1600,1000),Image.LANCZOS).save(OUT+'base.jpg',quality=90)

# ---------- grass: the same rectangle, mowing stripes and every white line of a real pitch ----------
g=new(); d=ImageDraw.Draw(g)
n=14
for i in range(n):
    v0,v1=Wd*i/n,Wd*(i+1)/n
    d.polygon([P(0,v0),P(L,v0),P(L,v1),P(0,v1)],fill=(92,174,74,255) if i%2 else (110,190,88,255))
WL=(250,250,245,255); lw=lambda u,v: max(2,int(ppm(u,v)*.22))
def line(pts,w=None):
    for a,b in zip(pts,pts[1:]):
        d.line([P(*a),P(*b)],fill=WL,width=w or lw(*a))
def rect(u0,v0,u1,v1): line([(u0,v0),(u1,v0),(u1,v1),(u0,v1),(u0,v0)])
rect(1,1,L-1,Wd-1); line([(1,Wd/2),(L-1,Wd/2)])
circ=[(L/2+9.15*np.cos(t),Wd/2+9.15*np.sin(t)) for t in np.linspace(0,2*np.pi,90)]; line(circ)
def spot(u,v): x,y=P(u,v); r=ppm(u,v)*.45; d.ellipse([x-r,y-r*.6,x+r,y+r*.6],fill=WL)
for e in (0,1):
    s_=1 if e==0 else -1; v=1 if e==0 else Wd-1
    rect(L/2-20.15,min(v,v+s_*16.5),L/2+20.15,max(v,v+s_*16.5))
    rect(L/2-9.15,min(v,v+s_*5.5),L/2+9.15,max(v,v+s_*5.5))
    spot(L/2,v+s_*11)
    arc=[(L/2+9.15*np.sin(t),v+s_*11+s_*9.15*np.cos(t)) for t in np.linspace(-.93,.93,30)]; line(arc)
spot(L/2,Wd/2)
d.line(pitch+[pitch[0]],fill=INK,width=OW)
save(g,'grass-on.png')

# ---------- goals: one at each end, white frame and a net ----------
gl=new(); d=ImageDraw.Draw(gl)
def goal(v,back):
    u0,u1=L/2-3.66*1.6,L/2+3.66*1.6; h=2.44*1.5; hb=h*.8
    net=(255,255,255,170)
    d.polygon([up(u0,back,hb),up(u1,back,hb),P(u1,back),P(u0,back)],fill=(255,255,255,70))
    for k in range(13): t=k/12; uu=u0+(u1-u0)*t; d.line([up(uu,back,hb),P(uu,back)],fill=net,width=S)
    for k in range(6): t=k/5; d.line([up(u0,back,hb*t),up(u1,back,hb*t)],fill=net,width=S)
    for uu in (u0,u1):
        for k in range(4): t=k/3; vv=v+(back-v)*t; d.line([up(uu,vv,h+(hb-h)*t),P(uu,vv)],fill=net,width=S)
        d.line([up(uu,v,h),up(uu,back,hb)],fill=net,width=S); d.line([P(uu,v),P(uu,back)],fill=net,width=S)
    for k in range(9): t=k/8; uu=u0+(u1-u0)*t; d.line([up(uu,v,h),up(uu,back,hb)],fill=net,width=S)
    wd=int(ppm(L/2,v)*.35)
    for col,w_ in ((INK,wd+2*S),((255,255,255,255),wd)):
        d.line([P(u0,v),up(u0,v,h),up(u1,v,h),P(u1,v)],fill=col,width=w_,joint='curve')
goal(1,-1.5)          # far goal, net behind it
goal(Wd-1,Wd+1.5)    # near goal, seen from behind its net
save(gl,'goals-on.png')

# ---------- stand: rows of royal blue seats on concrete steps behind the far touch line ----------
st=new(); d=ImageDraw.Draw(st)
rows=5; u0,u1=-14,L+14
def sp(u,dv,h): return up(u,-dv,h)   # behind the far goal line: v<0
for i in range(rows):           # from the front row up to the back
    dv0,dv1=4+i*2.2,4+(i+1)*2.2; h0,h1=1.0+i*1.8,1.0+(i+1)*1.8
    poly(d,[sp(u0,dv0,h0),sp(u1,dv0,h0),sp(u1,dv0,h1),sp(u0,dv0,h1)],(150,156,166,255),OW//2)   # riser
    poly(d,[sp(u0,dv0,h1),sp(u1,dv0,h1),sp(u1,dv1,h1),sp(u0,dv1,h1)],(196,200,208,255),OW//2)   # tread
poly(d,[sp(u0,4,0),sp(u1,4,0),sp(u1,4,1.0),sp(u0,4,1.0)],(120,126,138,255),OW//2)
# seats, front row last so it overlaps
seat_pos=[]
for i in reversed(range(rows)):
    dv=4+i*2.2+1.1; h=1.0+(i+1)*1.8; ns=int((u1-u0)/2.2)
    for k in range(ns):
        u=u0+1.2+k*(u1-u0-2.4)/(ns-1)
        x,y=sp(u,dv,h); s=ppm(u,-dv)*1.15
        bw,bh=s*.62,s*.95
        d.rounded_rectangle([x-bw,y-bh*1.15,x+bw,y-bh*.25],radius=s*.25,fill=(33,84,196,255),outline=INK,width=S)   # back
        d.rounded_rectangle([x-bw*1.05,y-bh*.35,x+bw*1.05,y+bh*.05],radius=s*.15,fill=(52,108,220,255),outline=INK,width=S)  # seat
        seat_pos.append((i,x,y,s))
# side walls
for uu,s in ((u0,-1),(u1,1)):
    pts=[sp(uu,4,0),sp(uu,4,1.0)]+[sp(uu,4+(i)*2.2,1.0+(i+1)*1.8) for i in range(rows)]+[sp(uu,4+rows*2.2,1.0+rows*1.8),sp(uu,4+rows*2.2,0)]
    poly(d,pts,(170,176,186,255),OW//2)
save(st,'stand-on.png')

# ---------- fans: children sitting in the seats, cheering, in blue and white ----------
fa=new(); d=ImageDraw.Draw(fa)
skins=[(247,214,186),(233,190,150),(201,150,110),(150,102,70),(110,72,50)]
hairs=[(60,40,30),(120,80,45),(30,25,25),(200,160,90),(150,60,30)]
shirts=[(33,84,196),(250,250,250),(33,84,196),(242,194,48)]
rng=np.random.default_rng(7)
for (i,x,y,s) in seat_pos:
    if rng.random()<.18: continue
    sk=skins[rng.integers(5)]; hr=hairs[rng.integers(5)]; sh=shirts[rng.integers(4)]
    hb=y-s*1.05; r=s*.62
    d.rounded_rectangle([x-s*.8,hb+r*.4,x+s*.8,y-s*.15],radius=s*.35,fill=sh+(255,),outline=INK,width=S)  # body
    if rng.random()<.45:   # arms up
        for side in (-1,1):
            d.line([(x+side*s*.6,hb+r*.8),(x+side*s*1.0,hb-r*1.4)],fill=INK,width=int(s*.42)+S)
            d.line([(x+side*s*.6,hb+r*.8),(x+side*s*1.0,hb-r*1.4)],fill=sk+(255,),width=int(s*.32))
    d.ellipse([x-r,hb-r,x+r,hb+r],fill=sk+(255,),outline=INK,width=S)        # head
    d.chord([x-r*1.05,hb-r*1.12,x+r*1.05,hb+r*.5],180,360,fill=hr+(255,),outline=INK,width=S)  # hair
    if rng.random()<.12:  # a scarf or flag
        fx,fy=x+s*1.2,hb-r*2.2; d.line([(x+s*.9,hb),(fx,fy)],fill=INK,width=S*2)
        d.polygon([(fx,fy),(fx+s*2.2,fy+s*.5),(fx,fy+s*1.1)],fill=(33,84,196,255),outline=INK)
save(fa,'fans-on.png')

prev=base.copy()
for im in (g,gl,st,fa): prev.alpha_composite(im)
prev.convert('RGB').resize((1600,1000),Image.LANCZOS).save(OUT+'preview.jpg',quality=88)
print('ok')
