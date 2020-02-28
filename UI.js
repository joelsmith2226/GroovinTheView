function setupUI(){
   setupLinks();
   setupButtons();
   setupSelectors();
   setupSliders();
   displayActiveSliders();
}

function setupButtons(){
   playPauseTog = createButton('Play/Pause')
   playPauseTog.mousePressed(toggleSong);
   playPauseTog.class('btn-custom');
   playPauseTog.position(windowWidth/30, windowHeight/30);
   settingsTogButton = createButton('')
   settingsTogButton.html('<i class="fa fa-cogs"  style="font-size:24px;"></i>')
   settingsTogButton.mousePressed(toggleSettings);
   settingsTogButton.class('btn-custom settings');
   settingsTogButton.position(windowWidth-link.width*1.5,windowHeight/30 + 70);
}

function setupSelectors(){
   modeSelector= createDiv('<a><li class="selector-custom mode label dropdown">Change Modes<ul class="dropdown"><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Spectrum\')">Spectrum</a></li><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Circular\')">Circular</a></li><li> <a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Wave\')">Wave</a></li></ul></li></a>');
   nextSong = createDiv('<a><li class="selector-custom song label dropdown">Change Songs<ul class="dropdown"><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Hey\')">Hey</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Seven nation army\')">Seven Nation Army</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'SynthSaga\')">SynthSaga</a></li><li> <a class="selector-custom song" style="width:100%" onClick="changeSong(\'Lucid dreams\')">Lucid Dreams</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Daddy, He Got A Tesla\')">Daddy, He Got A Tesla</a></li>');
   modeSelector.position(windowWidth/30, windowHeight/30 + playPauseTog.height*3);
   nextSong.position(windowWidth/30, windowHeight/30 + playPauseTog.height*5.5);
}

function setupLinks(){
   // Portfolio link
   link = createA("https://joelsmith2226.github.io", "Back to portfolio");
   link.class('btn-custom portfolio');
   link.position(windowWidth-link.width*2,windowHeight/30);
}

function setupSliders(){
   frequencySlider = createSlider(1, 10, 10, 1);
   frequencySlider.position(windowWidth/30 + 20, windowHeight - 80);
   frequencySlider.class('cust-slider');
   ampSlider = createSlider(-10, 0.4, 0.1, 0.02);
   ampSlider.position(windowWidth/30 + 20, windowHeight - 30);
   ampSlider.class('cust-slider');
   qualitySlider = createSlider(4, 9, 8, 1);
   qualitySlider.position(windowWidth-link.width*2, windowHeight/30 + 150);
   qualitySlider.class('cust-slider');
   qualitySlider.changed(setupQuality);
   qualitySlider.size(link.width*1.5);
   smoothSlider = createSlider(0, 0.99, 0.78, 0.02);
   smoothSlider.position(windowWidth-link.width*2, windowHeight/30 + 190);
   smoothSlider.class('cust-slider');
   smoothSlider.changed(setupQuality);
   smoothSlider.size(link.width*1.5);
   volumeSlider = createSlider(0, 1, 0.8, 0.02);
   volumeSlider.position(windowWidth-link.width*2, windowHeight/30 + 230);
   volumeSlider.class('cust-slider');
   volumeSlider.changed(changeVolume);
   volumeSlider.size(link.width*1.5);
   drawSettingsText();
}

// playPauseTog FUNCTIONS //
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

function toggleSettings(){
   settingsTog = !settingsTog;
   displayActiveSliders();
}

function changeMode(newMode) {
   mode = newMode;
   displayActiveSliders();
}

function changeSong(newSong) {
   // Early return if current song playing is selected
   if (song == songs[newSong]){
      return;
   }

   // if (newSong == "computer"){
   //    var audioIn = new p5.AudioIn();
   //    console.log(audioIn.getSources());
   //    audioIn.start();
   //    return
   // }
   song.pause();
   song = songs[newSong];
   song.play();
   peakDetect = new p5.PeakDetect();
   peakTimer = 0;
   tempo = 200;
   peakHistory = [200];
}

function changeVolume(){
   masterVolume(volumeSlider.value(), 0.3);
}

// SHOW/HIDE SLIDERS
function showWaveSliders(){
   ampSlider.show();
   frequencySlider.show();
}

function hideWaveSliders(){
   ampSlider.hide();
   frequencySlider.hide();
}

function showSettingSliders(){
   smoothSlider.show();
   qualitySlider.show();
   volumeSlider.show();
}

function hideSettingSliders(){
   smoothSlider.hide();
   qualitySlider.hide();
   volumeSlider.hide();
}

// RESET UI

function resetButtons(){
   playPauseTog.remove();
   settingsTogButton.remove();
   modeSelector.remove();
   nextSong.remove();
   link.remove();
   removeSliders();

}

function removeSliders(){
   qualitySlider.remove();
   smoothSlider.remove();
   volumeSlider.remove();
   frequencySlider.remove();
   ampSlider.remove();
}
