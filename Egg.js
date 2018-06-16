class Egg {
  constructor() {
    this.sprite = {};
    this.sprite.image = new Image();
    this.sprite.image.src = 'images/EggSprite.png';
    this.sprite.height = 120;
    this.sprite.width = 900;
    this.sprite.frameCount = 5;
    this.sprite.frameWidth = this.sprite.width / this.sprite.frameCount;
    this.sprite.startFrame = 2;
    this.currentFrame = 2;
    this.increment = 1;

    this.bounce = this.bounce.bind(this);
  }

  bounce(maxBounce) {
    const {
      frameCount,
      frameWidth,
      height,
      image,
      startFrame,
    } = this.sprite;

    var bounce = 0;

    return (resolve) => {
      context.clearRect(0, 0, frameWidth, height);
      context.drawImage(image, this.currentFrame * frameWidth, 0, frameWidth, height, 0, 0, frameWidth, height);

      if (this.currentFrame === frameCount - 1) {
        this.increment = -1;
      }

      if (this.currentFrame === startFrame) {
        this.increment = 1;
        bounce++;
      }

      if (bounce == maxBounce) {
        resolve();
        return true;
      }

      this.currentFrame += this.increment;
    };
  }

  hatch(resolve) {
    const {
      frameCount,
      frameWidth,
      height,
      image,
      startFrame,
    } = this.sprite;

    return (resolve) => {
      context.clearRect(0, 0, frameWidth, height);
      context.drawImage(image, this.currentFrame * frameWidth, 0, frameWidth, height, 0, 0, frameWidth, height);

      if (this.currentFrame === 0) {
        resolve();
        return true;
      }

      this.currentFrame--;
    };
  }
}

var { animate } = new Animation();
var egg = new Egg();
// Get canvas
var canvas = document.querySelector('.animation');
canvas.width = 180;
canvas.height = 120;
var context = canvas.getContext('2d');
var chooseButton = document.querySelector('.choose');

chooseButton.addEventListener('click', () => {
  animate(egg.bounce(3)).then(() => {
    animate(egg.hatch())
  });
});
