/* title theme — warm, adventurous, klezmer-ish minor bounce (exemplar track) */
'use strict';
MUSIC.tracks.title = {
  bpm: 128,
  ch: [
    { w:'square', v:0.13, seq:
      'A4:1 C5:1 E5:1 A5:1 G5:2 E5:2 F5:1 E5:1 D5:2 E5:2 C5:2 '+
      'A4:1 C5:1 E5:1 A5:1 G5:2 E5:2 D5:1 C5:1 B4:2 A4:4' },
    { w:'square', v:0.07, seq:
      'E4:2 A4:2 C5:2 A4:2 D4:2 A4:2 B4:2 A4:2 '+
      'E4:2 A4:2 C5:2 A4:2 E4:2 G4:2 A4:4' },
    { w:'triangle', v:0.22, seq:
      'A2:2 E3:2 A2:2 E3:2 D3:2 A3:2 E3:2 E2:2 '+
      'A2:2 E3:2 F3:2 C3:2 E3:2 E2:2 A2:4' },
    { w:'noise', v:0.05, seq:
      'x:1 -:0.5 x:0.5 x:1 -:1 x:1 -:0.5 x:0.5 x:1 -:1 '+
      'x:1 -:0.5 x:0.5 x:1 -:1 x:1 -:0.5 x:0.5 x:1 -:1 -:4' },
  ]
};
