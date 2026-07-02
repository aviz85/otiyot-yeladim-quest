/* ============================================================
   game.js — characters, items, hints, title flow, finale
   ============================================================ */
'use strict';

/* ---------------- characters ---------------- */
const CHARS = {
  noam:   {name:'נעם',            color:'#8fce4e'},
  rivka:  {name:'רבקה העורכת',    color:'#b18fd0'},
  gila:   {name:'גילה מהקבלה',    color:'#f2879c'},
  dovi:   {name:'דובי הכתב',      color:'#f7d046'},
  yossi:  {name:'יוסי הגרפיקאי',  color:'#6fd8e0'},
  hana:   {name:'חנה מהארכיון',   color:'#f0c8a0'},
  shimon: {name:'שמעון המדפיס',   color:'#ef8f2e'},
  benny:  {name:'בני מהקיוסק',    color:'#8ecae6'},
  cat:    {name:'מרדכי החתול',    color:'#ef8f2e'},
  pigeon: {name:'נחום היונה',     color:'#bdbccb'},
  dog:    {name:'כלבלב',          color:'#c08a4a'},
};

/* ---------------- items (16x16 icons) ---------------- */
const ITEMS = {
  coin:{name:'מטבע', icon:c=>{A.disc(c,PAL.yellow,8,8,6);A.disc(c,PAL.yellowD,8,8,4);A.text(c,'₪',8,4,PAL.brown1,8);}},
  seeds:{name:'שקית גרעינים', icon:c=>{A.px(c,PAL.paper,3,2,10,12);A.px(c,PAL.paperD,3,2,10,3);A.px(c,PAL.brown2,5,7,2,2);A.px(c,PAL.brown2,9,9,2,2);A.px(c,PAL.brown2,7,11,2,2);}},
  tuna:{name:'קופסת טונה', icon:c=>{A.disc(c,PAL.gray4,8,9,6);A.disc(c,PAL.gray3,8,8,6);A.disc(c,PAL.cyan,8,8,4);A.text(c,'🐟',8,4,PAL.ink,7);}},
  page1:{name:'עמוד 1 של הכתבה', icon:c=>{A.px(c,PAL.paper,3,1,10,14);A.px(c,PAL.gray3,5,4,6,1);A.px(c,PAL.gray3,5,7,6,1);A.px(c,PAL.gray3,5,10,6,1);A.text(c,'א',8,1,PAL.red,7);}},
  page2:{name:'עמוד 2 של הכתבה', icon:c=>{A.px(c,PAL.paper,3,1,10,14);A.px(c,PAL.gray3,5,4,6,1);A.px(c,PAL.gray3,5,7,6,1);A.px(c,PAL.gray3,5,10,6,1);A.text(c,'ב',8,1,PAL.blue,7);}},
  page3:{name:'עמוד 3 של הכתבה', icon:c=>{A.px(c,PAL.paper,3,1,10,14);A.px(c,PAL.gray3,5,4,6,1);A.px(c,PAL.gray3,5,7,6,1);A.px(c,PAL.gray3,5,10,6,1);A.text(c,'ג',8,1,PAL.green,7);}},
  flashlight:{name:'פנס', icon:c=>{A.px(c,PAL.red,2,6,8,4);A.px(c,PAL.gray3,10,5,4,6);A.px(c,PAL.yellow,14,4,2,8);}},
  batteries:{name:'סוללות', icon:c=>{A.px(c,PAL.green,3,4,4,9);A.px(c,PAL.gray3,3,2,4,2);A.px(c,PAL.green,9,4,4,9);A.px(c,PAL.gray3,9,2,4,2);}},
  article:{name:'הכתבה המלאה!', icon:c=>{A.px(c,PAL.paper,2,1,12,14);A.px(c,PAL.red,4,3,8,2);A.px(c,PAL.gray3,4,7,8,1);A.px(c,PAL.gray3,4,9,8,1);A.px(c,PAL.gray3,4,11,8,1);A.px(c,PAL.yellow,11,2,3,3);}},
  cookie:{name:'עוגייה', icon:c=>{A.disc(c,PAL.brown4,8,8,6);A.px(c,PAL.brown1,5,6,2,2);A.px(c,PAL.brown1,9,9,2,2);A.px(c,PAL.brown1,7,11,2,1);A.px(c,PAL.brown1,10,5,1,2);}},
};

