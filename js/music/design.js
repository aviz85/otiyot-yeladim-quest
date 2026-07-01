/* design theme — חדר הגרפיקה: cool synthy groove, 116bpm, Em
   8 bars (32 beats), AABA' — chords: Em | C | Am | B7 | Em | C | Am B7 | Em */
'use strict';
MUSIC.tracks.design = {
  bpm: 116,
  ch: [
    // square lead — question/answer melody (A A B A')
    { w:'square', v:0.13, seq:
      'E4:1 G4:1 B4:1 E5:1 D5:2 B4:2 '+        // A: question (Em → C)
      'C5:1 B4:1 A4:1 C5:1 B4:2 F#4:2 '+       // answer, lands on B7
      'E4:1 G4:1 B4:1 E5:1 D5:2 B4:2 '+        // A again
      'A4:1 C5:1 B4:1 A4:1 G4:1 E4:3' },       // final answer, rests home on E
    // quiet square harmony — sustained chord tones
    { w:'square', v:0.07, seq:
      'G3:2 B3:2 E3:2 G3:2 '+                  // Em | C
      'C4:2 A3:2 F#3:2 A3:2 '+                 // Am | B7
      'G3:2 B3:2 E3:2 G3:2 '+                  // Em | C
      'C4:2 F#3:2 E3:4' },                     // Am B7 | Em
    // triangle bass — chord roots + fifths
    { w:'triangle', v:0.24, seq:
      'E2:2 B2:2 C3:2 G2:2 '+
      'A2:2 E3:2 B2:2 F#3:2 '+
      'E2:2 B2:2 C3:2 G2:2 '+
      'A2:2 B2:2 E2:2 E3:2' },
    // noise drums — laid-back synth groove with a fill at the loop end
    { w:'noise', v:0.06, seq:
      'x:1 -:1 x:0.5 x:0.5 -:1 x:1 -:1 x:0.5 x:0.5 -:1 '+
      'x:1 -:1 x:0.5 x:0.5 -:1 x:1 -:1 x:0.5 x:0.5 -:1 '+
      'x:1 -:1 x:0.5 x:0.5 -:1 x:1 -:1 x:0.5 x:0.5 -:1 '+
      'x:1 -:1 x:0.5 x:0.5 -:1 x:1 -:1 x:0.5 x:0.5 x:0.5 x:0.5' },
  ]
};
