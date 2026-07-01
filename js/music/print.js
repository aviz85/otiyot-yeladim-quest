/* print theme — בית הדפוס: mechanical driving Cm 140bpm, machine rhythm.
   8 bars (32 beats), chords per bar: Cm Cm Ab Bb | Cm Fm G Cm */
'use strict';
MUSIC.tracks.print = {
  bpm: 140,
  ch: [
    { w:'square', v:0.13, seq:
      // A: hammering question on Cm
      'C5:0.5 C5:0.5 Eb5:1 G5:1 Eb5:1 '+
      'C5:0.5 C5:0.5 Eb5:1 D5:1 C5:1 '+
      // B: answer climbing over Ab -> Bb
      'Ab4:0.5 Ab4:0.5 C5:1 Eb5:1 C5:1 '+
      'Bb4:0.5 Bb4:0.5 D5:1 F5:1 D5:1 '+
      // A again
      'C5:0.5 C5:0.5 Eb5:1 G5:1 Eb5:1 '+
      // cadence: Fm -> G -> Cm landing
      'F5:0.5 F5:0.5 Ab5:1 G5:1 F5:1 '+
      'G5:1 F5:1 D5:1 B4:1 '+
      'C5:1.5 G4:0.5 C5:2' },
    { w:'square', v:0.07, seq:
      'G4:2 Eb4:2 G4:2 Eb4:2 '+
      'Ab4:2 Eb4:2 F4:2 D4:2 '+
      'G4:2 Eb4:2 Ab4:2 F4:2 '+
      'F4:2 D4:2 Eb4:2 C4:2' },
    { w:'triangle', v:0.22, seq:
      // pumping machine eighths: root-root-fifth-root
      'C3:0.5 C3:0.5 G2:0.5 C3:0.5 C3:0.5 C3:0.5 G2:0.5 C3:0.5 '+
      'C3:0.5 C3:0.5 G2:0.5 C3:0.5 C3:0.5 C3:0.5 G2:0.5 C3:0.5 '+
      'Ab2:0.5 Ab2:0.5 Eb3:0.5 Ab2:0.5 Ab2:0.5 Ab2:0.5 Eb3:0.5 Ab2:0.5 '+
      'Bb2:0.5 Bb2:0.5 F3:0.5 Bb2:0.5 Bb2:0.5 Bb2:0.5 F3:0.5 Bb2:0.5 '+
      'C3:0.5 C3:0.5 G2:0.5 C3:0.5 C3:0.5 C3:0.5 G2:0.5 C3:0.5 '+
      'F2:0.5 F2:0.5 C3:0.5 F2:0.5 F2:0.5 F2:0.5 C3:0.5 F2:0.5 '+
      'G2:0.5 G2:0.5 D3:0.5 G2:0.5 G2:0.5 G2:0.5 D3:0.5 G2:0.5 '+
      'C3:0.5 C3:0.5 G2:0.5 Bb2:0.5 C3:2' },
    { w:'noise', v:0.06, seq:
      // press chug x7 bars + fill bar
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 -:0.5 x:0.5 x:0.5 '+
      'x:0.5 x:0.5 x:0.5 x:0.5 x:0.25 x:0.25 x:0.25 x:0.25 x:1' },
  ]
};
