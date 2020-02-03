function drawFlat(spectrum){
   colorMode(HSB, bands);
   var maxF = Math.max(spectrum);
   for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 255, height, 10);
      fill(i,255,255);
      rect(width/2 + i*w,y,w-2,height-y);
      rect(width/2 - i*w,y,w-2,height-y);
   }
}
