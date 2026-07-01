/* ============================================================
   sprites/benny.js — בני, בעל הקיוסק העליז
   Green cap, striped apron, round belly, ~40px tall.
   Feet at (0,0), centered on x=0, faces LEFT.
   ============================================================ */
'use strict';

SPR.benny = function(ctx,t,o){
  const b = SB.bob(t,o);

  // legs (brown work pants)
  SB.legs(ctx,t,o,PAL.brown2);

  // torso: blue shirt, wide + round belly (bulging forward = left)
  A.px(ctx,PAL.blue,-7,-28+b,14,16);
  A.disc(ctx,PAL.blue,-2,-16+b,7);
  A.px(ctx,PAL.blueD,-7,-28+b,14,2); // collar shading

  // striped apron over the belly (kiosk classic: cream + red stripes)
  A.px(ctx,PAL.cream,-6,-25+b,12,15);
  A.disc(ctx,PAL.cream,-2,-15+b,6);
  for(let i=-5;i<=4;i+=3){
    A.px(ctx,PAL.red,i,-25+b,1,15);
  }
  // apron hem curve on the belly
  A.px(ctx,PAL.red,-5,-10+b,1,2);
  A.px(ctx,PAL.red,-2,-10+b,1,3);
  A.px(ctx,PAL.red,1,-10+b,1,2);
  // neck strap + waist tie
  A.px(ctx,PAL.cream,-2,-28+b,4,3);
  A.px(ctx,PAL.redD,-7,-20+b,14,1);

  // arms: blue sleeves, swing when walking
  const sw = o.walk? Math.floor(t*8)%2 : 0;
  A.px(ctx,PAL.blue,-9,-26+b,2,8+(sw?2:0));
  A.px(ctx,PAL.blue, 7,-26+b,2,8+(sw?0:2));
  A.px(ctx,PAL.skin,-9,-18+b+(sw?2:0),2,3);
  A.px(ctx,PAL.skin, 7,-18+b+(sw?0:2),2,3);

  // head
  A.px(ctx,PAL.skin,-4,-38+b,8,10);
  // rosy jolly cheeks
  A.px(ctx,PAL.pink,-4,-32+b,1,1);
  A.px(ctx,PAL.pink, 2,-32+b,1,1);
  // hair tufts peeking under the cap (back side = right)
  A.px(ctx,PAL.brown1,3,-37+b,1,4);
  A.px(ctx,PAL.brown1,-4,-37+b,1,2);
  // ear (back side)
  A.px(ctx,PAL.skinD,3,-34+b,1,2);

  // eyes (facing left)
  A.px(ctx,PAL.ink,-3,-35+b,1,2);
  A.px(ctx,PAL.ink, 0,-35+b,1,2);
  // eyebrows — always a bit amused
  A.px(ctx,PAL.brown1,-3,-37+b,2,1);
  A.px(ctx,PAL.brown1, 0,-37+b,2,1);

  // big friendly mouth (animates on talk)
  SB.mouth(ctx,t,o,-2,-31+b);

  // green cap with brim pointing left
  A.px(ctx,PAL.green,-5,-40+b,9,3);
  A.px(ctx,PAL.greenD,-5,-38+b,9,1);
  A.px(ctx,PAL.greenD,-9,-38+b,4,1);
  A.px(ctx,PAL.lime,-2,-40+b,1,1); // cap button
};
