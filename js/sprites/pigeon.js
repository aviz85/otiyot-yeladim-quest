/* ============================================================
   pigeon.js — נחום היונה (SPR.pigeon)
   יונה אפורה קטנה (~10px), שומרת על הקן בגג כמו על עוגת שבת.
   רגליים ב-(0,0), ממורכזת על x=0, פונה שמאלה.
   הראש מנקר-מנדנד עם t; o.talk ← המקור נפתח (קוּ-קוּ).
   ============================================================ */
'use strict';

SPR.pigeon = function(ctx,t,o){
  // head bob: pigeons bob even standing still (it's their whole personality)
  const hb = Math.floor(t*4)%2;        // head forward/back
  const b  = Math.floor(t*2)%2;        // gentle body bob
  const tf = Math.floor(t*3)%2;        // tail flick

  // --- legs (skinny orange, feet at y=0) ---
  A.px(ctx,PAL.orangeD,-2,-2,1,2);
  A.px(ctx,PAL.orangeD, 1,-2,1,2);
  A.px(ctx,PAL.orangeD,-3, 0,3,1);     // toes (facing left)
  A.px(ctx,PAL.orangeD, 0, 0,3,1);

  // --- tail (points right/back, flicks) ---
  A.px(ctx,PAL.gray2, 3,-6+b-tf,4,2);
  A.px(ctx,PAL.gray1, 5,-5+b-tf,3,1);

  // --- body: plump gray oval, light belly ---
  A.disc(ctx,PAL.gray3,0,-5+b,4);      // body
  A.px(ctx,PAL.gray4,-3,-4+b,5,2);     // light belly
  // wing fold
  A.px(ctx,PAL.gray2,-1,-7+b,4,2);
  A.px(ctx,PAL.gray1, 1,-6+b,2,1);

  // --- head: bobs forward-left ---
  const hx = -4-hb;                    // head x shifts with the bob
  A.disc(ctx,PAL.gray3,hx,-10+b,2);
  // iridescent neck patch (fancy pigeon fashion)
  A.px(ctx,PAL.teal,hx+1,-9+b,2,2);
  // eye (facing left) — slightly judgmental, as pigeons are
  A.px(ctx,PAL.ink,hx-1,-11+b,1,1);

  // --- beak: opens when "talking" (coo-coo with subtitles) ---
  if(o.talk && Math.floor(t*10)%2){
    A.px(ctx,PAL.orange,hx-4,-11+b,2,1);
    A.px(ctx,PAL.orange,hx-4,-9+b,2,1);
  } else {
    A.px(ctx,PAL.orange,hx-4,-10+b,2,1);
  }
};
