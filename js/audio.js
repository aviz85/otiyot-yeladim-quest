/* ============================================================
   audio.js — 16-bit style chiptune tracker + SFX (WebAudio)
   Track format (see DESIGN.md):
   MUSIC.tracks.myTrack = {
     bpm: 120,
     ch: [
       {w:'square',   v:0.15, seq:'C5:1 E5:1 G5:2 -:4 ...'},
       {w:'triangle', v:0.25, seq:'C3:4 G2:4 ...'},
       {w:'noise',    v:0.07, seq:'x:0.5 -:0.5 x:0.5 -:0.5 ...'},
     ]
   }
   Token = NOTE(:beats) | '-'(:beats) rest | 'x'(:beats) noise hit.
   Notes: C0..B8 with # or b (C4, F#3, Bb2). Default length 1 beat.
   All channels should sum to the SAME total beats (loop length).
   ============================================================ */
'use strict';

const MUSIC = { tracks:{}, on:true, _ctx:null, _timer:null, _cur:null, _gain:null };
const NOTE_IDX = {C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};

function noteFreq(n){
  const m = n.match(/^([A-G][#b]?)(\d)$/); if(!m) return 0;
  const semi = NOTE_IDX[m[1]] + (parseInt(m[2])+1)*12;
  return 440 * Math.pow(2,(semi-69)/12);
}

MUSIC.ensure = function(){
  if(!MUSIC._ctx){
    MUSIC._ctx = new (window.AudioContext||window.webkitAudioContext)();
    MUSIC._gain = MUSIC._ctx.createGain();
    MUSIC._gain.gain.value = 0.6;
    MUSIC._gain.connect(MUSIC._ctx.destination);
    // noise buffer
    const len = MUSIC._ctx.sampleRate*0.5, buf = MUSIC._ctx.createBuffer(1,len,MUSIC._ctx.sampleRate);
    const d = buf.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    MUSIC._noise = buf;
  }
  if(MUSIC._ctx.state==='suspended') MUSIC._ctx.resume();
  return MUSIC._ctx;
};

function parseSeq(seq){
  const out=[]; let t=0;
  for(const tok of seq.trim().split(/\s+/)){
    const [p,l] = tok.split(':'); const beats = l?parseFloat(l):1;
    out.push({p, t, beats}); t+=beats;
  }
  return {events:out, total:t};
}

MUSIC._schedNote = function(ch, ev, when, spb){
  const ctx = MUSIC._ctx;
  const dur = Math.max(0.05, ev.beats*spb*0.9);
  if(ch.w==='noise'){
    if(ev.p!=='x') return;
    const src=ctx.createBufferSource(); src.buffer=MUSIC._noise;
    const g=ctx.createGain(); const f=ctx.createBiquadFilter();
    f.type='highpass'; f.frequency.value=3000;
    g.gain.setValueAtTime(ch.v,when); g.gain.exponentialRampToValueAtTime(0.001,when+Math.min(dur,0.12));
    src.connect(f); f.connect(g); g.connect(MUSIC._gain);
    src.start(when); src.stop(when+0.15);
    return;
  }
  if(ev.p==='-'||ev.p==='x') return;
  const freq=noteFreq(ev.p); if(!freq) return;
  const o=ctx.createOscillator(); o.type=ch.w; o.frequency.value=freq;
  const g=ctx.createGain();
  g.gain.setValueAtTime(0.0001,when);
  g.gain.linearRampToValueAtTime(ch.v,when+0.01);
  g.gain.setValueAtTime(ch.v*0.8,when+dur*0.7);
  g.gain.exponentialRampToValueAtTime(0.001,when+dur);
  o.connect(g); g.connect(MUSIC._gain);
  o.start(when); o.stop(when+dur+0.05);
};

MUSIC.play = function(trackId){
  if(MUSIC._cur===trackId) return;
  MUSIC.stop();
  const tr = MUSIC.tracks[trackId]; if(!tr) return;
  MUSIC._cur = trackId;
  if(!MUSIC.on) return;
  const ctx = MUSIC.ensure();
  const spb = 60/tr.bpm;
  const chans = tr.ch.map(c=>({...c, ...parseSeq(c.seq), next:0, loopStart:ctx.currentTime+0.1}));
  MUSIC._timer = setInterval(()=>{
    if(!MUSIC.on) return;
    const horizon = ctx.currentTime+0.25;
    for(const ch of chans){
      if(!ch.total) continue;
      while(true){
        const ev = ch.events[ch.next];
        const when = ch.loopStart + ev.t*spb;
        if(when>horizon) break;
        MUSIC._schedNote(ch, ev, Math.max(when,ctx.currentTime), spb);
        ch.next++;
        if(ch.next>=ch.events.length){ ch.next=0; ch.loopStart += ch.total*spb; }
      }
    }
  }, 100);
};

MUSIC.stop = function(){ if(MUSIC._timer){clearInterval(MUSIC._timer); MUSIC._timer=null;} MUSIC._cur=null; };
MUSIC.toggle = function(){
  MUSIC.on=!MUSIC.on;
  if(!MUSIC.on){ const c=MUSIC._cur; MUSIC.stop(); MUSIC._cur=null; if(c) MUSIC._pending=c; }
  else { MUSIC.ensure(); const c=MUSIC._pending||MUSIC._cur; MUSIC._cur=null; if(c) MUSIC.play(c); }
  return MUSIC.on;
};

/* ---------------- SFX ---------------- */
const SFX_DEFS = {
  pickup:[[660,0.05,'square'],[880,0.08,'square']],
  door:[[220,0.08,'triangle'],[180,0.1,'triangle']],
  ok:[[523,0.07,'square'],[659,0.07,'square'],[784,0.12,'square']],
  no:[[200,0.12,'sawtooth'],[150,0.15,'sawtooth']],
  talk:[[440,0.03,'square']],
  ding:[[988,0.05,'triangle'],[1319,0.15,'triangle']],
  meow:[[700,0.08,'sawtooth'],[500,0.12,'sawtooth']],
  coo:[[350,0.06,'triangle'],[300,0.08,'triangle'],[350,0.06,'triangle']],
  buzz:[[110,0.2,'sawtooth']],
  win:[[523,0.1,'square'],[659,0.1,'square'],[784,0.1,'square'],[1047,0.3,'square']],
};
function sfx(name){
  if(!MUSIC.on) return;
  const def=SFX_DEFS[name]; if(!def) return;
  const ctx=MUSIC.ensure(); let t=ctx.currentTime;
  for(const [f,d,w] of def){
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type=w; o.frequency.value=f;
    g.gain.setValueAtTime(0.12,t); g.gain.exponentialRampToValueAtTime(0.001,t+d);
    o.connect(g); g.connect(MUSIC._gain||ctx.destination);
    o.start(t); o.stop(t+d+0.02); t+=d*0.8;
  }
}
