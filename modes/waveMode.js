/*
 * Joel Smith
 * GroovinTheView
 * waveMode.js
 * This file is responsible for the waveform visualisation. It takes the FFT of
 * the input sound and converts this analysis to a sound waveform ready for display.
 * It has the capacity for frequency and amplitude modification.
 */

var FREQ;
var AMP;

/*
 * drawWave() will take the fft and create a waveform. Then using this waveform
 * object, vertexes will be mapped to canvas coordinates to draw a linear polygon
 * reflecting the soundwave.
 */
function drawWave(){
   FREQ = frequencySlider.value();
   AMP = 1 - ampSlider.value();
   let waveform = fft.waveform(1024);
   noFill();
   stroke(255);
   strokeWeight(3);
   beginShape();
   for (var i = 0; i < FREQ; i++){
      drawVertexes(waveform, i);
   }
   endShape();
   strokeWeight(1);
}

/*
 * drawVertexes() will take the waveform object and create vertexes that are
 * mapped to canvas coordinates to draw a linear polygon reflecting the soundwave.
 */
function drawVertexes(waveform, iter){
   var vertexes = new Array(waveform.length);
   for (var i = 0; i< waveform.length; i++){
      displacement = iter * width/FREQ;
      let x = map(i, 0, waveform.length,displacement, displacement + width/FREQ-1);
      let y = map(waveform[i], -AMP, AMP, 0, height);
      vertex(x,y);
   }
}
