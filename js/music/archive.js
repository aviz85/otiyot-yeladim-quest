/* archive theme — mysterious low Cm, 84bpm, sparse & echoey (long notes)
   8 bars of 4/4 = 32 beats. Chords: Cm Cm Ab G / Cm Fm G Cm
   Melody form: question (bars 1-2) → answer (3-4) → question again (5-6) → resolve (7-8) */
'use strict';
MUSIC.tracks.archive = {
  bpm: 84,
  ch: [
    // square lead — sparse questioning phrase, long tails (32 beats)
    { w:'square', v:0.12, seq:
      'C5:2 Eb5:1 D5:1 C5:3 G4:1 '+     // bar1-2: question (8)
      'Ab4:2 C5:1 Bb4:1 G4:4 '+          // bar3-4: answer, sinks to G (8)
      'C5:2 Eb5:1 D5:1 Eb5:2 C5:2 '+     // bar5-6: question again, lifts (8)
      'D5:2 B4:2 C5:4' },                // bar7-8: leading tone -> home (8)
    // quiet square harmony — long held chord tones, echoey space (32 beats)
    { w:'square', v:0.06, seq:
      'Eb4:4 -:2 G4:2 '+                 // bar1-2 (8)
      'C4:4 B3:4 '+                      // bar3-4 (8)
      'Eb4:4 F4:2 Ab4:2 '+               // bar5-6 (8)
      'D4:4 G4:2 Eb4:2' },               // bar7-8 (8)
    // triangle bass — deep slow roots (32 beats)
    { w:'triangle', v:0.22, seq:
      'C2:4 C2:2 G2:2 '+                 // bar1-2 (8)
      'Ab2:4 G2:4 '+                     // bar3-4 (8)
      'C2:4 F2:4 '+                      // bar5-6 (8)
      'G2:2 G2:2 C2:4' },                // bar7-8 (8)
    // noise — faint distant drips, very sparse (32 beats)
    { w:'noise', v:0.04, seq:
      'x:1 -:2 x:0.5 -:0.5 x:1 -:2 x:0.5 -:0.5 '+
      'x:1 -:2 x:0.5 -:0.5 x:1 -:2 x:0.5 -:0.5 '+
      'x:1 -:2 x:0.5 -:0.5 x:1 -:2 x:0.5 -:0.5 '+
      'x:1 -:2 x:0.5 -:0.5 x:1 -:3' },
  ]
};
