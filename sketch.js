// Joel Smith
// Music Visualizer

// GLOBALS
var fft;
var button;
var modeSelector;
var nextSong;
var songs;
var mode;
var w;
var rotation;
var bands;
var stars;
var frequencySlider;

// FUNCTIONS
function toggleSong() {
   if (song.isPlaying()){
      song.pause();
   } else {
      song.play();
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
   song1 = loadSound('can-you-feel-it.mp3');
   song2 = loadSound('lucid-dreams.mp3');
   song3 = loadSound('seven-nation-army.mp3');
   song4 = loadSound('SynthSaga.mp3');
   songs = {"Can you feel it":song1, "Lucid dreams":song2,
            "Seven nation army":song3, "SynthSaga":song4};
}

function changeSong() {
   song.pause();
   console.log(nextSong.value());
   song = songs[nextSong.value()];
   song.play();
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
