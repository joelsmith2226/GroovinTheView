// Joel Smith
// GroovinTheView

/* TODO: - sort out different device displays such as mobile
         - Star speed in response to Music [x]
         - Beat detection
         - Pitch detection
         - Fix amp modulation
         - Make circular more interesting
         - Investigate particle effects
         - Integrate this repo with portfolio website
         - rotation speed response to tempo
*/
// GLOBALS
var fft, peakDetect, bands;
var button, modeSelector, nextSong, frequencySlider, ampSlider;
var songs, mode, tempo, peakTimer, peakHistory;
var rotation, stars;

// temp GLOBALS
var eW = 50;
var realWidth, realHeight;

// FUNCTIONS
function preload() {
   // song1 = loadSound('songs/can-you-feel-it.mp3');
   song2 = loadSound('songs/lucid-dreams.mp3');
   song3 = loadSound('songs/seven-nation-army.mp3');
   song4 = loadSound('songs/SynthSaga.mp3');
   songs = {"Lucid dreams":song2,
            "Seven nation army":song3, "SynthSaga":song4};
}

function setup() {
   setupCanvas();

   // Instantiate globals
   trackNum = 0;
   song = songs["SynthSaga"];
   mode = 'Spectrum';

   // Spectrum variables
   bands = 128;
   fft = new p5.FFT(0.78, bands);

   // Transformation variables
   rotation = [0,0,0];
   midRingRadius = height/5;
   highRingRadius = height/3;

   // Stars
   stars = new Array(400);
   for (var i = 0; i < 400; i++){
      stars[i] = new Star(windowHeight, windowWidth);
   }

   // Tempo detection
   peakDetect = new p5.PeakDetect();
   peakTimer = 0;
   peakHistory = [];
   tempo = 100;
}

function setupCanvas(){
   createCanvas(windowWidth, windowHeight);
   realWidth = windowWidth;
   realHeight = windowHeight;
   angleMode(DEGREES);
   setupButtons();
}

function draw() {
   background(0);
   fill(255);
   noStroke(0);

   if (realWidth != windowWidth || realHeight != windowHeight){
      resetButtons();
      setupCanvas();
   }

   var spectrum = fft.analyze();

   drawPeakDetection();

   if (mode == 'Circular'){
      translate(width/2, height/2);
      drawCircle(spectrum);
      translate(-width/2, -height/2);
   } else if(mode == 'Spectrum') {
      drawFlat(spectrum);
   } else if (mode == 'Wave'){
      textFont('Vollkorn');
      textSize(12);
      fill(100);
      let fPos = frequencySlider.position();
      text('WAVE FREQUENCY', fPos.x + 15, fPos.y - 10);
      textSize(12);
      fill(100);
      let aPos = ampSlider.position();
      text('WAVE AMPLITUDE', aPos.x + 15, aPos.y - 10);
      drawNotes(spectrum);
   }
   drawStars()
}

function updatePeakHistory(){
   peakHistory.push(peakTimer);
   if (peakHistory.length > 5){
      peakHistory.shift();
   }
   tempo = peakHistory.reduce((a, b) => a + b, 0)/peakHistory.length;
   console.log(peakHistory);
}

function drawPeakDetection(){
   peakDetect.update(fft);
   if (peakDetect.isDetected) {
      if (peakTimer < 300 && peakTimer > 10){
         updatePeakHistory();
      }
      eW = 50;
      peakTimer = 0;
   } else {
      peakTimer += 1;
      eW *= 0.95;
   }
   textSize(12);
   fill(255);
   // text(peakTimer, 200, 10);
   // ellipse(200, 40, eW, eW);
   noStroke(0);
}
