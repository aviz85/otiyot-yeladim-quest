/* ============================================================
   engine.js — point & click adventure engine
   API for rooms (full docs in DESIGN.md):
     registerRoom(def), G.say, G.choice, G.walk, G.go, G.add,
     G.del, G.has, G.f, G.sfx, G.win
   ============================================================ */
'use strict';

const W=320, H=180;
const ROOMS = {};
function registerRoom(def){ ROOMS[def.id]=def; }

const G = {
  f:{},            // flags
  inv:[],          // item ids
  room:null,       // current room def
  busy:false,      // cutscene/dialogue lock
  lookMode:false,
  talking:null,
  selected:null,   // selected inventory item id
  player:{x:160, tx:160, y:152, flip:false, walking:false},
  started:false,
};

let cv, ctx, ui, elLabel, elDlg, elDlgName, elDlgText, elChoices, elInv;
let _advance=null, _keys={};

/* ---------------- init ---------------- */
function engineInit(){
  cv = document.getElementById('screen');
  ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  ui = document.getElementById('ui');
  elLabel = document.getElementById('hoverlabel');
  elDlg = document.getElementById('dialog');
  elDlgName = document.getElementById('dlg-name');
  elDlgText = document.getElementById('dlg-text');
  elChoices = document.getElementById('choices');
  elInv = document.getElementById('inv-items');

  const onResize=()=>{
    const wrap=document.getElementById('stage');
    const scale = wrap.clientWidth / W;
    document.documentElement.style.setProperty('--s', scale);
  };
  window.addEventListener('resize', onResize); setTimeout(onResize,50); onResize();

  ui.addEventListener('mousemove', ev=>{ const p=toGame(ev); hover(p.x,p.y,ev); });
  ui.addEventListener('mousedown', ev=>{
    ev.preventDefault();
    const p=toGame(ev);
    if(ev.button===2){ handleClick(p.x,p.y,true); return; }
    handleClick(p.x,p.y,G.lookMode);
  });
  ui.addEventListener('contextmenu', ev=>ev.preventDefault());

  window.addEventListener('keydown', ev=>{
    if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){ _keys[ev.key]=true; ev.preventDefault(); }
    if(ev.key===' '||ev.key==='Enter'){
      if(_advance){ doAdvance(); ev.preventDefault(); return; }
      if(ev.key==='Enter' && !G.busy) interactNearest();
    }
    if(/^[1-9]$/.test(ev.key)){
      const btns=elChoices.querySelectorAll('button');
      const i=parseInt(ev.key)-1; if(btns[i]) btns[i].click();
    }
    if(ev.key==='Escape'){ G.selected=null; renderInv(); }
  });
  window.addEventListener('keyup', ev=>{ delete _keys[ev.key]; });

  requestAnimationFrame(loop);
}

function toGame(ev){
  const r=cv.getBoundingClientRect();
  return { x:(ev.clientX-r.left)/r.width*W, y:(ev.clientY-r.top)/r.height*H };
}

/* ---------------- game loop ---------------- */
let _lastT=0;
function loop(ms){
  const t=ms/1000, dt=Math.min(0.05,t-_lastT); _lastT=t;
  const p=G.player;

  if(!G.busy && G.started){
    if(_keys.ArrowLeft) p.tx=p.x-3;
    if(_keys.ArrowRight) p.tx=p.x+3;
  }
  if(G.room){
    p.tx=Math.max(G.room.minX,Math.min(G.room.maxX,p.tx));
    const dx=p.tx-p.x, sp=70*dt;
    if(Math.abs(dx)>1.5){ p.x+=Math.sign(dx)*Math.min(sp,Math.abs(dx)); p.flip=dx>0; p.walking=true; }
    else { p.walking=false; if(_walkRes && Math.abs(dx)<=1.5){ const r=_walkRes; _walkRes=null; r(); } }
    p.y=G.room.walkY;

    // draw
    ctx.clearRect(0,0,W,H);
    try{ G.room.bg(ctx,t); }catch(e){ A.px(ctx,'#333',0,0,W,H); }
    const npcs = G.room.npcs? G.room.npcs():[];
    for(const n of npcs){
      try{ drawSprite(ctx,n.s,n.x,n.y,t,{flip:n.flip,talk:G.talking===n.s,...n.o}); }catch(e){}
    }
    drawSprite(ctx,'noam',p.x,p.y,t,{walk:p.walking,flip:p.flip,talk:G.talking==='noam'});
    if(G.room.front){ try{ G.room.front(ctx,t); }catch(e){} }
  }
  requestAnimationFrame(loop);
}

