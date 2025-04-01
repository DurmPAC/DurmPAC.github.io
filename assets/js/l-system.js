class LSystem {
  constructor() {
    // appearance
    this.len = 6;
    this.ang = 16;
    this.angBias = 0;

    // generation rules
    this.currGeneration = 0;
    this.word = 'X';
    this.grammar = {
      X: [
        // original
        {nextSymbol: 'F(-[-X-X]+[+X+X]FX)', prob: 0.5},
        {nextSymbol: 'F(-[-X+X+X]+[+X+X-X]FX)', prob: 0.2},
        {nextSymbol: 'F(+[X-X]-[-X+X]FX)', prob: 0.1},


        // Berries/fruits
        {nextSymbol: 'F([+X][-X])FA', prob: 0.1},
        {nextSymbol: 'F([+X][-X])FB', prob: 0.1}
      ],
      F: [
        // Original
        {nextSymbol: 'FF', prob: 0.85},
        // Stunted growth
        {nextSymbol: 'F', prob: 0.13},
        // Extra growth
        {nextSymbol: 'FFF', prob: 0.02},
      ],
    };
    this.drawingRules = {
      'A': (t) => {
        // Draw circle at current location
        noStroke();
        fill('#BC9ECADA');
        ellipse(0, 0, this.len * 5 * t, this.len * 1 * t);
        rotate(TAU / 3)
        ellipse(0, 0, this.len * 5 * t, this.len * 1 * t);
        rotate(TAU / 3)
        ellipse(0, 0, this.len * 5 * t, this.len * 1 * t);
        rotate(TAU / 3)
        stroke('#CED4BA');
      },
      'B': (t) => {
        // Draw circle at current location
        noStroke();
        fill('#FFFDEB');
        ellipse(0, 0, this.len * 4 * t, this.len * 1 * t);
        rotate(TAU / 3)
        ellipse(0, 0, this.len * 4 * t, this.len * 1 * t);
        rotate(TAU / 3)
        ellipse(0, 0, this.len * 4 * t, this.len * 1 * t);
        rotate(TAU / 3)
        stroke('#CED4BA');
      },
      'F': (t) => {
        // Draw line forward, then move to end of line
        line(0, 0, 0, -this.len * t);
        translate(0, -this.len * t);
      },
      '+': (t) => {
        // Rotate right
        rotate(PI / 180 * (-this.ang + this.angBias) * t);
      },
      '-': (t) => {
        // Rotate right
        rotate(PI / 180 * (this.ang + this.angBias) * t);
      },
      // Save current location
      '[': push,
      // Restore last location
      ']': pop
    };

    // generate
    this.regenerate();
  }

  regenerate() {
    this.word = 'X';
    while (this.word.length < 25000){
        this.stepGeneration();
        if(this.word.length > 70000){
            this.word = 'X'
        }
    } 
  }

  stepGeneration() {
    let next = ''
    let fCount = 0;

    for (let i = 0; i < this.word.length; i++) {
      let c = this.word[i];
      if (c in this.grammar === false) {
        next += c;
        continue;
      }

      let rule = this.grammar[c];
      // handle stochastic rules
      if (Array.isArray(rule)) {
        // chose based on weighted rules
        let r = random();
        let sum = 0;

        for (let option of rule) {
          sum += option.prob;
          if (sum > r) {
            next += option.nextSymbol;
            break;
          }
        }
      } else {
        next += rule;
      }
    }

    this.word = next;
  }

  show(x, y, t) {
    push();
    translate(x, y);

    for (let char of this.word) {
      if (char in this.drawingRules) {
        this.drawingRules[char](t);
      } else {
        // modulate branch thickness by generation depth
        if (char === '(') strokeWeight(drawingContext.lineWidth * 3 / 4);
        if (char === ')') strokeWeight(drawingContext.lineWidth * 4 / 3);
      }
    }

    pop();
  }
}