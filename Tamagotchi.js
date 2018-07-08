class Tamagotchi {
  constructor(canvas) {
    this.sprite = {
      image: new Image(),
      height: 480,
      width: 360,
      rows: 4,
      columns: 3,
      frameCount: 3,
    };

    this.sprite.image.src = 'images/TamagotchiSprite.png';

    this.sprite.frameWidth = this.sprite.width / this.sprite.columns;
    this.sprite.frameHeight = this.sprite.height / this.sprite.rows;

    this.animation = {
      dislike: 0,
      jump: 1,
      eat: 2,
      bounce: 3,
      move: 3,
    };

    this.initialPositionX = (canvas.width / 2) - (this.sprite.frameWidth / 2);
    this.initialPositionY = 0;

    this.positionX = (canvas.width / 2) - (this.sprite.frameWidth / 2);
    this.positionY = 0;
    this.ms = 300;

    this.eatLevel = 0;
    this.maxEatLevel = 1;

    this.reset = this.reset.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
    this.idle = this.idle.bind(this);
    this.feed = this.feed.bind(this);
    this.dislike = this.dislike.bind(this);
    this.eat = this.eat.bind(this);
    this.jump = this.jump.bind(this);
    this.move = this.move.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  reset() {
    this.positionX = this.initialPositionX;
    this.positionY = this.initialPositionY;
  }

  drawFrame(action, frame, ms = 300, positionX = this.positionX, positionY = this.positionY) {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

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
      frame * frameWidth, animation[action] * frameHeight,
      frameWidth, frameHeight,
      positionX, positionY,
      frameWidth, frameHeight), ms);
  }

  idle() {
    function* animation() {
      yield* this.bounce();
      yield* this.move('right', 120);
      yield* this.move('left', 120);
      yield* this.bounce();
      yield* this.move('right', 40);
    };

    return animation.call(this);
  }

  feed() {
    function* feed() {
      if (this.eatLevel === this.maxEatLevel) {
        yield* this.dislike(3);
      }

      this.eatLevel++;
      yield* this.eat(3);
    }

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

  jump() {
    const { drawFrame } = this;

    function* jump() {
      yield drawFrame('jump', 0);
      yield drawFrame('jump', 1);
    };

    return jump();
  }

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
        if (x === boundaryX && y === boundaryY) {
          return;
        }

        yield drawFrame('move', currentFrame, ms, x, y);

        if (moveXBy) x += increment;
        if (moveYBy) y += increment;
      }
    }

    return move();
  }

  bounce() {
    const { drawFrame } = this;

    function* bounce() {
      yield drawFrame('bounce', 0);
      yield drawFrame('bounce', 1);
      yield drawFrame('bounce', 2);
      yield drawFrame('bounce', 1);
      yield drawFrame('bounce', 0);
    };

    return bounce();
  }
}