/*
 * Joel Smith
 * GroovinTheView
 * sketch.js
 * This is the main file executed for displaying object information for the web
 * application. It houses the canvas and the corresponding child objects that
 * sits on top of the canvas.
 */

/* TODO:
         - Beat detection
         - Pitch detection
         - Make circular more interesting
         - Investigate particle effects
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
var eW = 50;
var realWidth, realHeight;

// FUNCTIONS

/* preload() takes songs required within website to be loaded prior
 * to displaying for smooth operation
 */
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

/*
 * setup() is the initialisation function for the canvas, UI, default values for
 * mode operation, star creation and tempo detection initialisation. This is
 * called at the start of the program
 */
function setup() {
   setupCanvas();

   // Instantiate globals
   trackNum = 0;
   song = songs["Hey"];
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

/*
 * setupCanvas() is responsible for creating the canvas on which to draw all objects
 * as well as define display boundaries and call setupUI which sit on top of canvas
*/
function setupCanvas(){
   createCanvas(windowWidth, windowHeight);
   realWidth = windowWidth;
   realHeight = windowHeight;
   angleMode(DEGREES);
   setupUI();
}

/*
 * setupQuality() establishes the quality from the 2 sliders within the settings
 * toggle at the top right of the application. Bands is the number of bands used
 * to represent the frequency spectrum and smoothness determines relative distance
 * between bands' amplitudes (less smooth is more erratic).
*/
function setupQuality(){
   bands = Math.pow(2,qualitySlider.value());
   fft = new p5.FFT(smoothSlider.value(), bands);
}

/*
 * draw() is the main function of GTV. It is called 60 times per second. All
 * transformations (translate, scale, rotate) are reset each iteration. It is
 * responsible for drawing all of the objects ontop of the established canvas
*/
function draw() {
   background(0);
   fill(255);
   noStroke(0);

   // Check if window has been resized and requires a reset of canvas/buttons
   if (realWidth != windowWidth || realHeight != windowHeight){
      resetUI();
      setupCanvas();
   }

   // Check if settings are visible and require captions
   if (settingsTog){
      drawSettingsText();
   }

   var spectrum = fft.analyze();
   drawPeakDetection();

   // Identify which mode to draw
   if (mode == 'Circular'){
      translate(width/2, height/2);
      drawCircle(spectrum);
      translate(-width/2, -height/2);
   } else if(mode == 'Spectrum') {
      drawFlat(spectrum);
   } else if (mode == 'Wave'){
      drawWaveText();
      drawWave();
   }
   drawStars();
}

/*
 * drawWaveText() will draw the corresponding slider captions for the wave
 * sliders if in wave mode
 */
function drawWaveText(){
   textFont('Vollkorn');
   textSize(12);
   fill(220);
   let fPos = frequencySlider.position();
   text('Frequency', fPos.x + 25, fPos.y - 10);
   let aPos = ampSlider.position();
   text('Amplitude', aPos.x + 25, aPos.y - 10);
}
/*
 * drawSettingsText() will draw the corresponding slider captions for the settings
 * sliders if settings have been toggled
 */
function drawSettingsText(){
   textFont('Vollkorn');
   textSize(12);
   fill(220);
   let qPos = qualitySlider.position();
   text('Quality', qPos.x + 15, qPos.y - 10);
   let sPos = smoothSlider.position();
   text('Smoothness', sPos.x + 15, sPos.y - 10);
   let vPos = volumeSlider.position();
   text('Volume', vPos.x + 15, vPos.y - 10);
}


/*
 * displayActiveSliders() will display the setting modulators that are considered
 * active (that is, if the settings have been toggled and/or in wave mode)
 */
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

/*
 * drawPeakDetection() is part of the tempo detection algorithm which detects
 * when a peak amplitude within the frequency spectrum has been identified. This
 * theoretically will help identify the tempo of a song by measuring the time
 * between peaks. This will allow the stars in the background to move relative to
 * tempo as well as support future features involving tempo.
 */
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
   noStroke(0);
}

/*
 * updatePeakHistory() tracks the time of the last 5 peaks recorded and averages
 * the result to determine the current tempo detected.
 */
function updatePeakHistory(){
   peakHistory.push(peakTimer);
   if (peakHistory.length > 5){
      peakHistory.shift();
   }
   tempo = peakHistory.reduce((a, b) => a + b, 0)/peakHistory.length;
}
