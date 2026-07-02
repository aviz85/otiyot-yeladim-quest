#!/usr/bin/env node
/* smoke.js — headless full-playthrough test.
   Loads all game scripts with DOM/audio stubs, then plays the whole
   puzzle chain via room hotspot handlers. Exits 1 on any failure. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.join(__dirname, '..');

/* ---------- DOM & browser stubs ---------- */
function el(){
  const e = {
    style:{}, dataset:{}, classList:{add(){},remove(){},toggle(){}},
    children:[], textContent:'', innerHTML:'', title:'', width:0, height:0, disabled:false,
    appendChild(c){ this.children.push(c); return c; },
    addEventListener(){}, removeEventListener(){},
    querySelectorAll(){ return []; }, querySelector(){ return el(); },
    getBoundingClientRect(){ return {left:0,top:0,width:320,height:180}; },
    getContext(){ return ctxStub(); },
    click(){ if(this.onclick) this.onclick(); },
  };
  return e;
}
function ctxStub(){
  return new Proxy({}, { get:(t,k)=> (k==='canvas'? el() : (...a)=>0), set:()=>true });
}
const elements = {};
const documentStub = {
  getElementById:id=>{ if(!elements[id]) elements[id]=el(); return elements[id]; },
  createElement:()=>el(),
  querySelectorAll:()=>[],
  addEventListener(){},
  documentElement:{ style:{ setProperty(){} } },
};
const store = {};
const sandbox = {
  console, Math, JSON, Date, Promise, Array, Object, String, Number, parseInt, parseFloat, isNaN,
  setTimeout, clearTimeout, setInterval, clearInterval,
  document: documentStub,
  localStorage:{ getItem:k=>store[k]??null, setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];}, clear(){for(const k in store)delete store[k];} },
  requestAnimationFrame(){ return 0; },
  navigator:{}, performance:{ now:()=>0 },
  addEventListener(){}, removeEventListener(){},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

/* ---------- load scripts in index.html order ---------- */
const html = fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
for(const s of srcs){
  const code = fs.readFileSync(path.join(ROOT,s),'utf8');
  try{ vm.runInContext(code, sandbox, {filename:s}); }
  catch(e){ console.error('LOAD FAIL', s, e.message); process.exit(1); }
}
console.log('loaded', srcs.length, 'scripts');

