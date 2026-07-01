/* ============================================================
   sprites/dovi.js — דובי, הכתב שמדבר רק בכותרות
   Brown vest over white shirt, white press-hat with a card,
   kippah peeking at the back, notepad + scribbling pencil.
   Feet at (0,0), centered on x=0, faces LEFT, ~40px tall.
   ============================================================ */
'use strict';

SPR.dovi = function(ctx,t,o){
  const b = SB.bob(t,o);
  // pencil scribbles faster when he's "dictating a headline"
  const sc = Math.floor(t*(o.talk?12:5))%2;

  /* ---- legs: gray slacks ---- */
  SB.legs(ctx,t,o,PAL.gray2);

  /* ---- torso: white shirt + brown reporter vest ---- */
  A.px(ctx,PAL.white,-6,-26+b,12,16);          // shirt
  A.px(ctx,PAL.brown2,-6,-26+b,4,16);          // vest left panel
  A.px(ctx,PAL.brown2, 2,-26+b,4,16);          // vest right panel
  A.px(ctx,PAL.brown1,-6,-26+b,4,1);           // vest shoulder shade
  A.px(ctx,PAL.brown1, 2,-26+b,4,1);
  A.px(ctx,PAL.brown1,-6,-11+b,4,1);           // vest hem
  A.px(ctx,PAL.brown1, 2,-11+b,4,1);
  A.px(ctx,PAL.brown1,-5,-16+b,2,3);           // vest pocket (full of scoops)
  A.px(ctx,PAL.ink,-1,-25+b,1,1);              // shirt buttons
  A.px(ctx,PAL.ink,-1,-22+b,1,1);
  A.px(ctx,PAL.paper,3,-23+b,3,4);             // press badge on vest
  A.px(ctx,PAL.red,3,-23+b,3,1);

  /* ---- back arm: hangs at the side, swings on walk ---- */
  const sw = o.walk ? Math.floor(t*8)%2 : 0;
  A.px(ctx,PAL.white,5,-25+b,2,8+(sw?2:0));    // sleeve
  A.px(ctx,PAL.skin, 5,-17+b+(sw?2:0),2,3);    // hand

  /* ---- front arm holds the notepad out (facing left) ---- */
  A.px(ctx,PAL.white,-8,-25+b,2,5);            // sleeve
  A.px(ctx,PAL.paper,-14,-22+b,7,9);           // notepad
  A.px(ctx,PAL.gray3,-14,-23+b,7,1);           // spiral binding
  A.px(ctx,PAL.gray4,-13,-20+b,5,1);           // scribbled lines
  A.px(ctx,PAL.gray4,-13,-18+b,5,1);
  A.px(ctx,PAL.gray4,-13,-16+b,3,1);
  A.px(ctx,PAL.skin,-9,-20+b,2,3);             // hand gripping the pad

  /* ---- writing arm crosses the chest, pencil over the pad ---- */
  A.px(ctx,PAL.white,-4,-24+b,6,2);            // forearm across chest
  A.px(ctx,PAL.skin,-6,-25+b+sc,2,2);          // writing hand (jitters)
  A.px(ctx,PAL.yellow,-8+sc,-27+b,1,3);        // pencil
  A.px(ctx,PAL.pink,-8+sc,-28+b,1,1);          // eraser
  A.px(ctx,PAL.ink,-8+sc,-24+b,1,1);           // graphite tip

  /* ---- head ---- */
  A.px(ctx,PAL.skin,-4,-36+b,8,10);
  A.px(ctx,PAL.skin,-5,-31+b,1,2);             // nose (points left, sniffs scoops)
  A.px(ctx,PAL.brown1,3,-34+b,1,6);            // hair at the back
  A.px(ctx,PAL.brown1,-4,-35+b,8,1);           // hair under the hat
  // eyes (facing left)
  A.px(ctx,PAL.ink,-3,-33+b,1,2);
  A.px(ctx,PAL.ink, 0,-33+b,1,2);
  // eyebrows — always mid-headline
  A.px(ctx,PAL.brown1,-3,-34+b,1,1);
  A.px(ctx,PAL.brown1, 0,-34+b,1,1);
  SB.mouth(ctx,t,o,-2,-29+b);

  /* ---- kippah peeking at the back, under the hat ---- */
  A.px(ctx,PAL.navy,2,-36+b,3,1);

  /* ---- white press hat with a card in the band ---- */
  A.px(ctx,PAL.white,-7,-37+b,13,2);           // brim
  A.px(ctx,PAL.cream,-7,-36+b,13,1);           // brim underside
  A.px(ctx,PAL.white,-4,-41+b,8,4);            // crown
  A.px(ctx,PAL.cream,-4,-41+b,8,1);            // crown top shade
  A.px(ctx,PAL.ink,-4,-38+b,8,1);              // hat band
  A.px(ctx,PAL.paper,-4,-41+b,3,4);            // press card tucked in the band
  A.px(ctx,PAL.red,-4,-40+b,3,1);              // red stripe on the card
};
