var ps;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  ps = [];

  background(220);
}

function draw() {
  fill(255);

  for (var i = 0; i < ps.length; i++) {
    ps[i].run();
  }
}

// Particles class
function Particle(initX, initY) {
  
  // private vars
  var direction;
  var vel;
  var pos = createVector(initX, initY);
  var offset = random(1000);
  var c = color(random(100), random(50), random(50), 50);

  // class properties
  this.lifespan = int(random(25,50));

  this.display = function() {
    fill(c);
    stroke(0, 50);
    ellipse(pos.x, pos.y, this.lifespan, this.lifespan);
  };

  this.update = function() {
    offset += 0.001;
    direction = noise(offset)*360;
    vel = createVector(cos(direction) * 2.5, sin(direction) * 2.5);
    pos.add(vel);

    this.lifespan -= 0.5;
  };
}

// Particles class
function ParticleSystem(posX, posY) {

  // private vars
  var particles = [];

  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(posX, posY));
  }

  this.run = function() {
    for (var i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifespan === 0) {
        particles.splice(i,1);
      }
      else {
        particles[i].display();
        particles[i].update();
      }
    }
  };
}

function mousePressed() {
  ps.push(new ParticleSystem(mouseX, mouseY));
}