/* ---------- driver ---------- */
const driver = `
(async()=>{
  const LOG=[], FAIL=[];
  engineInit();
  MUSIC.on=false; MUSIC.play=()=>{}; MUSIC.ensure=()=>({});
  G.say=async(w,t)=>{ LOG.push(w+': '+t); };
  G.choice=async(opts)=>{
    const prefs=[/עמוד א/, /עמוד ב/, /עמוד ג/, /22/];
    for(const p of prefs){ const i=opts.findIndex(o=>p.test(o)); if(i>=0) return i; }
    return opts.length-1;
  };
  G.walk=async x=>{ G.player.x=x; G.player.tx=x; };
  G.started=true;

  const useH=async(re,item)=>{
    const h=(G.room.hotspots||[]).find(h=>(!h.visible||h.visible())&&re.test(h.name));
    if(!h){ FAIL.push('missing hotspot '+re+' in '+G.room.id); return; }
    try{
      if(item){
        if(h.items&&h.items[item]) await h.items[item]();
        else if(h.anyItem) await h.anyItem(item);
        else FAIL.push('no '+item+' handler on '+h.name+' in '+G.room.id);
      } else {
        const a=h.use||h.look;
        if(typeof a==='function'){ const r=await a(); if(typeof r==='string') LOG.push('look:'+r); }
      }
    }catch(e){ FAIL.push(G.room.id+'/'+h.name+': '+e.message); }
  };
  const goRoom=async id=>{ await G.go(id,160); if(G.room.id!==id) FAIL.push('go failed: '+id); };

  const expect=(cond,msg)=>{ if(!cond) FAIL.push('EXPECT: '+msg); };

  await goRoom('office');                 // triggers intro (patched says)
  expect(G.f.intro,'intro flag');
  await useH(/חלון/); expect(G.f.knows_pigeon,'knows_pigeon');
  await goRoom('lobby');
  await useH(/ספה/); expect(G.f.coin,'coin flag');
  await goRoom('street');
  await useH(/בני/); if(!G.has('seeds')) await useH(/קיוסק/);
  if(!G.has('seeds')) await useH(/בני|קיוסק/,'coin');
  expect(G.has('seeds'),'seeds bought');
  await goRoom('print');
  await useH(/שמעון/); expect(G.has('flashlight'),'flashlight');
  await goRoom('newsroom');
  await useH(/דובי/); expect(G.f.knows_tuna,'knows_tuna');
  await goRoom('kitchen');
  await useH(/מקרר/); expect(G.has('tuna'),'tuna');
  await goRoom('newsroom');
  await useH(/מרדכי|חתול/,'tuna'); expect(G.f.cat_fed,'cat_fed');
  await useH(/דף|נייר|עמוד|פינ/); expect(G.f.got1,'page1');
  await goRoom('meeting');
  await useH(/שלט/); expect(G.has('batteries'),'batteries');
  await goRoom('roof');
  await useH(/נחום|יונה/,'seeds'); expect(G.f.pigeon_gone,'pigeon_gone');
  await useH(/קן/); expect(G.f.got2,'page2');
  await goRoom('archive');
  await useH(/חושך|אפל/,'batteries');
  if(!G.f.flash_ok){ await goRoom('print'); await useH(/שמעון/,'batteries'); await goRoom('archive'); }
  expect(G.f.flash_ok,'flash_ok');
  await useH(/חושך|אפל/,'flashlight'); expect(G.f.archive_lit,'archive_lit');
  await useH(/חנה/); expect(G.f.hana_quiz,'hana_quiz');
  await useH(/קלסר 22|22/); expect(G.f.got3,'page3');
  await goRoom('design');
  await useH(/יוסי/); expect(G.has('article'),'article assembled');
  await goRoom('print');
  await useH(/שמעון/);
  await useH(/ירוק/); await useH(/צהוב/); await useH(/אדום/);
  expect(G.f.won===true,'WON');

  // inventory combine: batteries + flashlight must set flash_ok
  G.f.flash_ok=false; if(!G.has('batteries')) G.inv.push('batteries'); if(!G.has('flashlight')) G.inv.push('flashlight');
  if(!tryCombine('batteries','flashlight')) FAIL.push('combine batteries+flashlight not registered');
  await new Promise(r=>setTimeout(r,20));
  expect(G.f.flash_ok===true,'combine sets flash_ok');
  expect(!G.has('batteries'),'combine consumes batteries');

  // music integrity
  for(const [id,tr] of Object.entries(MUSIC.tracks)){
    const totals=tr.ch.map(c=>parseSeq(c.seq).total);
    if(!totals.every(t=>Math.abs(t-totals[0])<0.001)) FAIL.push('music '+id+' unequal: '+totals.join(','));
  }
  // sprite presence
  for(const s of ['noam','rivka','gila','dovi','yossi','hana','shimon','benny','cat','pigeon','dog'])
    if(typeof SPR[s]!=='function') FAIL.push('missing sprite '+s);
  // draw every bg + sprite once (crash check)
  const c2={}; const ctx=new Proxy(c2,{get:(t,k)=>k==='canvas'?{}:((...a)=>0),set:()=>true});
  for(const [id,fn] of Object.entries(BG)) { try{ fn(ctx,1.23); fn(ctx,4.56); }catch(e){ FAIL.push('bg '+id+' draw: '+e.message);} }
  for(const [id,fn] of Object.entries(SPR)){ try{ fn(ctx,1.23,{}); fn(ctx,2.5,{walk:true,talk:true,flip:true}); }catch(e){ FAIL.push('sprite '+id+' draw: '+e.message);} }

  return {FAIL, lines:LOG.length};
})()
`;
vm.runInContext(driver, sandbox, {filename:'driver'}).then(r=>{
  if(r.FAIL.length){ console.error('SMOKE FAIL:'); r.FAIL.forEach(f=>console.error(' -',f)); process.exit(1); }
  console.log('SMOKE PASS —', r.lines, 'dialogue lines, game won, all tracks aligned, all draws OK');
}).catch(e=>{ console.error('DRIVER ERROR', e); process.exit(1); });
