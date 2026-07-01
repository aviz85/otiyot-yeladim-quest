/* street theme — sunny happy G-major stroll, 126bpm.
   8 bars (32 beats), question-answer melody over G C G D | G C D G. */
'use strict';
MUSIC.tracks.street = {
  bpm: 126,
  ch: [
    // square lead — bars 1-4 ask (end on A), bars 5-8 answer (land on G)
    { w:'square', v:0.13, seq:
      'G4:1 B4:1 D5:1 B4:1 C5:1 E5:1 D5:1 C5:1 '+
      'B4:1 D5:1 G5:2 F#5:1 E5:1 D5:1 A4:1 '+
      'G4:1 B4:1 D5:1 B4:1 C5:1 E5:1 G5:1 E5:1 '+
      'D5:1 C5:1 B4:1 A4:1 G4:4' },
    // quiet square harmony — chord thirds/fifths under the tune
    { w:'square', v:0.07, seq:
      'B3:2 D4:2 C4:2 E4:2 B3:2 D4:2 D4:2 F#4:2 '+
      'B3:2 D4:2 C4:2 E4:2 D4:2 F#4:2 B3:4' },
    // triangle bass — bouncy oom-pah on chord roots
    { w:'triangle', v:0.22, seq:
      'G2:1 D3:1 G3:1 D3:1 C3:1 G3:1 C3:1 G2:1 '+
      'G2:1 D3:1 G3:1 D3:1 D3:1 A2:1 F#2:1 A2:1 '+
      'G2:1 D3:1 G3:1 D3:1 C3:1 G2:1 C3:1 E3:1 '+
      'D3:1 A2:1 D3:1 A2:1 G2:2 D3:1 G2:1' },
    // noise drums — light skipping beat, breathes on the last bar
    { w:'noise', v:0.05, seq:
      'x:1 -:0.5 x:0.5 x:1 x:1 x:1 -:0.5 x:0.5 x:1 x:1 '+
      'x:1 -:0.5 x:0.5 x:1 x:1 x:1 -:0.5 x:0.5 x:1 x:1 '+
      'x:1 -:0.5 x:0.5 x:1 x:1 x:1 -:0.5 x:0.5 x:1 x:1 '+
      'x:1 -:0.5 x:0.5 x:1 x:1 x:1 -:1 x:1 -:1' },
  ]
};
