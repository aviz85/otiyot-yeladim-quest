/* lobby theme — friendly bossa-ish stroll in C major, 104bpm.
   8 bars (32 beats), chords: C | Am | Dm | G7 | C | Am | Dm G7 | C.
   Question-answer melody (A A B A'), bossa root-fifth bass. */
'use strict';
MUSIC.tracks.lobby = {
  bpm: 104,
  ch: [
    // square lead — the tune (each bar sums to 4, total 32)
    { w:'square', v:0.13, seq:
      'E5:1 G5:1 A5:1 G5:1 '+          // bar1 (C)  — question
      'E5:2 C5:1 D5:1 '+               // bar2 (Am)
      'F5:1 A5:1 F5:1 D5:1 '+          // bar3 (Dm)
      'D5:1.5 B4:0.5 G4:2 '+           // bar4 (G7) — half cadence
      'E5:1 G5:1 A5:1 G5:1 '+          // bar5 (C)  — same question
      'E5:2 C5:1 D5:1 '+               // bar6 (Am)
      'F5:1 E5:1 D5:1 B4:1 '+          // bar7 (Dm→G7) — turnaround
      'C5:3 -:1' },                    // bar8 (C)  — answer, home
    // quiet square harmony — off-beat bossa comping, chord tones (32)
    { w:'square', v:0.07, seq:
      '-:0.5 E4:1.5 G4:2 '+            // C
      '-:0.5 E4:1.5 A4:2 '+            // Am
      '-:0.5 F4:1.5 A4:2 '+            // Dm
      '-:0.5 F4:1.5 B4:2 '+            // G7
      '-:0.5 E4:1.5 G4:2 '+            // C
      '-:0.5 C4:1.5 A4:2 '+            // Am
      '-:0.5 F4:1.5 D4:2 '+            // Dm→G7
      '-:0.5 E4:1.5 -:2' },            // C (breath before loop)
    // triangle bass — bossa root/fifth on chord roots (32)
    { w:'triangle', v:0.22, seq:
      'C3:1.5 G2:0.5 C3:1 G2:1 '+      // C
      'A2:1.5 E3:0.5 A2:1 E3:1 '+      // Am
      'D3:1.5 A2:0.5 D3:1 A2:1 '+      // Dm
      'G2:1.5 D3:0.5 G2:1 B2:1 '+      // G7 (B2 walks up to C)
      'C3:1.5 G2:0.5 C3:1 G2:1 '+      // C
      'A2:1.5 E3:0.5 A2:1 E3:1 '+      // Am
      'D3:1.5 A2:0.5 G2:1 D3:1 '+      // Dm→G7
      'C3:1.5 G2:0.5 C3:2' },          // C
    // noise drums — light bossa tick, relaxed (32)
    { w:'noise', v:0.06, seq:
      'x:1 -:0.5 x:0.5 -:1 x:1 '+      // bar1
      '-:0.5 x:0.5 x:1 -:1 x:1 '+      // bar2
      'x:1 -:0.5 x:0.5 -:1 x:1 '+      // bar3
      '-:0.5 x:0.5 x:1 -:1 x:1 '+      // bar4
      'x:1 -:0.5 x:0.5 -:1 x:1 '+      // bar5
      '-:0.5 x:0.5 x:1 -:1 x:1 '+      // bar6
      'x:1 -:0.5 x:0.5 -:1 x:1 '+      // bar7
      'x:1 -:1 x:0.5 x:0.5 -:1' },     // bar8 (little fill)
  ]
};
