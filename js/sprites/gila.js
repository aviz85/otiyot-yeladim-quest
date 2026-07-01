/* ============================================================
   sprites/gila.js — גילה, פקידת הקבלה
   Pink top, headset with mic, ponytail. Height ~38, faces LEFT.
   Feet at (0,0), centered on x=0.
   ============================================================ */
'use strict';

SPR.gila = function(ctx,t,o){
  const b = SB.bob(t,o);

  // legs — dark blue skirt-length pants/leggings
  SB.legs(ctx,t,o,PAL.navy);

  // long modest skirt over the legs (gray, knee-length+)
  A.px(ctx,PAL.gray2,-6,-14+b,12,8);
  A.px(ctx,PAL.gray1,-6,-7+b,12,1);

  // torso: pink top
  A.px(ctx,PAL.pink,-5,-24+b,10,10);
  A.px(ctx,PAL.red,-5,-24+b,10,1);          // collar shade line
  A.px(ctx,PAL.pink,-5,-15+b,10,1);

  // arms (swing when walking)
  const sw = o.walk ? Math.floor(t*8)%2 : 0;
  A.px(ctx,PAL.pink,-7,-23+b,2,7+(sw?2:0));
  A.px(ctx,PAL.pink, 5,-23+b,2,7+(sw?0:2));
  A.px(ctx,PAL.skin,-7,-16+b+(sw?2:0),2,3);
  A.px(ctx,PAL.skin, 5,-16+b+(sw?0:2),2,3);

  // head
  A.px(ctx,PAL.skin,-4,-34+b,8,10);

  // hair: brown, with ponytail swinging behind (right side — faces left)
  A.px(ctx,PAL.brown2,-4,-36+b,8,3);         // top of hair
  A.px(ctx,PAL.brown2,-5,-34+b,1,4);         // front fringe edge
  A.px(ctx,PAL.brown2,3,-34+b,2,6);          // back of head
  const pt = Math.floor(t*3)%2;              // ponytail sway
  A.px(ctx,PAL.brown2,5,-31+b+pt,2,8);       // ponytail
  A.px(ctx,PAL.brown1,5,-24+b+pt,2,2);       // ponytail tip
  A.px(ctx,PAL.yellow,4,-31+b,2,1);          // hair tie

  // headset: band over the hair + earpiece + mic toward the mouth
  A.px(ctx,PAL.ink,-4,-37+b,8,1);            // band
  A.px(ctx,PAL.ink,-5,-33+b,2,3);            // front earpiece
  A.px(ctx,PAL.ink,3,-33+b,2,3);             // back earpiece
  A.px(ctx,PAL.gray3,-5,-30+b,1,3);          // mic arm down
  A.px(ctx,PAL.red,-6,-27+b,2,2);            // mic tip (blinks while talking)
  if(o.talk && Math.floor(t*6)%2) A.px(ctx,PAL.yellow,-6,-27+b,2,2);

  // eyes (facing left)
  A.px(ctx,PAL.ink,-3,-31+b,1,2);
  A.px(ctx,PAL.ink, 0,-31+b,1,2);

  // smiley mouth
  SB.mouth(ctx,t,o,-3,-27+b);
};
