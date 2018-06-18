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

    this.positionX = (canvas.width / 2) - (this.sprite.frameWidth / 2);
    this.positionY = 0;
    this.ms = 300;

    this.eatCount = 0;
    this.maxEat = 10;

    this.idle = this.idle.bind(this);
    this.dislike = this.dislike.bind(this);
    this.eat = this.eat.bind(this);
    this.jump = this.jump.bind(this);
    this.moveRight = this.move.bind(this, this.animation.move, 'right', 40);
    this.moveLeft = this.move.bind(this, this.animation.move, 'left', 40);
    this.bounce = this.bounce.bind(this);
  }

  idle() {
    return this.bounce()
      .then(this.moveRight)
      .then(this.moveRight)
      .then(this.moveLeft)
      .then(this.moveLeft)
      .then(this.moveLeft)
      .then(this.bounce)
      .then(this.moveRight)
  }

  feed() {
    // Check if eatCount === maxEat
    // If not, eat()
    // If yes, dislike()
  }

  poop() {
    // If eatCount === maxEat
    // poop()
    // decrement eatCount
  }

  dislike() {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

    var currentFrame = 0;
    var increment = 1;

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, animation.dislike * frameHeight, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

      if (currentFrame === 1) {
        resolve();
        return true;
      }

      currentFrame += increment;
    }, this.ms);
  }

  eat() {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

    var currentFrame = 0;
    var increment = 1;

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, animation.eat * frameHeight, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

      if (currentFrame === 1) {
        resolve();
        return true;
      }

      currentFrame += increment;
    }, this.ms);
  }

  jump() {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

    var currentFrame = 0;
    var increment = 1;

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, animation.jump * frameHeight, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

      if (currentFrame === 1) {
        resolve();
        return true;
      }

      currentFrame += increment;
    }, this.ms);
  }

  move(animation, direction = 'right', moveXBy = 0, moveYBy = 0) {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    var moveTo = {
      right: 1,
      left: -1,
      up: 1,
      down: -1,
    };

    var currentFrame = 0;
    var increment = moveTo[direction];
    var boundaryX = this.positionX + (moveXBy * increment);
    var boundaryY = this.positionY + (moveYBy * increment);

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, animation * frameHeight, frameWidth, frameHeight, this.positionX, this.positionY, frameWidth, frameHeight);
      if (this.positionX === boundaryX && this.positionY === boundaryY) {
        resolve();
        return true;
      }

      if (moveXBy) this.positionX += increment;
      if (moveYBy) this.positionY += increment;
    }, 20);
  }

  bounce() {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

    var bounce = 0;
    var maxBounce = 2;
    var increment = 1;
    var currentFrame = 0;

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, animation.bounce * frameHeight, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

      if (currentFrame === frameCount - 1) {
        increment = -1;
      }

      if (currentFrame === 0) {
        increment = 1;
        bounce++;
      }

      if (bounce === maxBounce) {
        resolve();
        return true;
      }

      currentFrame += increment;
    }, this.ms);
  }
}