const coverNode = document.getElementById("cover-sketch-div");

let dims = {
  w: coverNode.clientWidth,
  h: coverNode.clientHeight,
};

let leafImages = [];
let leaves = [];
let titleImgage;
let titleWidth;
let titleHeight;
let editionText = "the digital edition!";

// Define the p5 sketch methods
const sketch = (p) => {
  coverNode.onmouseleave = () => {
    p.noLoop();
  }
  coverNode.onmouseenter = () => {
    p.loop();
  }

  p.preload = () => {
    p.loadImage("assets/img/sketches/dark1.png", (img) => {
      leafImages.push(img);
      leafImages.push(img);
      leafImages.push(img);
    });
    p.loadImage("assets/img/sketches/dark2.png", (img) => {
      leafImages.push(img);
      leafImages.push(img);
      leafImages.push(img);
    });
    p.loadImage("assets/img/sketches/highlight1.png", (img) => {
      leafImages.push(img);
    });
    p.loadImage("assets/img/sketches/highlight2.png", (img) => {
      leafImages.push(img);
    });
    p.loadImage("assets/img/sketches/highlight3.png", (img) => {
      leafImages.push(img);
    });

    p.loadImage("assets/img/sketches/title.png", (img) => {
      titleImage = img;
    });
  };

  p.setup = () => {
    var c = p.createCanvas(dims.w, dims.h);
    titleWidth = p.width * 0.7;
    titleHeight = (titleWidth / titleImage.width) * titleImage.height;

    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);
    p.textAlign(p.LEFT, p.CENTER);
    p.noStroke();
    p.textSize(titleHeight / 4);
    p.leafCols = p.min(p.round(p.width / 25), 30);
    p.leafRows = p.min(p.round(p.height / 80), 20);

    leaves = [];
    for (i = 0; i < p.leafRows; i++) {
      let currLeafRow = [];
      for (j = 0; j < p.leafCols; j++) {
        currLeafRow.push(p.random(leafImages));
      }
      leaves.push(currLeafRow);
    }
  };

  p.draw = () => {
    p.background("#0e0e0e");

    let leafDx = p.width / (p.leafCols - 2);
    let leafDy = p.height / (p.leafRows - 2);

    let noiseSpeed = 0.002;
    let noiseStep = 0.03;
    let noiseAmp = 2;

    p.push();
    p.translate(-leafDx * 0.5, -leafDy * 0.75);
    for (i = 0; i < p.leafRows; i++) {
      for (j = 0; j < p.leafCols; j++) {
        let noiseVal = p.noise(
          i * noiseStep + p.frameCount * noiseSpeed,
          j * noiseStep + p.frameCount * noiseSpeed
        );
        let scaleFactor = (4 * leafDx) / leaves[i][j].width;
        p.push();
        p.scale(scaleFactor, -scaleFactor);
        p.rotate(p.TWO_PI * noiseVal * noiseAmp);
        // p.translate(-leaves[i][j].width * 0.5, 0);
        p.image(leaves[i][j], 0, 0);
        p.pop();
        p.translate(leafDx, 0);
      }
      p.translate(-leafDx * p.leafCols, leafDy);
    }
    p.pop();

    p.push();
    p.imageMode(p.CENTER);
    p.translate(p.width / 2, p.height / 2);
    p.image(titleImage, 0, 0, titleWidth, titleHeight);
    p.fill("#355F6B");
    p.rect(
      titleWidth / 2 - p.textWidth(editionText) * 0.55,
      titleHeight * 0.4,
      p.textWidth(editionText) * 1.1,
      titleHeight / 4 + 10
    );
    p.fill("#FCFAEE");
    let charCount = p.ceil(p.frameCount / 6) % (editionText.length + 20);
    p.text(
      editionText.slice(0, charCount),
      titleWidth / 2 - p.textWidth(editionText) * 1.05,
      titleHeight * 0.4
    );
    p.pop();
  };

  p.windowResized = () => {
    dims = {
      w: coverNode.clientWidth,
      h: coverNode.clientHeight,
    };
    p.resizeCanvas(dims.w, dims.h);
  };
};

// Create the canvas and run the sketch in the html node.
new p5(sketch, coverNode);
