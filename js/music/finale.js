/* finale theme — triumphant march, 132bpm, C major, big happy ending.
   8-bar question-answer melody over C F G C | C Am F/G C.
   32 beats per channel (verified). */
'use strict';
MUSIC.tracks.finale = {
  bpm: 132,
  ch: [
    // lead — fanfare melody (question-answer phrasing)
    { w:'square', v:0.13, seq:
      'C5:1 C5:0.5 C5:0.5 E5:1 G5:1 A5:1 G5:1 F5:1 E5:1 '+
      'D5:1 D5:0.5 D5:0.5 F5:1 G5:1 E5:2 C5:2 '+
      'E5:1 E5:0.5 E5:0.5 G5:1 C6:1 A5:1 C6:1 A5:1 E5:1 '+
      'F5:1 A5:1 G5:1 D5:1 C6:3 -:1' },
    // harmony — sustained chord tones under the melody
    { w:'square', v:0.07, seq:
      'E4:2 G4:2 F4:2 A4:2 G4:2 B4:2 E4:2 G4:2 '+
      'G4:2 E4:2 E4:2 A4:2 A4:2 B4:2 G4:2 E4:2' },
    // bass — march root-fifth on the chord roots
    { w:'triangle', v:0.22, seq:
      'C3:1 G2:1 C3:1 G2:1 F2:1 C3:1 F2:1 C3:1 '+
      'G2:1 D3:1 G2:1 D3:1 C3:1 G2:1 C3:1 G2:1 '+
      'C3:1 G2:1 C3:1 G2:1 A2:1 E3:1 A2:1 E3:1 '+
      'F2:1 C3:1 G2:1 D3:1 C3:1 G2:1 C2:2' },
    // drums — parade snare march, little roll into the loop
    { w:'noise', v:0.05, seq:
      'x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 '+
      'x:1 -:0.5 x:0.5 x:1 x:0.5 x:0.5 x:1 x:0.5 x:0.5 x:0.5 x:0.5 x:1' },
  ]
};
