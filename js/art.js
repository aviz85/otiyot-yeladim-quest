/* ============================================================
   art.js — palette + pixel-art drawing helpers
   Logical resolution: 320x180. All coords in logical pixels.
   Style: 90's LucasArts point&click, warm, colorful, chunky pixels.
   ============================================================ */
'use strict';

const PAL = {
  // basics
  black:'#1a1423', white:'#f8f4e8', ink:'#2b2233',
  // grays
  gray1:'#3d3a4a', gray2:'#5c5b6e', gray3:'#8a8a9e', gray4:'#bdbccb',
  // warm browns / wood
  brown1:'#4a2e1e', brown2:'#6e4426', brown3:'#96602f', brown4:'#c08a4a', wood:'#a9713a', woodL:'#c99356',
  // skin
  skin:'#f0c8a0', skinD:'#d19f72', skin2:'#c98d5e',
  // reds
  red:'#d43d3d', redD:'#932828', pink:'#f2879c',
  // oranges / yellows
  orange:'#ef8f2e', orangeD:'#c76a1a', yellow:'#f7d046', yellowD:'#d9a831', cream:'#f5e6c8',
  // greens
  green:'#4fa04f', greenD:'#2f6e3a', lime:'#8fce4e', teal:'#3e9e8e',
  // blues
  blue:'#3d6fb4', blueD:'#274b7e', sky:'#8ecae6', skyD:'#5fa8d3', navy:'#1d2b53', cyan:'#6fd8e0',
  // purples
  purple:'#7e4fa0', purpleD:'#573575', lav:'#b18fd0',
  // paper
  paper:'#efe9d5', paperD:'#d8cfae',
};

