class Tamagotchi {
  constructor() {
    this.sprite = {};
    this.sprite.image = new Image();
    this.sprite.image.src = 'images/TamagotchiSprite.png';
    this.sprite.height = 480;
    this.sprite.width = 360;
    this.sprite.rows = 4;
    this.sprite.columns = 3;
    this.sprite.frameCount = 3;
    this.sprite.frameWidth = this.sprite.width / this.sprite.columns;
    this.sprite.frameHeight = this.sprite.height / this.sprite.rows;

    this.animation = {};
    this.animation.dislike = 0;
    this.animation.jump = 1;
    this.animation.eat = 2;
    this.animation.bounce = 3;
    this.animation.move = 3;

    this.ms = 300;

    this.eat = 0;
    this.maxEat = 10;

    this.moveRight = this.move.bind(this, 'right');
    this.moveLeft = this.move.bind(this, 'left');
    this.bounce = this.bounce.bind(this);
  }

  dislike() {

  }

  jump() {

  }

  eat() {

  }

  move(direction = 'right') {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    const {
      animation,
    } = this;

    var moveTo = {
      right: 1,
      left: -1,
    };

    var positionX = 80;
    var increment = moveTo[direction];
    var maxMove = 40;
    var boundaryX = positionX + (maxMove * increment);
    var currentFrame = 0;

    return animate((resolve) => {
      context.drawImage(image, currentFrame, animation.move * frameHeight, frameWidth, frameHeight, positionX, 0, frameWidth, frameHeight);

      if (positionX === boundaryX) {
        resolve();
        return true;
      }

      positionX += increment;
    }, 0);
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
      context.drawImage(image, currentFrame * frameWidth, animation.bounce * frameHeight, frameWidth, frameHeight, 80, 0, frameWidth, frameHeight);

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