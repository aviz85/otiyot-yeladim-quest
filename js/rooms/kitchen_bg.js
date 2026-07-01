/* kitchen_bg.js — המטבחון (cozy office kitchenette, warm waltz mood)
   Layout contract (hotspots in kitchen.js use these rects):
   arch to lobby x8-36 y70-142 · fridge x50-84 y60-146 (magnet letters ״חלב״+scattered)
   counter+sink x92-160 y104-146 (dripping tap animated) · kettle x120-136 y96-104 (steam)
   cookie jar x164-188 y96-110 on shelf unit x160-210 y88-146
   corkboard ״תורנות שטיפת כלים״ x96-140 y36-72 · ladder to roof x260-300 y40-150 (+hatch)
   small table+chairs x214-252 y110-150
   Extra dressing: mezuzah, kid drawing, natla cup, utensil rack, wall clock, lamp,
   fruit bowl + fly (animated), cat bowl, rug, trash bin, towel, spice jars.
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.kitchen = function(ctx,t){
  // ---- walls & floor — soft sage kitchen, cream tiles ----
  A.wall(ctx,'#8fb6a5',0,140,PAL.teal);
  A.px(ctx,'#7ba492',0,0,320,10);                       // ceiling strip
  A.floorTile(ctx,140,PAL.cream,PAL.paperD);
  // tile backsplash behind the counter
  A.px(ctx,'#bcd8cc',92,84,120,20);
  for(let i=92;i<212;i+=10) A.px(ctx,'#9cc4b4',i,84,1,20);
  A.px(ctx,'#9cc4b4',92,93,120,1);

  // ---- hanging lamp over the counter ----
  A.lamp(ctx,150,26,true);

  // ---- arch to lobby (x8-36 y70-142) ----
  A.px(ctx,PAL.brown2,4,64,36,80);                      // arch frame block
  A.px(ctx,PAL.brown1,8,84,28,58);                      // dark opening
  A.disc(ctx,PAL.brown1,22,84,14);                      // rounded arch top
  A.px(ctx,'#3a2b3f',10,96,24,46);                      // deeper shadow
  A.px(ctx,PAL.orangeD,12,120,4,22);                    // warm lobby glow spill
  A.text(ctx,'← ללובי',22,52,PAL.cream,6);
  // mezuzah on the arch post (slightly tilted, as it should be)
  A.px(ctx,PAL.blue,37,92,2,7); A.px(ctx,PAL.yellow,37,92,2,1);

  // ---- wall clock above the arch (kitchen time crawls) ----
  A.disc(ctx,PAL.brown1,22,32,9); A.disc(ctx,PAL.cream,22,32,8);
  A.px(ctx,PAL.ink,22,32,1,5); A.px(ctx,PAL.ink,22,28,1,4);   // ~5 to deadline...
  A.disc(ctx,PAL.red,22,32,1);

  // ---- fridge (x50-84 y60-146) ----
  A.box(ctx,PAL.white,PAL.gray3,50,60,34,86);
  A.px(ctx,PAL.gray4,52,62,30,2);                        // top highlight
  A.px(ctx,PAL.gray3,50,86,34,3);                        // freezer/main divider
  A.px(ctx,PAL.gray2,52,68,3,12); A.px(ctx,PAL.gray2,52,94,3,18); // handles
  A.px(ctx,PAL.gray3,52,140,30,4);                       // vent
  for(let i=54;i<80;i+=4) A.px(ctx,PAL.gray2,i,141,2,2);
  // kid's crayon drawing pinned by a magnet on the freezer door
  A.px(ctx,PAL.paper,62,64,16,14);
  A.disc(ctx,PAL.yellow,67,68,2);                        // crayon sun
  A.px(ctx,PAL.green,64,74,12,2);                        // crayon grass
  A.px(ctx,PAL.red,73,69,1,5); A.px(ctx,PAL.red,72,70,3,1); // stick kid
  A.disc(ctx,PAL.purple,70,63,2);                        // the magnet
  // magnet letters: ״חלב״ neatly...
  A.px(ctx,PAL.red,72,110,7,8);    A.text(ctx,'ח',75,110,PAL.white,7);
  A.px(ctx,PAL.blue,64,110,7,8);   A.text(ctx,'ל',67,110,PAL.white,7);
  A.px(ctx,PAL.green,56,110,7,8);  A.text(ctx,'ב',59,110,PAL.white,7);
  // ...and the scattered rebels
  A.px(ctx,PAL.orange,60,124,7,8); A.text(ctx,'א',63,124,PAL.white,7);
  A.px(ctx,PAL.teal,74,79,7,7);    A.text(ctx,'ו',77,78,PAL.white,7);

  // ---- cat food bowl (מרדכי eats here. sometimes.) ----
  A.px(ctx,PAL.red,86,152,10,4); A.px(ctx,PAL.redD,86,152,10,1);
  A.px(ctx,PAL.gray4,88,151,6,1);                        // suspiciously empty

  // ---- counter + sink (x92-160 y104-146) ----
  A.px(ctx,PAL.teal,92,104,68,6);                        // countertop
  A.px(ctx,'#2e7a6d',92,109,68,2);                       // counter edge shadow
  A.box(ctx,PAL.brown3,PAL.brown2,92,111,68,35);         // cabinet body
  A.box(ctx,PAL.brown3,PAL.brown1,96,114,26,28);         // left door
  A.box(ctx,PAL.brown3,PAL.brown1,128,114,26,28);        // right door
  A.disc(ctx,PAL.yellow,118,128,1); A.disc(ctx,PAL.yellow,132,128,1); // knobs
  // hand towel on the left door (slightly crooked, of course)
  A.px(ctx,PAL.pink,100,114,9,12); A.px(ctx,PAL.red,100,118,9,1);
  // sink basin
  A.px(ctx,PAL.gray4,134,104,24,5); A.px(ctx,PAL.gray2,136,105,20,3);
  // faucet
  A.px(ctx,PAL.gray3,152,90,2,14);                       // riser
  A.px(ctx,PAL.gray3,144,90,9,2);                        // arm
  A.px(ctx,PAL.gray3,144,92,2,3);                        // spout
  // ANIMATED: the eternal drip (turn it off — it starts again)
  {
    const dp=Math.floor((t*22)%14);
    if(dp<10) A.px(ctx,PAL.cyan,144,96+dp,1,2);
    else { A.px(ctx,PAL.cyan,142,106,2,1); A.px(ctx,PAL.cyan,146,106,2,1); } // splash
  }
  // natla (two-handled washing cup) by the sink
  A.px(ctx,PAL.blue,94,96,8,8); A.px(ctx,PAL.blueD,92,98,2,4); A.px(ctx,PAL.blueD,102,98,2,4);

  // ---- kettle (x120-136 y96-104) — ANIMATED steam ----
  A.px(ctx,PAL.redD,120,102,16,2);                       // base
  A.px(ctx,PAL.red,121,96,14,7);                         // body
  A.px(ctx,PAL.white,123,98,3,2);                        // shine
  A.px(ctx,PAL.redD,118,97,3,2);                         // spout
  A.px(ctx,PAL.ink,125,93,6,1); A.px(ctx,PAL.ink,124,94,1,2); A.px(ctx,PAL.ink,131,94,1,2); // handle
  if(Math.floor(t*2)%2){ A.px(ctx,PAL.gray4,118,92,1,3); A.px(ctx,PAL.gray4,117,88,1,3); }
  else { A.px(ctx,PAL.gray4,117,91,1,3); A.px(ctx,PAL.gray4,118,87,1,3); }

  // ---- corkboard ״תורנות שטיפת כלים״ (x96-140 y36-72) ----
  A.px(ctx,PAL.brown1,94,34,48,40);                      // frame
  A.px(ctx,PAL.brown4,96,36,44,36);                      // cork
  A.text(ctx,'תורנות',118,37,PAL.ink,6);
  A.text(ctx,'שטיפת כלים',118,44,PAL.ink,5);
  // duty notes — every single name erased/crossed out
  A.px(ctx,PAL.paper,99,53,18,8);  A.text(ctx,'דובי',108,53,PAL.gray3,5); A.px(ctx,PAL.red,101,56,14,1);
  A.px(ctx,PAL.paper,120,53,18,8); A.text(ctx,'יוסי',129,53,PAL.gray3,5); A.px(ctx,PAL.red,122,56,14,1);
  A.px(ctx,PAL.paper,109,63,18,8); A.text(ctx,'גילה',118,63,PAL.gray3,5); A.px(ctx,PAL.red,111,66,14,1);
  A.disc(ctx,PAL.red,108,54,1); A.disc(ctx,PAL.blue,129,54,1); A.disc(ctx,PAL.green,118,64,1); // pins

  // ---- hanging utensil rack (above the shelf unit) ----
  A.px(ctx,PAL.gray2,164,44,44,2);                       // bar
  A.px(ctx,PAL.gray1,166,42,2,2); A.px(ctx,PAL.gray1,204,42,2,2);
  A.px(ctx,PAL.gray3,170,46,1,6); A.disc(ctx,PAL.gray3,170,54,3);   // ladle
  A.px(ctx,PAL.gray3,182,46,1,5); A.px(ctx,PAL.brown3,180,51,5,8);  // spatula
  A.px(ctx,PAL.gray3,196,46,1,4); A.disc(ctx,PAL.gray1,196,55,5); A.px(ctx,PAL.brown2,200,49,6,2); // pan

  // ---- shelf unit (x160-210 y88-146) with cookie jar (x164-188 y96-110) ----
  A.box(ctx,PAL.brown2,PAL.brown1,160,88,50,58);
  A.px(ctx,PAL.brown3,162,90,46,54);                     // inner back
  A.px(ctx,PAL.brown1,160,110,50,3);                     // top shelf plank
  A.px(ctx,PAL.brown1,160,128,50,3);                     // middle shelf plank
  // the famous cookie jar
  A.px(ctx,PAL.cream,166,98,20,12); A.px(ctx,PAL.paperD,166,108,20,2);
  A.px(ctx,PAL.brown2,170,95,12,3); A.px(ctx,PAL.brown1,174,93,4,2); // lid + knob
  A.text(ctx,'עוגיות',176,100,PAL.redD,5);
  // spice jars next to the jar
  A.px(ctx,PAL.orange,192,102,5,8); A.px(ctx,PAL.green,199,102,5,8);
  A.px(ctx,PAL.brown1,192,101,5,1); A.px(ctx,PAL.brown1,199,101,5,1);
  // mugs + plates on the middle shelf
  A.px(ctx,PAL.blue,166,120,7,8);  A.px(ctx,PAL.blueD,173,122,2,4);
  A.px(ctx,PAL.yellow,178,120,7,8);A.px(ctx,PAL.yellowD,185,122,2,4);
  A.px(ctx,PAL.white,192,124,14,2); A.px(ctx,PAL.white,193,121,12,2); A.px(ctx,PAL.gray4,194,118,10,2);
  // closed cabinet at the bottom
  A.box(ctx,PAL.brown3,PAL.brown1,164,133,42,11); A.disc(ctx,PAL.yellow,185,138,1);

  // ---- small table + chairs (x214-252 y110-150) ----
  A.px(ctx,PAL.brown4,214,116,38,4); A.px(ctx,PAL.brown2,214,120,38,2); // tabletop
  A.px(ctx,PAL.brown2,220,122,4,26); A.px(ctx,PAL.brown2,242,122,4,26); // legs
  // chairs (one on each side)
  A.px(ctx,PAL.brown3,208,126,10,3); A.px(ctx,PAL.brown3,208,108,2,18); // left: seat+back
  A.px(ctx,PAL.brown2,209,129,2,19); A.px(ctx,PAL.brown2,215,129,2,19);
  A.px(ctx,PAL.brown3,248,126,10,3); A.px(ctx,PAL.brown3,256,108,2,18); // right: seat+back
  A.px(ctx,PAL.brown2,249,129,2,19); A.px(ctx,PAL.brown2,255,129,2,19);
  // fruit bowl on the table
  A.px(ctx,PAL.orangeD,224,112,18,4); A.px(ctx,PAL.brown1,224,115,18,1);
  A.disc(ctx,PAL.red,229,111,2); A.disc(ctx,PAL.yellow,234,110,2); A.disc(ctx,PAL.green,238,111,2);
  // ANIMATED: one very devoted fly circling the fruit
  {
    const fx=233+Math.floor(Math.sin(t*4)*7), fy=101+Math.floor(Math.cos(t*6)*4);
    A.px(ctx,PAL.ink,fx,fy,1,1);
    if(Math.floor(t*8)%2) A.px(ctx,PAL.gray3,fx-1,fy-1,1,1); else A.px(ctx,PAL.gray3,fx+1,fy-1,1,1);
  }

  // ---- sign + ladder to the roof (x260-300 y40-150) ----
  A.poster(ctx,216,36,42,12,PAL.cream);
  A.text(ctx,'לגג — בזהירות!',237,38,PAL.redD,6);
  // open hatch in the ceiling
  A.px(ctx,PAL.brown1,258,0,44,6);                       // hatch frame
  A.px(ctx,PAL.navy,262,0,36,10);                        // dark opening up
  A.px(ctx,PAL.sky,266,0,8,4);                           // sliver of sky peeking
  // wooden ladder
  A.px(ctx,PAL.wood,264,10,5,140); A.px(ctx,PAL.brown2,264,10,1,140);   // left rail
  A.px(ctx,PAL.wood,292,10,5,140); A.px(ctx,PAL.brown2,296,10,1,140);   // right rail
  for(let ry=18; ry<=146; ry+=13){ A.px(ctx,PAL.woodL,269,ry,23,3); A.px(ctx,PAL.brown2,269,ry+2,23,1); }
  A.px(ctx,PAL.gray1,272,150,20,3);                      // floor shadow

  // ---- trash bin (right of the ladder) ----
  A.px(ctx,PAL.green,303,128,12,18); A.px(ctx,PAL.greenD,303,128,12,2);
  A.px(ctx,PAL.greenD,302,126,14,2);                     // lid
  A.px(ctx,PAL.paper,306,124,5,3);                       // someone missed the shot

  // ---- rug in front of the table ----
  A.box(ctx,PAL.orange,PAL.orangeD,196,156,66,16);
  A.dither(ctx,PAL.orange,PAL.orangeD,200,159,58,10);

  // ---- crumbs trail from the cookie jar (evidence!) ----
  A.px(ctx,PAL.brown4,176,150,2,1); A.px(ctx,PAL.brown4,168,156,2,1); A.px(ctx,PAL.brown4,158,162,2,1);
};