/* ---------------- walking ---------------- */
let _walkRes=null;
G.walk = x=>new Promise(res=>{
  x=Math.max(G.room.minX,Math.min(G.room.maxX,x));
  G.player.tx=x;
  if(Math.abs(G.player.x-x)<=2){ res(); return; }
  _walkRes=res;
});

/* ---------------- rooms ---------------- */
G.go = async function(id, spawnX){
  const from=G.room?G.room.id:null;
  const def=ROOMS[id]; if(!def){ console.warn('no room',id); return; }
  G.room=def;
  G.player.x = spawnX!=null?spawnX:160;
  G.player.tx = G.player.x;
  G.player.y = def.walkY;
  sfx('door');
  if(def.music) MUSIC.play(def.music);
  document.getElementById('roomname').textContent = def.name;
  autosave();
  if(def.enter){ G.busy=true; try{ await def.enter(from); }catch(e){console.error(e);} G.busy=false; }
};

/* ---------------- hotspots ---------------- */
function hotspotsAt(x,y){
  if(!G.room||!G.room.hotspots) return null;
  const hs=G.room.hotspots.filter(h=>!h.visible||h.visible());
  for(let i=hs.length-1;i>=0;i--){
    const h=hs[i];
    if(x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h) return h;
  }
  return null;
}

function hover(x,y,ev){
  const h=(!G.busy&&G.started)?hotspotsAt(x,y):null;
  if(h){
    elLabel.textContent=(G.selected? ITEMS[G.selected].name+' ← ':'')+h.name;
    elLabel.style.display='block';
    const r=cv.getBoundingClientRect(), wrap=document.getElementById('stage').getBoundingClientRect();
    elLabel.style.left=(ev.clientX-wrap.left)+'px';
    elLabel.style.top=(ev.clientY-wrap.top-28)+'px';
    ui.style.cursor='pointer';
  } else {
    elLabel.style.display='none';
    ui.style.cursor=G.started?'crosshair':'default';
  }
}

async function handleClick(x,y,isLook){
  if(_advance){ doAdvance(); return; }
  if(G.busy||!G.started) return;
  const h=hotspotsAt(x,y);
  if(!h){ G.player.tx=x; return; }
  G.busy=true;
  try{
    await G.walk(h.wx!=null?h.wx:Math.max(G.room.minX,Math.min(G.room.maxX,h.x+h.w/2)));
    const sel=G.selected;
    if(sel && !isLook){
      G.selected=null; renderInv();
      if(h.items && h.items[sel]) await h.items[sel]();
      else if(h.anyItem) await h.anyItem(sel);
      else { sfx('no'); await G.say('noam', randomNo()); }
    } else if(isLook || !h.use){
      await runAction(h.look || 'אין פה משהו מיוחד.');
    } else {
      await runAction(h.use);
    }
  }catch(e){ console.error(e); }
  G.busy=false;
  if(G.lookMode){ G.lookMode=false; updateLookBtn(); }
}

async function runAction(a){
  if(typeof a==='string') await G.say('noam',a);
  else if(typeof a==='function') await a();
}

function randomNo(){
  const lines=['המממ... זה לא עובד.','לא נראה לי שזה יעזור פה.','רעיון יצירתי! אבל לא.','זה לא מסתדר. ננסה משהו אחר?'];
  return lines[Math.floor(Math.random()*lines.length)];
}

