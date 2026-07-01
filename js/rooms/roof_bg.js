/* roof_bg.js — הגג (sunset rooftop, home of נחום the pigeon)
   Layout contract (hotspots in roof.js use these rects):
   hatch/ladder down x40-70 y120-150 (to kitchen) · pigeon coop x200-260 y80-120 on legs
   nest with white page x216-244 y96-108 (visible while !G.f.got2)
   solar water heater (דוד שמש) x100-150 y90-120 · clothesline+socks x150-200 y60-80 (animated)
   potted herbs ~x112-148 y162-172 · skyline at y=120 behind parapet · walkY:150
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.roof = function(ctx,t){
  // ---- sunset sky (warm bands, top→horizon) ----
  A.bands(ctx,0,0,320,[
    [PAL.skyD,26],[PAL.sky,24],[PAL.cream,18],
    [PAL.yellow,20],[PAL.orange,18],[PAL.orangeD,14],
  ]);

  // ---- setting sun (soft shimmer) ----
  const shm = Math.floor(t*2)%2;
  A.glow(ctx,PAL.orange,286,102,13+shm);
  A.glow(ctx,PAL.yellow,286,102,10);
  A.glow(ctx,PAL.cream,286,102,6);
  A.px(ctx,PAL.yellow,268,101,5,1); A.px(ctx,PAL.yellow,300,104,6,1); // sun streaks

  // ---- drifting clouds (animated) ----
  const cd = Math.floor((t*7)%352)-16;
  A.px(ctx,PAL.white,cd,22,26,4);      A.px(ctx,PAL.white,cd+6,19,14,3);
  A.px(ctx,PAL.cream,(cd+130)%352-16,38,32,5); A.px(ctx,PAL.cream,(cd+138)%352-16,35,16,3);
  A.px(ctx,PAL.pink,(cd+230)%352-16,55,24,4);  // sunset-lit cloud
  A.px(ctx,PAL.cream,(cd+236)%352-16,52,12,2);

  // ---- distant birds (animated flock) ----
  const bx = Math.floor((t*16)%360)-20;
  A.px(ctx,PAL.ink,bx,44,3,1);   A.px(ctx,PAL.ink,bx+1,43,1,1);
  A.px(ctx,PAL.ink,bx+9,48,3,1); A.px(ctx,PAL.ink,bx+10,47,1,1);
  A.px(ctx,PAL.ink,bx+5,52,3,1);

  // ---- city skyline behind the parapet ----
  A.skyline(ctx,120,PAL.navy);
  A.px(ctx,PAL.blueD,0,117,320,3);           // haze line above parapet

  // ---- parapet ledge (back edge of the roof) ----
  A.px(ctx,PAL.gray4,0,116,320,3);
  A.px(ctx,PAL.gray3,0,119,320,5);
  for(let i=8;i<320;i+=24) A.px(ctx,PAL.gray2,i,119,1,5); // ledge blocks
  A.text(ctx,'נחום היה פה',96,118,PAL.gray1,5);           // pigeon graffiti gag

  // ---- roof deck (tar + seams) ----
  A.px(ctx,PAL.gray2,0,124,320,56);
  ctx.fillStyle=PAL.gray1;
  for(let j=132;j<180;j+=10) ctx.fillRect(0,j,320,1);     // tar seams
  A.px(ctx,PAL.gray1,20,138,26,5);  A.px(ctx,PAL.gray1,240,160,30,6); // tar patches
  A.dither(ctx,PAL.gray2,PAL.gray3,0,124,320,4);          // sun-lit deck edge

  // ---- puddle reflecting the sunset ----
  A.px(ctx,PAL.skyD,82,158,22,4); A.px(ctx,PAL.sky,86,159,14,2);
  A.px(ctx,PAL.orange,90,159,4,1); // sun glint in puddle

  // ---- old pipes running along the parapet ----
  A.px(ctx,PAL.gray3,0,126,40,3); A.px(ctx,PAL.gray1,12,126,2,3); A.px(ctx,PAL.gray1,30,126,2,3);
  A.px(ctx,PAL.gray3,264,126,56,3); A.px(ctx,PAL.gray1,290,126,2,3);

  // ---- hatch / ladder down to the kitchen (x40-70 y120-150) ----
  A.px(ctx,PAL.brown1,38,126,36,24);                      // raised curb
  A.px(ctx,PAL.brown2,40,128,32,20);
  A.px(ctx,PAL.black,44,130,24,16);                       // dark opening
  A.px(ctx,PAL.brown3,46,132,20,2); A.px(ctx,PAL.brown3,46,138,20,2); // ladder rungs
  A.px(ctx,PAL.brown3,46,144,20,2);
  A.px(ctx,PAL.brown3,32,122,8,28); A.px(ctx,PAL.brown1,32,122,8,2);  // open lid leaning
  A.px(ctx,PAL.brown1,32,134,8,2);
  A.box(ctx,PAL.cream,PAL.brown1,42,108,30,12);           // sign above hatch
  A.text(ctx,'למטבחון ⬇',57,110,PAL.redD,6);

  // ---- TV antenna (left of the heater) ----
  A.px(ctx,PAL.gray1,86,50,2,74);
  A.px(ctx,PAL.gray3,76,54,22,1); A.px(ctx,PAL.gray3,79,60,16,1); A.px(ctx,PAL.gray3,82,66,10,1);
  A.px(ctx,PAL.gray1,80,122,14,3);                        // base plate

  // ---- solar water heater — דוד שמש (x100-150 y90-120) ----
  A.px(ctx,PAL.gray1,102,112,3,14); A.px(ctx,PAL.gray1,144,112,3,14); // frame legs
  for(let i=0;i<9;i++) A.px(ctx,PAL.navy,102+i*5,118-i*3,8,4);        // tilted panel
  for(let i=0;i<9;i++) A.px(ctx,PAL.blueD,103+i*5,119-i*3,6,1);       // panel lines
  A.px(ctx,PAL.white,110+((Math.floor(t*3)%5)*6),112-((Math.floor(t*3)%5)*3),2,1); // sun glint slides
  A.px(ctx,PAL.gray4,104,90,42,10);                       // tank (boiler)
  A.disc(ctx,PAL.gray4,104,95,5); A.disc(ctx,PAL.gray3,146,95,5);
  A.px(ctx,PAL.gray3,104,97,42,3);                        // tank shading
  A.px(ctx,PAL.gray2,124,100,3,12);                       // pipe down to panel
  A.text(ctx,'דוד שמש',125,80,PAL.gray1,6);

  // ---- clothesline with waving socks (x150-200 y60-80, animated) ----
  A.px(ctx,PAL.gray1,151,58,2,66); A.px(ctx,PAL.gray1,146,58,12,2);   // pole+T left
  A.px(ctx,PAL.gray1,197,58,2,66); A.px(ctx,PAL.gray1,192,58,12,2);   // pole+T right
  A.px(ctx,PAL.gray3,153,63,44,1); A.px(ctx,PAL.gray3,158,64,34,1);   // sagging wire
  const sockC=[PAL.red,PAL.green,PAL.blue,PAL.yellow];
  for(let i=0;i<4;i++){
    const sx=158+i*10, sw=Math.floor(Math.sin(t*3+i*1.7)*2);          // wave in the breeze
    A.px(ctx,PAL.gray4,sx+2,63,1,2);                                  // clothespin
    A.px(ctx,sockC[i],sx,65,5,9);                                     // sock leg
    A.px(ctx,sockC[i],sx+sw,73,5,4);                                  // sock foot flaps
    A.px(ctx,PAL.white,sx,65,5,2);                                    // cuff
  }

  // ---- pigeon coop on legs (x200-260 y80-120) ----
  A.px(ctx,PAL.brown1,204,110,4,16); A.px(ctx,PAL.brown1,252,110,4,16); // legs
  A.px(ctx,PAL.brown2,202,124,58,3);                       // leg shadow strip
  A.box(ctx,PAL.brown3,PAL.brown1,200,84,60,30);           // coop body
  ctx.fillStyle=PAL.brown2;
  for(let i=204;i<258;i+=8) ctx.fillRect(i,86,1,26);       // wooden planks
  A.px(ctx,PAL.brown1,196,80,68,4); A.px(ctx,PAL.brown2,198,78,64,2); // slanted roof
  A.px(ctx,PAL.brown1,212,92,36,20);                       // dark doorway
  // nest + the missing page (x216-244 y96-108, until got2)
  A.px(ctx,PAL.brown4,216,103,28,6);                       // straw nest
  A.px(ctx,PAL.brown2,218,107,24,2);
  A.px(ctx,PAL.yellowD,220,102,4,1); A.px(ctx,PAL.yellowD,236,103,5,1); // stray straws
  if(typeof G==='undefined'||!G.f||!G.f.got2){
    A.px(ctx,PAL.white,220,96,20,9);                       // page 2!
    A.px(ctx,PAL.gray4,222,98,16,1); A.px(ctx,PAL.gray4,222,101,16,1);
    A.px(ctx,PAL.gray4,231,96,1,9);                        // folded crease
  }
  A.box(ctx,PAL.cream,PAL.brown1,208,66,44,10);            // hotel sign
  A.text(ctx,'מלון נחום ★',230,67,PAL.brown1,6);
  A.px(ctx,PAL.white,206,120,3,2); A.px(ctx,PAL.gray4,248,122,3,1);   // feathers below
  A.px(ctx,PAL.white,196,150,4,2); A.px(ctx,PAL.gray4,236,146,3,2);   // more drifted feathers

  // ---- vent pipe with steam (animated) ----
  A.px(ctx,PAL.gray3,268,100,8,26); A.px(ctx,PAL.gray1,266,98,12,3);  // pipe + cap
  const pf=Math.floor(t*2)%3;
  if(pf===0) A.px(ctx,PAL.gray4,270,92,3,3);
  if(pf===1){ A.px(ctx,PAL.gray4,271,88,3,3); A.px(ctx,PAL.gray4,269,93,2,2); }
  if(pf===2){ A.px(ctx,PAL.gray4,272,84,4,3); A.px(ctx,PAL.gray4,270,90,2,2); }

  // ---- satellite dish on the right parapet ----
  A.disc(ctx,PAL.gray4,304,106,7); A.disc(ctx,PAL.gray3,305,106,5);
  A.px(ctx,PAL.gray1,303,106,6,1); A.px(ctx,PAL.gray1,306,112,2,10);  // arm + pole

  // ---- second small antenna (right) ----
  A.px(ctx,PAL.gray1,290,74,1,50); A.px(ctx,PAL.gray3,285,78,11,1); A.px(ctx,PAL.gray3,287,84,7,1);

  // ---- potted herbs of gila (front) ----
  A.px(ctx,PAL.orangeD,112,164,12,8); A.px(ctx,PAL.brown1,111,163,14,2);
  A.disc(ctx,PAL.green,118,159,4); A.disc(ctx,PAL.lime,116,156,2);
  A.px(ctx,PAL.orangeD,130,166,10,7); A.px(ctx,PAL.brown1,129,165,12,2);
  A.px(ctx,PAL.green,132,158,2,8); A.px(ctx,PAL.green,136,160,2,6); A.px(ctx,PAL.lime,134,156,2,4);
  A.px(ctx,PAL.orangeD,146,165,11,7); A.px(ctx,PAL.brown1,145,164,13,2);
  A.disc(ctx,PAL.greenD,151,160,4); A.disc(ctx,PAL.lime,153,157,2);
  A.px(ctx,PAL.paper,124,173,20,5); A.text(ctx,'נענע. לא לקטוף!',134,173,PAL.greenD,5);

  // ---- stray old newspaper page blown into a corner ----
  A.px(ctx,PAL.paperD,10,156,14,9); A.px(ctx,PAL.gray3,12,158,10,1); A.px(ctx,PAL.gray3,12,161,10,1);
};
