class Egg {
  constructor() {
    this.sprite = {
      image: new Image(),
      height: 120,
      width: 900,
      frameCount: 5,
      frameHeight: 120,
      startFrame: 2,
    };

    this.sprite.image.src = 'images/EggSprite.png';

    this.sprite.frameWidth = this.sprite.width / this.sprite.frameCount;

    this.positionX = (canvas.width / 2) - (this.sprite.frameWidth / 2);

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
      context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

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
      context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, this.positionX, 0, frameWidth, frameHeight);

      if (currentFrame === 0) {
        resolve();
        return true;
      }

      currentFrame--;
    });
  }
}
