/* ============================================================
   sprites/rivka.js — רבקה, העורכת הראשית
   Elegant: purple blazer, teal מטפחת, glasses, papers in hand.
   Height ~40px. Feet at (0,0), centered on x=0, faces LEFT.
   ============================================================ */
'use strict';

SPR.rivka = function(ctx,t,o){
  const b = SB.bob(t,o);

  // legs — dark stockings + shoes (from framework)
  SB.legs(ctx,t,o,PAL.gray1);

  // modest skirt over the legs
  A.px(ctx,PAL.purpleD,-6,-17+b,12,9);
  A.px(ctx,PAL.lav,-6,-9+b,12,1);          // hem highlight

  // torso — purple blazer
  A.px(ctx,PAL.purple,-5,-29+b,10,12);
  // white blouse peeking in the middle
  A.px(ctx,PAL.white,-2,-28+b,3,6);
  // lapels
  A.px(ctx,PAL.purpleD,-4,-28+b,1,5);
  A.px(ctx,PAL.purpleD, 2,-28+b,1,5);
  // blazer button
  A.px(ctx,PAL.yellow,0,-21+b,1,1);

  // back arm (right side) — hangs, slight swing while walking
  const sw = o.walk? Math.floor(t*8)%2 : 0;
  A.px(ctx,PAL.purple,5,-28+b,2,8+(sw?1:0));
  A.px(ctx,PAL.skin,  5,-20+b+(sw?1:0),2,3);

  // the famous stack of papers (held out in front — she never puts it down)
  A.px(ctx,PAL.paperD,-14,-29+b,6,8);       // sheet behind, slightly askew
  A.px(ctx,PAL.white, -13,-30+b,6,8);       // top sheet
  A.px(ctx,PAL.paperD,-12,-28+b,4,1);       // text lines
  A.px(ctx,PAL.paperD,-12,-26+b,4,1);
  A.px(ctx,PAL.paperD,-12,-24+b,3,1);

  // front arm (left side) — bent, holding the papers
  A.px(ctx,PAL.purple,-7,-28+b,2,5);
  A.px(ctx,PAL.purple,-9,-24+b,3,2);
  A.px(ctx,PAL.skin, -10,-23+b,2,2);        // hand gripping the stack

  // head
  A.px(ctx,PAL.skin,-4,-38+b,8,9);
  // a hint of hair under the scarf
  A.px(ctx,PAL.brown1,-4,-37+b,7,1);

  // teal מטפחת — covers top + back of head, little knot-tail behind
  A.px(ctx,PAL.teal,-5,-41+b,10,4);
  A.px(ctx,PAL.greenD,-5,-38+b,10,1);       // shade line under the fold
  A.px(ctx,PAL.teal,3,-38+b,2,8);           // back of head
  A.px(ctx,PAL.teal,4,-30+b,2,4);           // knot tail
  A.px(ctx,PAL.greenD,5,-27+b,1,1);         // tail tip shade

  // glasses — light frames with dark pupils (facing left)
  A.px(ctx,PAL.gray4,-4,-36+b,3,3);
  A.px(ctx,PAL.gray4, 0,-36+b,3,3);
  A.px(ctx,PAL.gray4,-1,-35+b,1,1);         // bridge
  A.px(ctx,PAL.gray4, 3,-35+b,2,1);         // temple arm to ear
  A.px(ctx,PAL.ink,-3,-35+b,1,1);           // pupils
  A.px(ctx,PAL.ink, 1,-35+b,1,1);
  // little glass glint
  A.px(ctx,PAL.cyan,-4,-36+b,1,1);
  A.px(ctx,PAL.cyan, 0,-36+b,1,1);

  // mouth (talk animation)
  SB.mouth(ctx,t,o,-2,-31+b);
};
