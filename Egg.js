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

  bounce() {
    const {
      frameCount,
      frameWidth,
      height,
      image,
      startFrame,
    } = this.sprite;

    var bounce = 0;
    var maxBounce = 3;

    var animate = () => {
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
        return;
      }

      this.currentFrame += this.increment;
      setTimeout(() => requestAnimationFrame(animate), 500);
    }

    animate();
  }

  hatch() {
    const {
      frameCount,
      frameWidth,
      height,
      image,
      startFrame,
    } = this.sprite;

    var animate = () => {
      context.clearRect(0, 0, frameWidth, height);
      context.drawImage(image, this.currentFrame * frameWidth, 0, frameWidth, height, 0, 0, frameWidth, height);

      if (this.currentFrame === 0) {
        return;
      }

      this.currentFrame--;
      setTimeout(() => requestAnimationFrame(animate), 500);
    }

    animate();
  }
}

var egg = new Egg();
// Get canvas
var canvas = document.querySelector('.animation');
canvas.width = 180;
canvas.height = 120;
var context = canvas.getContext('2d');
var chooseButton = document.querySelector('.choose');

chooseButton.addEventListener('click', () => {
  egg.bounce();
  egg.hatch();
});
