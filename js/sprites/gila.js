/* ============================================================
   sprites/gila.js — גילה, פקידת הקבלה הצעירה של ״אותיות וילדים״
   Pink top, headset with mic, ponytail, long modest skirt.
   Height ~38. Feet at (0,0), centered on x=0, faces LEFT.
   ============================================================ */
'use strict';

SPR.gila = function(ctx,t,o){
  const b  = SB.bob(t,o);                     // idle 1px bob
  const sw = o.walk ? Math.floor(t*8)%2 : 0;  // arm swing phase
  const pt = Math.floor(t*3)%2;               // ponytail gentle sway

  // legs (ankles + shoes peek under the skirt)
  SB.legs(ctx,t,o,PAL.navy);

  // long modest A-line skirt (soft lavender, widens downward)
  A.px(ctx,PAL.lav,   -5,-20+b,10,4);
  A.px(ctx,PAL.lav,   -6,-16+b,12,4);
  A.px(ctx,PAL.lav,   -7,-12+b,14,4);
  A.px(ctx,PAL.purple,-7, -9+b,14,1);         // hem trim

  // torso: pink top
  A.px(ctx,PAL.pink,-5,-27+b,10,9);
  A.px(ctx,PAL.red, -5,-27+b,10,1);           // collar shade line
  A.px(ctx,PAL.white,-1,-25+b,2,2);           // little reception name tag

  // arms: pink sleeves + hands (swing when walking)
  A.px(ctx,PAL.pink,-7,-26+b,2,8+(sw?2:0));
  A.px(ctx,PAL.pink, 5,-26+b,2,8+(sw?0:2));
  A.px(ctx,PAL.skin,-7,-18+b+(sw?2:0),2,3);
  A.px(ctx,PAL.skin, 5,-18+b+(sw?0:2),2,3);

  // head
  A.px(ctx,PAL.skin,-4,-37+b,8,10);

  // hair: dark brown, framing the face
  A.px(ctx,PAL.brown1,-4,-38+b,8,3);          // top
  A.px(ctx,PAL.brown1, 3,-36+b,1,6);          // back of head (right = behind)
  A.px(ctx,PAL.brown1,-4,-35+b,1,2);          // fringe wisp over forehead

  // ponytail: bounces behind her (to the right — she faces left)
  A.disc(ctx,PAL.brown1,5,-34+b+pt,2);
  A.px(ctx,PAL.brown1,4,-33+b+pt,3,6);
  A.px(ctx,PAL.brown2,4,-27+b+pt,3,2);        // lighter tip
  A.px(ctx,PAL.red,4,-31+b+pt,3,1);           // scrunchie

  // headset: band over the hair + earpieces + mic arm toward the mouth
  A.px(ctx,PAL.ink,-3,-39+b,6,1);             // band
  A.px(ctx,PAL.ink,-4,-38+b,1,2);             // band front drop
  A.px(ctx,PAL.ink, 3,-38+b,1,2);             // band back drop
  A.px(ctx,PAL.gray2,-5,-34+b,1,4);           // front earpiece (near ear)
  A.px(ctx,PAL.gray2, 3,-34+b,2,3);           // back earpiece
  A.px(ctx,PAL.ink,-6,-32+b,1,3);             // mic arm curving down
  A.disc(ctx,PAL.orange,-6,-29+b,1);          // mic tip
  if(o.talk && Math.floor(t*6)%2) A.px(ctx,PAL.yellow,-6,-30+b,1,1); // blinks on-air

  // face (looking left)
  A.px(ctx,PAL.ink,-3,-34+b,1,2);             // eyes
  A.px(ctx,PAL.ink, 0,-34+b,1,2);
  A.px(ctx,PAL.pink,-4,-31+b,1,1);            // rosy cheek
  SB.mouth(ctx,t,o,-3,-30+b);                 // talk animation
};
