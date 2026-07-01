/* newsroom theme — חדר הכתבים: busy typewriter-rhythm, 132bpm, D minor.
   Chords per bar: Dm | Dm | Gm | A7 | Dm | Bb | Gm A | Dm  (8 bars x 4 = 32 beats)
   Noise channel = מכונות כתיבה מתקתקות, with a "carriage return" pause at the end. */
'use strict';
MUSIC.tracks.newsroom = {
  bpm: 132,
  ch: [
    // lead — question/answer melody, AABA feel (32 beats)
    { w:'square', v:0.13, seq:
      'D5:0.5 D5:0.5 F5:1 E5:0.5 D5:0.5 A4:1 '+   // bar1 (Q)
      'D5:0.5 E5:0.5 F5:1 G5:1 A5:1 '+            // bar2 (A)
      'G5:0.5 G5:0.5 Bb5:1 A5:0.5 G5:0.5 D5:1 '+  // bar3 (Gm)
      'A5:0.5 G5:0.5 E5:1 C#5:1 A4:1 '+           // bar4 (A7 turn)
      'D5:0.5 D5:0.5 F5:1 E5:0.5 D5:0.5 A4:1 '+   // bar5 (Q again)
      'F5:0.5 F5:0.5 D5:1 Bb4:0.5 D5:0.5 F5:1 '+  // bar6 (Bb)
      'G5:1 Bb5:1 A5:1 E5:1 '+                    // bar7 (Gm-A build)
      'D5:2 -:2' },                               // bar8 (land + breathe)
    // quiet harmony — chord tones (32 beats)
    { w:'square', v:0.07, seq:
      'F4:2 A4:2 F4:2 A4:2 '+
      'G4:2 Bb4:2 A4:2 G4:2 '+
      'F4:2 A4:2 F4:2 D4:2 '+
      'G4:2 E4:2 D4:4' },
    // bass — chord roots, walking bounce (32 beats)
    { w:'triangle', v:0.22, seq:
      'D2:1 A2:1 D3:1 A2:1 '+
      'D2:1 A2:1 D3:1 C3:1 '+
      'G2:1 D3:1 G3:1 D3:1 '+
      'A2:1 E3:1 A2:1 E3:1 '+
      'D2:1 A2:1 D3:1 A2:1 '+
      'Bb2:1 F3:1 Bb2:1 F3:1 '+
      'G2:1 D3:1 A2:1 E3:1 '+
      'D2:1 A2:1 D3:1 D2:1' },
    // noise — typewriter ticking, carriage-return pause at loop end (32 beats)
    { w:'noise', v:0.06, seq:
      'x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 x:0.5 '+
      'x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 x:0.5 '+
      'x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 x:0.5 '+
      'x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 x:0.5 -:0.5 '+
      'x:0.5 x:0.5 x:0.5 x:0.5 -:2' },
  ]
};
