/* office_bg.js — חדר העורכת רבקה (EXEMPLAR background — the quality bar)
   Layout contract (hotspots in office.js use these rects):
   window x40-95 y28-80 (OPEN, curtain blowing) · desk x120-205 y108-142
   clock x150-170 y12-30 (stuck at 6:00) · shelf x225-282 y40-140
   cat basket x98-118 y138-150 · door x288-316 y70-142 (to lobby)
   poster x108-128 y30-55 · plant near door
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.office = function(ctx,t){
  // walls — warm purple-ish editor vibe
  A.wall(ctx,'#6d5a8e',0,140,PAL.purpleD);
  A.px(ctx,'#7e6aa0',0,0,320,10);                       // ceiling strip
  A.floorWood(ctx,140);

  // rug
  A.px(ctx,PAL.red,130,150,90,22); A.box(ctx,PAL.red,PAL.redD,130,150,90,22);
  A.dither(ctx,PAL.red,PAL.redD,136,154,78,14);

  // window (OPEN — the crime scene!)
  A.px(ctx,PAL.brown2,38,26,61,58);                     // frame
  A.bands(ctx,40,28,57,[[PAL.sky,18],[PAL.skyD,20],['#bfe3f2',16]]);
  A.px(ctx,PAL.white,45,34,12,4); A.px(ctx,PAL.white,70,44,14,4); // clouds
  A.skylineMini && A.skylineMini(ctx);
  A.px(ctx,PAL.navy,40,64,57,4);                        // far rooftops line
  A.px(ctx,PAL.brown2,40,54,57,2);
  // open shutter
  A.px(ctx,PAL.brown3,30,28,8,56); A.px(ctx,PAL.brown1,30,28,8,2); A.px(ctx,PAL.brown1,30,54,8,2);
  // curtain blowing in the wind (animated)
  const wob=Math.floor(Math.sin(t*3)*3);
  A.px(ctx,PAL.cream,92,28,6+wob,50);
  A.px(ctx,PAL.paperD,94+wob,32,4,40);

  // clock stuck at 6:00
  A.disc(ctx,PAL.cream,160,21,9); A.disc(ctx,PAL.brown1,160,21,10-9<0?0:9); // ring
  A.disc(ctx,PAL.cream,160,21,8);
  A.px(ctx,PAL.ink,160,21,1,6); A.px(ctx,PAL.ink,160,15,1,7);              // 6:00 hands
  A.text(ctx,'!',171,12,PAL.red,7);

  // motivational poster
  A.poster(ctx,108,30,22,26,PAL.cream);
  A.text(ctx,'כתוב!',119,36,PAL.redD,7);
  A.text(ctx,'ותכתוב',119,44,PAL.blueD,5);

  // bookshelf full of old issues
  A.shelf(ctx,225,40,58,100,[PAL.red,PAL.blue,PAL.teal,PAL.orange,PAL.purple,PAL.green]);
  A.text(ctx,'ארכיון קטן',254,30,PAL.cream,6);

  // editor's desk
  A.table(ctx,120,108,86,34,PAL.brown3,PAL.brown2);
  // messy papers
  A.px(ctx,PAL.paper,128,103,16,6); A.px(ctx,PAL.paperD,131,101,16,6);
  A.px(ctx,PAL.paper,150,102,14,7);
  // red phone
  A.px(ctx,PAL.red,182,100,14,8); A.px(ctx,PAL.redD,184,96,10,4); A.disc(ctx,PAL.redD,185,104,2); A.disc(ctx,PAL.redD,193,104,2);
  // coffee mug + steam
  A.px(ctx,PAL.blue,170,101,7,7); A.px(ctx,PAL.blue,177,103,2,3);
  if(Math.floor(t*2)%2) A.px(ctx,PAL.gray4,172,96,1,3); else A.px(ctx,PAL.gray4,174,95,1,3);
  // "deadline" note
  A.px(ctx,PAL.yellow,122,98,12,9); A.text(ctx,'18:00',128,99,PAL.redD,5);

  // cat basket (empty, suspicious orange hairs)
  A.px(ctx,PAL.brown4,98,140,20,8); A.px(ctx,PAL.brown2,98,140,20,2);
  A.px(ctx,PAL.orange,103,146,3,1); A.px(ctx,PAL.orange,110,147,3,1);

  // feathers on the floor (clue!)
  A.px(ctx,PAL.gray4,60,150,4,2); A.px(ctx,PAL.white,64,149,2,2);
  A.px(ctx,PAL.gray4,220,158,4,2);

  // door to lobby (right)
  A.door(ctx,290,72,26,68);
  A.text(ctx,'ללובי ←',303,58,PAL.cream,6);

  // plant
  A.plant(ctx,275,152);
};
