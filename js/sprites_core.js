/* ============================================================
   sprites_core.js — sprite framework + player sprite (exemplar)
   Every sprite: SPR.<id> = function(ctx, t, o){ ... }
   - Draw with FEET at (0,0), horizontally centered on x=0.
   - Character height ~34-42 px. Face LEFT by default (RTL world).
   - t = time in seconds (for idle bob / talk animation).
   - o = {walk:bool, talk:bool, frame:int}
   - Use PAL colors from art.js and A.px/A.disc helpers.
   Engine calls drawSprite(id,x,y,t,o) which translates & flips.
   ============================================================ */
'use strict';

const SPR = {};

function drawSprite(ctx,id,x,y,t,o={}){
  const fn = SPR[id]; if(!fn) return;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if(o.flip) ctx.scale(-1,1);
  fn(ctx,t,o);
  ctx.restore();
}

/* ---------- helper bits reusable by all character sprites ---------- */
const SB = {
  // simple legs: c=pants color. walk anim if o.walk
  legs(ctx,t,o,c,skin=PAL.skin){
    if(o.walk){
      const f = Math.floor(t*8)%2;
      A.px(ctx,c,-4,-10,3,10-(f?2:0));
      A.px(ctx,c, 1,-10,3,10-(f?0:2));
      A.px(ctx,PAL.brown1,-5,-2+(f?-2:0),4,2);
      A.px(ctx,PAL.brown1, 1,-2+(f?0:-2),4,2);
    } else {
      A.px(ctx,c,-4,-10,3,10); A.px(ctx,c,1,-10,3,10);
      A.px(ctx,PAL.brown1,-5,-2,4,2); A.px(ctx,PAL.brown1,1,-2,4,2);
    }
  },
  // mouth for talk animation at (mx,my)
  mouth(ctx,t,o,mx,my,c=PAL.redD){
    if(o.talk && Math.floor(t*10)%2) A.px(ctx,c,mx,my,2,2);
    else A.px(ctx,c,mx,my,2,1);
  },
  bob(t,o){ return o.walk?0:Math.floor(t*2)%2; } // idle 1px bob
};

/* ---------- נעם — the player, a kid ~10yo with a kippah ---------- */
SPR.noam = function(ctx,t,o){
  const b = SB.bob(t,o);
  SB.legs(ctx,t,o,PAL.blueD);
  // torso: green t-shirt
  A.px(ctx,PAL.green,-5,-22+b,10,12);
  A.px(ctx,PAL.greenD,-5,-22+b,10,2);
  // arms
  const sw = o.walk? Math.floor(t*8)%2 : 0;
  A.px(ctx,PAL.green,-7,-21+b,2,8+(sw?2:0));
  A.px(ctx,PAL.green, 5,-21+b,2,8+(sw?0:2));
  A.px(ctx,PAL.skin,-7,-13+b+(sw?2:0),2,3);
  A.px(ctx,PAL.skin, 5,-13+b+(sw?0:2),2,3);
  // head
  A.px(ctx,PAL.skin,-4,-32+b,8,10);
  // hair
  A.px(ctx,PAL.brown1,-4,-33+b,8,3);
  A.px(ctx,PAL.brown1,3,-31+b,1,4);
  // kippah
  A.px(ctx,PAL.blue,-2,-34+b,5,2);
  // eyes (facing left)
  A.px(ctx,PAL.ink,-3,-29+b,1,2);
  A.px(ctx,PAL.ink, 0,-29+b,1,2);
  // mouth
  SB.mouth(ctx,t,o,-2,-25+b);
};
