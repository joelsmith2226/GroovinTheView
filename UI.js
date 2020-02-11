var link;

function setupButtons(){
   button = createButton('Play/Pause')
   button.mousePressed(toggleSong);
   button.class('btn-custom');
   button.position(windowWidth/30, windowHeight/30);
   button.mousePressed(toggleSong);

   modeSelector= createDiv('<a><li class="selector-custom mode label dropdown">Change Modes<ul class="dropdown"><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Spectrum\')">Spectrum</a></li><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Circular\')">Circular</a></li><li> <a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Wave\')">Wave</a></li></ul></li></a>');
   nextSong = createDiv('<a><li class="selector-custom song label dropdown">Change Songs<ul class="dropdown"><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Seven nation army\')">Seven Nation Army</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'SynthSaga\')">SynthSaga</a></li><li> <a class="selector-custom song" style="width:100%" onClick="changeSong(\'Lucid dreams\')">Lucid Dreams</a></li></ul></li></a>');

   modeSelector.position(windowWidth/30, windowHeight/30 + button.height*3);
   nextSong.position(windowWidth/30, windowHeight/30 + button.height*5.5);

   // Portfolio link
   link = createA("https://joelsmith2226.github.io", "Back to portfolio");
   link.class('btn-custom portfolio');
   link.position(windowWidth-link.width*2,windowHeight/30);

   if (mode == "Wave"){
      frequencySlider = createSlider(0, 10, 100);
      frequencySlider.position(windowWidth/30 + 20, windowHeight - 80);
      frequencySlider.class('cust-slider');
      ampSlider = createSlider(-50, 10, 100);
      ampSlider.position(windowWidth/30 + 20, windowHeight - 30);
      ampSlider.class('cust-slider');
   }
}

// BUTTON FUNCTIONS //
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

function changeMode(newMode) {
   mode = newMode;
   if (mode == "Wave"){
      setupSliders();
   } else if (frequencySlider) {
      removeSliders();
   }

}

function changeSong(newSong) {
   // Early return if current song playing is selected
   if (song == songs[newSong]){
      return;
   }

   song.pause();
   song = songs[newSong];
   song.play();
   peakDetect = new p5.PeakDetect();
   peakTimer = 0;
   tempo = 200;
   peakHistory = [200];
}

function resetButtons(){
   button.remove();
   modeSelector.remove();
   nextSong.remove();
   link.remove();
   if (mode == "Wave"){
      removeSliders();
   }
}

function setupSliders(){
   if (mode == "Wave"){
      frequencySlider = createSlider(0, 10, 100);
      frequencySlider.position(windowWidth/30 + 20, windowHeight - 80);
      frequencySlider.class('cust-slider');
      ampSlider = createSlider(-50, 10, 100);
      ampSlider.position(windowWidth/30 + 20, windowHeight - 30);
      ampSlider.class('cust-slider');
   }
}

function removeSliders(){
   frequencySlider.remove();
   ampSlider.remove();
}
