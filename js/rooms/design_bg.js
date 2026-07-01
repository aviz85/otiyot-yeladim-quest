/* design_bg.js — חדר הגרפיקה של יוסי (cool synthy vibe, paint everywhere)
   Layout contract (hotspots in design.js use these rects):
   giant screen/light-table x60-150 y50-120 (issue layout with a HOLE — the missing article!)
   color swatches wall x160-220 y30-80 (rainbow squares)
   plotter/printer x230-274 y90-146 (spits a page, animated)
   door to newsroom x284-314 y72-142
   pen-tablet desk x166-222 y110-146 · coffee cups tower ~x60-80 y112-146
   yossi npc stands at x=120 y=154 (in front of the light-table)
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.design = function(ctx,t){
  // ---- walls: cool designer blue-teal, synthy mood ----
  A.wall(ctx,'#3a5a78',0,140,PAL.blueD);
  A.px(ctx,'#456a8a',0,0,320,10);                        // ceiling strip
  A.px(ctx,'#2f4c66',0,10,320,2);                        // ceiling shadow line

  // ---- floor: gray studio tiles + paint accidents ----
  A.floorTile(ctx,140,PAL.gray4,PAL.gray3);
  // paint splats (yossi's masterpieces that missed the canvas)
  A.disc(ctx,PAL.red,36,160,3);   A.px(ctx,PAL.red,41,158,2,1);
  A.disc(ctx,PAL.lime,214,166,2); A.px(ctx,PAL.lime,218,164,1,1);
  A.disc(ctx,PAL.blue,158,172,3); A.px(ctx,PAL.blue,153,170,1,2);
  A.disc(ctx,PAL.yellow,262,162,2);
  // paint-stained work rug in front of the light-table
  A.box(ctx,'#5c6b78',PAL.gray1,84,150,72,18);
  A.dither(ctx,'#5c6b78','#4c5a66',88,153,64,12);
  A.px(ctx,PAL.orange,98,156,4,2); A.px(ctx,PAL.purple,132,160,3,2);

  // ---- hanging studio lamps ----
  A.lamp(ctx,50,22,true);
  A.lamp(ctx,196,20,true);

  // ---- room sign ----
  A.poster(ctx,12,26,40,14,PAL.cream,PAL.blueD);
  A.text(ctx,'גרפיקה',32,29,PAL.blueD,8);

  // ---- posters of legendary old covers (left wall) ----
  A.poster(ctx,14,52,34,42,PAL.paper);
  A.text(ctx,'אותיות',31,55,PAL.redD,7);
  A.text(ctx,'וילדים',31,63,PAL.blueD,6);
  A.px(ctx,PAL.orange,20,74,22,12);                      // cover art blob
  A.disc(ctx,PAL.yellow,31,80,4);                        // pixel sun
  A.text(ctx,'גיליון 1',31,86,PAL.ink,5);
  // second cover — the famous dinosaur issue
  A.poster(ctx,14,102,30,30,PAL.cream);
  A.px(ctx,PAL.green,20,112,14,14);                      // dino body
  A.px(ctx,PAL.green,32,106,5,10);                       // dino neck
  A.disc(ctx,PAL.green,35,105,3);                        // dino head
  A.text(ctx,'דינו!',29,104,PAL.redD,5);

  // ================= GIANT SCREEN / LIGHT-TABLE x60-150 y50-120 =================
  A.px(ctx,PAL.gray1,56,46,98,78);                       // outer casing
  A.box(ctx,PAL.gray2,PAL.gray1,58,48,94,74);            // inner frame
  A.px(ctx,'#dff0f5',60,50,90,70);                       // glowing surface
  // soft screen glow flicker
  if(Math.floor(t*4)%5===0) A.px(ctx,'#f2fbff',60,50,90,70);
  // the newspaper layout on screen: masthead
  A.px(ctx,PAL.blueD,66,54,78,8);
  A.text(ctx,'אותיות וילדים',105,55,PAL.white,6);
  // text columns (right side — Hebrew layout!)
  for(let j=0;j<8;j++) A.px(ctx,PAL.gray3,112,66+j*4,32,2);
  for(let j=0;j<5;j++) A.px(ctx,PAL.gray3,112,102+j*3,30,1);
  // small photo box bottom-left
  A.box(ctx,PAL.sky,PAL.blueD,66,96,20,18);
  A.disc(ctx,PAL.yellow,72,102,3); A.px(ctx,PAL.green,67,108,18,5);
  // THE HOLE — where the article should be (dashed red panic-rect)
  A.px(ctx,'#f6e3e3',66,66,42,26);
  ctx.fillStyle=PAL.red;
  for(let i=66;i<108;i+=4) ctx.fillRect(i,66,2,1);
  for(let i=66;i<108;i+=4) ctx.fillRect(i,91,2,1);
  for(let j=66;j<92;j+=4){ ctx.fillRect(66,j,1,2); ctx.fillRect(107,j,1,2); }
  A.text(ctx,'כאן אמורה',87,68,PAL.redD,6);
  A.text(ctx,'להיות',87,75,PAL.redD,6);
  A.text(ctx,'הכתבה!!',87,82,PAL.redD,6);
  // blinking cursor of despair (animation)
  if(Math.floor(t*2)%2) A.px(ctx,PAL.ink,110,84,1,5);
  // sticky notes on the screen frame
  A.px(ctx,PAL.yellow,54,58,9,9);  A.text(ctx,'!',58,59,PAL.redD,6);
  A.px(ctx,PAL.pink,150,72,9,9);   A.text(ctx,'18:00',155,74,PAL.ink,4);
  // sturdy legs down to the floor
  A.px(ctx,PAL.gray1,64,124,6,16); A.px(ctx,PAL.gray1,140,124,6,16);
  A.px(ctx,PAL.gray2,60,122,90,3);                       // base ledge

  // ---- coffee cups tower gag (x60-80) — the leaning tower of espresso ----
  A.px(ctx,PAL.brown2,56,144,28,4);                      // stool top
  A.px(ctx,PAL.brown1,58,148,3,10); A.px(ctx,PAL.brown1,79,148,3,10);
  A.px(ctx,PAL.blue,64,136,10,8);   A.px(ctx,PAL.blue,74,138,2,3);   // cup 1
  A.px(ctx,PAL.red,66,128,10,8);    A.px(ctx,PAL.red,63,130,2,3);    // cup 2 (leaning)
  A.px(ctx,PAL.green,64,120,10,8);  A.px(ctx,PAL.green,74,122,2,3);  // cup 3
  A.px(ctx,PAL.purple,67,112,10,8); A.px(ctx,PAL.purple,64,114,2,3); // cup 4 (living dangerously)
  // steam from the top cup (animation)
  if(Math.floor(t*2)%2){ A.px(ctx,PAL.gray4,71,106,1,4); A.px(ctx,PAL.gray4,73,104,1,3); }
  else { A.px(ctx,PAL.gray4,73,107,1,4); A.px(ctx,PAL.gray4,70,104,1,3); }

  // ================= COLOR SWATCHES WALL x160-220 y30-80 =================
  A.box(ctx,PAL.gray4,PAL.gray1,158,28,64,54);
  const sw=[PAL.red,PAL.orange,PAL.yellow,PAL.lime,
            PAL.green,PAL.teal,PAL.cyan,PAL.sky,
            PAL.blue,PAL.navy,PAL.purple,PAL.lav,
            PAL.pink,PAL.brown3,PAL.cream,PAL.ink];
  for(let i=0;i<16;i++){
    const cx=161+(i%4)*15, cy=31+((i/4)|0)*12;
    A.px(ctx,sw[i],cx,cy,13,10);
  }
  // one swatch fell off — taped back crooked
  A.px(ctx,PAL.white,224,60,4,8);
  A.text(ctx,'הצבעים שלי. לא לגעת!',190,84,PAL.cream,6);

  // ---- pen-tablet desk x166-222 y110-146 ----
  A.table(ctx,166,112,56,34,PAL.brown3,PAL.brown2);
  A.px(ctx,PAL.gray1,172,106,26,7);                      // pen tablet
  A.box(ctx,PAL.gray2,PAL.gray1,174,107,22,5);
  A.px(ctx,PAL.blue,200,104,2,8);                        // stylus (standing, dramatic)
  A.disc(ctx,PAL.blue,201,103,1);
  // brush cup
  A.px(ctx,PAL.teal,208,102,9,10);
  A.px(ctx,PAL.red,209,96,1,6); A.px(ctx,PAL.yellow,212,95,1,7); A.px(ctx,PAL.green,215,97,1,5);
  // crumpled rejected sketches under the desk
  A.disc(ctx,PAL.paper,178,152,3); A.disc(ctx,PAL.paperD,190,156,2); A.disc(ctx,PAL.paper,206,151,2);

  // ================= PLOTTER/PRINTER x230-274 y90-146 =================
  A.box(ctx,PAL.gray2,PAL.gray1,230,90,44,40);           // machine body
  A.px(ctx,PAL.gray1,234,94,36,8);                       // top slot bar
  A.px(ctx,PAL.ink,236,102,32,3);                        // paper slit
  // control panel + blinking LED (animation)
  A.px(ctx,PAL.gray3,236,112,16,10);
  A.px(ctx,Math.floor(t*3)%2?PAL.green:PAL.greenD,238,114,3,3);
  A.px(ctx,PAL.red,243,114,3,3);
  A.px(ctx,PAL.yellow,248,114,3,3);
  A.text(ctx,'פלוטר',262,116,PAL.cream,5);
  // page being spat out, sliding down with t (animation)
  const pg=6+Math.floor((t*8)%22);
  A.px(ctx,PAL.paper,238,104,26,pg);
  A.px(ctx,PAL.gray3,241,107,20,1); if(pg>8) A.px(ctx,PAL.gray3,241,110,16,1);
  if(pg>14) A.px(ctx,PAL.gray3,241,114,18,1);
  // legs + paper basket
  A.px(ctx,PAL.gray1,232,130,5,16); A.px(ctx,PAL.gray1,267,130,5,16);
  A.px(ctx,PAL.brown2,238,136,28,10);                    // basket
  A.px(ctx,PAL.paper,241,134,10,4); A.px(ctx,PAL.paperD,252,135,9,3);
  A.text(ctx,'לאט לך, הוא רגיש',252,80,PAL.cream,6);

  // ================= DOOR to newsroom x284-314 y72-142 =================
  A.door(ctx,286,74,28,68);
  A.text(ctx,'לחדר הכתבים ←',299,58,PAL.cream,6);

  // ---- plant (every studio needs one witness) ----
  A.plant(ctx,280,156);

  // ---- inspirational note taped to the wall ----
  A.px(ctx,PAL.cream,230,36,42,18);
  A.px(ctx,PAL.white,248,33,6,4);                        // tape
  A.text(ctx,'קומיק סאנס',251,38,PAL.redD,6);
  A.text(ctx,'= לא בבית ספרנו',251,46,PAL.ink,5);
};
