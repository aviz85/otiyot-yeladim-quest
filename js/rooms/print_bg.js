'use strict';
if(typeof BG==='undefined') var BG={};

/* print_bg.js — בית הדפוס ״האות והמופת״ (music:'print')
   Layout contract (hotspots in print.js use these rects):
   door to street x288-316 y72-142 · HUGE press machine x40-200 y40-146
   buttons ON machine: green x84-100 y100-116 · yellow x120-136 y100-116 · red x156-172 y100-116
   instructions sign UPSIDE-DOWN x208-236 y40-80 · paper rolls x250-290 y100-146
   ink barrels LEFT x8-34 y104-146 · pigeon poster x246-280 y32-66
   shimon npc stands at x=240 y=154 (drawn by engine)
   Animations: gears spin, rollers turn, page slides out, ink drop falls,
   steam from pipe, flickering lamp, blinking panel lights, gauge needles.
*/

BG.print = function(ctx,t){
  const T = t||0;

  /* ---- industrial wall + ceiling ---- */
  A.wall(ctx,'#5b6680',0,140,PAL.gray1);
  A.px(ctx,'#4a5570',0,0,320,12);                      // ceiling strip
  // ceiling pipes
  A.px(ctx,PAL.gray2,0,6,320,4);
  A.px(ctx,PAL.gray3,0,6,320,1);
  A.px(ctx,PAL.gray2,300,10,5,24);                     // pipe drop near door
  A.px(ctx,PAL.gray1,299,20,7,3);                      // pipe joint
  // steam puff from the leaky joint (animated)
  const ph = Math.floor(T*2)%3;
  A.px(ctx,PAL.gray4,295-ph,26+ph,3,2);
  A.px(ctx,PAL.white,292-ph*2,22+ph,2,2);

  /* ---- concrete floor + ink stains ---- */
  A.floorTile(ctx,140,PAL.gray3,PAL.gray2);
  A.px(ctx,PAL.ink,214,152,10,3); A.px(ctx,PAL.ink,221,156,6,2);
  A.px(ctx,PAL.ink,64,162,8,2);  A.px(ctx,PAL.ink,70,165,4,1);
  A.disc(ctx,PAL.ink,118,170,3); A.px(ctx,PAL.ink,124,172,5,1);
  // power cable from machine to wall socket
  A.px(ctx,PAL.ink,200,143,60,2); A.px(ctx,PAL.ink,258,132,2,12);
  A.px(ctx,PAL.gray1,255,126,8,8); A.px(ctx,PAL.yellow,258,129,2,2); // socket

  /* ---- hanging lamps (one flickers — old wiring) ---- */
  A.lamp(ctx,60,22,true);
  A.lamp(ctx,226,22,(Math.floor(T*7)%13)!==0);

  /* ================= THE HUGE PRESS x40-200 y40-146 ================= */
  // shadow + base
  A.px(ctx,PAL.gray2,38,144,168,6);
  A.box(ctx,PAL.gray1,PAL.ink,44,132,152,14);          // heavy base
  A.px(ctx,PAL.gray2,50,136,10,4); A.px(ctx,PAL.gray2,180,136,10,4); // feet bolts
  // main body
  A.box(ctx,PAL.gray2,PAL.gray1,40,40,160,96);
  A.px(ctx,PAL.gray3,42,42,156,4);                     // top highlight
  A.px(ctx,PAL.gray1,40,88,160,2);                     // body seam
  // rivets along the frame
  for(let i=0;i<9;i++){ A.px(ctx,PAL.gray4,46+i*18,44,2,2); A.px(ctx,PAL.gray4,46+i*18,84,2,2); }

  // nameplate
  A.box(ctx,PAL.navy,PAL.ink,66,44,108,12);
  A.text(ctx,'דפוס ״האות והמופת״',120,46,PAL.cream,7);

  // ink hopper on top with falling drop (animated)
  A.box(ctx,PAL.blueD,PAL.ink,148,28,18,12);
  A.px(ctx,PAL.blue,150,30,14,3);
  A.px(ctx,PAL.gray1,155,40,4,6);                      // spout
  const drop = Math.floor((T*12)%10);
  if(drop<7) A.px(ctx,PAL.blueD,156,46+drop,2,3);      // ink drop falls into machine

  // giant paper feed roll (left side of machine)
  A.disc(ctx,PAL.gray1,62,70,18);
  A.disc(ctx,PAL.paperD,62,70,16);
  A.disc(ctx,PAL.paper,62,70,12);
  A.disc(ctx,PAL.brown2,62,70,4);                      // hub
  A.px(ctx,PAL.brown1,61,66,2,8);

  // paper strip feeding right into the rollers (animated dashes)
  A.px(ctx,PAL.paper,62,58,58,3);
  ctx.fillStyle=PAL.paperD;
  const off = Math.floor(T*16)%8;
  for(let x=62+off; x<118; x+=8) ctx.fillRect(x,59,3,1);

  // roller pair (rotating stripes)
  A.box(ctx,PAL.gray3,PAL.gray1,92,60,68,10);
  A.box(ctx,PAL.gray3,PAL.gray1,92,72,68,10);
  ctx.fillStyle=PAL.gray1;
  for(let x=92+off; x<158; x+=8){ ctx.fillRect(x,62,2,6); ctx.fillRect(x,74,2,6); }
  A.px(ctx,PAL.gray4,92,61,68,1); A.px(ctx,PAL.gray4,92,73,68,1); // shine

  // meshed gears (animated spin!)
  const gear=(cx,cy,r,c,cd,ang)=>{
    A.disc(ctx,c,cx,cy,r);
    A.disc(ctx,cd,cx,cy,r-3);
    for(let k=0;k<6;k++){
      const a=ang+k*Math.PI/3;
      A.px(ctx,c,cx+Math.round(Math.cos(a)*r)-1,cy+Math.round(Math.sin(a)*r)-1,3,3);
      A.px(ctx,cd,cx+Math.round(Math.cos(a)*(r-5)),cy+Math.round(Math.sin(a)*(r-5)),2,2);
    }
    A.disc(ctx,c,cx,cy,2);
  };
  gear(180,66,12,PAL.orangeD,PAL.brown2, T*2);
  gear(180,86,7, PAL.yellowD,PAL.orangeD,-T*3.4);

  // control panel with the 3 famous buttons
  A.box(ctx,PAL.gray1,PAL.ink,76,92,108,34);
  // blinking status lights (animated)
  for(let i=0;i<7;i++){
    const on=(Math.floor(T*3)+i)%3===0;
    A.px(ctx,on?PAL.lime:PAL.greenD,82+i*8,95,3,3);
  }
  // >>> buttons at EXACT contract rects <<<
  A.box(ctx,PAL.green, PAL.greenD, 84,100,16,16); A.px(ctx,PAL.lime,  86,102,6,3);
  A.box(ctx,PAL.yellow,PAL.yellowD,120,100,16,16); A.px(ctx,PAL.cream,122,102,6,3);
  A.box(ctx,PAL.red,   PAL.redD,  156,100,16,16); A.px(ctx,PAL.pink, 158,102,6,3);
  // wobbly gauges between the buttons (animated needles)
  const gauge=(cx,cy,ph2)=>{
    A.disc(ctx,PAL.cream,cx,cy,5); A.disc(ctx,PAL.paperD,cx,cy,4);
    const a=-Math.PI*0.75+Math.sin(T*2+ph2)*0.5+0.6;
    A.px(ctx,PAL.redD,cx+Math.round(Math.cos(a)*3),cy+Math.round(Math.sin(a)*3),1,1);
    A.px(ctx,PAL.redD,cx,cy,1,1);
  };
  gauge(109,108,0); gauge(145,108,2);
  A.text(ctx,'אל תיגע!',130,118,PAL.yellow,5);

  // output slot + freshly printed page sliding out (animated)
  A.px(ctx,PAL.ink,184,126,16,4);
  const slide = Math.floor((T*20)%26);
  A.px(ctx,PAL.paper,186+slide*0.5,127,10,2);
  // tray with printed stack
  A.px(ctx,PAL.brown2,196,130,26,3); A.px(ctx,PAL.brown1,198,133,3,10); A.px(ctx,PAL.brown1,215,133,3,10);
  A.px(ctx,PAL.paper,199,124,20,6); A.px(ctx,PAL.paperD,201,126,16,1);
  A.px(ctx,PAL.ink,202,125,7,1);                        // tiny headline on top page

  /* ---- instructions sign, proudly UPSIDE-DOWN x208-236 y40-80 ---- */
  A.poster(ctx,208,40,28,40,PAL.cream,PAL.brown1);
  A.px(ctx,PAL.gray3,210,42,2,2); A.px(ctx,PAL.gray3,232,42,2,2); // screws (top... or bottom?)
  A.px(ctx,PAL.gray3,210,76,2,2); A.px(ctx,PAL.gray3,232,76,2,2);
  ctx.save();
  ctx.translate(222,60); ctx.rotate(Math.PI);
  A.text(ctx,'הוראות',0,-17,PAL.redD,7);
  A.text(ctx,'הפעלה',0,-8,PAL.ink,6);
  A.text(ctx,'בזהירות',0,1,PAL.ink,6);
  A.text(ctx,'סעיף 1...',0,9,PAL.gray2,5);
  ctx.restore();

  /* ---- pigeon poster gag x246-280 y32-66 ---- */
  A.poster(ctx,246,32,34,34,PAL.cream,PAL.brown1);
  A.text(ctx,'עובד החודש',263,34,PAL.blueD,6);
  // proud pixel pigeon
  A.disc(ctx,PAL.gray3,263,52,5);                       // body
  A.disc(ctx,PAL.gray4,263,50,3);
  A.disc(ctx,PAL.gray3,259,46,3);                       // head
  A.px(ctx,PAL.ink,258,45,1,1);                         // eye
  A.px(ctx,PAL.orange,255,46,2,1);                      // beak
  A.px(ctx,PAL.orange,261,57,1,3); A.px(ctx,PAL.orange,265,57,1,3); // legs
  A.text(ctx,'נחום',263,58,PAL.redD,6);

  /* ---- paper rolls x250-290 y100-146 ---- */
  // standing roll 1
  A.px(ctx,PAL.paper,250,106,16,40); A.px(ctx,PAL.paperD,250,106,3,40);
  A.disc(ctx,PAL.paperD,258,106,8); A.disc(ctx,PAL.paper,258,105,7); A.disc(ctx,PAL.gray2,258,105,2);
  // standing roll 2 (slightly shorter)
  A.px(ctx,PAL.paper,268,112,15,34); A.px(ctx,PAL.paperD,268,112,3,34);
  A.disc(ctx,PAL.paperD,275,112,7); A.disc(ctx,PAL.paper,275,111,6); A.disc(ctx,PAL.gray2,275,111,2);
  // lying roll — spiral face toward us
  A.disc(ctx,PAL.paperD,286,136,10); A.disc(ctx,PAL.paper,286,136,8);
  A.disc(ctx,PAL.paperD,286,136,5); A.disc(ctx,PAL.paper,286,136,3); A.disc(ctx,PAL.gray2,286,136,1);
  A.px(ctx,PAL.gray2,278,145,18,2);                     // shadow

  /* ---- ink barrels LEFT x8-34 y104-146 ---- */
  A.box(ctx,PAL.blueD,PAL.ink,8,108,18,38);
  A.px(ctx,PAL.gray3,8,114,18,2); A.px(ctx,PAL.gray3,8,134,18,2);   // hoops
  A.text(ctx,'דיו',17,120,PAL.cream,7);
  A.px(ctx,PAL.ink,22,144,6,2);                         // ink puddle at its foot
  A.box(ctx,PAL.purpleD,PAL.ink,20,116,15,30);
  A.px(ctx,PAL.gray3,20,122,15,2); A.px(ctx,PAL.gray3,20,138,15,2);
  A.px(ctx,PAL.lav,23,118,4,2);                         // paint smear

  // warning poster above the barrels
  A.poster(ctx,10,50,30,26,PAL.yellow,PAL.brown1);
  A.text(ctx,'זהירות!',25,53,PAL.redD,7);
  A.text(ctx,'דיו טרי',25,63,PAL.ink,6);

  /* ---- door to street x288-316 y72-142 ---- */
  A.door(ctx,290,72,26,70,PAL.brown3,PAL.brown1);
  A.text(ctx,'לרחוב ←',302,58,PAL.cream,6);
  // ink-stained doormat (everyone steps in the ink)
  A.px(ctx,PAL.brown4,288,146,28,7); A.px(ctx,PAL.brown2,288,146,28,1);
  A.px(ctx,PAL.ink,294,148,4,2); A.px(ctx,PAL.ink,304,150,3,2);   // inky footprints

  /* ---- fire extinguisher by the door ---- */
  A.box(ctx,PAL.red,PAL.redD,276,116,8,20);
  A.px(ctx,PAL.gray3,278,112,4,4); A.px(ctx,PAL.gray2,274,114,4,2); // nozzle
  A.px(ctx,PAL.white,278,122,4,6);

  /* ---- tools shelf niche above the extinguisher ---- */
  A.px(ctx,PAL.brown2,268,100,20,3);
  A.px(ctx,PAL.gray3,270,92,4,8);                       // oil can
  A.px(ctx,PAL.gray2,271,90,2,2);
  A.px(ctx,PAL.blue,278,94,6,6); A.px(ctx,PAL.white,279,95,2,2);   // shimon's mug
};
