var img;
var particles = [];
var numParticles = 30;
var pixDensity;

function preload() {
  img = loadImage("assets/portrait.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  //imageMode(CENTER);
  img.loadPixels();
  pixDensity = pixelDensity();

  noStroke();
  //colorMode(HSB,100);

  for (var i=0; i<numParticles; i++) {
    particles[i] = new Particle();
  }

  frameRate(15); // Limit framerate for cross-device consistency
}

function draw() {
  background(255);

  for (var i=0; i<numParticles; i++) {
    var x1 = particles[i].x;
    var y1 = particles[i].y;
    particles[i].move();
    particles[i].display();
    for (var j=i+1; j<numParticles; j++) {
      var x2 = particles[j].x;
      var y2 = particles[j].y;
      //particles[j].move();
      for (var k=j+1; k<numParticles; k++) {
        var x3 = particles[k].x;
        var y3 = particles[k].y;
        //particles[k].move();
        if (i!=j && i!=k && j!=k) {
          // Check if particles are nearby and draw triangle if they are
          var d = 100;
          if (dist(x1,y1,x2,y2)<d && dist(x1,y1,x3,y3)<d && dist(x2,y2,x3,y3)<d) {
            var aveX = (x1+x2+x3)/3;
            var aveY = (y1+y2+y3)/3;

            var c = img.get(aveX,aveY);
            fill(c[0],c[1],c[2],128);
            stroke(255);
            strokeWeight(0.5);
            triangle(x1,y1,x2,y2,x3,y3);
          } 
        }

      }
    }
  }

  text(img.get(mouseX,mouseY),mouseX,mouseY);
}

function Particle(index) {
  this.x = random(width);
  this.y = random(height);
  this.velX = random(-2,2);
  this.velY = random(-2,2);
  this.diameter = 5;
  
  colorMode(HSB,100);
  this.c = color(0, 10, 70); 
  colorMode(RGB,255);

  this.display = function() {
    //var pix = img.get(this.x, this.y);
    //fill(pix, 128);
    fill(this.c, 128);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  this.move = function() {
    // Mouse attraction
    // var pullRadius = 50;
    // if (abs(mouseX-this.x)<pullRadius && abs(mouseY-this.y)<pullRadius) {
    //   var pullX = constrain(mouseX-this.x, -2, 2);
    //   var pullY = constrain(mouseY-this.y, -2, 2);
    //   this.velX = constrain(this.velX+pullX, -5, 5);
    //   this.velY = constrain(this.velY+pullY, -5, 5); 
    // }

    // Update
    this.x = constrain(this.x + this.velX, 0, width);
    this.y = constrain(this.y + this.velY, 0, height);

    // Border collision
    if (this.x >= width || this.x <= 0) {
      this.velX = -this.velX;
    }
    if (this.y >= width || this.y <= 0) {
      this.velY = -this.velY;
      
    }

  }

  this.checkMouse = function() {
    if (abs(this.y-mouseY)<catchSize*4 && abs(this.x-mouseX)<catchSize*4) {
      ;
    } 
  }

}
