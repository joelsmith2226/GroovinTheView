// CLASSES
class Star{
  constructor(height, width) {
    this.x = random(-width/1.5, width/1.5);
    this.y = random(-height/1.5, height/1.5);
    this.z = random(width);
    this.pz = this.z;

  }
  update() {
    this.z -= 10;
    if (this.z < 1) {
      this.x = random(-width/1.5, width/1.5);
      this.y = random(-height/1.5, height/1.5);
      this.z = random(width);
      this.pz = this.z;
    }
  }

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
