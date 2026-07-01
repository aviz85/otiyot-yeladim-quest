/* win_bg.js — finale scene: the printed issue! */
'use strict';
if(typeof BG==='undefined') var BG={};

BG.win = function(ctx,t){
  // festive evening sky
  A.bands(ctx,0,0,320,[['#2a2150',60],['#4a3a78',50],['#7e4fa0',40],['#b18fd0',30]]);
  A.skyline(ctx,150,PAL.navy);
  A.px(ctx,PAL.brown2,0,150,320,30);
  // fireworks (t-animated)
  for(let i=0;i<3;i++){
    const ph=(t*0.7+i*0.33)%1, cx=60+i*100, cy=40+i*12;
    if(ph<0.6){ const r=4+ph*26;
      const cols=[PAL.yellow,PAL.pink,PAL.cyan][i];
      for(let a=0;a<8;a++){ const x=cx+Math.cos(a*0.785)*r, y=cy+Math.sin(a*0.785)*r; A.px(ctx,cols,x,y,2,2); }
    }
  }
  // the fresh newspaper, big in center
  ctx.save(); ctx.translate(160,96); ctx.rotate(Math.sin(t*1.2)*0.04);
  A.px(ctx,PAL.paper,-58,-52,116,88);
  A.box(ctx,PAL.paper,PAL.paperD,-58,-52,116,88);
  A.text(ctx,'אותיות וילדים',0,-48,PAL.redD,15);
  A.px(ctx,PAL.redD,-50,-30,100,1);
  A.text(ctx,'הגיליון החגיגי — בזמן!',0,-27,PAL.ink,9);
  A.text(ctx,'בלעדי: ריאיון עם ש. גיבורי',0,-14,PAL.blueD,7);
  // little article columns
  for(let c=0;c<3;c++) for(let l=0;l<6;l++) A.px(ctx,PAL.gray3,-50+c*35,-2+l*5,28,1.5);
  A.text(ctx,'נעם — גיבור המערכת! 🏆',0,26,PAL.greenD,7);
  ctx.restore();
};
