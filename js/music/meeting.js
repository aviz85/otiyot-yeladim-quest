/* meeting theme — sneaky-quiet tiptoe in Gm, 100bpm (Pink-Panther-ish creep)
   8 bars / 32 beats, question-answer: bars 1-2 sneak up, 3-4 peek around,
   5-6 sneak again, 7-8 chromatic slide back home. Chords: Gm Gm Cm D7 | Gm Gm Eb→D Gm */
'use strict';
MUSIC.tracks.meeting = {
  bpm: 100,
  ch: [
    // sneaky staccato lead (square) — 32 beats
    { w:'square', v:0.13, seq:
      'G4:0.5 -:0.5 Bb4:0.5 -:0.5 D5:1 C5:0.5 Bb4:0.5 '+   // bar 1 (Gm) tiptoe up
      'A4:0.5 -:0.5 Bb4:0.5 -:0.5 G4:1 -:1 '+              // bar 2 ...and freeze
      'C5:0.5 -:0.5 Eb5:0.5 -:0.5 G5:1 F5:0.5 Eb5:0.5 '+   // bar 3 (Cm) peek higher
      'D5:0.5 -:0.5 F#4:0.5 -:0.5 A4:1 -:1 '+              // bar 4 (D7) duck down
      'G4:0.5 -:0.5 Bb4:0.5 -:0.5 D5:1 C5:0.5 Bb4:0.5 '+   // bar 5 = bar 1
      'A4:0.5 -:0.5 Bb4:0.5 -:0.5 G4:1 -:1 '+              // bar 6 = bar 2
      'Eb5:0.5 D5:0.5 C5:0.5 Bb4:0.5 A4:1 F#4:1 '+         // bar 7 (Eb→D) slink down
      'G4:1 -:0.5 D4:0.5 G4:2' },                          // bar 8 (Gm) safe at home
    // quiet offbeat harmony stabs (square) — 32 beats
    { w:'square', v:0.07, seq:
      '-:0.5 D4:0.5 -:0.5 Bb3:0.5 -:2 '+   // bar 1 Gm
      '-:0.5 D4:0.5 -:0.5 Bb3:0.5 -:2 '+   // bar 2 Gm
      '-:0.5 Eb4:0.5 -:0.5 C4:0.5 -:2 '+   // bar 3 Cm
      '-:0.5 D4:0.5 -:0.5 A3:0.5 -:2 '+    // bar 4 D
      '-:0.5 D4:0.5 -:0.5 Bb3:0.5 -:2 '+   // bar 5 Gm
      '-:0.5 D4:0.5 -:0.5 Bb3:0.5 -:2 '+   // bar 6 Gm
      '-:0.5 Eb4:0.5 -:0.5 D4:0.5 -:2 '+   // bar 7 Eb→D
      '-:0.5 Bb3:0.5 -:0.5 G3:0.5 -:2' },  // bar 8 Gm
    // creeping chromatic-walk bass (triangle) — 32 beats
    { w:'triangle', v:0.22, seq:
      'G2:1 -:0.5 G2:0.5 D3:1 Bb2:1 '+               // bar 1 Gm
      'G2:1 -:0.5 G2:0.5 A2:0.5 B2:0.5 C3:1 '+       // bar 2 walk up to Cm
      'C3:1 -:0.5 C3:0.5 Eb3:1 C#3:1 '+              // bar 3 Cm, chromatic slip to D
      'D3:1 -:0.5 D3:0.5 A2:1 F#2:1 '+               // bar 4 D7
      'G2:1 -:0.5 G2:0.5 D3:1 Bb2:1 '+               // bar 5 Gm
      'G2:1 -:0.5 G2:0.5 F3:1 E3:1 '+                // bar 6 sneak toward Eb
      'Eb3:1 Bb2:1 D3:1 A2:1 '+                      // bar 7 Eb→D
      'G2:1 -:0.5 G2:0.5 D3:1 G2:1' },               // bar 8 Gm home
    // hushed hi-hat ticks (noise) — 32 beats
    { w:'noise', v:0.05, seq:
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 1
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 2
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 3
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 4
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 5
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 6
      'x:0.5 -:1 x:0.5 -:1 x:0.5 -:0.5 '+   // bar 7
      'x:0.5 -:1.5 x:0.5 -:1.5' },          // bar 8 (extra quiet)
  ]
};
