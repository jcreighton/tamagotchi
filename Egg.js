function Egg(context, x, y) {
  this.egg = {
    color: '#2ed6b2',
    outlineColor: 'white',
    spotsColor: '#e2ed6b',
    hatchLineColor: '#eeeeee',
    activeState: 'unhatched',
  };

  this.context = context;
  this.x = x;
  this.y = y;

  this.update = this.update.bind(this);
}

Egg.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
};

Egg.prototype.hatch = function() {
  this.drawUnhatched();
  return this.drawCracking()
    .then(() => this.drawShaking())
    .then(() => {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.update();
      this.drawHatched();
    });
};

Egg.prototype.drawShell = function() {
  this.context.beginPath();
  this.context.moveTo(this.x, this.y);
  // Bottom curve
  this.context.quadraticCurveTo(this.x + 44, this.y + 46, this.x + 74, this.y - 10);
  // Right curve
  this.context.quadraticCurveTo(this.x + 86, this.y - 40, this.x + 68, this.y - 70);
  // Top curve
  this.context.quadraticCurveTo(this.x + 30, this.y - 120, this.x, this.y - 70);
  // Left curve
  this.context.quadraticCurveTo(this.x - 20, this.y - 40, this.x, this.y);
  this.context.closePath();
  this.context.lineWidth = 4;
  this.context.strokeStyle = this.egg.outlineColor;
  this.context.stroke();
  this.context.fillStyle = this.egg.color;
  this.context.fill();
};

Egg.prototype.drawSpots = function() {
  this.context.beginPath();
  this.context.arc(this.x + 32, this.y + 2, 12, 0, Math.PI * 2);
  this.context.fillStyle = this.egg.spotsColor;
  this.context.fill();

  this.context.beginPath();
  this.context.arc(this.x + 60, this.y - 30, 8, 0, Math.PI * 2);
  this.context.fillStyle = this.egg.spotsColor;
  this.context.fill();

  this.context.beginPath();
  this.context.arc(this.x + 16, this.y - 40, 8, 0, Math.PI * 2);
  this.context.fillStyle = this.egg.spotsColor;
  this.context.fill();

  this.context.beginPath();
  this.context.arc(this.x + 34, this.y - 70, 12, 0, Math.PI * 2);
  this.context.fillStyle = this.egg.spotsColor;
  this.context.fill();
};

Egg.prototype.drawHatchLines = function() {
  this.context.beginPath();
  this.context.moveTo(this.x - 14, this.y - 26);
  this.context.lineTo(this.x + 18, this.y - 44);
  this.context.lineTo(this.x + 33, this.y - 24);
  this.context.lineTo(this.x + 48, this.y - 41);
  this.context.lineTo(this.x + 72, this.y - 26);
  this.context.lineTo(this.x + 82, this.y - 36);
  this.context.lineWidth = 6;
  this.context.strokeStyle = this.egg.hatchLineColor;
  this.context.stroke();
};

Egg.prototype.drawUnhatched = function() {
  this.drawShell();
  this.drawSpots();
};

Egg.prototype.drawCracking = function() {
  var points = [
    [this.x - 14, this.y - 26],
    [this.x + 18, this.y - 44],
    [this.x + 33, this.y - 24],
    [this.x + 48, this.y - 41],
    [this.x + 72, this.y - 26],
    [this.x + 82, this.y - 36]
  ];

  return new Promise((resolve, reject) => {
    var counter = 0;

    this.context.beginPath();
    this.context.moveTo(...points[0]);

    var interval = setInterval(() => {
      if (counter === (points.length - 1)) {
        clearInterval(interval);
        return resolve();
      }

      this.context.lineTo(...points[counter + 1]);
      this.context.lineWidth = 6;
      this.context.strokeStyle = this.egg.hatchLineColor;
      this.context.stroke();

      counter++;
    }, 300);
  });
};

Egg.prototype.rotate = function() {
  var x = this.x;
  var y = this.y;

  return (deg, boundary) => {
    return new Promise((resolve, reject) => {
      var animation = () => {
        this.context.save();
        this.context.clearRect(0, 0, 600, 400);
        this.context.translate(x, y);
        this.context.rotate(deg * Math.PI / 180);
        this.x = 0;
        this.y = 0;
        this.drawHatched();
        this.context.restore();

        if (deg < boundary) {
          deg++;
        } else if (deg > boundary) {
          deg--;
        } else if (deg === boundary) {
          return resolve();
        }

        requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    });
  };
}

Egg.prototype.drawShaking = function() {
  var rotate = this.rotate();
  return rotate(-2, 4)
    .then(() => rotate(4, -4))
    .then(() => rotate(-4, 4))
    .then(() => rotate(4, -2))
    .then(() => rotate(-2, 2));
};

Egg.prototype.drawHatched = function() {
  this.drawShell();
  this.drawSpots();
  this.drawHatchLines();
};