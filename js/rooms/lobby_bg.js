/* lobby_bg.js — הלובי (hub of the magazine building)
   Layout contract (hotspots in lobby.js use these rects):
   street glass double-door x8-38 y70-142 (sign ״אותיות וילדים — כניסה״)
   stairs DOWN to archive x44-74 y100-142 (dark opening, sign ״לארכיון ⬇״)
   orange sofa x80-130 y118-148 (coin under cushions!)
   reception desk x136-196 y104-146 · noticeboard x136-196 y30-70 above it
   kitchen arch x200-226 y70-142 (sign ״מטבחון״)
   newsroom door x232-262 y72-142 (sign ״חדר כתבים״)
   broken elevator x266-284 y60-142 (sign ״תיכף חוזר (מאז 1997)״)
   office door x288-316 y70-142 (sign ״עורכת ראשית״) · plant · walkY 158
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.lobby = function(ctx,t){
  /* ---------- walls & floor: warm sandy lobby ---------- */
  A.wall(ctx,'#b3986b',0,140,PAL.brown2);
  ctx.fillStyle='#a78c5f';                                  // wallpaper stripes
  for(let sx=4;sx<320;sx+=16) ctx.fillRect(sx,11,2,125);
  A.px(ctx,'#8f7a55',0,0,320,10);                           // ceiling strip
  A.px(ctx,PAL.brown1,0,10,320,1);
  A.floorTile(ctx,140,PAL.paperD,'#cbb68a');                // warm tiled floor

  /* ---------- hanging lamps + one very busy fly (animated) ---------- */
  A.lamp(ctx,118,24,true);
  A.lamp(ctx,250,24,true);
  const fx=118+Math.round(Math.cos(t*5)*7), fy=31+Math.round(Math.sin(t*5)*3);
  A.px(ctx,PAL.ink,fx,fy,1,1);                              // the lobby fly

  /* ---------- street glass double-door x8-38 y70-142 ---------- */
  A.px(ctx,PAL.blueD,6,68,34,76);                           // metal frame
  A.px(ctx,PAL.sky,9,72,13,66);                             // left pane
  A.px(ctx,PAL.sky,24,72,13,66);                            // right pane
  A.px(ctx,PAL.blueD,22,72,2,66);                           // center post
  A.px(ctx,PAL.skyD,9,120,13,18); A.px(ctx,PAL.skyD,24,120,13,18); // street below
  A.px(ctx,PAL.gray3,10,132,26,3);                          // sidewalk line
  // reflection sweep gliding across the glass (animated)
  const gl=9+(Math.floor(t*10)%28);
  if(gl<21||(gl>=24&&gl<36)) A.px(ctx,PAL.white,gl,74,1,30);
  A.px(ctx,PAL.gray4,11,102,9,2); A.px(ctx,PAL.gray4,26,102,9,2); // push handles
  // sign above the entrance
  A.px(ctx,PAL.cream,2,46,44,20); A.box(ctx,PAL.cream,PAL.brown1,2,46,44,20);
  A.text(ctx,'אותיות וילדים',24,48,PAL.redD,6);
  A.text(ctx,'— כניסה —',24,57,PAL.blueD,5);
  // welcome mat
  A.px(ctx,PAL.red,8,146,32,9); A.box(ctx,PAL.red,PAL.redD,8,146,32,9);
  A.text(ctx,'ברוכים הבאים!',24,147,PAL.cream,5);

  /* ---------- stairs DOWN to archive x44-74 y100-142 ---------- */
  A.px(ctx,PAL.brown1,42,98,34,46);                         // opening frame
  A.px(ctx,PAL.black,44,100,30,42);                         // darkness of the deep
  A.px(ctx,'#2b2233',46,124,26,6);                          // steps fading down...
  A.px(ctx,PAL.gray1,46,130,26,6);
  A.px(ctx,PAL.gray2,46,136,26,6);
  A.px(ctx,PAL.gray3,44,141,30,1);                          // top step lip
  for(let i=0;i<5;i++) A.px(ctx,PAL.gray2,48+i*5,116-i*3,4,1); // handrail down
  A.dither(ctx,PAL.black,PAL.gray1,46,104,26,8);            // dusty gloom
  // sign
  A.px(ctx,PAL.cream,46,86,26,11); A.box(ctx,PAL.cream,PAL.brown1,46,86,26,11);
  A.text(ctx,'לארכיון ⬇',59,88,PAL.ink,6);

  /* ---------- orange sofa x80-130 y118-148 (the coin-eater) ---------- */
  A.px(ctx,PAL.brown1,83,146,4,4); A.px(ctx,PAL.brown1,123,146,4,4); // legs
  A.px(ctx,PAL.orange,82,118,46,18);                        // backrest
  A.px(ctx,PAL.orangeD,82,118,46,2);
  A.px(ctx,PAL.orange,80,126,9,22);                         // left arm
  A.px(ctx,PAL.orange,121,126,9,22);                        // right arm
  A.px(ctx,PAL.orangeD,80,126,9,2); A.px(ctx,PAL.orangeD,121,126,9,2);
  A.px(ctx,PAL.orange,88,134,33,12);                        // seat
  A.px(ctx,PAL.orangeD,88,134,33,2);
  A.px(ctx,PAL.orangeD,103,134,2,12);                       // cushion gap (coin lives here)
  A.px(ctx,PAL.yellow,89,136,13,1); A.px(ctx,PAL.yellow,107,136,12,1); // seams
  A.px(ctx,PAL.teal,90,124,11,11); A.box(ctx,PAL.teal,PAL.blueD,90,124,11,11); // pillow
  A.px(ctx,PAL.paper,108,130,13,5); A.px(ctx,PAL.paperD,110,132,9,1); // dropped newspaper
  A.px(ctx,PAL.gray4,96,150,3,1); A.px(ctx,PAL.gray4,116,151,2,1);    // historic crumbs

  /* ---------- framed old covers above the sofa ---------- */
  A.poster(ctx,84,34,18,24,PAL.cream);
  A.text(ctx,'גיליון',93,37,PAL.blueD,5); A.text(ctx,'מס׳ 1',93,45,PAL.redD,5);
  A.poster(ctx,108,38,18,24,PAL.paper);
  A.px(ctx,PAL.orange,111,42,12,10);                        // cover art: cat scoop
  A.px(ctx,PAL.ink,113,45,2,2); A.px(ctx,PAL.ink,118,45,2,2);
  A.text(ctx,'החתול!',117,53,PAL.ink,5);

  /* ---------- plant between sofa & stairs ---------- */
  A.plant(ctx,77,154);

  /* ---------- noticeboard x136-196 y30-70 ---------- */
  A.px(ctx,PAL.brown1,136,30,60,40);                        // frame
  A.px(ctx,PAL.woodL,139,33,54,34);                         // cork
  A.text(ctx,'לוח מודעות',166,32,PAL.brown1,6);
  // pinned notes + pins
  A.px(ctx,PAL.white,142,44,13,10); A.px(ctx,PAL.ink,144,47,9,1); A.px(ctx,PAL.ink,144,50,7,1);
  A.disc(ctx,PAL.red,148,44,1);
  A.px(ctx,PAL.yellow,158,42,15,12); A.px(ctx,PAL.ink,160,46,11,1); A.px(ctx,PAL.ink,160,49,8,1);
  A.disc(ctx,PAL.blue,165,42,1);
  A.px(ctx,PAL.pink,177,44,13,10); A.px(ctx,PAL.ink,179,47,9,1);
  A.disc(ctx,PAL.green,183,44,1);
  // the big note everyone reads (corner flutters in the AC breeze — animated)
  A.px(ctx,PAL.cream,146,55,34,11); A.disc(ctx,PAL.red,163,55,1);
  A.text(ctx,'החתול לא אשם',163,57,PAL.redD,5);
  if(Math.floor(t*3)%2) A.px(ctx,PAL.cream,180,64,2,2);     // fluttering corner

  /* ---------- reception desk x136-196 y104-146 ---------- */
  A.px(ctx,PAL.brown3,134,104,64,6);                        // counter top
  A.px(ctx,PAL.brown1,134,104,64,1);
  A.px(ctx,PAL.brown2,138,110,56,36);                       // front panel
  A.box(ctx,PAL.brown2,PAL.brown1,142,114,20,26);           // panel decor
  A.box(ctx,PAL.brown2,PAL.brown1,170,114,20,26);
  A.px(ctx,PAL.cream,152,116,28,10);                        // plaque
  A.text(ctx,'קבלה',166,117,PAL.brown1,7);
  A.disc(ctx,PAL.yellow,190,101,3); A.px(ctx,PAL.yellowD,189,103,3,1); // service bell
  A.px(ctx,PAL.blue,140,96,6,8); A.disc(ctx,PAL.red,143,93,2);         // vase + flower
  A.px(ctx,PAL.green,142,95,1,2);
  A.px(ctx,PAL.paper,152,100,16,4); A.px(ctx,PAL.paperD,156,98,14,4);  // paperwork
  A.px(ctx,PAL.gray3,178,99,10,5); A.px(ctx,PAL.gray1,180,97,6,2);     // gila's phone
  // rug in front of the desk
  A.px(ctx,PAL.teal,142,150,56,16); A.box(ctx,PAL.teal,PAL.blueD,142,150,56,16);
  A.dither(ctx,PAL.teal,PAL.blueD,146,153,48,10);

  /* ---------- kitchen arch x200-226 y70-142 ---------- */
  A.px(ctx,PAL.brown2,198,68,30,76);                        // arch frame
  A.disc(ctx,PAL.brown2,213,82,15);
  A.disc(ctx,PAL.brown1,213,82,12);                         // rounded top (inside)
  A.px(ctx,PAL.brown1,201,82,24,60);                        // dark opening
  A.px(ctx,'#6e4426',203,100,20,42);                        // inner glow (kitchen light)
  A.dither(ctx,PAL.brown2,PAL.yellowD,203,124,20,18);
  A.px(ctx,PAL.ink,205,116,16,3);                           // counter silhouette
  A.px(ctx,PAL.ink,216,108,5,8);                            // kettle silhouette
  A.px(ctx,PAL.cream,200,54,26,11); A.box(ctx,PAL.cream,PAL.brown1,200,54,26,11);
  A.text(ctx,'מטבחון',213,56,PAL.ink,6);

  /* ---------- newsroom door x232-262 y72-142 ---------- */
  A.door(ctx,234,74,26,68);
  A.text(ctx,'חדר כתבים',247,58,PAL.cream,6);

  /* ---------- broken elevator x266-284 y60-142 ---------- */
  A.px(ctx,PAL.gray2,264,58,22,86);                         // shaft frame
  A.px(ctx,PAL.gray3,266,66,18,76);                         // doors
  A.px(ctx,PAL.ink,274,66,2,76);                            // door gap
  A.px(ctx,PAL.gray1,266,58,18,8);                          // indicator box
  const evOn=Math.floor(t*2)%2;                             // hopeless blinking light
  A.disc(ctx,evOn?PAL.red:PAL.gray2,271,62,2);
  A.disc(ctx,PAL.gray2,279,62,2);
  A.px(ctx,PAL.gray4,286,100,3,6); A.disc(ctx,PAL.yellowD,287,102,1); // call button
  // taped, slightly crooked apology note
  A.px(ctx,PAL.white,267,90,17,26); A.px(ctx,PAL.gray4,270,88,8,3);   // tape
  A.text(ctx,'תיכף',275,91,PAL.ink,5);
  A.text(ctx,'חוזר',275,98,PAL.ink,5);
  A.text(ctx,'מאז',275,105,PAL.redD,5);
  A.text(ctx,'1997',275,111,PAL.redD,5);

  /* ---------- office door x288-316 y70-142 ---------- */
  A.door(ctx,290,72,26,68,PAL.brown3,PAL.brown1);
  A.px(ctx,PAL.cream,288,50,30,17); A.box(ctx,PAL.cream,PAL.brown1,288,50,30,17);
  A.text(ctx,'עורכת',303,51,PAL.purpleD,6);
  A.text(ctx,'ראשית',303,59,PAL.purpleD,6);

  /* ---------- floor dressing ---------- */
  A.px(ctx,PAL.gray4,232,152,4,2);                          // a lonely feather (clue!)
  A.px(ctx,PAL.paperD,58,160,6,3); A.px(ctx,PAL.paper,60,159,5,3); // escaped memo page
};
