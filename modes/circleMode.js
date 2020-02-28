/*
 * Joel Smith
 * GroovinTheView
 * circleMode.js
 * This file is responsible for the circular visualisation. It takes the FFT of
 * the input sound and rotates about an origin creating a circular visualisation.
 * Lower frequencies are the inner ring while outer rings pulse with higher frequencies
 */

var midRingRadius;
var highRingRadius;

/*
 * drawCircle() will take the fft spectrum and rotate the frequency response about
 * an origin in the centre of the canvas. 3 rings are created (thirds within the
 * frequency spectrum). Each of the rings have their own animation functions.
 */
function drawCircle(spectrum){
   noStroke();
   for (var i = 0; i < spectrum.length; i++) {
      if (i < spectrum.length/3) {
         colorMode(HSB, bands/3);
         lowFreqAnimation(i, spectrum);
      } else if (i < 2*spectrum.length/3) {
         colorMode(HSB, 2*bands/3);
         midFreqAnimation(i, spectrum);
      } else {
         colorMode(HSB, bands);
         highFreqAnimation(i, spectrum);
      }
   }
}

/*
 * lowFreqAnimation() creates the inner ring animation for the lowest 3rd of the
 * frequency spectrum. This inner ring is rotating and flipped horizontally to
 * create the full circle.
 */
function lowFreqAnimation(i, spectrum){
   rotate(rotation[0]);
   var amp = spectrum[i];
   var angle = map(i, 0, spectrum.length/3, 0, 180);
   var r = map(amp, 0, 256, 0, 100);
   var x = r * cos(angle);
   var y = r * sin(angle);
   stroke(i, 255, 255);
   line(0, 0, x, y);
   line(0, 0, -x, -y);
   rotate(-rotation[0]);
   rotation[0] += 0.1;
}

/*
 * midFreqAnimation() creates the middle ring animation for the middle 3rd of the
 * frequency spectrum. The middle and outer ring pulse with higher frequencies
 */
function midFreqAnimation(i, spectrum){
   //translate(width/2, height/2);
   rotate(rotation[1]);
   var amp = spectrum[i];
   var angle = map(i, spectrum.length/3, 2*spectrum.length/3, 0, 180);
   var r = map(amp, 0, 256, 0, 100);
   var x = r * cos(angle);
   var y = r * sin(angle);
   if (x > 0 & y > 0){
      translateDrawLineReturn(x, y, midRingRadius*x/r, midRingRadius*y/r);
      translateDrawLineReturn(-x, -y, -midRingRadius*x/r, -midRingRadius*y/r);
   }
   rotate(-rotation[1]);
   rotation[1] -= 0.1;
}

/*
 * highFreqAnimation() creates the high ring animation for the high 3rd of the
 * frequency spectrum. The middle and outer ring pulse with higher frequencies
 */
function highFreqAnimation(i, spectrum){
   //translate(width/2, height/2);
   rotate(rotation[2]);
   var amp = spectrum[i];
   var angle = map(i, 2*spectrum.length/3, spectrum.length, 0, 360);
   var r = map(amp, 0, 256, 0, 100);
   var x = r * cos(angle);
   var y = r * sin(angle);

   if (x > 0 & y > 0){
      translateDrawLineReturn(x, y, highRingRadius*x/r, highRingRadius*y/r);
      translateDrawLineReturn(-x, -y, -highRingRadius*x/r, -highRingRadius*y/r);
   }
   rotate(-rotation[2]);
   rotation[2] += 0.1;
}

/*
 * translateDrawLineReturn() creates a line starting from a distance from the
 * origin instead of at the origin by translating out at a specific angle.
 */
function translateDrawLineReturn(x, y, tx, ty){
   translate(tx, ty);
   line(0,0, x, y);
   translate(-tx, -ty);
}
