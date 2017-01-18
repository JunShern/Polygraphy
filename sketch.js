var img;
var particles = [];
var numParticles = 400;
var pixDensity;
var i=0;

function preload() {
  //img = loadImage("assets/london.jpg");
  //img = loadImage("assets/bird.jpg");
  //img = loadImage("assets/hallstatt.jpg");
  img = loadImage("assets/portrait.jpg");

}

function setup() {
  createCanvas(img.width, img.height);
  console.log(img.width * img.height);
  //numParticles = int(img.width * img.height / 800);
  //imageMode(CENTER);
  img.loadPixels();
  pixDensity = pixelDensity();

  noStroke();
  //colorMode(HSB,100);

  for (var k=0; k<numParticles; k++) {
    particles[k] = new Particle();
  }

  frameRate(15); // Limit framerate for cross-device consistency

}

function draw() {
  var x1 = particles[i].x;
  var y1 = particles[i].y;
  //background(255);
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
        var d = (width+height)/15; //width/6;
        if (dist(x1,y1,x2,y2)<d && dist(x1,y1,x3,y3)<d && dist(x2,y2,x3,y3)<d) {
          var aveX = (x1+x2+x3)/3;
          var aveY = (y1+y2+y3)/3;

          var c = img.get(aveX,aveY);
          fill(c[0],c[1],c[2],128);
          //stroke(255);
          //strokeWeight(0.5);
          triangle(x1,y1,x2,y2,x3,y3);  
        } 
      }

    }
  }  
  i++;
  if (i > numParticles) noLoop(); // End the program
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

}
