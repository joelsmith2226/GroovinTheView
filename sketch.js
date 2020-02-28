// Joel Smith
// GroovinTheView

/* TODO: - sort out different device displays such as mobile [x]
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

//UI globals
var playPauseTog, modeSelector, nextSong, link, settingsTogButton;
var frequencySlider, ampSlider, qualitySlider, smoothSlider, volumeSlider;
var songs, mode, tempo, peakTimer, peakHistory;
var rotation, stars;
var settingsTog = false;

// temp GLOBALS
var eW = 50;
var realWidth, realHeight;

// FUNCTIONS
function preload() {
   song1 = loadSound('songs/hey.mp3');
   song2 = loadSound('songs/lucid-dreams.mp3');
   song3 = loadSound('songs/seven-nation-army.mp3');
   song4 = loadSound('songs/SynthSaga.mp3');
   song5 = loadSound('songs/tesla.mp3');
   songs = {"Hey":song1,
            "Lucid dreams":song2,
            "Seven nation army":song3,
            "SynthSaga":song4,
            "Daddy, He Got A Tesla":song5
           };
}

function setup() {
   setupCanvas();

   // Instantiate globals
   trackNum = 0;
   song = songs["SynthSaga"];
   mode = 'Spectrum';

   // Spectrum variables
   setupQuality();

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
   setupUI();
}

function setupQuality(){
   bands = Math.pow(2,qualitySlider.value());
   fft = new p5.FFT(smoothSlider.value(), bands);
}

function draw() {
   background(0);
   fill(255);
   noStroke(0);

   if (realWidth != windowWidth || realHeight != windowHeight){
      resetButtons();
      setupCanvas();
   }

   if (settingsTog){
      drawSettingsText();
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
      drawWaveText();
      drawNotes(spectrum);
   }
   drawStars();
}

function displayActiveSliders(){
   if (settingsTog){
      showSettingSliders();
   } else {
      hideSettingSliders();
   }

   if (mode == "Wave"){
      showWaveSliders();
   } else {
      hideWaveSliders();
   }
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

function drawWaveText(){
   textFont('Vollkorn');
   textSize(12);
   fill(220);
   let fPos = frequencySlider.position();
   text('Frequency', fPos.x + 25, fPos.y - 10);
   let aPos = ampSlider.position();
   text('Amplitude', aPos.x + 25, aPos.y - 10);
}

function drawSettingsText(){
   textFont('Vollkorn');
   textSize(12);
   fill(220);
   let qPos = qualitySlider.position();
   console.log(qPos);
   text('Quality', qPos.x + 15, qPos.y - 10);
   let sPos = smoothSlider.position();
   text('Smoothness', sPos.x + 15, sPos.y - 10);
   let vPos = volumeSlider.position();
   text('Volume', vPos.x + 15, vPos.y - 10);
}
