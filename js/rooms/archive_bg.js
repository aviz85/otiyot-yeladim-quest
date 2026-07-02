/* archive_bg.js — הארכיון (מרתף) — TWO STATES by G.f.archive_lit
   Layout contract (hotspots in archive.js use these rects):
   stairs UP to lobby x8-40 y90-146 (light spills from above) ·
   shelves x100-300 y40-146 (numbered binders scattered: 3,7,14,18,31,40…) ·
   binder 22 (BLUE, the answer!) x196-216 y88-110 ·
   dusty box x228-262 y150-172 · old dead bulb hangs at x=160 ·
   card catalog x46-84 y96-140 · framed first issue x52-78 y44-76
   DARK state (!archive_lit): near-black, faint shapes, glowing eyes gag,
   warm light only from the stairs opening x8-40.
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.archive = function(ctx,t){
  const lit = (typeof G!=='undefined' && G.f && G.f.archive_lit);

  /* ---------- DARK STATE: חושך מצרים ---------- */
  if(!lit){
    A.px(ctx,PAL.black,0,0,320,180);

    // faint silhouettes — you can *almost* see the shelves
    A.dither(ctx,PAL.black,PAL.ink,100,40,200,106);          // shelf mass
    A.px(ctx,PAL.ink,100,40,200,2); A.px(ctx,PAL.ink,100,144,200,2);
    A.px(ctx,PAL.ink,102,88,196,1); A.px(ctx,PAL.ink,102,116,196,1);
    A.dither(ctx,PAL.black,PAL.ink,228,150,34,20);           // box hump
    A.dither(ctx,PAL.black,PAL.ink,46,96,38,44);             // catalog hump
    A.dither(ctx,PAL.black,PAL.gray1,0,4,320,3);             // ceiling pipe hint

    // stairs opening x8-40 y90-146 — warm light from the lobby above
    A.px(ctx,PAL.brown1,6,88,36,60);                          // frame
    A.bands(ctx,8,90,32,[[PAL.cream,10],[PAL.brown4,14],[PAL.brown3,16],[PAL.brown2,16]]);
    A.px(ctx,PAL.brown1,10,104,28,2); A.px(ctx,PAL.brown1,10,118,28,2);
    A.px(ctx,PAL.brown1,10,132,28,2);                         // step edges
    // light spilling onto the floor (fading wedge)
    A.dither(ctx,PAL.brown3,PAL.black,40,146,34,18);
    A.dither(ctx,PAL.brown2,PAL.black,74,150,26,14);
    // the only readable sign — it's in the light
    A.text(ctx,'ללובי ⬆',24,76,PAL.cream,7);

    // dust motes drifting in the light beam (animation 1)
    const dx=Math.floor((t*7)%26);
    A.px(ctx,PAL.cream,12+dx,98+((dx*3)%34),1,1);
    A.px(ctx,PAL.paperD,34-((dx+9)%22),108+((dx*5)%28),1,1);
    A.px(ctx,PAL.cream,16+((dx+13)%20),126+((dx*2)%16),1,1);

    // glowing eyes gag — something lives between the binders (animation 2)
    if(Math.floor(t*0.9)%5!==0){                              // it blinks!
      A.px(ctx,PAL.lime,216,72,2,2); A.px(ctx,PAL.lime,223,72,2,2);
      A.px(ctx,PAL.greenD,217,73,1,1); A.px(ctx,PAL.greenD,224,73,1,1);
    }
    if(Math.floor(t*1.7)%7!==0){                              // tiny mouse eyes
      A.px(ctx,PAL.yellow,148,136,1,1); A.px(ctx,PAL.yellow,151,136,1,1);
    }
    return;
  }

  /* ---------- LIT STATE: מרתף חמים ומאובק ---------- */
  // stone basement wall + brick lines
  A.wall(ctx,'#6b5646',0,140,PAL.brown1);
  A.px(ctx,'#7a6350',0,0,320,10);                             // ceiling strip
  ctx.fillStyle=PAL.brown2;
  for(let j=18;j<132;j+=14) ctx.fillRect(0,j,320,1);          // brick rows
  for(let j=18,k=0;j<132;j+=14,k++)
    for(let i=(k%2)*16+8;i<320;i+=32) ctx.fillRect(i,j,1,14); // brick joints
  A.floorTile(ctx,140,'#8a7a66','#75665a');                   // concrete floor

  // ceiling pipes + valve (it's a basement, pipes are the wallpaper)
  A.px(ctx,PAL.gray2,0,4,320,4); A.px(ctx,PAL.gray3,0,4,320,1);
  A.px(ctx,PAL.gray1,58,3,4,6); A.px(ctx,PAL.gray1,206,3,4,6); // joints
  A.disc(ctx,PAL.redD,132,10,3); A.px(ctx,PAL.gray1,131,8,2,3); // valve wheel

  // the famous dead bulb (הנורה השרופה) + pull string
  A.lamp(ctx,160,26,false);
  A.px(ctx,PAL.gray3,166,22,1,7);
  A.text(ctx,'ז״ל',172,18,PAL.gray4,6,'left');

  // stairs UP to lobby x8-40 y90-146, glow from above
  A.px(ctx,PAL.brown1,6,88,36,60);
  A.bands(ctx,8,90,32,[[PAL.cream,8],[PAL.brown4,12],[PAL.brown3,18],[PAL.brown2,18]]);
  A.px(ctx,PAL.brown4,10,102,28,4); A.px(ctx,PAL.brown3,10,116,28,4);
  A.px(ctx,PAL.brown3,10,130,28,4); A.px(ctx,PAL.brown2,10,142,28,4); // steps
  A.px(ctx,PAL.brown1,10,106,28,1); A.px(ctx,PAL.brown1,10,120,28,1);
  A.px(ctx,PAL.brown1,10,134,28,1);
  A.text(ctx,'ללובי ⬆',24,76,PAL.cream,7);

  // framed first issue, yellowed with pride
  A.poster(ctx,52,44,26,32,PAL.paperD);
  A.text(ctx,'גיליון 1',65,48,PAL.brown1,6);
  A.px(ctx,PAL.gray3,56,58,18,1); A.px(ctx,PAL.gray3,56,62,18,1);
  A.px(ctx,PAL.gray3,56,66,14,1);                             // ancient headlines
  A.px(ctx,PAL.brown4,54,46,4,3);                             // coffee stain (duck-shaped, per Hana)

  // card catalog of Hana x46-84 y96-140
  A.box(ctx,PAL.brown3,PAL.brown1,46,96,38,44);
  for(let r=0;r<3;r++) for(let c=0;c<2;c++){
    A.box(ctx,PAL.brown4,PAL.brown2,49+c*17,100+r*13,15,11);
    A.px(ctx,PAL.yellowD,54+c*17,104+r*13,5,2);               // brass handles
  }
  A.text(ctx,'כרטסת',65,86,PAL.cream,6);
  // Hana's tea, still warm (animation 1 — steam)
  A.px(ctx,PAL.teal,74,90,7,6); A.px(ctx,PAL.teal,81,92,2,2);
  if(Math.floor(t*2)%2) A.px(ctx,PAL.gray4,76,85,1,3); else A.px(ctx,PAL.gray4,78,84,1,3);

  // THE SHELVES x100-300 y40-146 — a wall of binders
  A.box(ctx,PAL.brown2,PAL.brown1,100,40,200,106);
  A.text(ctx,'הארכיון — כל גיליון הוא אוצר',200,29,PAL.cream,7);
  const cols=[PAL.red,PAL.orange,PAL.teal,PAL.green,PAL.purple,PAL.brown4,PAL.redD];
  const nums=['3','7','14','18','31','40','9','12','26','36','8','19','27','2','11','33'];
  let ni=0;
  const rows=[[44,64],[68,86],[90,110],[114,128],[132,144]];
  for(let r=0;r<rows.length;r++){
    const bot=rows[r][1];
    A.px(ctx,PAL.brown1,102,bot,196,3);                       // plank
    let bx=104, s=r*13+5;
    while(bx<292){
      if(r===2 && bx>184 && bx<218){ bx=218; continue; }      // slot for binder 22
      s=(s*73+19)%97;
      const bw=8+(s%5), bh=13+(s%5);
      A.px(ctx,cols[s%cols.length],bx,bot-bh,bw,bh);
      A.px(ctx,PAL.ink,bx,bot-bh,bw,1);                       // spine top
      if(s%3===0 && bw>=10){                                  // numbered label
        A.px(ctx,PAL.cream,bx+1,bot-bh+3,bw-2,8);
        A.text(ctx,nums[ni%nums.length],bx+(bw>>1),bot-bh+3,PAL.ink,6);
        ni++;
      }
      bx+=bw+1;
    }
  }
  // BINDER 22 — the blue one, x196-216 y88-110, slightly taller, slightly proud
  A.px(ctx,PAL.blue,196,88,20,22);
  A.px(ctx,PAL.blueD,196,88,20,2); A.px(ctx,PAL.blueD,196,88,2,22);
  A.px(ctx,PAL.cyan,213,90,2,18);                             // shine
  A.px(ctx,PAL.cream,199,92,14,10);
  A.text(ctx,'22',206,92,PAL.blueD,8);

  // cobweb corner + bobbing spider (animation 2 — cute, not scary)
  A.px(ctx,PAL.gray3,306,10,14,1); A.px(ctx,PAL.gray3,312,10,1,10);
  A.px(ctx,PAL.gray3,308,14,10,1); A.px(ctx,PAL.gray3,316,10,4,6);
  const sl=16+Math.floor(Math.sin(t*2)*4);
  A.px(ctx,PAL.gray3,290,8,1,sl);
  A.disc(ctx,PAL.ink,290,9+sl,2);
  A.px(ctx,PAL.white,289,8+sl,1,1); A.px(ctx,PAL.white,291,8+sl,1,1); // friendly eyes

  // dust motes drifting in the flashlight glow (animation 3)
  const dd=Math.floor((t*6)%40);
  A.px(ctx,PAL.gray4,120+dd,60+((dd*3)%60),1,1);
  A.px(ctx,PAL.cream,250-((dd+7)%36),52+((dd*5)%70),1,1);
  A.px(ctx,PAL.gray4,180+((dd+21)%30),90+((dd*2)%40),1,1);

  // dusty box on the floor x228-262 y150-172
  A.box(ctx,PAL.brown4,PAL.brown2,228,150,34,22);
  A.px(ctx,PAL.brown2,228,158,34,1);                          // flap line
  A.dither(ctx,PAL.brown4,PAL.gray4,230,151,30,3);            // dust layer
  A.text(ctx,'זהירות: נוסטלגיה',245,158,PAL.brown1,5);

  // old newspaper stack, leaning like it had a long week
  A.px(ctx,PAL.paperD,270,164,26,3); A.px(ctx,PAL.paper,272,161,26,3);
  A.px(ctx,PAL.paperD,271,158,25,3); A.px(ctx,PAL.paper,273,155,24,3);
  A.px(ctx,PAL.gray3,276,156,14,1);                           // headline smudge

  // Hana's worn little rug (she stands here, x=70)
  A.box(ctx,PAL.teal,PAL.greenD,52,152,40,12);
  A.dither(ctx,PAL.teal,PAL.greenD,56,155,32,6);

  // mouse hole in the baseboard + one optimistic crumb
  A.disc(ctx,PAL.black,95,139,3); A.px(ctx,PAL.black,92,139,7,2);
  A.px(ctx,PAL.brown4,100,141,2,1);

  // floor cracks — the basement has stories
  A.px(ctx,'#75665a',150,168,18,1); A.px(ctx,'#75665a',166,166,1,3);
  A.px(ctx,'#75665a',40,174,12,1);
};
