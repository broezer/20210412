let crosses = [];

function setup() {
  createCanvas(400, 400);
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      let x = 7 + (i * 40);
      let y = 7 + (j * 40);
      let w = 5;
      let h = 24;
      let b = new Cross(x, y, w, h);
      crosses.push(b);
    }
  }

}

function touchMoved() {
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].clicked(mouseX, mouseY);
  }
}

function mouseMoved() {
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(230);
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].show();
    crosses[i].animate();
  }
}

class Cross {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.animateTrigger = false;
    this.animateDirection = 'down';

    this.start = y;
    this.rotateAngle = 0;
  }

  show() {

    noStroke();
    angleMode(DEGREES);

    fill(0);

    push();
    translate(this.x + (this.h/2), this.y + (this.h/2));
    //translate(this.x, this.y);
    rotate(this.rotateAngle);
    rectMode(CENTER);
    rect(0, 0,this.h, this.h)
    //triangle(0, this.h, this.h/2, 0,this.h, this.h)
    pop();


  }

  animate() {

    if (this.animateTrigger == true) {
      if (this.animateDirection == 'down') {
        if (this.h > 0) {
          this.rotateAngle = this.rotateAngle + 20 ;
          this.h = this.h - 2;
          this.x++;
          this.y++;
        } else {
          //this.animateTrigger = false;

        }
      } else {
        if (this.h < 24) {
          this.h = this.h + 2;
          this.rotateAngle = this.rotateAngle - 20 ;
          this.x--;
          this.y--; 
        }
      }
    }
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.h / 1.4) {


      if (this.h == 24 || this.h > 24) {
        this.animateTrigger = true;
        this.animateDirection = 'down';
        //console.log('hovered');
      }
    } else {
      if (this.h == 0 || this.h < 0) {
        this.animateTrigger = true;
        this.animateDirection = 'reset';
      }

    }
  }

}
