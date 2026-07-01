/* ============================================================
   sprites/dog.js — הכלב מהרחוב
   כלב קטן חום-לבן שיושב ליד הקיוסק ומחכה לעיתון של מחר. אופטימי.
   Feet at (0,0), centered on x=0, faces LEFT, height ~16px.
   Tail wags with t, tongue dangles, o.talk = bark (open mouth).
   ============================================================ */
'use strict';

SPR.dog = function(ctx,t,o){
  const b   = SB.bob(t,o);                    // idle 1px bob
  const wag = Math.floor(t*7)%2;              // fast happy tail wag
  const f   = o.walk ? Math.floor(t*8)%2 : 0; // walk frame

  // ---- tail (right side = behind; he faces left) with white tip ----
  if(wag){
    A.px(ctx,PAL.brown2,5,-12+b,2,3);         // tail up
    A.px(ctx,PAL.white, 5,-14+b,2,2);
  } else {
    A.px(ctx,PAL.brown2,6,-10+b,3,2);         // tail out
    A.px(ctx,PAL.white, 8,-10+b,2,2);
  }

  // ---- far legs (darker, behind body) ----
  A.px(ctx,PAL.brown2,-4,-4,2,4-(f?0:1));
  A.px(ctx,PAL.brown2, 4,-4,2,4-(f?1:0));

  // ---- body: chubby brown, white chest/belly, shaded haunch ----
  A.disc(ctx,PAL.brown3, 1,-7+b,4);
  A.disc(ctx,PAL.brown2, 4,-7+b,3);           // haunch shading
  A.px(ctx,PAL.white,-3,-6+b,5,3);            // white belly patch
  A.px(ctx,PAL.white, 0,-11+b,3,1);           // white patch on the back

  // ---- near legs with white paws (feet land on y=0) ----
  const leg=(x,lift)=>{
    A.px(ctx,PAL.brown3,x,-4,2,4-lift);
    A.px(ctx,PAL.white, x,-1-lift,2,1);       // white sock
  };
  leg(-5, f?1:0);                             // front leg
  leg(-2, 0);                                 // second front leg
  leg( 3, f?0:1);                             // hind leg

  // ---- red collar + shiny tag ----
  A.px(ctx,PAL.red,   -7,-10+b,4,1);
  A.px(ctx,PAL.yellow,-6, -9+b,1,1);

  // ---- head (round, tilted forward, hopeful) ----
  A.disc(ctx,PAL.brown3,-6,-13+b,3);
  A.px(ctx,PAL.white,-9,-13+b,3,3);           // white muzzle
  A.px(ctx,PAL.ink,-10,-13+b,2,2);            // wet black nose
  A.px(ctx,PAL.ink, -6,-15+b,1,2);            // eye (waiting for that paper)

  // ---- floppy ear, flaps gently with t ----
  const ef = Math.floor(t*3)%2;
  A.px(ctx,PAL.brown1,-4,-17+b,3,4+(ef?1:0));

  // ---- mouth + tongue: bark when talking, happy pant otherwise ----
  if(o.talk && Math.floor(t*10)%2){
    A.px(ctx,PAL.redD,-9,-11+b,3,2);          // HAV! mouth wide open
    A.px(ctx,PAL.pink,-9, -9+b,2,2);          // tongue mid-bark
  } else {
    A.px(ctx,PAL.redD,-9,-11+b,2,1);          // little smile line
    A.px(ctx,PAL.pink,-8,-10+b,2,2+(Math.floor(t*4)%2)); // dangling tongue
  }
};
