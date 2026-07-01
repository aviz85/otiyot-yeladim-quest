/* design theme — חדר הגרפיקה: cool synthy groove, 116bpm, Em
   8 bars (32 beats), AA'AB question-answer melody.
   Chords: Em Em C D | Em C B7 Em */
'use strict';
MUSIC.tracks.design = {
  bpm: 116,
  ch: [
    // square lead — question (bars 1-2), answer (3-4), question (5-6), cadence (7-8)
    { w:'square', v:0.13, seq:
      'E5:1 G5:1 B5:2 A5:1 G5:1 F#5:2 '+       // Em: question rises, hangs on F#
      'G5:1 A5:1 G5:1 E5:1 F#5:2 D5:2 '+       // C→D: answer drifts down
      'E5:1 G5:1 B5:2 C6:1 B5:1 A5:2 '+        // Em→C: question again, reaches higher
      'A5:1 F#5:1 D#5:2 E5:4' },               // B7 cadence → lands home on E
    // quiet square harmony — sustained chord tones under the lead
    { w:'square', v:0.07, seq:
      'G4:2 B4:2 G4:2 A4:2 '+                  // Em | Em
      'G4:2 E4:2 F#4:2 A4:2 '+                 // C  | D
      'G4:2 B4:2 E4:2 G4:2 '+                  // Em | C
      'F#4:2 D#4:2 E4:4' },                    // B7 | Em
    // triangle bass — pumping synth-bass on chord roots (root-root-octave-root)
    { w:'triangle', v:0.22, seq:
      'E2:1 E2:1 E3:1 E2:1 E2:1 E2:1 E3:1 E2:1 '+
      'C3:1 C3:1 G2:1 C3:1 D3:1 D3:1 A2:1 D3:1 '+
      'E2:1 E2:1 E3:1 E2:1 C3:1 C3:1 G2:1 C3:1 '+
      'A2:1 A2:1 B2:1 B2:1 E2:2 B2:1 E2:1' },
    // noise drums — cool off-beat tick groove, opens up at the loop end
    { w:'noise', v:0.06, seq:
      'x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 -:1 x:1 -:1' },
  ]
};
