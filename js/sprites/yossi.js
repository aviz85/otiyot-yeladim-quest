/* ============================================================
   sprites/yossi.js — יוסי המעצב הגרפי
   Artist of the newsroom: black beret, blue apron with paint
   dots, kippah, a paintbrush he can't put down, and VERY
   strong opinions about fonts. Height ~38px, faces LEFT.
   ============================================================ */
'use strict';

SPR.yossi = function(ctx,t,o){
  const b  = SB.bob(t,o);
  const sw = o.walk ? Math.floor(t*8)%2 : 0;      // arm swing
  const fl = o.walk ? 0 : Math.floor(t*3)%2;      // idle brush flick

  // ---- legs: gray artist slacks ----
  SB.legs(ctx,t,o,PAL.gray2);

  // ---- torso: cream shirt under a blue apron ----
  A.px(ctx,PAL.cream,-6,-24+b,12,14);
  A.px(ctx,PAL.blue,-5,-22+b,10,12);
  A.px(ctx,PAL.blueD,-5,-22+b,10,1);          // apron hem
  A.px(ctx,PAL.blueD,-4,-24+b,1,2);           // straps
  A.px(ctx,PAL.blueD, 3,-24+b,1,2);
  A.px(ctx,PAL.blueD,-3,-15+b,6,4);           // apron pocket
  A.px(ctx,PAL.wood,-2,-17+b,1,3);            // pencil peeking out

  // paint splatters on the apron (occupational hazard)
  A.px(ctx,PAL.red,   -4,-20+b,1,1);
  A.px(ctx,PAL.yellow, 1,-21+b,1,1);
  A.px(ctx,PAL.green,  3,-17+b,1,1);
  A.px(ctx,PAL.orange,-1,-19+b,2,1);
  A.px(ctx,PAL.purple, 2,-13+b,1,1);
  A.px(ctx,PAL.pink,  -4,-12+b,1,1);

  // ---- arms: cream sleeves, skin hands ----
  A.px(ctx,PAL.cream,-8,-23+b,2,7+(sw?2:0));  // front arm (left = facing dir)
  A.px(ctx,PAL.cream, 6,-23+b,2,7+(sw?0:2));  // back arm
  A.px(ctx,PAL.skin,-8,-16+b+(sw?2:0),2,3);
  A.px(ctx,PAL.skin, 6,-16+b+(sw?0:2),2,3);

  // paintbrush in the front hand, flicking while he thinks in colors
  const hy = -16+b+(sw?2:0);
  A.px(ctx,PAL.wood,-9,hy-5-fl,1,6);          // handle
  A.px(ctx,PAL.gray3,-9,hy-6-fl,1,1);         // ferrule
  A.px(ctx,PAL.red,-9,hy-8-fl,1,2);           // red-loaded tip
  A.px(ctx,PAL.teal,6,-13+b+(sw?0:2),1,1);    // paint on the other hand too

  // ---- head ----
  A.px(ctx,PAL.skin,-4,-35+b,8,10);
  A.px(ctx,PAL.brown1,3,-33+b,1,4);           // hair at the back
  A.px(ctx,PAL.brown1,-4,-27+b,1,2);          // artist chin-scruff hint
  A.px(ctx,PAL.sky,-4,-30+b,1,1);             // paint smudge on the cheek

  // kippah peeking behind the beret
  A.px(ctx,PAL.white,2,-36+b,3,1);

  // black beret, tilted forward with flair
  A.px(ctx,PAL.ink,-5,-37+b,9,2);
  A.px(ctx,PAL.ink,-7,-36+b,4,2);             // droop over the brow
  A.px(ctx,PAL.ink,-2,-38+b,3,1);             // beret bump
  A.px(ctx,PAL.gray1,-1,-39+b,1,1);           // the little stem on top

  // eyes (facing left) + dramatic eyebrows — !?קומיק סאנס
  A.px(ctx,PAL.ink,-3,-32+b,1,2);
  A.px(ctx,PAL.ink, 0,-32+b,1,2);
  A.px(ctx,PAL.brown1,-4,-33+b,2,1);
  A.px(ctx,PAL.brown1, 0,-34+b,2,1);          // one brow raised, always judging fonts

  // mouth (talk animation)
  SB.mouth(ctx,t,o,-2,-28+b);
};
