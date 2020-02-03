var FREQ;
var AMP;

function drawNotes(spectrum){
   FREQ = frequencySlider.value();
   AMP = ampSlider.value();
   let waveform = fft.waveform(1024);
   noFill();
   stroke(255);
   strokeWeight(3);
   beginShape();
   for (var i = 0; i < FREQ; i++){
      drawWaveForm(waveform, i);
   }
   endShape();
   strokeWeight(1);
}

function drawWaveForm(waveform, iter){
   var vertexes = new Array(waveform.length);
   for (var i = 0; i< waveform.length; i++){
      displacement = iter * width/FREQ;
      let x = map(i, 0, waveform.length,displacement, displacement + width/FREQ-1);
      let y = map(waveform[i], -1, 1, 0, height);
      vertex(x,y);
   }
}
