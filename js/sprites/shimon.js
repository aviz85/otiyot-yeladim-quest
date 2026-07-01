/* ============================================================
   sprites/shimon.js — שמעון, מפעיל מכונת הדפוס
   Burly ~42px. Blue overalls over a red shirt, big dark mustache
   (wiggles when he shouts over the machine), kippah, ink smudges
   everywhere — on the bib, on the arm, even on the cheek.
   Feet at (0,0), centered on x=0, faces LEFT.
   ============================================================ */
'use strict';

SPR.shimon = function(ctx,t,o){
  const b = SB.bob(t,o);
  const sw = o.walk ? Math.floor(t*8)%2 : 0;

  // legs — blue overall pants
  SB.legs(ctx,t,o,PAL.blue);

  // torso — red work shirt, burly and wide
  A.px(ctx,PAL.red,-7,-28+b,14,18);
  A.px(ctx,PAL.redD,-7,-28+b,14,2);          // shoulder shading
  A.px(ctx,PAL.redD,-7,-12+b,14,2);          // waist shading

  // overalls bib + straps
  A.px(ctx,PAL.blue,-5,-23+b,10,13);         // bib
  A.px(ctx,PAL.blueD,-5,-23+b,10,1);         // bib top edge
  A.px(ctx,PAL.blue,-5,-28+b,2,5);           // strap (front)
  A.px(ctx,PAL.blue, 3,-28+b,2,5);           // strap (back)
  A.px(ctx,PAL.yellow,-5,-24+b,1,1);         // strap button
  A.px(ctx,PAL.yellow, 4,-24+b,1,1);         // strap button
  A.px(ctx,PAL.blueD,-3,-18+b,6,5);          // chest pocket
  A.px(ctx,PAL.gray4,-2,-18+b,1,3);          // pencil in pocket

  // ink smudges on the overalls
  A.px(ctx,PAL.ink,-4,-21+b,2,1);
  A.px(ctx,PAL.ink, 1,-15+b,2,2);
  A.px(ctx,PAL.ink,-2,-13+b,1,1);

  // arms — rolled-up red sleeves, thick forearms
  A.px(ctx,PAL.red,-9,-27+b,2,7+(sw?2:0));
  A.px(ctx,PAL.red, 7,-27+b,2,7+(sw?0:2));
  A.px(ctx,PAL.skin,-9,-20+b+(sw?2:0),2,6);
  A.px(ctx,PAL.skin, 7,-20+b+(sw?0:2),2,6);
  A.px(ctx,PAL.ink,-9,-17+b+(sw?2:0),2,1);   // ink smudge on forearm

  // head
  A.px(ctx,PAL.skin,-5,-40+b,10,12);
  A.px(ctx,PAL.skinD,4,-37+b,1,3);           // ear (back side)
  A.px(ctx,PAL.brown2,3,-40+b,2,7);          // hair at the back
  A.px(ctx,PAL.brown2,-5,-40+b,10,1);        // hairline under kippah
  A.px(ctx,PAL.ink,-4,-38+b,1,1);            // ink smudge on cheek. classic shimon.

  // kippah
  A.px(ctx,PAL.navy,-2,-42+b,6,2);
  A.px(ctx,PAL.blue,-1,-42+b,4,1);

  // face (looking LEFT)
  A.px(ctx,PAL.ink,-4,-37+b,1,2);            // eyes
  A.px(ctx,PAL.ink,-1,-37+b,1,2);
  A.px(ctx,PAL.brown2,-5,-39+b,2,1);         // bushy eyebrows
  A.px(ctx,PAL.brown2,-2,-39+b,2,1);
  A.px(ctx,PAL.skinD,-5,-35+b,2,2);          // big working-man nose

  // THE mustache — huge, wiggles when he shouts over the machine
  const mw = (o.talk && Math.floor(t*10)%2) ? 1 : 0;
  A.px(ctx,PAL.brown1,-6,-34+b+mw,10,3);     // main broom
  A.px(ctx,PAL.brown1,-6,-31+b+mw,2,2);      // droopy end (front)
  A.px(ctx,PAL.brown1, 2,-31+b+mw,2,2);      // droopy end (back)
  A.px(ctx,PAL.brown2,-5,-34+b+mw,8,1);      // highlight

  // mouth peeking under the mustache
  SB.mouth(ctx,t,o,-2,-30+b);
};
