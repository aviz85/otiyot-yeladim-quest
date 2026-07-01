/* newsroom_bg.js — חדר הכתבים (busy reporters' room, home of dovi & mordechai the cat)
   Layout contract (hotspots in newsroom.js use these rects):
   door to lobby x8-36 y72-142 · reporter desk #1 + old computer x44-114 y100-146
   meeting door x120-148 y72-142 (sign ״חדר ישיבות״) · reporter desk #2 x154-204 y100-146
   wall map x50-100 y30-64 (״מפת הסקופים״) · window x162-202 y30-68
   typewriter table x206-234 y110-146 (״המוזיאון של דובי״) · big cabinet x240-290 y60-146
   page1 corner under cabinet x252-268 y146-152 (drawn while !G.f.got1)
   design door x292-316 y72-142 (sign ״גרפיקה״) · paper stacks near lobby door
   Animations (t): green CRT flicker+scanline+blinking cursor · coffee steam · wall clock second hand
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.newsroom = function(ctx,t){
  // ---- walls: warm mustard "old newsroom" tone ----
  A.wall(ctx,'#8f7c54',0,140,PAL.brown2);
  A.px(ctx,'#a3905f',0,0,320,8);                        // ceiling strip
  A.px(ctx,'#7c6b47',0,8,320,2);                        // ceiling shadow line
  A.floorWood(ctx,140);

  // teal runner rug between the desks (well-trodden)
  A.box(ctx,PAL.teal,PAL.blueD,124,150,84,20);
  A.dither(ctx,PAL.teal,PAL.blueD,128,153,76,14);

  // ---- ceiling lamps ----
  A.lamp(ctx,150,20,true);
  A.lamp(ctx,255,20,true);

  // ---- door to lobby (LEFT, x8-36 y72-142) ----
  A.door(ctx,10,74,24,66);
  A.text(ctx,'ללובי ←',22,58,PAL.cream,6);

  // paper stacks near the door (the famous "filing system")
  A.px(ctx,PAL.paper,28,138,18,4);  A.px(ctx,PAL.paperD,29,142,16,1);
  A.px(ctx,PAL.paperD,30,133,15,5); A.px(ctx,PAL.paper,31,128,13,5);
  A.px(ctx,PAL.paper,26,146,20,4);  A.px(ctx,PAL.paperD,27,150,18,1);
  A.px(ctx,PAL.yellow,33,125,8,3);                      // sticky note on top
  A.text(ctx,'דחוף!',37,124,PAL.redD,4);

  // ---- wall map above desk1 (x50-100 y30-64): מפת הסקופים ----
  A.poster(ctx,50,30,50,34,PAL.cream,PAL.brown1);
  A.text(ctx,'מפת הסקופים',75,31,PAL.blueD,6);
  A.disc(ctx,PAL.green,66,50,7); A.disc(ctx,PAL.lime,64,47,4);    // landmass
  A.disc(ctx,PAL.green,84,54,5); A.px(ctx,PAL.sky,52,40,46,2);    // sea strip
  A.px(ctx,PAL.red,64,46,2,2); A.px(ctx,PAL.red,86,52,2,2);       // pins
  A.px(ctx,PAL.yellow,72,54,2,2); A.px(ctx,PAL.orange,58,52,2,2);
  A.px(ctx,PAL.gray3,66,47,20,1);                                  // string between pins
  A.px(ctx,PAL.gray3,74,48,12,1);

  // ---- wall clock (deadline pressure!) with moving second hand ----
  A.disc(ctx,PAL.brown1,110,44,7); A.disc(ctx,PAL.cream,110,44,6);
  A.px(ctx,PAL.ink,110,44,1,4); A.px(ctx,PAL.ink,107,44,4,1);      // ~5:45...
  const ca=t*2, cdx=Math.round(Math.cos(ca)*4), cdy=Math.round(Math.sin(ca)*4);
  A.px(ctx,PAL.red,110+cdx,44+cdy,1,1);                            // frantic second hand
  A.text(ctx,'טיק',110,54,PAL.gray2,4);

  // ---- reporter desk #1 with old computer (x44-114 y100-146) ----
  A.table(ctx,44,100,70,46,PAL.brown3,PAL.brown2);
  // beige CRT monitor
  A.box(ctx,PAL.cream,PAL.brown2,58,72,36,28);
  A.px(ctx,PAL.ink,62,76,28,18);                                   // screen glass
  // green phosphor text lines (flicker with t)
  const flick=(Math.floor(t*9)%13)!==0;                            // rarely blinks off
  if(flick){
    A.px(ctx,PAL.greenD,64,78,22,1); A.px(ctx,PAL.greenD,64,81,17,1);
    A.px(ctx,PAL.greenD,64,84,24,1); A.px(ctx,PAL.greenD,64,87,12,1);
    const sl=76+(Math.floor(t*22)%18);                             // rolling scanline
    A.px(ctx,PAL.lime,62,sl,28,1);
    if(Math.floor(t*3)%2) A.px(ctx,PAL.lime,77,87,3,1);            // blinking cursor
  }
  A.px(ctx,PAL.cream,70,100,12,2);                                 // monitor foot
  A.px(ctx,PAL.gray1,93,90,2,12);                                  // cable down the back
  // keyboard + mouse
  A.box(ctx,PAL.paperD,PAL.gray2,60,96,26,4);
  A.px(ctx,PAL.gray3,62,97,2,2); A.px(ctx,PAL.gray3,66,97,2,2); A.px(ctx,PAL.gray3,70,97,2,2);
  A.px(ctx,PAL.gray3,74,97,2,2); A.px(ctx,PAL.gray3,78,97,2,2); A.px(ctx,PAL.gray3,82,97,2,2);
  A.px(ctx,PAL.gray4,90,96,5,4); A.px(ctx,PAL.gray1,92,95,1,1);    // mouse + tail
  // messy notes on desk1
  A.px(ctx,PAL.paper,46,96,10,5); A.px(ctx,PAL.yellow,100,97,10,6);
  A.text(ctx,'סקופ?',105,97,PAL.redD,4);

  // ---- meeting door (x120-148 y72-142) ----
  A.door(ctx,122,74,24,66);
  A.text(ctx,'חדר ישיבות',134,58,PAL.cream,6);

  // waste bin + crumpled drafts (dovi's three-point attempts)
  A.px(ctx,PAL.gray2,115,130,10,12); A.px(ctx,PAL.gray1,114,129,12,2);
  A.px(ctx,PAL.paper,117,127,4,3);                                 // overflowing ball
  A.disc(ctx,PAL.paper,109,153,2); A.disc(ctx,PAL.paperD,130,148,2);
  A.disc(ctx,PAL.paper,214,156,2);

  // ---- window (x162-202 y30-68) ----
  A.window(ctx,164,32,36,34,PAL.sky,PAL.brown2);
  A.px(ctx,PAL.navy,164,58,36,8);                                  // city rooftops
  A.px(ctx,PAL.yellow,168,60,1,2); A.px(ctx,PAL.yellow,176,61,1,2);
  A.px(ctx,PAL.yellow,190,60,1,2);                                 // lit windows far away
  A.px(ctx,PAL.brown2,181,56,2,10);                                // redraw center mullion
  A.px(ctx,PAL.gray4,196,40,3,2);                                  // a suspicious pigeon far away...

  // ---- reporter desk #2 (x154-204 y100-146) ----
  A.table(ctx,154,100,50,46,PAL.brown3,PAL.brown2);
  // red rotary phone (for anonymous tips)
  A.px(ctx,PAL.red,157,92,13,8); A.px(ctx,PAL.redD,158,89,11,3);
  A.disc(ctx,PAL.redD,160,96,2); A.disc(ctx,PAL.redD,167,96,2);
  // pile of tomorrow's paper
  A.px(ctx,PAL.paper,173,95,15,5); A.px(ctx,PAL.paperD,174,93,14,3);
  A.px(ctx,PAL.ink,176,94,9,1);                                    // headline smudge
  // coffee mug + steam (animated)
  A.px(ctx,PAL.blue,192,93,7,7); A.px(ctx,PAL.blue,199,95,2,3);
  if(Math.floor(t*2)%2){ A.px(ctx,PAL.gray4,194,88,1,3); A.px(ctx,PAL.gray4,196,86,1,2); }
  else { A.px(ctx,PAL.gray4,196,88,1,3); A.px(ctx,PAL.gray4,194,86,1,2); }
  // pencil cup
  A.px(ctx,PAL.orangeD,185,90,5,5); A.px(ctx,PAL.yellow,186,86,1,4); A.px(ctx,PAL.red,188,85,1,5);

  // ---- "scoop!" framed front page above desk2/typewriter wall ----
  A.poster(ctx,210,34,24,26,PAL.paper,PAL.brown1);
  A.text(ctx,'סקופ!',222,36,PAL.redD,7);
  A.px(ctx,PAL.gray3,213,46,18,1); A.px(ctx,PAL.gray3,213,49,14,1);
  A.px(ctx,PAL.gray3,213,52,18,1); A.px(ctx,PAL.gray3,213,55,10,1);

  // ---- typewriter museum (table x206-234 y110-146) ----
  A.table(ctx,206,110,28,36,PAL.brown2,PAL.brown1);
  A.px(ctx,PAL.ink,210,101,20,9);                                  // typewriter body
  A.px(ctx,PAL.gray1,212,98,16,3);                                 // carriage
  A.px(ctx,PAL.gray3,212,106,2,2); A.px(ctx,PAL.gray3,216,106,2,2);
  A.px(ctx,PAL.gray3,220,106,2,2); A.px(ctx,PAL.gray3,224,106,2,2); // keys
  A.px(ctx,PAL.white,216,88,10,11);                                 // page in the roller
  A.px(ctx,PAL.gray2,217,91,8,1); A.px(ctx,PAL.gray2,217,94,6,1);
  A.px(ctx,PAL.gray1,208,99,3,2);                                   // return lever
  // little museum plaque
  A.poster(ctx,206,70,30,15,PAL.cream,PAL.brown1);
  A.text(ctx,'המוזיאון',221,71,PAL.brown1,5);
  A.text(ctx,'של דובי',221,77,PAL.brown1,5);

  // ---- big cabinet (x240-290 y60-146) — mordechai's fortress ----
  A.box(ctx,PAL.brown3,PAL.brown1,240,60,50,86);
  A.px(ctx,PAL.brown4,240,60,50,4);                                 // top cornice
  A.box(ctx,PAL.brown3,PAL.brown2,244,68,19,70);                    // left door
  A.box(ctx,PAL.brown3,PAL.brown2,267,68,19,70);                    // right door
  A.px(ctx,PAL.yellow,261,102,2,4); A.px(ctx,PAL.yellow,268,102,2,4); // handles
  A.px(ctx,PAL.brown2,247,72,13,28); A.px(ctx,PAL.brown2,270,72,13,28); // panels
  A.px(ctx,PAL.brown2,247,104,13,28); A.px(ctx,PAL.brown2,270,104,13,28);
  // dusty trophy + old papers on top of the cabinet
  A.px(ctx,PAL.yellowD,250,52,6,6); A.px(ctx,PAL.yellowD,252,58,2,2); A.px(ctx,PAL.brown1,249,59,8,1);
  A.px(ctx,PAL.paperD,264,55,18,5); A.px(ctx,PAL.paper,266,52,14,3);
  A.px(ctx,PAL.gray1,240,146,50,2);                                 // shadow under cabinet
  // page1 white corner peeking under the cabinet (x252-268 y146-152) while !got1
  if(!(typeof G!=='undefined'&&G.f&&G.f.got1)){
    A.px(ctx,PAL.white,252,147,16,5);
    A.px(ctx,PAL.paperD,252,147,16,1);
    A.px(ctx,PAL.gray2,255,149,9,1);                                // a peek of the lost text!
  }
  // mordechai's saucer (he ordered room service)
  A.px(ctx,PAL.gray4,272,154,10,3); A.px(ctx,PAL.gray3,274,154,6,1);

  // ---- design door (RIGHT, x292-316 y72-142) ----
  A.door(ctx,294,74,22,66);
  A.text(ctx,'גרפיקה ←',305,58,PAL.cream,6);

  // motivational newsroom poster over the lobby door
  A.poster(ctx,10,36,26,22,PAL.cream,PAL.brown1);
  A.text(ctx,'שקט!',23,38,PAL.redD,6);
  A.text(ctx,'חושבים',23,46,PAL.blueD,6);

  // stray orange cat hairs near the cabinet (evidence everywhere)
  A.px(ctx,PAL.orange,246,152,3,1); A.px(ctx,PAL.orange,284,156,3,1);
  A.px(ctx,PAL.orange,236,150,2,1);
};
