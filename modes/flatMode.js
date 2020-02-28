/*
 * Joel Smith
 * GroovinTheView
 * flatMode.js
 * This file is responsible for the spectrum visualisation. It takes the FFT of
 * the input sound and converts this spectrum into a banded visualisation mirrored
 * at the lowest band frequency to create a traditional music visualisation.
 */

 /*
  * drawFlat() will take the fft spectrum and generate a series of rectangular
  * bands determined by the quality slider. These bands vary in amplitudes based
  * on the intensity of that specific frequency spectral component.
  */
function drawFlat(spectrum){
   colorMode(HSB, bands);
   var w = width / (bands * 1.5);
   var maxF = Math.max(spectrum);
   for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 255, height, 10);
      fill(i,255,255);
      rect(width/2 + i*w,y,w-2,height-y);
      rect(width/2 - i*w,y,w-2,height-y);
   }
}
