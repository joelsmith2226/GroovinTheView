/*
 * Star is the class that represents the shooting stars travelling in the background
 * of GTV. There are up to 400 stars being generated at a time and are to be travelling
 * at varying velocities radially from the center of the screen. This is intended
 * to mimic 'lightspeed' effects seen in Star Wars. Each star is simply a small line
 * between two points on it's trajectory which increases in size as it speeds up
 * creating the illusion of increased speed.
*/
class Star{
   /*
    * Star constructor:
    *    x: width within the canvas the star is initialised to at random
    *    y: height within the canvas the star is initialised to at random
    *    z: represents the velocity the star is travelling (which mimics depth)
    *    pz: tracks the previous z in order to draw the line mimicking lightspeed
    */
   constructor(height, width) {
      this.x = random(-width/1.5, width/1.5);
      this.y = random(-height/1.5, height/1.5);
      this.z = random(width);
      this.pz = this.z;

   }

   /*
    * update() is called within the draw() method (60 times/s) which will calculate
    * the new position of the star which is relative to the tempo of the song.
    * When z < 1, it has left the screen and needs to be reset
    */
   update() {
      this.z -= 300/tempo;
      if (this.z < 1) {
         this.x = random(-width/1.5, width/1.5);
         this.y = random(-height/1.5, height/1.5);
         this.z = random(width);
         this.pz = this.z;
      }
   }

   /*
    * show() will draw the line representing the old position and new position of
    * the star. The faster it is travelling, the longer the line will be (but the
    * quicker it will leave the canvas).
    */
   show() {
      fill(255);
      noStroke();
      let sx = map(this.x/this.z, 0, 1, 0, width);
      let sy = map(this.y/this.z, 0, 1, 0, height);
      let r = map(this.z, 0, width, 8, 0);
      //ellipse(sx, sy, r, r);
      stroke(255);
      let px = map(this.x/this.pz, 0, 1, 0, width);
      let py = map(this.y/this.pz, 0, 1, 0, height);
      line(px,py, sx, sy);
      this.pz = this.z;
   }
}

/*
 * drawStarts() will draw all star objects within the canvas
 */
function  drawStars() {
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}