/* ---------------- inventory combos (item on item) ---------------- */
const COMBOS = {
  'batteries+flashlight': async()=>{
    G.del('batteries');
    G.f.flash_ok=true;
    sfx('ding');
    await G.say('noam','קליק! קליק! הסוללות נכנסו לפנס ו... יש אור!');
    await G.say('noam','עכשיו החושך בארכיון בבעיה רצינית.');
  },
  'cookie+tuna': async()=>{
    await G.say('noam','עוגייה עם טונה? אפילו מרדכי החתול היה מגיש על זה תלונה למערכת.');
  },
};
function tryCombine(a,b){
  const fn=COMBOS[a+'+'+b]||COMBOS[b+'+'+a];
  if(!fn) return false;
  G.selected=null; renderInv();
  (async()=>{ G.busy=true; try{ await fn(); }catch(e){console.error(e);} G.busy=false; })();
  return true;
}

/* ---------------- hint system ---------------- */
function currentHint(){
  const f=G.f;
  if(!f.intro) return 'כדאי לדבר עם רבקה העורכת בחדר שלה — היא נראית לחוצה!';
  if(f.won) return 'ניצחת! אפשר פשוט ליהנות מהתהילה 😎';
  const missing=[];
  if(!G.has('page1')&&!f.got1) missing.push('page1');
  if(!G.has('page2')&&!f.got2) missing.push('page2');
  if(!G.has('page3')&&!f.got3) missing.push('page3');
  if(G.has('article')) return 'הכתבה מוכנה! רוצו לבית הדפוס של שמעון — בקצה הרחוב, משמאל!';
  if(f.got1&&f.got2&&f.got3) return 'יש לך את כל שלושת העמודים! קחו אותם ליוסי בחדר הגרפיקה — הוא כבר יידע לסדר אותם.';
  if(missing.includes('page1')){
    if(f.cat_fed) return 'מרדכי כבר קיבל את הטונה שלו והלך! העמוד מחכה מתחת לארון בחדר הכתבים.';
    if(!f.knows_tuna) return 'החתול מרדכי שומר על משהו בחדר הכתבים... אולי דובי הכתב יודע מה מרדכי אוהב?';
    if(!G.has('tuna')) return 'דובי אמר שמרדכי מוכן להזיז את עצמו רק בשביל טונה. איפה יש אוכל בבניין? במטבחון!';
    return 'יש לך טונה! תנו אותה למרדכי החתול בחדר הכתבים.';
  }
  if(missing.includes('page2')){
    if(f.pigeon_gone) return 'נחום עף לו! הקן פנוי — עלו לגג וקחו את העמוד מהקן.';
    if(!f.knows_pigeon) return 'משהו לבן מבצבץ מהקן של היונה על הגג. עולים למעלה דרך הסולם במטבחון!';
    if(!G.has('seeds')&&!f.coin) return 'נחום היונה רוצה משהו טעים בתמורה לדף. אולי בקיוסק יש גרעינים? רגע... צריך מטבע. שווה לחפש מתחת לכריות של הספה בלובי!';
    if(!G.has('seeds')) return 'יש לך מטבע! בקיוסק של בני ברחוב מוכרים גרעינים.';
    return 'יש לך גרעינים! תציעו אותם לנחום היונה על הגג.';
  }
  if(missing.includes('page3')){
    if(!G.has('flashlight')) return 'בארכיון במרתף חשוך לגמרי. לשמעון בבית הדפוס יש פנס — שווה לבקש ממנו!';
    if(!f.flash_ok){
      if(G.has('batteries')) return 'יש לך פנס וגם סוללות! לחצו במלאי על הסוללות ואז על הפנס — או תנו לשמעון המדפיס להרכיב.';
      return 'הפנס בלי סוללות! בחדר הישיבות יש שלט של מקרן... ומה יש בתוך שלט? בדיוק.';
    }
    if(!f.archive_lit) return 'יש לך פנס עובד! השתמשו בו בתוך הארכיון החשוך.';
    if(!f.hana_quiz) return 'חנה מהארכיון יודעת בדיוק איפה הדף — אבל היא אוהבת חידות. דברו איתה!';
    return 'חנה אמרה: הקלסר שהמספר שלו הוא כמספר האותיות באלף-בית! ספרו טוב ולחצו על הקלסר הנכון.';
  }
  return 'שווה להסתובב, לדבר עם כולם וללחוץ על כל דבר שזז (וגם על מה שלא).';
}

