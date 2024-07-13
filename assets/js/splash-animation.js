var flowers = [];
var images = [];
var nameImage;
var flowerCount = 400;
var font;
var hf = 0;

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

function preload() {
  let img = loadImage('assets/img/flower.png');
  images.push(img);
  img = loadImage('assets/img/zinnia.png');
  images.push(img);

  nameImage = loadImage('assets/img/name.png');

  // font = loadFont("Mulish.ttf");
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



  for (let i = 0; i < flowerCount; i++) {
    flowers.push(new Flower());
  }
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
  }

  regen() {
    this.pos = createVector(random(width), random(-height), random(TWO_PI));
    this.vel = createVector(0, random(0.1, 2), random(-0.01, 0.01));
    this.image = random(images);
  }

  step() {
    this.vel.x =
        noise(this.pos.x * 0.003, this.pos.y * 0.003, frameCount / 100) - 0.5;
    this.pos.add(this.vel);
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
