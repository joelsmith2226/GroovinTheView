# GroovinTheView

## Overview
Groovin' The View is a music visualizer that takes the spectral components of songs and creates fun visuals. Written in javascript using P5 libraries.
Visit it at [joelsmith2226.github.io/GroovinTheView](https://joelsmith2226.github.io/GroovinTheView)

## Features
#### Modes
Currently, three different visualisation modes have been generated. 

1. **Spectrum** is the frequency spectrum generated using an FFT of the input sound file and creating a mirror image of the resultant transform. 

|**Spectrum Mode**           |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/spectrum1.gif" width="600" height="280">|

2. **Circular** takes the frequency spectrum and rotates about an orign to develop a circular waveform. Higher frequencies are extracted from the inner ring to create 2 separate outer rings that pulse in and out depending on the incoming frequencies. 

|**Circular**                |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/circle1.gif" width="600" height="280">|

3. **Wave** is the sound waveform of the incoming sound file.

|**Wave**                     |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/wave1.gif" width="600" height="280">|

#### Modulations
At the top right of the visualiser are 3 slider modulators.

1. **Quality** will determine the number of bands within the frequency spectrum that are mapped to create the visualisation. The more bands, the higher the quality of the resultant spectrum.

|**Quality**           |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/spectrum2_quality.gif" width="600" height="280">|

2. **Smoothness** will determine the amount of 'smoothing' the FFT will incorporate when producing spectrum by decreasing the relative difference between neighbouring frequency bands. Less smoothing promotes more jagged and sudden changes within the visualisation.

|**Smoothness**                |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/spectrum3_smooth.gif" width="600" height="280">|

3. **Volume** will change the overall amplitude of the frequency response.

|**Volume**                     |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/spectrum4_volume.gif" width="600" height="280">|

When in **Wave** mode, additional modulators become available in the bottom left.
**Frequency** changes the repetitions of the single waveform within the visualisation and **Amplitude** will change the heights reached by the waveform.

|**Frequency and Amplitude**                     |
| :---: |
|<img src="https://github.com/joelsmith2226/GroovinTheView/blob/master/assets/gifs/wave1.gif" width="600" height="280">|

## Future Features ##
- Reading sound input from computer sound output
- Improved tempo detection
- Particle effects
- Pitch detection for more interesting visualisations
- More transformations relational to tempo