const A = {
  // solid rect
  px(ctx,c,x,y,w=1,h=1){ ctx.fillStyle=c; ctx.fillRect(x|0,y|0,w,h); },
  // checkerboard dither between two colors
  dither(ctx,c1,c2,x,y,w,h){
    A.px(ctx,c1,x,y,w,h);
    ctx.fillStyle=c2;
    for(let j=0;j<h;j++) for(let i=(j%2);i<w;i+=2) ctx.fillRect(x+i,y+j,1,1);
  },
  // filled circle (pixelated)
  disc(ctx,c,cx,cy,r){
    ctx.fillStyle=c;
    for(let j=-r;j<=r;j++){ const s=Math.floor(Math.sqrt(r*r-j*j)); ctx.fillRect(cx-s,cy+j,s*2+1,1); }
  },
  // horizontal color bands (sky gradients): bands=[[color,height],...]
  bands(ctx,x,y,w,bandList){
    let yy=y; for(const [c,h] of bandList){ A.px(ctx,c,x,yy,w,h); yy+=h; }
  },
  // outlined box
  box(ctx,fill,line,x,y,w,h){
    A.px(ctx,fill,x,y,w,h);
    ctx.fillStyle=line;
    ctx.fillRect(x,y,w,1); ctx.fillRect(x,y+h-1,w,1); ctx.fillRect(x,y,1,h); ctx.fillRect(x+w-1,y,1,h);
  },
  // wooden plank floor from y to 180
  floorWood(ctx,y,c1=PAL.brown3,c2=PAL.brown2){
    A.px(ctx,c1,0,y,320,180-y);
    ctx.fillStyle=c2;
    for(let j=y;j<180;j+=6) ctx.fillRect(0,j,320,1);
    for(let j=y,k=0;j<180;j+=6,k++) for(let i=(k%2)*40+12;i<320;i+=80) ctx.fillRect(i,j,1,6);
  },
  // tiled floor
  floorTile(ctx,y,c1=PAL.gray4,c2=PAL.gray3){
    A.px(ctx,c1,0,y,320,180-y);
    ctx.fillStyle=c2;
    for(let j=y,k=0;j<180;j+=8,k++) for(let i=(k%2)*8;i<320;i+=16) ctx.fillRect(i,j,8,8);
  },
  // wall with baseboard
  wall(ctx,c,y0,y1,base=PAL.brown2){
    A.px(ctx,c,0,y0,320,y1-y0); A.px(ctx,base,0,y1-4,320,4);
  },
  // window with sky + frame; w,h outer size
  window(ctx,x,y,w,h,skyC=PAL.sky,frame=PAL.brown2){
    A.px(ctx,frame,x-2,y-2,w+4,h+4);
    A.px(ctx,skyC,x,y,w,h);
    A.px(ctx,PAL.white,x+3,y+4,8,3); A.px(ctx,PAL.white,x+w-14,y+9,10,3); // clouds
    A.px(ctx,frame,x+(w>>1)-1,y,2,h); A.px(ctx,frame,x,y+(h>>1)-1,w,2);
  },
  // simple door; returns nothing. dir: knob side
  door(ctx,x,y,w,h,c=PAL.brown3,frame=PAL.brown1){
    A.px(ctx,frame,x-2,y-2,w+4,h+2);
    A.px(ctx,c,x,y,w,h);
    A.box(ctx,c,frame,x+3,y+4,w-6,(h>>1)-6);
    A.box(ctx,c,frame,x+3,y+(h>>1)+2,w-6,(h>>1)-6);
    A.disc(ctx,PAL.yellow,x+w-5,y+(h>>1),2);
  },
  // shelf unit with books/binders
  shelf(ctx,x,y,w,h,cols=[PAL.red,PAL.blue,PAL.green,PAL.orange,PAL.purple,PAL.teal]){
    A.box(ctx,PAL.brown2,PAL.brown1,x,y,w,h);
    const rows=Math.floor((h-4)/14);
    for(let r=0;r<rows;r++){
      const ry=y+3+r*14;
      A.px(ctx,PAL.brown1,x+2,ry+12,w-4,2);
      let bx=x+3;
      let s=r*7+x; // deterministic pseudo-random
      while(bx<x+w-6){
        s=(s*73+19)%97; const bw=3+(s%4); const bh=10+((s>>2)%3);
        A.px(ctx,cols[s%cols.length],bx,ry+12-bh,bw,bh);
        bx+=bw+1;
      }
    }
  },
  // desk/table (side view)
  table(ctx,x,y,w,h,c=PAL.brown3,cd=PAL.brown2){
    A.px(ctx,c,x,y,w,4); A.px(ctx,cd,x,y+4,w,2);
    A.px(ctx,cd,x+2,y+6,4,h-6); A.px(ctx,cd,x+w-6,y+6,4,h-6);
  },
  // potted plant
  plant(ctx,x,y){ // x,y = base center
    A.px(ctx,PAL.orangeD,x-6,y-8,12,8); A.px(ctx,PAL.brown1,x-7,y-9,14,2);
    A.disc(ctx,PAL.greenD,x,y-16,7); A.disc(ctx,PAL.green,x-4,y-20,5); A.disc(ctx,PAL.green,x+4,y-19,5); A.disc(ctx,PAL.lime,x,y-24,4);
  },
  // poster/frame on wall
  poster(ctx,x,y,w,h,c=PAL.cream,frame=PAL.brown1){
    A.px(ctx,frame,x-1,y-1,w+2,h+2); A.px(ctx,c,x,y,w,h);
  },
  // hanging lamp
  lamp(ctx,x,y,on=true){
    A.px(ctx,PAL.gray1,x,0,1,y-6);
    A.px(ctx,PAL.gray2,x-5,y-6,11,4);
    A.disc(ctx,on?PAL.yellow:PAL.gray2,x,y,3);
  },
  // text (Hebrew ok). Small crisp text on canvas for signs.
  text(ctx,str,x,y,c=PAL.ink,size=8,align='center',bold=true){
    ctx.save(); ctx.fillStyle=c; ctx.font=(bold?'bold ':'')+size+'px "Rubik", sans-serif';
    ctx.textAlign=align; ctx.textBaseline='top'; ctx.direction='rtl';
    ctx.fillText(str,x,y); ctx.restore();
  },
  // sun/glow
  glow(ctx,c,cx,cy,r){ A.disc(ctx,c,cx,cy,r); },
  // city skyline silhouette across width at base y
  skyline(ctx,y,c=PAL.navy){
    ctx.fillStyle=c;
    let x=0,s=5;
    while(x<320){ s=(s*37+11)%53; const bw=14+(s%18), bh=12+(s%26);
      ctx.fillRect(x,y-bh,bw,bh);
      for(let wy=y-bh+3; wy<y-3; wy+=5) for(let wx=x+2; wx<x+bw-2; wx+=4){ if(((wx+wy)%7)<2){ ctx.fillStyle=PAL.yellow; ctx.fillRect(wx,wy,1,2); ctx.fillStyle=c; } }
      x+=bw+3+(s%6);
    }
  },
};
