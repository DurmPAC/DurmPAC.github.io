// authored by Jett Pavlica
// using illustrations from Celia Ruley
p5.disableFriendlyErrors = true;
var flowers = [];
var images = [];
var flowerCount = 400;
var font;

var sketchNode = document.getElementById('splash-sketch-container');

function mouseMoved() {
  let mouseVec = createVector(mouseX, mouseY);
  for (let flower of flowers) {
    let dist = flower.pos.dist(mouseVec);
    if (dist < 200) {
      let forceVec = p5.Vector.sub(flower.pos, mouseVec);
      forceVec.normalize().mult(4 * (1 - dist / 200));
      forceVec.z = 0;
      flower.pos.add(forceVec);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  let img = loadImage('assets/img/flower.png');
  images.push(img);
  img = loadImage('assets/img/zinnia.png');
  images.push(img);
}

function setup() {
  // enviroment
  let c = createCanvas(sketchNode.offsetWidth, sketchNode.offsetHeight);
  c.parent(sketchNode);
  fill(255);
  stroke('#0e0e0e');
  strokeWeight(3);
  frameRate(60);
  imageMode(CENTER);

  // flowers
  if (width < 700) {
    flowerCount = 160;
  }
  for (let i = 0; i < flowerCount; i++) {
    flowers.push(new Flower());
  }

  // add the instagram embed script, ensuring that animation fires first
  var embedScript = document.createElement('script');
  embedScript.setAttribute('src', 'https://www.instagram.com/embed.js');
  document.head.appendChild(embedScript);
}



function draw() {
  background('#0e0e0e');
  for (let flower of flowers) {
    flower.step();
    flower.show();
  }
}

class Flower {
  constructor() {
    this.regen();
    this.lastY = 0;
  }

  regen() {
    this.pos = createVector(random(width), random(-height), random(TWO_PI));
    this.vel = createVector(0, random(0.1, 2), random(-0.01, 0.01));
    this.image = random(images);
  }

  step() {
    this.vel.x =
        noise(this.pos.x * 0.003, this.pos.y * 0.003, frameCount / 100) - 0.5;
    this.pos.add(
        this.vel.copy().mult(constrain(1 - scrollY / windowHeight, 0, 1)));
    if (this.pos.y > height + this.image.height) {
      this.regen();
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(0.1 + noise(this.pos.x * 0.01, this.pos.y * 0.003) / 2);
    rotate(this.pos.z);
    image(this.image, 0, 0);
    pop();
  }
}
