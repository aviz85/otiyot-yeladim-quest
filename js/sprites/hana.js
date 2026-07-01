/* ============================================================
   sprites/hana.js — חנה, הארכיברית המתוקה שזוכרת הכל
   Elderly, long gray cardigan, round glasses, sun hat, cane.
   Feet at (0,0), centered on x=0, faces LEFT. Height ~34px.
   ============================================================ */
'use strict';

SPR.hana = function(ctx,t,o){
  const b = SB.bob(t,o);
  const sw = o.walk ? Math.floor(t*8)%2 : 0;

  // legs (modest dark skirt-stockings look under the cardigan)
  SB.legs(ctx,t,o,PAL.gray2);

  // cane — held in her front (left) hand, taps gently
  const caneTip = o.walk ? (sw?-1:1) : 0;
  A.px(ctx,PAL.brown2,-9+caneTip,-13+b,1,13-b);      // shaft down to floor
  A.px(ctx,PAL.brown3,-11+caneTip,-14+b,4,2);        // curved handle
  A.px(ctx,PAL.brown1,-10+caneTip,-1,3,1);           // rubber tip

  // long gray cardigan (down past the knees — she's old school)
  A.px(ctx,PAL.gray3,-6,-22+b,12,16);
  A.px(ctx,PAL.gray2,-6,-22+b,12,2);                 // shoulder shading
  A.px(ctx,PAL.gray2,-6,-8+b,12,2);                  // worn hem
  A.px(ctx,PAL.gray2,-1,-20+b,1,12);                 // opening line
  // little buttons
  A.px(ctx,PAL.purple,-1,-18+b,1,1);
  A.px(ctx,PAL.purple,-1,-14+b,1,1);
  A.px(ctx,PAL.purple,-1,-10+b,1,1);
  // cream blouse peeking at the collar
  A.px(ctx,PAL.cream,-2,-22+b,4,2);

  // arms (cardigan sleeves), front hand rests on the cane
  A.px(ctx,PAL.gray3,-8,-21+b,2,7);
  A.px(ctx,PAL.gray3, 6,-21+b,2,7+(sw?1:0));
  A.px(ctx,PAL.skin,-8,-14+b,2,2);                   // hand on cane
  A.px(ctx,PAL.skin, 6,-14+b+(sw?1:0),2,3);

  // head — slightly bent forward (facing left)
  A.px(ctx,PAL.skin,-5,-30+b,8,9);
  // rosy grandma cheek
  A.px(ctx,PAL.pink,-4,-25+b,2,1);
  // gray hair curls peeking under the hat
  A.px(ctx,PAL.gray4,-6,-28+b,2,4);
  A.px(ctx,PAL.gray4, 3,-28+b,2,5);
  A.px(ctx,PAL.white,-6,-27+b,1,2);

  // round glasses (two little rims + bridge)
  A.disc(ctx,PAL.gray4,-3,-27+b,2);
  A.disc(ctx,PAL.gray4, 1,-27+b,2);
  A.disc(ctx,PAL.white,-3,-27+b,1);
  A.disc(ctx,PAL.white, 1,-27+b,1);
  A.px(ctx,PAL.gray4,-1,-27+b,1,1);                  // bridge
  // twinkling eyes behind the lenses (she remembers EVERYTHING)
  const blink = Math.floor(t*0.7)%7===0;
  if(!blink){
    A.px(ctx,PAL.ink,-3,-27+b,1,1);
    A.px(ctx,PAL.ink, 1,-27+b,1,1);
  }

  // mouth (kind smile, chats when o.talk)
  SB.mouth(ctx,t,o,-3,-23+b);

  // sun hat — wide cream brim + crown with a purple ribbon and flower
  A.px(ctx,PAL.cream,-8,-32+b,16,2);                 // brim
  A.px(ctx,PAL.paperD,-8,-31+b,16,1);                // brim underside
  A.px(ctx,PAL.cream,-4,-35+b,9,3);                  // crown
  A.px(ctx,PAL.purple,-4,-33+b,9,1);                 // ribbon
  A.px(ctx,PAL.yellow, 3,-34+b,2,2);                 // little flower
  A.px(ctx,PAL.orange, 3,-34+b,1,1);
};
