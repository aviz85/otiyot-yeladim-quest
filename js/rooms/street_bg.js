/* street_bg.js — הרחוב (daytime street outside the magazine building)
   Layout contract (hotspots in street.js use these rects):
   print house door LEFT x14-48 y70-150 (sign ״דפוס ׳האות והמופת׳״)
   tree x60-80 · dog npc at x=90 (engine) · kiosk CENTER x120-200 y70-150
   (striped awning, candy jars, newspaper rack showing ״אותיות וילדים״)
   benny npc at x=150 (engine) · fire hydrant ~x206-214 · bus stop sign x220-240
   building entrance RIGHT x260-310 y60-150 (glass doors + sign ״אותיות וילדים״ + step)
   walkY:160 · sky + animated clouds + sun · anims: clouds, birds, awning flap,
   glass shimmer, tree sway, pigeon-on-wire bob, sun rays
*/
'use strict';
if(typeof BG==='undefined') var BG={};

BG.street = function(ctx,t){
  // ===== sky (morning-noon, warm) =====
  A.bands(ctx,0,0,320,[[PAL.skyD,40],[PAL.sky,60],['#bfe3f2',48]]);

  // sun + blinking rays
  A.disc(ctx,PAL.cream,88,20,13);
  A.disc(ctx,PAL.yellow,88,20,9);
  if(Math.floor(t*2)%2){
    A.px(ctx,PAL.yellow,88,4,1,5); A.px(ctx,PAL.yellow,88,31,1,5);
    A.px(ctx,PAL.yellow,72,20,5,1); A.px(ctx,PAL.yellow,99,20,5,1);
  }

  // drifting clouds (animated)
  const clouds=[[10,16,1],[150,34,0.65],[260,8,0.45]];
  for(const [bx,cy,sp] of clouds){
    const cx=(((bx - t*9*sp)%380)+380)%380-30;
    A.px(ctx,PAL.white,cx,cy,28,7);
    A.px(ctx,PAL.white,cx+7,cy-5,15,6);
    A.px(ctx,PAL.gray4,cx+3,cy+6,22,1);
  }

  // two birds flying (animated)
  for(let b=0;b<2;b++){
    const bx=350-(((t*26+b*160)%420));
    const by=30+b*9+Math.round(Math.sin(t*3+b)*3);
    const f=(Math.floor(t*6)+b)%2?0:-1;
    A.px(ctx,PAL.ink,bx-2,by+f,2,1); A.px(ctx,PAL.ink,bx+1,by+f,2,1);
    A.px(ctx,PAL.ink,bx,by,1,1);
  }

  // distant city skyline
  A.skyline(ctx,144,PAL.blueD);

  // ===== sidewalk =====
  A.px(ctx,PAL.gray3,0,144,320,4);                       // curb line
  A.floorTile(ctx,148,PAL.paperD,PAL.gray4);
  // pebbles + a manhole cover
  A.px(ctx,PAL.gray3,58,167,2,1); A.px(ctx,PAL.gray3,175,173,2,1); A.px(ctx,PAL.gray3,300,169,2,1);
  A.disc(ctx,PAL.gray3,66,172,6); A.disc(ctx,PAL.gray2,66,172,4);
  A.px(ctx,PAL.gray3,62,172,8,1);
  // chalk hopscotch (קלאס) drawn by neighborhood kids
  for(let k=0;k<3;k++){
    const hx=132+k*11;
    A.px(ctx,PAL.white,hx,166,10,1); A.px(ctx,PAL.white,hx,176,10,1);
    A.px(ctx,PAL.white,hx,166,1,11); A.px(ctx,PAL.white,hx+10,166,1,11);
    A.text(ctx,String(k+1),hx+5,168,PAL.white,5);
  }

  // telephone wire sagging across + pigeon sitting on it (bobs)
  for(let wx=56;wx<254;wx+=3){
    const wy=42+Math.round(8*Math.sin(Math.PI*(wx-56)/198));
    A.px(ctx,PAL.gray1,wx,wy,3,1);
  }
  const pgy=42+Math.round(8*Math.sin(Math.PI*(140-56)/198));
  const pgb=Math.floor(t*2)%2?0:-1;
  A.px(ctx,PAL.gray3,137,pgy-5+pgb,5,4);                 // body
  A.px(ctx,PAL.gray2,141,pgy-7+pgb,3,3);                 // head
  A.px(ctx,PAL.orange,144,pgy-6+pgb,1,1);                // beak

  // ===== LEFT: print house ״האות והמופת״ =====
  A.px(ctx,PAL.brown3,6,38,50,112);                      // brick facade
  A.px(ctx,PAL.brown1,6,38,50,4);                        // roofline
  ctx.fillStyle=PAL.brown2;
  for(let by=46;by<148;by+=8) ctx.fillRect(6,by,50,1);   // brick rows
  for(let by=46,k=0;by<148;by+=8,k++) for(let bx=(k%2)*6+8;bx<54;bx+=12) ctx.fillRect(bx,by,1,8);
  A.poster(ctx,10,45,44,19,PAL.cream);                   // sign board
  A.text(ctx,'דפוס',32,46,PAL.redD,7);
  A.text(ctx,'׳האות והמופת׳',32,56,PAL.ink,5);
  // industrial metal door x14-48 y70-150
  A.px(ctx,PAL.gray1,14,70,34,80);
  A.px(ctx,PAL.gray2,17,73,28,74);
  ctx.fillStyle=PAL.gray1;
  for(let ry=82;ry<144;ry+=12) ctx.fillRect(17,ry,28,2); // ribs
  A.px(ctx,PAL.gray3,18,74,1,1); A.px(ctx,PAL.gray3,43,74,1,1);
  A.px(ctx,PAL.gray3,18,144,1,1); A.px(ctx,PAL.gray3,43,144,1,1); // rivets
  A.px(ctx,PAL.ink,22,75,10,6); A.px(ctx,PAL.sky,23,76,8,4);      // little window
  A.px(ctx,PAL.yellow,41,108,3,8);                       // handle
  A.px(ctx,PAL.yellow,17,140,28,3); A.dither(ctx,PAL.yellow,PAL.ink,17,140,28,3); // warning stripe
  A.px(ctx,PAL.paper,50,146,5,3); A.px(ctx,PAL.paperD,51,145,4,2); // stray print sheets

  // ===== tree x60-80 (sways) =====
  const sway=Math.round(Math.sin(t*1.3)*2);
  A.px(ctx,PAL.brown2,67,110,5,50);                      // trunk
  A.px(ctx,PAL.brown1,68,120,1,30);
  A.disc(ctx,PAL.greenD,70+sway,98,12);
  A.disc(ctx,PAL.green,64+sway,90,9);
  A.disc(ctx,PAL.green,77+sway,92,8);
  A.disc(ctx,PAL.lime,70+sway,84,7);
  A.px(ctx,PAL.red,63+sway,92,2,2); A.px(ctx,PAL.red,76+sway,97,2,2); // fruit
  A.px(ctx,PAL.brown3,60,158,20,3);                      // little soil square
  // dropped newspaper the dog is waiting over
  A.px(ctx,PAL.paper,80,166,10,5); A.px(ctx,PAL.paperD,81,168,8,1); A.px(ctx,PAL.paperD,81,170,6,1);

  // street lamp (off — it's daytime)
  A.px(ctx,PAL.gray1,100,74,2,84);
  A.px(ctx,PAL.gray2,97,156,8,4);
  A.px(ctx,PAL.gray1,100,74,9,2);
  A.px(ctx,PAL.gray2,104,70,8,6); A.px(ctx,PAL.cream,106,72,4,3);

  // green trash bin (with yesterday's news inside)
  A.box(ctx,PAL.green,PAL.greenD,108,138,13,20);
  A.px(ctx,PAL.greenD,106,136,17,4);
  A.px(ctx,PAL.paper,111,133,5,4);

  // ===== CENTER: benny's kiosk x120-200 y70-150 =====
  A.px(ctx,PAL.brown2,122,88,4,62); A.px(ctx,PAL.brown2,194,88,4,62); // posts
  A.px(ctx,PAL.wood,124,92,72,58);                       // body
  A.px(ctx,PAL.brown2,124,92,72,2);
  // striped awning + flapping bottom edge (animated)
  for(let ax=116,i=0;ax<204;ax+=8,i++) A.px(ctx,i%2?PAL.white:PAL.red,ax,70,8,14);
  A.px(ctx,PAL.redD,116,70,88,2);
  for(let ax=116,i=0;ax<204;ax+=8,i++){
    const fl=(i+Math.floor(t*3))%2?2:0;
    A.px(ctx,i%2?PAL.white:PAL.red,ax,84,8,3+fl);
    A.px(ctx,PAL.gray3,ax,86+fl,8,1);
  }
  // sign board
  A.poster(ctx,134,93,52,10,PAL.cream);
  A.text(ctx,'הקיוסק של בני',160,94,PAL.orangeD,6);
  // dark serving window + goods inside
  A.px(ctx,PAL.ink,132,106,56,20);
  A.px(ctx,PAL.brown1,132,116,56,1);
  A.px(ctx,PAL.red,136,110,7,6); A.px(ctx,PAL.blue,145,110,7,6);
  A.px(ctx,PAL.lime,154,110,7,6); A.px(ctx,PAL.purple,163,110,7,6);
  A.px(ctx,PAL.orange,172,110,7,6);                      // snack boxes
  // counter + candy jars
  A.px(ctx,PAL.brown4,128,126,64,6); A.px(ctx,PAL.brown2,128,131,64,1);
  for(let j=0;j<3;j++){
    const jx=138+j*13;
    A.box(ctx,PAL.gray4,PAL.gray3,jx,116,9,10);
    A.px(ctx,PAL.brown2,jx+1,114,7,2);                   // lid
    const cc=[PAL.red,PAL.lime,PAL.yellow][j];
    A.disc(ctx,cc,jx+3,120,1); A.disc(ctx,cc,jx+6,122,1); A.disc(ctx,cc,jx+4,123,1);
  }
  // seeds sack (what nachum dreams about)
  A.px(ctx,PAL.brown4,176,118,10,8); A.px(ctx,PAL.brown2,177,116,8,2);
  A.px(ctx,PAL.ink,179,120,1,1); A.px(ctx,PAL.ink,182,122,1,1); A.px(ctx,PAL.ink,180,124,1,1);
  // front panel candy-dot decoration
  A.px(ctx,PAL.brown3,124,134,72,16);
  A.px(ctx,PAL.red,130,140,3,3); A.px(ctx,PAL.yellow,140,140,3,3);
  A.px(ctx,PAL.lime,150,140,3,3); A.px(ctx,PAL.cyan,160,140,3,3); A.px(ctx,PAL.pink,170,140,3,3);
  // newspaper rack showing THE magazine
  A.box(ctx,PAL.gray2,PAL.gray1,182,122,20,28);
  A.px(ctx,PAL.paper,184,125,16,7); A.px(ctx,PAL.paperD,185,129,13,1);
  A.px(ctx,PAL.paper,184,134,16,7); A.px(ctx,PAL.paperD,185,138,13,1);
  A.px(ctx,PAL.white,184,143,16,6);
  A.text(ctx,'אותיות',192,124,PAL.redD,5);
  A.text(ctx,'וילדים',192,133,PAL.blueD,5);

  // ===== fire hydrant =====
  A.px(ctx,PAL.gray3,205,158,12,3);                      // base
  A.px(ctx,PAL.red,207,144,8,15);
  A.disc(ctx,PAL.redD,210,143,4);
  A.px(ctx,PAL.redD,204,149,3,4); A.px(ctx,PAL.redD,215,149,3,4); // nozzles
  A.px(ctx,PAL.yellow,210,141,2,2);                      // top valve

  // ===== bus stop x220-240 (timetable from 1994) =====
  A.px(ctx,PAL.gray2,228,104,3,56);                      // pole
  A.box(ctx,PAL.yellow,PAL.ink,220,88,20,18);
  A.px(ctx,PAL.ink,224,92,12,7);                         // bus icon
  A.px(ctx,PAL.white,226,94,3,2); A.px(ctx,PAL.white,231,94,3,2);
  A.disc(ctx,PAL.ink,226,100,1); A.disc(ctx,PAL.ink,234,100,1);
  A.px(ctx,PAL.paper,224,110,12,15);                     // yellowed timetable
  A.px(ctx,PAL.paperD,226,113,8,1); A.px(ctx,PAL.paperD,226,116,8,1);
  A.px(ctx,PAL.paperD,226,119,8,1); A.px(ctx,PAL.paperD,226,122,5,1);

  // ===== RIGHT: magazine building entrance x260-310 y60-150 =====
  A.px(ctx,PAL.cream,252,32,68,118);                     // stone facade
  ctx.fillStyle=PAL.paperD;
  for(let by=40;by<148;by+=10) ctx.fillRect(252,by,68,1);
  for(let by=40,k=0;by<148;by+=10,k++) for(let bx=(k%2)*8+256;bx<318;bx+=16) ctx.fillRect(bx,by,1,10);
  A.px(ctx,PAL.brown1,252,32,68,3);                      // cornice
  // big sign
  A.box(ctx,PAL.blue,PAL.blueD,256,38,60,18);
  A.text(ctx,'אותיות וילדים',286,42,PAL.white,8);
  A.px(ctx,PAL.yellow,259,41,3,3); A.px(ctx,PAL.yellow,310,41,3,3); // sign lights
  // glass double doors
  A.px(ctx,PAL.brown1,258,60,56,90);                     // frame
  A.px(ctx,PAL.sky,262,64,22,82); A.px(ctx,PAL.sky,288,64,22,82);
  A.px(ctx,PAL.brown1,284,60,4,90);                      // center post
  // shimmering reflections (animated)
  const sh=Math.floor(t*5)%14;
  for(let d=0;d<10;d++){
    A.px(ctx,PAL.white,264+((sh+d)%18),68+d*7,2,4);
    A.px(ctx,PAL.white,291+((sh+d+6)%17),70+d*7,2,4);
  }
  A.px(ctx,PAL.skyD,262,120,22,26); A.px(ctx,PAL.skyD,288,120,22,26); // lower tint
  A.px(ctx,PAL.yellow,280,100,3,10); A.px(ctx,PAL.yellow,289,100,3,10); // handles
  A.text(ctx,'דחוף',273,128,PAL.white,5);                // push sticker gag
  // entrance step
  A.px(ctx,PAL.gray4,256,148,58,8); A.px(ctx,PAL.gray3,256,148,58,2);
  // welcome mat
  A.px(ctx,PAL.redD,266,157,38,6); A.dither(ctx,PAL.redD,PAL.red,268,158,34,4);

  // potted plant by the entrance
  A.plant(ctx,248,158);
};
