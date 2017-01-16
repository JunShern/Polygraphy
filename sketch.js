var img;
var smallPoint, largePoint;
var particles = [];
var numParticles = 100;

function preload() {
  img = loadImage("assets/portrait.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  imageMode(CENTER);
  img.loadPixels();

  noStroke();
  //colorMode(HSB,100);

  for (var i=0; i<numParticles; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);

  for (var i=0; i<numParticles; i++) {
    particles[i].move();
    particles[i].display();
  }
}

function Particle(index) {
  this.x = random(width);
  this.y = random(height);
  this.velX = random(-5,5);
  this.velY = random(-5,5);
  this.diameter = 5;
  
  this.c = color(0, 0, 0); 

  this.display = function() {
    //var pix = img.get(this.x, this.y);
    //fill(pix, 128);
    fill(this.c, 128);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  this.move = function() {
    if (this.x > width || this.x < 0) {
      this.velX = -this.velX;
      this.x = constrain(this.x, 0, width);
    }
    if (this.y > width || this.y < 0) {
      this.velY = -this.velY;
      this.y = constrain(this.y, 0, width);
    }
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
  }

  this.checkMouse = function() {
    if (abs(this.y-mouseY)<catchSize*4 && abs(this.x-mouseX)<catchSize*4) {
      ;
    } 
  }

}
