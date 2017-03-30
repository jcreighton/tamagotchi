function Game() {
  var options = {
    width: 600,
    height: 400
  }

  this.layer1 = new Layer({
    width: options.width,
    height: options.height
  });

  this.layer2 = new Layer({
    width: options.width,
    height: options.height
  });

  this.x = options.width / 2;
  this.y = options.height / 2;

  this.egg = new Egg(this.layer1.context, this.x - 45, this.y + 45);
  this.tamagotchi = new Tamagotchi(this.layer2.context, this.x, this.y);

  this.startGame();
}

Game.prototype.startGame = function() {
  this.egg.hatch().then(() => {
    //this.open();
  });
};

// Canvas.prototype.startGame = function() {

//   this.egg.hatch()
//     .then(() => this.open())
//     .then(() => {
//       var image = this.toImage();

//       this.animate((x, y, boundaryX, boundaryY) => {
//           this.clear();
//           this.tamagotchi.update(x, y);
//           this.context.drawImage(image, 0, 0, 600, 400, 0, 0, 600, 400);
//           return x >= boundaryX && y <= boundaryY;
//         }, 260, 250, 1, -1, 280, 230)
//         .then(() => {
//           return this.animateX((x, y) => {
//             this.clear();
//             this.tamagotchi.update(x, y);
//             this.context.drawImage(image, 0, 0, 600, 400, 0, 0, 600, 400);
//           }, 280, 230, 1, 330);
//         })
//         .then(() => {
//           return this.animate((x, y, boundaryX, boundaryY) => {
//             this.clear();
//             this.tamagotchi.update(x, y);
//             this.context.drawImage(image, 0, 0, 600, 400, 0, 0, 600, 400);
//             return x >= boundaryX && y >= boundaryY;
//           }, 330, 230, 1, 1, 360, 280);
//         });
//     });
// };

Game.prototype.open = function(image) {
  var open = (topY, bottomY, topYBoundary, bottomYBoundary) => {
    this.clear();

    this.context.drawImage(image, 0, 0, 600, 210, 0, topY, 600, 210);
    this.context.drawImage(image, 0, 210, 600, 210, 0, bottomY, 600, 210);

    return topY <= topYBoundary && bottomY >= bottomYBoundary;
  }

  return this.animate(open, 0, 210, -1, 1, -26, 60);
};

Game.prototype.animateX = function(draw, x, y, changeXBy, boundaryX) {
  var horizontal = (x, y, boundaryX, boundaryY) => {
    draw(x, y);
    return x === boundaryX;
  };

  return this.animate(horizontal, x, y, changeXBy, 0, boundaryX, y);
};

Game.prototype.animateY = function(draw, x, y, changeYBy, boundaryY) {
  var horizontal = (x, y, boundaryX, boundaryY) => {
    draw(x, y);
    return y === boundaryY;
  };

  return this.animate(horizontal, x, y, 0, changeYBy, x, boundaryY);
};

Game.prototype.animate = function(draw, x, y, changeXBy, changeYBy, boundaryX, boundaryY) {
  return new Promise((resolve, reject) => {
    var animation = (x, y) => {

      x = x + changeXBy;
      y = y + changeYBy;

      if (draw(x, y, boundaryX, boundaryY)) {
        return resolve();
      }

      requestAnimationFrame(() => animation(x, y));
    }

    requestAnimationFrame(() => animation(x, y));
  });
};