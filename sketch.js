// Joel Smith
// Music Visualizer

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
var w, rotation, stars;

// temp GLOBALS
var eW = 50;

// FUNCTIONS
function toggleSong() {
   if (song.isPlaying()){
      song.pause();
   } else {
      song.play();
      peakTimer = 0;
      tempo = 200;
      peakHistory = [];
   }
}

function changeMode() {
   mode = modeSelector.value();
   if (mode == "Wave"){
      frequencySlider = createSlider(0, 10, 100);
      frequencySlider.position(10, 130);
      frequencySlider.style('width', '80px');
      ampSlider = createSlider(-50, 10, 100);
      ampSlider.position(10, 180);
      ampSlider.style('width', '80px');
   } else if (frequencySlider){
      frequencySlider.remove();
      ampSlider.remove();
   }
}

function preload() {
   song1 = loadSound('songs/can-you-feel-it.mp3');
   song2 = loadSound('songs/lucid-dreams.mp3');
   song3 = loadSound('songs/seven-nation-army.mp3');
   song4 = loadSound('songs/SynthSaga.mp3');
   songs = {"Can you feel it":song1, "Lucid dreams":song2,
            "Seven nation army":song3, "SynthSaga":song4};
}

function changeSong() {
   song.pause();
   song = songs[nextSong.value()];
   song.play();
   peakDetect = new p5.PeakDetect();
   peakTimer = 0;
   tempo = 200;
   peakHistory = [200];
}

function setup() {
   createCanvas(displayWidth, displayHeight);
   angleMode(DEGREES);
   setupButtons();

   // Instantiate globals
   trackNum = 0;
   song = songs["Can you feel it"];
   mode = 'Spectrum';

   // Spectrum variables
   bands = 128;
   fft = new p5.FFT(0.78, bands);

   w = width / (bands * 1.5);

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

function setupButtons(){
   button = createButton('Play/Pause')
   button.mousePressed(toggleSong);
   modeSelector = createSelect('Change Modes');
   modeSelector.option('Spectrum');
   modeSelector.option('Circular');
   modeSelector.option('Wave');
   modeSelector.changed(changeMode);
   button.mousePressed(toggleSong);
   nextSong = createSelect("Next Song");
   nextSong.option('Can you feel it');
   nextSong.option('Lucid dreams');
   nextSong.option('Seven nation army');
   nextSong.option('SynthSaga');
   nextSong.changed(changeSong);
   button.position(10, 10);
   modeSelector.position(10, 50);
   nextSong.position(10, 90);
}

function draw() {
   background(0);
   var spectrum = fft.analyze();
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
   text(peakTimer, 200, 10);
   ellipse(200, 40, eW, eW);
   noStroke(0);

   if (mode == 'Circular'){
      translate(width/2, height/2);
      drawCircle(spectrum);
      translate(-width/2, -height/2);
   } else if(mode == 'Spectrum') {
      drawFlat(spectrum);
   } else if (mode == 'Wave'){
      textSize(12);
      fill(255);
      text('Wave Frequency', 10, 170);
      textSize(12);
      fill(255);
      text('Wave Amplitude', 10, 220);
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
