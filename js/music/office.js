/* office — לשכת העורכת הראשית: קלייזמר טרוד-עסוק, 120bpm, לה מינור.
   8 תיבות (32 פעמות), מבנה שאלה-תשובה: Am | Dm | E7 | Am | Dm | Dm→E | E7 | Am */
'use strict';
MUSIC.tracks.office = {
  bpm: 120,
  ch: [
    // lead — square, klezmer melody with a worried G# leaning tone (32 beats)
    { w:'square', v:0.13, seq:
      'E5:0.5 E5:0.5 A5:1 G5:0.5 F5:0.5 E5:1 '+     // bar 1 (Am) — question
      'D5:0.5 E5:0.5 F5:1 E5:0.5 D5:0.5 C5:1 '+     // bar 2 (Dm)
      'B4:0.5 C5:0.5 D5:1 C5:0.5 B4:0.5 G#4:1 '+    // bar 3 (E7) — the worry
      'A4:2 -:1 E5:0.5 E5:0.5 '+                    // bar 4 (Am) — rest + pickup
      'F5:0.5 G5:0.5 A5:1 G5:0.5 F5:0.5 E5:1 '+     // bar 5 (Dm) — question again, higher
      'D5:0.5 E5:0.5 F5:1 G#4:0.5 B4:0.5 D5:1 '+    // bar 6 (Dm→E) — twist
      'C5:0.5 B4:0.5 C5:0.5 D5:0.5 E5:1 G#4:1 '+    // bar 7 (E7) — hurried answer
      'A4:3 -:1' },                                 // bar 8 (Am) — landing
    // harmony — quiet square chord tones
    { w:'square', v:0.07, seq:
      'C4:2 E4:2 '+   // Am
      'D4:2 F4:2 '+   // Dm
      'G#3:2 B3:2 '+  // E7
      'A3:2 C4:2 '+   // Am
      'D4:2 F4:2 '+   // Dm
      'F4:2 E4:2 '+   // Dm → E
      'G#3:2 B3:2 '+  // E7
      'A3:2 C4:2' },  // Am
    // bass — triangle oom-pah on chord roots and fifths
    { w:'triangle', v:0.22, seq:
      'A2:1 E3:1 A2:1 E3:1 '+
      'D3:1 A3:1 D3:1 A3:1 '+
      'E2:1 B2:1 E2:1 B2:1 '+
      'A2:1 E3:1 A2:1 E3:1 '+
      'D3:1 A2:1 D3:1 A2:1 '+
      'D3:1 A2:1 E3:1 E2:1 '+
      'E3:1 B2:1 E3:1 B2:1 '+
      'A2:1 E3:1 A2:2' },
    // drums — bustling office shuffle
    { w:'noise', v:0.06, seq:
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:1 '+
      'x:1 -:1 x:0.5 x:0.5 -:1' },
  ]
};
