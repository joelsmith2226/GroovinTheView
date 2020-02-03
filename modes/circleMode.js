var midRingRadius;
var highRingRadius;

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

function translateDrawLineReturn(x, y, tx, ty){
   translate(tx, ty);
   line(0,0, x, y);
   translate(-tx, -ty);
}


function translateDrawLineRetur2n(x, y, rad, angle, amp){
   arc(x, y, rad, rad, angle, angle + amp, OPEN)
}
