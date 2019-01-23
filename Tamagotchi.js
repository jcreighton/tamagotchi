class Tamagotchi {
  constructor(canvas) {
    const idle = new Sprite('images/Idle.png', 360, 120, 3, 1);
    const eat = new Sprite('images/Eat.png', 640, 240, 4, 2);

    this.animation = {
      // dislike: 0,
      // jump: 1,
      eatBurger: eat.get(0),
      eatCandy: eat.get(1),
      bounce: idle.get(),
      move: idle.get(),
    };

    this.initialPositionX = (canvas.width / 2) - (120 / 2);
    this.initialPositionY = 0;

    this.positionX = (canvas.width / 2) - (120 / 2);
    this.positionY = 0;
    this.ms = 300;

    this.eatLevel = 0;
    this.maxEatLevel = 1;

    this.reset = this.reset.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
    this.idle = this.idle.bind(this);
    // this.feed = this.feed.bind(this);
    // this.dislike = this.dislike.bind(this);
    // this.eat = this.eat.bind(this);
    // this.jump = this.jump.bind(this);
    // this.move = this.move.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  reset() {
    this.positionX = this.initialPositionX;
    this.positionY = this.initialPositionY;
  }

  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  drawFrame(
    image,
    frame = [0, 0],
    width,
    height,
    ms = 300,
    positionX = this.positionX,
    positionY = this.positionY
  ) {
    const promise = (draw, ms) => {
      return new Promise((resolve, reject) => {

        const animation = () => {
          clear();
          draw();
          resolve();
        }

        setTimeout(() => {
          requestAnimationFrame(animation);
        }, ms);
      });
    }

    return promise(() => context.drawImage(image,
      ...frame,
      width, height,
      positionX, positionY,
      width, height), ms);
  }

  idle() {
    function* animation() {
      yield* this.bounce();
      // yield* this.move('right', 50);
      // yield* this.move('left', 100);
      yield* this.bounce();
      // yield* this.move('right', 50);
    };

    return animation.call(this);
  }

  feed() {
    const {
      delay,
    } = this;

    function* feed() {
      if (this.eatLevel === this.maxEatLevel) {
        yield* this.dislike(3);
      } else {
        this.eatLevel++;
        yield* this.eat(3);
      }

      yield delay(300);
    }

    feed = feed.bind(this);

    return feed();
  }

  dislike() {
    const { drawFrame } = this;

    function* dislike() {
      yield drawFrame('dislike', 0);
      yield drawFrame('dislike', 1);
    };

    return dislike();
  }

  eat(max) {
    const { drawFrame } = this;

    function* eat() {
      while (max > 0) {
        yield drawFrame('eat', 0);
        yield drawFrame('eat', 1);
        max--;
      }
    };

    return eat();
  }

  // jump() {
  //   const { drawFrame } = this;

  //   function* jump() {
  //     yield drawFrame('jump', 0);
  //     yield drawFrame('jump', 1);
  //   };

  //   return jump();
  // }

  move(direction, moveXBy = 0, moveYBy = 0) {
    var moveTo = {
      right: 1,
      left: -1,
      up: 1,
      down: -1,
    };

    const { drawFrame } = this;

    var currentFrame = 0;
    var ms = 20;
    var increment = moveTo[direction];
    var x = this.positionX;
    var y = this.positionY;
    var boundaryX = x + (moveXBy * increment);
    var boundaryY = y + (moveYBy * increment);

    function* move() {
      while (true) {
        if (this.positionX === boundaryX && this.positionY === boundaryY) {
          return;
        }

        yield drawFrame('move', currentFrame, ms, this.positionX, this.positionY);

        if (moveXBy) this.positionX += increment;
        if (moveYBy) this.positionY += increment;
      }
    }

    move = move.bind(this);
    return move();
  }

  frame(action) {
    const {
      image,
      frames,
      frameWidth,
      frameHeight,
    } = this.animation[action];

    return frame => {
      return this.drawFrame(image, frames[frame], frameWidth, frameHeight);
    }
  }

  bounce() {
    const frame = this.frame(bounce.name);

    function* bounce() {
      yield frame(0);
      yield frame(1);
      yield frame(2);
      yield frame(1);
      yield frame(0);
    };

    return bounce();
  }
}
