/* meeting_bg.js — חדר הישיבות (sneaky-quiet, projector cat forever)
   Layout contract (hotspots in meeting.js use these rects):
   door to newsroom x8-36 y72-142 · long table x70-230 y110-150 (chairs)
   whiteboard x90-170 y30-80 (cat doodle + ״רעיונות לגיליון״)
   projector on table x180-206 y100-110 · REMOTE x210-226 y104-112
   projected slide on wall x240-300 y40-100 (a pixel cat!)
   water pitcher x100-116 y100-110 · cactus x246-260 y132-150 (pot base y148-150)
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.meeting = function(ctx,t){
  // ---- walls & floor — muted "serious meeting" teal, warm floor ----
  A.wall(ctx,'#4e7268',0,140,'#35544c');
  A.px(ctx,'#5d867a',0,0,320,10);                        // ceiling strip
  A.px(ctx,'#3f6058',0,10,320,2);                        // ceiling shadow line
  A.floorWood(ctx,140,PAL.brown3,PAL.brown2);

  // ceiling fluorescent light (hums quietly since 2003)
  A.px(ctx,PAL.gray2,120,4,80,4);
  A.px(ctx,(Math.floor(t*7)%23===0)?PAL.gray4:PAL.cream,124,6,72,3); // rare flicker
  A.px(ctx,PAL.gray1,118,3,4,6); A.px(ctx,PAL.gray1,198,3,4,6);

  // rug under the table (meeting-gravitas rug)
  A.px(ctx,PAL.blueD,64,148,192,26);
  A.box(ctx,PAL.blueD,PAL.navy,64,148,192,26);
  A.dither(ctx,PAL.blueD,PAL.navy,70,152,180,18);

  // ---- door to newsroom (LEFT, x8-36 y72-142) ----
  A.door(ctx,10,72,26,70,PAL.brown3,PAL.brown1);
  A.text(ctx,'לחדר הכתבים ←',23,58,PAL.cream,6);
  A.px(ctx,PAL.gray3,4,142,36,2);                        // threshold

  // "shhh, meeting" sign next to the door
  A.poster(ctx,44,66,30,16,PAL.cream);
  A.text(ctx,'שששש!',59,68,PAL.redD,7);
  A.text(ctx,'ישיבה',59,76,PAL.ink,5);

  // ---- whiteboard (x90-170 y30-80) ----
  A.px(ctx,PAL.gray3,86,26,88,58);                       // outer frame
  A.px(ctx,PAL.white,90,30,80,50);                       // board
  A.text(ctx,'רעיונות לגיליון:',166,32,PAL.blueD,7,'right');
  A.text(ctx,'1. דינוזאורים',164,42,PAL.ink,6,'right');
  A.text(ctx,'2. עוד דינוזאורים',164,51,PAL.ink,6,'right');
  A.text(ctx,'3. ?',164,60,PAL.redD,6,'right');
  // marker doodle of מרדכי the cat (someone was "taking notes")
  A.px(ctx,PAL.ink,96,64,10,7);                          // cat body doodle
  A.px(ctx,PAL.ink,104,60,5,5);                          // head
  A.px(ctx,PAL.ink,104,58,1,2); A.px(ctx,PAL.ink,107,58,1,2); // ears
  A.px(ctx,PAL.ink,93,66,3,1);                           // tail
  A.px(ctx,PAL.white,105,61,1,1); A.px(ctx,PAL.white,107,61,1,1); // eyes
  A.px(ctx,PAL.red,110,66,4,1);                          // red underline scribble
  // marker tray + markers
  A.px(ctx,PAL.gray2,92,80,76,3);
  A.px(ctx,PAL.red,98,78,8,2); A.px(ctx,PAL.blue,110,78,8,2); A.px(ctx,PAL.green,122,78,8,2);
  // eraser that erases nothing
  A.px(ctx,PAL.brown4,146,77,12,3);

  // wall clock — the meeting started "five minutes ago" an hour ago
  A.disc(ctx,PAL.brown1,204,20,9); A.disc(ctx,PAL.cream,204,20,8);
  A.px(ctx,PAL.ink,204,14,1,7);                          // minute hand up
  const tick=Math.floor(t)%4;                            // second hand ticks around
  if(tick===0) A.px(ctx,PAL.red,204,15,1,5);
  else if(tick===1) A.px(ctx,PAL.red,205,20,4,1);
  else if(tick===2) A.px(ctx,PAL.red,204,21,1,5);
  else A.px(ctx,PAL.red,200,20,4,1);

  // motivational poster (management-approved)
  A.poster(ctx,182,32,44,24,PAL.cream);
  A.text(ctx,'ישיבה טובה',204,34,PAL.blueD,6);
  A.text(ctx,'= ישיבה קצרה',204,42,PAL.redD,6);

  // air-conditioner (set to "קוטב צפוני") with waving ribbon
  A.box(ctx,PAL.gray4,PAL.gray2,232,14,56,12);
  A.px(ctx,PAL.gray2,236,22,48,1); A.px(ctx,PAL.gray2,236,18,48,1);
  A.disc(ctx,PAL.green,284,17,1);                        // power LED
  const rib=Math.floor(Math.sin(t*5)*2);                 // ribbon flutters in the blast
  A.px(ctx,PAL.pink,240,26,2,6+rib);
  A.px(ctx,PAL.pink,244,26,2,7-rib);

  // ---- projected slide on wall (x240-300 y40-100): THE cat ----
  const flick=(Math.floor(t*9)%17===0);                  // projector shimmer
  A.px(ctx,flick?PAL.paperD:PAL.cream,240,40,60,60);     // light rectangle
  A.px(ctx,flick?PAL.paper:PAL.white,244,44,52,52);      // inner glow
  // pixel cat, projected in eternal glory
  A.px(ctx,PAL.gray2,258,72,22,14);                      // body
  A.disc(ctx,PAL.gray2,256,68,6);                        // head
  A.px(ctx,PAL.gray2,251,60,3,4); A.px(ctx,PAL.gray2,259,60,3,4); // ears
  A.px(ctx,PAL.pink,252,61,1,2); A.px(ctx,PAL.pink,260,61,1,2);   // inner ears
  A.px(ctx,PAL.yellow,253,66,2,2); A.px(ctx,PAL.yellow,258,66,2,2); // eyes
  A.px(ctx,PAL.pink,256,70,2,1);                         // nose
  A.px(ctx,PAL.gray2,280,70,4,10); A.px(ctx,PAL.gray2,282,66,3,6); // tail up
  A.px(ctx,PAL.gray3,262,86,3,2); A.px(ctx,PAL.gray3,272,86,3,2);  // paws
  A.text(ctx,'שקופית 1 מתוך 1',270,90,PAL.gray2,5);
  A.text(ctx,'מיאו.',252,48,PAL.gray1,6);

  // projector beam + floating dust motes (animated)
  A.px(ctx,PAL.cream,212,98,4,1); A.px(ctx,PAL.cream,220,88,4,1);
  A.px(ctx,PAL.cream,228,72,4,1); A.px(ctx,PAL.cream,234,56,4,1);
  const dust=Math.floor(t*10)%4;
  A.px(ctx,PAL.white,214+dust*6,94-dust*10,1,1);
  A.px(ctx,PAL.white,224+dust*4,80-dust*8,1,1);

  // ---- long conference table (x70-230 y110-150) ----
  // chairs BEHIND the table (backs peeking over)
  for(let i=0;i<4;i++){
    const cx=84+i*40;
    A.px(ctx,PAL.brown2,cx,96,18,14);                    // backrest
    A.box(ctx,PAL.brown2,PAL.brown1,cx,96,18,14);
    A.px(ctx,PAL.brown1,cx+8,110,2,4);                   // post
  }
  // the table itself — long, important, slightly sticky
  A.px(ctx,PAL.brown4,70,110,160,6);                     // top
  A.px(ctx,PAL.brown2,70,116,160,3);                     // edge
  A.px(ctx,PAL.brown2,76,119,6,31); A.px(ctx,PAL.brown2,218,119,6,31); // legs
  A.px(ctx,PAL.brown1,76,148,6,2); A.px(ctx,PAL.brown1,218,148,6,2);   // feet
  A.px(ctx,PAL.brown3,140,119,6,31);                     // middle leg (long table!)

  // ---- water pitcher (x100-116 y100-110) + paper cups ----
  A.px(ctx,PAL.cyan,102,100,12,10);                      // pitcher body
  A.px(ctx,PAL.sky,104,102,8,6);                         // water inside
  A.px(ctx,PAL.cyan,114,102,3,4);                        // handle
  A.px(ctx,PAL.cyan,104,98,8,2);                         // lid rim
  A.px(ctx,PAL.white,120,104,5,6); A.px(ctx,PAL.white,127,104,5,6); // cups
  A.px(ctx,PAL.paperD,120,104,5,1); A.px(ctx,PAL.paperD,127,104,5,1);

  // coffee mug + steam (someone never came back for it)
  A.px(ctx,PAL.orange,140,102,7,8); A.px(ctx,PAL.orangeD,147,104,2,4);
  if(Math.floor(t*2)%2) A.px(ctx,PAL.gray4,142,97,1,4); else A.px(ctx,PAL.gray4,144,96,1,4);

  // agenda papers + pencil on the table
  A.px(ctx,PAL.paper,154,104,16,6); A.px(ctx,PAL.paperD,157,102,15,6);
  A.px(ctx,PAL.ink,159,104,10,1); A.px(ctx,PAL.ink,159,106,7,1);   // "text"
  A.px(ctx,PAL.yellow,150,109,10,2); A.px(ctx,PAL.pink,160,109,2,2); // pencil
  A.px(ctx,PAL.brown4,132,112,4,2); A.px(ctx,PAL.brown4,168,113,3,2); // cookie crumbs (evidence)

  // ---- projector on table (x180-206 y100-110) ----
  A.box(ctx,PAL.gray3,PAL.gray1,180,100,26,10);
  A.px(ctx,PAL.gray2,184,102,8,4);                       // vent
  A.disc(ctx,PAL.cyan,203,105,2);                        // lens (points at the wall)
  A.px(ctx,PAL.white,203,104,1,1);                       // lens glint
  A.disc(ctx,(Math.floor(t*3)%2)?PAL.green:PAL.greenD,183,108,1); // blinking LED
  A.px(ctx,PAL.gray1,192,110,2,4);                       // cable down…
  A.px(ctx,PAL.gray1,192,114,60,1);                      // …along the table
  A.px(ctx,PAL.gray1,252,114,1,26);                      // …to the floor

  // ---- the REMOTE (x210-226 y104-112) — battery treasure, until it's pocketed ----
  if(typeof G==='undefined'||!G.f||(!G.has('batteries')&&!G.f.flash_ok)){
    A.box(ctx,PAL.ink,PAL.black,210,104,16,8);
    A.px(ctx,PAL.red,212,106,2,2); A.px(ctx,PAL.gray3,216,106,2,2);
    A.px(ctx,PAL.gray3,220,106,2,2); A.px(ctx,PAL.green,223,106,2,2);
    A.px(ctx,PAL.gray4,212,109,10,1);                    // battery lid seam
  } else {
    // רק צורת שלט באבק — dust outline where the remote used to rest
    A.px(ctx,PAL.gray4,210,104,16,1); A.px(ctx,PAL.gray4,210,111,16,1);
    A.px(ctx,PAL.gray4,210,105,1,6); A.px(ctx,PAL.gray4,225,105,1,6);
  }

  // chairs IN FRONT of the table (seen from behind)
  A.px(ctx,PAL.brown2,96,132,20,6);                      // seat
  A.px(ctx,PAL.brown1,98,138,3,14); A.px(ctx,PAL.brown1,111,138,3,14);
  A.px(ctx,PAL.brown2,188,134,20,6);
  A.px(ctx,PAL.brown1,190,140,3,12); A.px(ctx,PAL.brown1,203,140,3,12);
  // one chair fell over — dramatic exit from the last meeting (x272-300, clear of the cactus hotspot)
  A.px(ctx,PAL.brown2,272,152,24,5);
  A.px(ctx,PAL.brown1,294,146,4,11);

  // wastebasket + rejected-idea paper balls
  A.px(ctx,PAL.gray2,44,132,14,14); A.px(ctx,PAL.gray1,44,132,14,2);
  A.px(ctx,PAL.paper,46,130,5,4); A.px(ctx,PAL.paperD,52,131,4,3); // overflowing
  A.disc(ctx,PAL.paper,38,148,2); A.disc(ctx,PAL.paperD,62,152,2); // missed shots

  // ---- the cactus (nobody remembers who brought it) — hotspot x246-260 y132-150 ----
  A.px(ctx,PAL.brown1,246,150,14,2);                     // floor shadow under the pot
  A.px(ctx,PAL.orangeD,248,144,10,6); A.px(ctx,PAL.brown1,247,143,12,2); // pot (base y148-150)
  A.px(ctx,PAL.green,251,132,3,12);                      // trunk
  A.px(ctx,PAL.green,247,137,4,3); A.px(ctx,PAL.green,247,133,2,5);  // left arm
  A.px(ctx,PAL.green,254,139,4,3); A.px(ctx,PAL.green,256,134,2,6);  // right arm
  A.px(ctx,PAL.lime,252,133,1,2); A.px(ctx,PAL.lime,248,134,1,2);    // spines
  A.px(ctx,PAL.lime,257,135,1,2); A.px(ctx,PAL.pink,251,132,2,1);    // brave flower

  // baseboard shadows under the big stuff (grounding)
  A.px(ctx,PAL.brown1,72,150,156,2);
  A.px(ctx,PAL.brown1,272,157,26,2);                     // under the fallen chair
};
