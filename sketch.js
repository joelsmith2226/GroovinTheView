// Joel Smith
// Music Visualizer

// GLOBALS
var fft;
var button;
var shapeButton;
var nextSong;
var modes;
var mode;
var w;
var songs;
var trackNum;
var rotation;
var magnify;
var magDir;
var midRingRadius;
var highRingRadius;
var bands;
var stars;

// FUNCTIONS
function toggleSong() {
   if (song.isPlaying()){
      song.pause();
   } else {
      song.play()
   }
}

function toggleMode() {
   currMode = modes.indexOf(mode);
   mode = modes[(currMode + 1) % modes.length];
}

function preload() {
   song1 = loadSound('can-you-feel-it.mp3');
   song2 = loadSound('lucid-dreams.mp3');
   song3 = loadSound('seven-nation-army.mp3');
   song4 = loadSound('SynthSaga.mp3');
   songs = [song1, song2, song3, song4]
}

function changeSong() {
   trackNum += 1
   if (trackNum >= songs.length){
      trackNum = 0;
   }
   song.pause();
   song = songs[trackNum];
   song.play();
}

function setup() {
   createCanvas(windowWidth, windowHeight-40);
   angleMode(DEGREES);
   setupButtons();

   // Instantiate globals
   trackNum = 0;
   song = songs[trackNum];
   modes = ['flat', 'circle', 'notes']
   mode = 'flat';

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
   button = createButton('On/Off')
   button.mousePressed(toggleSong);
   shapeButton = createButton('Change Modes');
   shapeButton.mousePressed(toggleMode);
   button.mousePressed(toggleSong);
   nextSong = createButton("Next Song")
   nextSong.mousePressed(changeSong);
   button.position(width/2 - button.width, height);
   shapeButton.position(width/2, height);
   nextSong.position(width - nextSong.width, height);
}


function draw() {
   background(0);
   var spectrum = fft.analyze();
   noStroke(0);
   if (mode == 'circle'){
      translate(width/2, height/2);
      drawCircle(spectrum);
      translate(-width/2, -height/2);
   } else if(mode == 'flat') {
      drawFlat(spectrum);
   } else if (mode == 'notes'){
      drawNotes(spectrum);
   }
   drawStars()
}
