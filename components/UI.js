/*
 * Joel Smith
 * GroovinTheView
 * UI.js
 * This file is responsible for all the UI elements within the application
 * (buttons, sliders, links)
 */

/*
 * setupUI() is called in setup() of sketch.js aswell as when a reset is needed
 * after a display change.
 */
function setupUI(){
   setupLinks();
   setupButtons();
   setupSelectors();
   setupSliders();
   displayActiveSliders();
}

/*
 * setupButtons() sets up the play/pause toggle and settings button toggle.
 * It determines the positioning, css class and functions that are executed
 * upon mouse press.
 */
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

/*
 * setupSelectors() sets up the change song and change mode selectors. This
 * required specific html/css class to produce the specific aesthetic required.
 */
function setupSelectors(){
   modeSelector= createDiv('<a><li class="selector-custom mode label dropdown">Change Modes<ul class="dropdown"><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Spectrum\')">Spectrum</a></li><li><a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Circular\')">Circular</a></li><li> <a class="selector-custom mode" style="width:100%" onClick="changeMode(\'Wave\')">Wave</a></li></ul></li></a>');
   nextSong = createDiv('<a><li class="selector-custom song label dropdown">Change Songs<ul class="dropdown"><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Hey\')">Hey</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Seven nation army\')">Seven Nation Army</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'SynthSaga\')">SynthSaga</a></li><li> <a class="selector-custom song" style="width:100%" onClick="changeSong(\'Lucid dreams\')">Lucid Dreams</a></li><li><a class="selector-custom song" style="width:100%" onClick="changeSong(\'Daddy, He Got A Tesla\')">Daddy, He Got A Tesla</a></li>');
   modeSelector.position(windowWidth/30, windowHeight/30 + playPauseTog.height*3);
   nextSong.position(windowWidth/30, windowHeight/30 + playPauseTog.height*5.5);
}

/*
 * setupLinks() sets up the return to portfolio link in the top right of the
 * application
 */
function setupLinks(){
   // Portfolio link
   link = createA("https://joelsmith2226.github.io", "Back to portfolio");
   link.class('btn-custom portfolio');
   link.position(windowWidth-link.width*2,windowHeight/30);
}

/*
 * setupSliders() sets up the wavesliders (frequency, amplitude) and settings
 * sliders (quality, smoothness, volume).
 */
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

/*
 * toggleSong() is the function called when the play/pause button is pressed.
 * It will play/pause the current song and reset tempo detection if pause
 */
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

/*
 * toggleSettings() is the function called when the settings button is pressed.
 * It will in turn display/hide the corresponding settings sliders.
 */
function toggleSettings(){
   settingsTog = !settingsTog;
   displayActiveSliders();
}

/*
 * changeMode() is the function called when the new mode is selected. It calls
 * displayActiveSliders() as changing to/from wave mode will alter which sliders
 * are displayed.
 */
function changeMode(newMode) {
   mode = newMode;
   displayActiveSliders();
}

/*
 * changeSong() is the function called when the new song is selected from the song
 * list. If the currently played song is selected, this will do nothing. It will
 * also reset the tempo detection.
 */
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

/*
 * changeVolume() is the function called when volume slider is altered.
 */
function changeVolume(){
   masterVolume(volumeSlider.value(), 0.3);
}

/*
 * showWaveSliders() will display the amplitude and frequency sliders in the
 * bottom left of the application which occurs when in wave mode
 */
function showWaveSliders(){
   ampSlider.show();
   frequencySlider.show();
}

/*
 * hideWaveSliders() will hide the amplitude and frequency sliders in the
 * bottom left of the application which occurs when in wave mode
 */
function hideWaveSliders(){
   ampSlider.hide();
   frequencySlider.hide();
}

/*
 * showSettingSliders() will show the smooth, quality and volume sliders in the
 * top right of the application which occurs when settings button is toggled.
 */
function showSettingSliders(){
   smoothSlider.show();
   qualitySlider.show();
   volumeSlider.show();
}

/*
 * hideSettingSliders() will hide the smooth, quality and volume sliders in the
 * top right of the application which occurs when settings button is toggled.
 */
function hideSettingSliders(){
   smoothSlider.hide();
   qualitySlider.hide();
   volumeSlider.hide();
}

// RESET UI
/*
 * resetUI() will remove the buttons, links, selectors, sliders. This would occur
 * when a display change has occurred and the UI needs to be relocated, and re-setup.
 */
function resetUI(){
   playPauseTog.remove();
   settingsTogButton.remove();
   modeSelector.remove();
   nextSong.remove();
   link.remove();
   removeSliders();
}

/*
 * removeSliders() will remove the sliders. This would occur when a display
 * change has occurred and the sliders needs to be relocated, and re-setup.
 */
function removeSliders(){
   qualitySlider.remove();
   smoothSlider.remove();
   volumeSlider.remove();
   frequencySlider.remove();
   ampSlider.remove();
}
