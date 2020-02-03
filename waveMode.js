function drawNotes(spectrum){
   let waveform = fft.waveform();
   var vertexes = new Array(waveform.length);
   for (var i = 0; i< waveform.length; i++){
     let x = map(i, 0, waveform.length, 0, width);
     let y = map( waveform[i], -1, 1, 0, height);
     vertexes.push((x,y));
   }
   noFill();
   stroke(255);
   strokeWeight(1);
   drawWaveForm(vertexes);
}

function drawWaveForm(vertexes){
   beginShape();
   for (var i = 0; i< vertexes.length; i++){
      vertex(vertexes[i]);
   }
   endShape();
}
