var particles = [];
var numParticles = 0;
var bgColor;

function preload() {
  font = loadFont('assets/BreeSerif-Regular.ttf');
}

function setup() {
  createCanvas(1000,1000); 
  textAlign(CENTER,CENTER);

  for (var k = 0; k < numParticles; k++) {
    particles[k] = new Particle();
  }
  frameRate(15); // Limit framerate for cross-device consistency

  bgColor = color(180,0,0);
}

function draw() {
  background(bgColor);
  // clear();
 
 // dottedLine(50,50,mouseX,mouseY);
  for (var k = 0; k < numParticles; k++) {
    var partner = particles[k].partnerIndex;
    particles[k].display();
    // particles[k].move();
    // Draw line from previous particle
    // if (k != 0) {
    //   dottedLine(particles[k-1].x, particles[k-1].y, particles[k].x, particles[k].y);
    // }
    floor(random(2))*2 - 1
    for (var i=k; i<numParticles; i++) {
      if (i===k) {
        continue;
      } 
      // Draw line to partner
      d = distance(particles[k].x, particles[k].y, particles[i].x, particles[i].y);
      if ((d>0) && (d<150)) {
        strokeWeight(2);
        stroke(particles[k].c);
        fill(particles[k].c);
        // Distance
        var xpos1 = particles[k].stringPos(1).x;
        var ypos1 = particles[k].stringPos(1).y;
        var xpos2 = particles[i].stringPos(0).x;
        var ypos2 = particles[i].stringPos(0).y;
        ellipse(xpos1,ypos1,5,5);
        ellipse(xpos2,ypos2,5,5);
        if (particles[k].direction == 1) {
          dottedLine(xpos1, ypos1, xpos2, ypos2);
          if (d > 100) {
            var tString = nf(d, 0, 2);
            strokeWeight(1);
            textSize(12);
            text(tString, (xpos1 + xpos2)/2, (ypos1 + ypos2)/2);            
          }
        } else {
          line(xpos1, ypos1, xpos2, ypos2);
        }
        continue;
      }
    }
  }
  push();
  fill(255);
  stroke(bgColor);
  strokeWeight(20);
  textFont(font, 150);
  text('BLUEPRINTS', width/2, height/2);
  pop();
}

function distance(x1, y1, x2, y2) {
  return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}

function dottedLine(x1, y1, x2, y2) {
  var segmentLength = 10;
  var angle = atan2(y2-y1, x2-x1);
  var finalDistance = distance(x1,y1,x2,y2);
  var startX = x1;
  var startY = y1;
  var x2 = x1 + segmentLength*cos(angle);
  var y2 = y1 + segmentLength*sin(angle);
  while (distance(startX,startY,x2,y2) < finalDistance) {
    line(x1,y1,x2,y2);
    x1 += segmentLength*2*cos(angle);
    y1 += segmentLength*2*sin(angle);
    x2 += segmentLength*2*cos(angle);
    y2 += segmentLength*2*sin(angle);
  }
}

function Particle(index) {
  this.x = random(width);
  this.y = random(height);
  this.numberOfEllipses = int(random(1,4));
  this.direction = floor(random(2))*2 - 1;
  this.velX = random(-2, 2);
  this.velY = random(-2, 2);
  this.diameter = random(6,30); //random(30, 150);
  this.axleDiameter = 2;//10;
  this.c = color(230, 200, 200);
  this.partnerIndex = int(random(numParticles));
  this.stringDegree = random(0);

  this.stringPos = function(side) {
    this.stringDegree += this.direction*map(this.diameter, 6,30, 0.01,0.05); //this.direction*map(this.diameter, 30,150, 0.01,0.05);
    if (this.stringDegree >= TWO_PI) {
      this.stringDegree = 0;
    }
    var position;
    if (side===1) {
      position = {
        x: this.x + (this.diameter / 2) * sin(this.stringDegree),
        y: this.y + (this.diameter / 2) * cos(this.stringDegree)
      };
    } else {
      position = {
        x: this.x + (this.diameter / 2) * sin(this.stringDegree + PI),
        y: this.y + (this.diameter / 2) * cos(this.stringDegree + PI)
      };
    }
    return position;
  }

  this.display = function() {
    noFill();
    var extend = 20;
    for (var i=0; i<this.numberOfEllipses; i++) {
      ellipse(this.x, this.y, this.diameter+extend*i, this.diameter+extend*i);
    }
    ellipse(this.x, this.y, this.axleDiameter, this.axleDiameter);
  }

  this.move = function() {
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;

    if (this.x < 0 || this.x > width) {
      this.x = constrain(this.x, 0, width);
      this.velX = -1 * this.velX;
    }
    if (this.y < 0 || this.y > height) {
      this.y = constrain(this.y, 0, width);
      this.velY = -1 * this.velY;
    }
  }
}

function mouseClicked() {
  var p = new Particle();
  p.x = mouseX;
  p.y = mouseY;
  p.velX = 0;
  p.velY = 0;
  particles.push(p);
  numParticles++;
}