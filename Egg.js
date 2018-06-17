class Egg {
  constructor() {
    this.sprite = {};
    this.sprite.image = new Image();
    this.sprite.image.src = 'images/EggSprite.png';
    this.sprite.height = 120;
    this.sprite.width = 900;
    this.sprite.frameCount = 5;
    this.sprite.frameHeight = 120;
    this.sprite.frameWidth = this.sprite.width / this.sprite.frameCount;
    this.sprite.startFrame = 2;

    this.bounce = this.bounce.bind(this);
    this.hatch = this.hatch.bind(this);
  }

  bounce(maxBounce) {
    const {
      frameCount,
      frameWidth,
      frameHeight,
      image,
      startFrame,
    } = this.sprite;

    var bounce = 0;
    var increment = 1;
    var currentFrame = 2

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

      if (currentFrame === frameCount - 1) {
        increment = -1;
      }

      if (currentFrame === startFrame) {
        increment = 1;
        bounce++;
      }

      if (bounce == maxBounce) {
        resolve();
        return true;
      }

      currentFrame += increment;
    });
  }

  hatch() {
    const {
      frameCount,
      frameWidth,
      frameHeight,
      image,
      startFrame,
    } = this.sprite;

    var currentFrame = 2

    return animate((resolve) => {
      context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

      if (currentFrame === 0) {
        resolve();
        return true;
      }

      currentFrame--;
    });
  }
}
