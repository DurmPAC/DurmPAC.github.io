// author:    jett pavlica
// date:      Nov 1 2024
// purpose:   animated cover for Uproot Digital Zine
// shoutout:  https://editor.p5js.org/BarneyCodes/sketches/4y0dLXw6Z

var lsystem;
var titleImage;
var bgImage;
var titleImageDims;
var centerVec;

function preload() {    
  titleImage = loadImage("assets/img/uproot/uproot-title.png");
  bgImage = loadImage("assets/img/uproot/bg.jpeg");
}

function setup() {
  // environment
  let c = createCanvas(windowWidth, windowHeight);
    c.parent(document.getElementById('cover-sketch'))
    
    c.mouseOut(noLoop);
    c.mouseOver(loop);
    
  imageMode(CENTER)
  strokeWeight(8);
  stroke('#434345');

  // l system
  lsystem = new LSystem();

  // images
  titleImageDims = createVector(
      width * 2 / 3, titleImage.height * ((width * 2 / 3) / titleImage.width));
}

function draw() {
  clear();

  lsystem.angBias = (noise(frameCount * 0.001) - 0.5) * 5;

  image(bgImage, width / 2, height / 2, width, height);

  let lerpAmt = constrain(frameCount % 600, 0, 300) / 300;
  if (lerpAmt == 0) lsystem.regenerate();


  lsystem.show(width / 2, height, ease(lerpAmt));

  image(titleImage, width / 2, height / 2, titleImageDims.x, titleImageDims.y)
    
    fill('#434345');
    rect(0, height-8, width, 8);
}


function ease(x) {
  return 1 - Math.pow(1 - x, 3);
}