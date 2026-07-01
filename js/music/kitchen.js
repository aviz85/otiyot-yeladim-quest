/* kitchen theme — cozy waltz in F major, 96bpm, 3/4 feel.
   16 bars x 3 beats = 48 beats per channel. AABA:
   A  (bars 1-4):  F | Dm | Gm | C7
   A' (bars 5-8):  F | Bb | C7 | F
   B  (bars 9-12): Bb | F | Gm | C7
   A''(bars 13-16):F | Dm | Gm→C7 | F                        */
'use strict';
MUSIC.tracks.kitchen = {
  bpm: 96,
  ch: [
    // square lead — warm waltz melody, question-answer phrasing
    { w:'square', v:0.13, seq:
      'A4:1 C5:1 A4:1 F5:2 D5:1 G4:1 Bb4:1 D5:1 C5:2 -:1 '+
      'A4:1 C5:1 F5:1 D5:2 Bb4:1 C5:1 E5:1 G5:1 F5:2 -:1 '+
      'Bb4:1 D5:1 F5:1 A5:2 F5:1 D5:1 C5:1 Bb4:1 G4:1 A4:1 B4:1 '+
      'A4:1 C5:1 A4:1 F5:2 D5:1 G4:1 C5:1 E5:1 F5:3' },
    // quiet square harmony — waltz "pah-pah" on beats 2+3 (3rd/5th of chord)
    { w:'square', v:0.07, seq:
      '-:1 A3:1 C4:1 -:1 F4:1 A4:1 -:1 Bb3:1 D4:1 -:1 E4:1 G4:1 '+
      '-:1 A3:1 C4:1 -:1 D4:1 F4:1 -:1 E4:1 G4:1 -:1 A3:1 C4:1 '+
      '-:1 D4:1 F4:1 -:1 A3:1 C4:1 -:1 Bb3:1 D4:1 -:1 E4:1 G4:1 '+
      '-:1 A3:1 C4:1 -:1 F4:1 A4:1 -:1 Bb3:1 E4:1 -:1 F4:1 A4:1' },
    // triangle bass — oom on the downbeat, root then fifth
    { w:'triangle', v:0.22, seq:
      'F2:2 C3:1 D2:2 A2:1 G2:2 D3:1 C3:2 G2:1 '+
      'F2:2 C3:1 Bb2:2 F3:1 C3:2 G2:1 F2:2 A2:1 '+
      'Bb2:2 F3:1 F2:2 C3:1 G2:2 D3:1 C3:2 G2:1 '+
      'F2:2 C3:1 D2:2 A2:1 G2:1 C3:2 F2:3' },
    // noise — soft brush taps on beats 2+3, tiny fill at each half
    { w:'noise', v:0.06, seq:
      '-:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 '+
      '-:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 x:0.5 x:0.5 x:1 x:1 '+
      '-:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 '+
      '-:1 x:1 x:1 -:1 x:1 x:1 -:1 x:1 x:1 x:0.5 x:0.5 x:0.5 x:0.5 x:1' },
  ]
};