/* ---------------- UI buttons ---------------- */
function bindUI(){
  document.getElementById('btn-music').onclick=()=>{
    const on=MUSIC.toggle();
    document.getElementById('btn-music').textContent=on?'🎵':'🔇';
  };
  document.getElementById('btn-hint').onclick=async()=>{
    if(G.busy||!G.started) return;
    G.busy=true; await G.say('noam','💡 '+currentHint()); G.busy=false;
  };
  document.getElementById('btn-look').onclick=()=>{
    G.lookMode=!G.lookMode; updateLookBtn();
  };
  document.getElementById('btn-save').onclick=()=>openSlots('save');
  document.getElementById('btn-load').onclick=()=>openSlots('load');
  document.getElementById('btn-menu').onclick=()=>{ showScreen('title'); refreshContinue(); };
}

function openSlots(mode){
  if(!G.started&&mode==='save') return;
  const modal=document.getElementById('slots');
  modal.style.display='flex';
  document.getElementById('slots-title').textContent = mode==='save'?'💾 שמירת משחק':'📂 טעינת משחק';
  const list=document.getElementById('slots-list');
  list.innerHTML='';
  for(const slot of ['1','2','3','auto']){
    if(slot==='auto'&&mode==='save') continue;
    const info=slotInfo(slot);
    const b=document.createElement('button');
    b.textContent=(slot==='auto'?'שמירה אוטומטית':'משבצת '+slot)+(info?' — '+info:' — ריקה');
    if(mode==='load'&&!info) b.disabled=true;
    b.onclick=()=>{
      if(mode==='save'){ saveState(slot); toast('המשחק נשמר! 💾'); }
      else { loadState(slot); showScreen(null); toast('המשחק נטען! 📂'); }
      modal.style.display='none';
    };
    list.appendChild(b);
  }
  const close=document.createElement('button');
  close.textContent='סגירה';
  close.className='ghost';
  close.onclick=()=>modal.style.display='none';
  list.appendChild(close);
}

/* ---------------- screens (title / disclaimer / win) ---------------- */
function showScreen(id){
  for(const s of document.querySelectorAll('.screen')) s.style.display='none';
  if(id) document.getElementById('screen-'+id).style.display='flex';
}
function refreshContinue(){
  document.getElementById('btn-continue').style.display = slotInfo('auto')?'block':'none';
}

async function newGame(){
  G.f={}; G.inv=[]; G.selected=null; renderInv();
  showScreen(null);
  G.started=true;
  MUSIC.ensure();
  await G.go('office',260);
}

/* ---------------- finale ---------------- */
G.win = async function(){
  G.f.won=true;
  MUSIC.play('finale');
  sfx('win');
  autosave();
  showScreen('win');
  // confetti
  const cvw=document.getElementById('win-canvas');
  const c=cvw.getContext('2d'); c.imageSmoothingEnabled=false;
  const parts=Array.from({length:60},(_,i)=>({x:Math.random()*320,y:Math.random()*-180,v:20+Math.random()*40,c:[PAL.red,PAL.yellow,PAL.green,PAL.blue,PAL.pink,PAL.cyan][i%6]}));
  let last=0;
  function anim(ms){
    if(document.getElementById('screen-win').style.display==='none') return;
    const t=ms/1000, dt=Math.min(0.05,t-last); last=t;
    c.clearRect(0,0,320,180);
    if(typeof BG!=='undefined'&&BG.win) BG.win(c,t);
    else { A.px(c,PAL.navy,0,0,320,180); A.text(c,'🎉',160,80,'#fff',40); }
    for(const p of parts){ p.y+=p.v*dt; if(p.y>180)p.y=-5; A.px(c,p.c,p.x,p.y,2,2); }
    requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
};

/* ---------------- boot ---------------- */
window.addEventListener('DOMContentLoaded', ()=>{
  engineInit();
  bindUI();
  document.getElementById('btn-disclaimer-ok').onclick=()=>{
    MUSIC.ensure(); MUSIC.play('title');
    showScreen('title'); refreshContinue();
  };
  document.getElementById('btn-new').onclick=()=>newGame();
  document.getElementById('btn-continue').onclick=()=>{ if(loadState('auto')) showScreen(null); };
  document.getElementById('btn-win-again').onclick=()=>{ showScreen('title'); refreshContinue(); };
  showScreen('disclaimer');
});
