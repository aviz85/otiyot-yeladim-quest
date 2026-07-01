/* roof theme — הגג: airy, open, wind-in-the-hair, D freygish (D Eb F# G A Bb C).
   112bpm, 32 beats (8 bars of 4). Chords: D | Cm | D | D | Gm | Cm | D | D.
   Melody is question-answer (A A B A'), bass walks the chord roots+fifths. */
'use strict';
MUSIC.tracks.roof = {
  bpm: 112,
  ch: [
    // square lead — the open-sky melody (A A B A'), 32 beats
    { w:'square', v:0.13, seq:
      'D5:1 Eb5:1 F#5:2 A5:2 G5:1 Eb5:1 '+   // A  (question, bars 1-2)
      'D5:1 Eb5:1 F#5:2 A5:2 G5:1 F#5:1 '+   // A  (echo, bars 3-4)
      'Bb4:1 C5:1 D5:2 C5:1 Bb4:1 G4:2 '+    // B  (the breeze, bars 5-6)
      'D5:1 Eb5:1 F#5:2 Eb5:1 C5:1 D5:2' },  // A' (answer home, bars 7-8)
    // quiet square harmony — sustained airy pad (thirds/fifths of each chord)
    { w:'square', v:0.07, seq:
      'F#4:2 A4:2 Eb4:2 G4:2 '+              // D | Cm
      'F#4:2 A4:2 A4:2 F#4:2 '+              // D | D
      'Bb3:2 D4:2 Eb4:2 C4:2 '+              // Gm | Cm
      'F#4:2 A4:2 F#4:2 D4:2' },             // D | D
    // triangle bass — roots and fifths under the chords
    { w:'triangle', v:0.22, seq:
      'D3:2 A2:2 C3:2 G2:2 '+                // D | Cm
      'D3:2 A2:2 D3:2 A2:2 '+                // D | D
      'G2:2 D3:2 C3:2 G2:2 '+                // Gm | Cm
      'D3:2 A2:2 D3:2 D2:2' },               // D | D (settle)
    // noise drums — sparse, breathy, rooftop breeze
    { w:'noise', v:0.05, seq:
      'x:1 -:1.5 x:0.5 -:1 x:1 -:1.5 x:0.5 -:1 '+
      'x:1 -:1.5 x:0.5 -:1 x:1 -:1.5 x:0.5 -:1 '+
      'x:1 -:1.5 x:0.5 -:1 x:1 -:1.5 x:0.5 -:1 '+
      'x:1 -:1.5 x:0.5 -:1 x:1 -:1 x:0.5 x:0.5 -:1' },
  ]
};
