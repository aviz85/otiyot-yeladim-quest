/* ============================================================
   sprites/cat.js — מרדכי החתול (orange tabby, smug, sitting)
   Feet at (0,0), centered on x=0, faces LEFT, ~14px tall.
   Tail sways with t, head bobs, mouth-ish flicker on o.talk.
   ============================================================ */
'use strict';

SPR.cat = function(ctx,t,o){
  const hb = Math.floor(t*2)%2;              // lazy idle head bob (1px)
  const sw = Math.round(Math.sin(t*2.2)*2);  // tail sway -2..2
  const st = o.walk ? Math.floor(t*8)%2 : 0; // paw shuffle when walking

  // --- tail (behind body, rises from the rear, dark tabby tip) ---
  A.px(ctx,PAL.orange, 7,-4,2,4);
  A.px(ctx,PAL.orange, 8,-8,2,4);
  A.px(ctx,PAL.orangeD,8+sw,-11,2,3);

  // --- sitting body: round haunch at the back (right) ---
  A.disc(ctx,PAL.orange,3,-5,4);
  A.px(ctx,PAL.orange,-5,-9,6,9);
  // tabby stripes on the back + haunch
  A.px(ctx,PAL.orangeD, 2,-8,4,1);
  A.px(ctx,PAL.orangeD, 3,-6,4,1);
  A.px(ctx,PAL.orangeD,-3,-9,1,2);
  A.px(ctx,PAL.orangeD, 0,-9,1,2);
  // creamy chest/belly
  A.px(ctx,PAL.cream,-5,-6,3,5);

  // --- front legs + paws (feet touch y=0; alternate shuffle on walk) ---
  const up1 = o.walk ? (st?1:0) : 0;         // raise one paw at a time
  const up2 = o.walk ? (st?0:1) : 0;
  A.px(ctx,PAL.orange,-5,-4,2,4-up1);
  A.px(ctx,PAL.orange,-2,-4,2,4-up2);
  A.px(ctx,PAL.cream,-5,-1-up1,2,1);
  A.px(ctx,PAL.cream,-2,-1-up2,2,1);

  // --- head (facing left) ---
  A.disc(ctx,PAL.orange,-4,-11+hb,3);
  // ears (dark, with pink inner)
  A.px(ctx,PAL.orangeD,-7,-15+hb,2,2);
  A.px(ctx,PAL.orangeD,-2,-15+hb,2,2);
  A.px(ctx,PAL.pink,-6,-15+hb,1,1);
  A.px(ctx,PAL.pink,-2,-15+hb,1,1);
  // forehead stripes
  A.px(ctx,PAL.orangeD,-5,-14+hb,1,1);
  A.px(ctx,PAL.orangeD,-3,-14+hb,1,1);
  // cream muzzle
  A.px(ctx,PAL.cream,-7,-10+hb,3,2);
  // smug half-lidded eyes (lid pixel over each eye)
  A.px(ctx,PAL.orangeD,-6,-13+hb,1,1);
  A.px(ctx,PAL.orangeD,-3,-13+hb,1,1);
  A.px(ctx,PAL.ink,-6,-12+hb,1,1);
  A.px(ctx,PAL.ink,-3,-12+hb,1,1);
  // pink nose + whiskers
  A.px(ctx,PAL.pink,-7,-10+hb,1,1);
  A.px(ctx,PAL.gray4,-9,-10+hb,2,1);
  A.px(ctx,PAL.gray4,-9,-8+hb,2,1);

  // --- mouth: tiny meow flicker when talking ---
  if(o.talk && Math.floor(t*10)%2) A.px(ctx,PAL.redD,-6,-9+hb,2,2);
  else A.px(ctx,PAL.redD,-6,-9+hb,2,1);
};