function interactNearest(){
  if(!G.room||!G.room.hotspots) return;
  const p=G.player;
  let best=null,bd=1e9;
  for(const h of G.room.hotspots){
    if(h.visible&&!h.visible()) continue;
    const cx=(h.wx!=null?h.wx:h.x+h.w/2);
    const d=Math.abs(cx-p.x);
    if(d<40&&d<bd){bd=d;best=h;}
  }
  if(best) handleClick(best.x+best.w/2, best.y+best.h/2, false);
}

/* ---------------- dialogue ---------------- */
function doAdvance(){ if(_advance){const a=_advance;_advance=null;a();} }

G.say = (who,text)=>new Promise(res=>{
  const c=CHARS[who]||{name:who,color:'#fff'};
  elDlgName.textContent=c.name;
  elDlgName.style.color=c.color;
  elDlgText.textContent=text;
  elDlg.style.display='block';
  G.talking=who==='noam'?'noam':who;
  sfx('talk');
  _advance=()=>{
    elDlg.style.display='none';
    G.talking=null;
    res();
  };
});

G.choice = opts=>new Promise(res=>{
  elChoices.innerHTML='';
  opts.forEach((o,i)=>{
    const b=document.createElement('button');
    b.textContent=o;
    b.onclick=()=>{ elChoices.style.display='none'; sfx('talk'); res(i); };
    elChoices.appendChild(b);
  });
  elChoices.style.display='flex';
});

/* ---------------- inventory ---------------- */
G.has = id=>G.inv.includes(id);
G.add = id=>{
  if(G.has(id)) return;
  G.inv.push(id); sfx('pickup'); renderInv();
  toast('קיבלת: '+(ITEMS[id]?ITEMS[id].name:id));
};
G.del = id=>{ G.inv=G.inv.filter(i=>i!==id); if(G.selected===id)G.selected=null; renderInv(); };

function renderInv(){
  elInv.innerHTML='';
  for(const id of G.inv){
    const it=ITEMS[id]; if(!it) continue;
    const d=document.createElement('div');
    d.className='inv-item'+(G.selected===id?' sel':'');
    d.title=it.name;
    const c=document.createElement('canvas'); c.width=16; c.height=16;
    const ic=c.getContext('2d'); ic.imageSmoothingEnabled=false;
    try{ it.icon(ic); }catch(e){}
    d.appendChild(c);
    const s=document.createElement('span'); s.textContent=it.name; d.appendChild(s);
    d.onclick=()=>{ G.selected=(G.selected===id?null:id); renderInv(); };
    elInv.appendChild(d);
  }
}

function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ---------------- save / load ---------------- */
const SAVE_PREFIX='oy_quest_';
function saveState(slot){
  const data={f:G.f, inv:G.inv, room:G.room?G.room.id:'office', px:Math.round(G.player.x),
              when:new Date().toLocaleString('he-IL'), ver:1};
  localStorage.setItem(SAVE_PREFIX+slot, JSON.stringify(data));
}
function loadState(slot){
  const raw=localStorage.getItem(SAVE_PREFIX+slot); if(!raw) return false;
  try{
    const d=JSON.parse(raw);
    G.f=d.f||{}; G.inv=d.inv||[]; G.selected=null;
    renderInv();
    G.started=true;
    G.go(d.room||'office', d.px);
    return true;
  }catch(e){ return false; }
}
function autosave(){ if(G.started) saveState('auto'); }
function slotInfo(slot){
  const raw=localStorage.getItem(SAVE_PREFIX+slot); if(!raw) return null;
  try{ return JSON.parse(raw).when||'שמירה'; }catch(e){ return null; }
}

/* ---------------- look mode button ---------------- */
function updateLookBtn(){
  const b=document.getElementById('btn-look');
  if(b) b.classList.toggle('active',G.lookMode);
}
