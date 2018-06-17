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

    this.sprite.dislike = 0;
    this.sprite.jump = 1;
    this.sprite.eat = 2;
    this.sprite.chill = 3;

    this.eat = 0;
    this.maxEat = 10;
  }

  clear() {
    const {
      frameWidth,
      frameHeight,
    } = this.sprite;

    context.clearRect(0, 0, frameWidth, frameHeight);
  }

  dislike() {

  }

  jump() {

  }

  eat() {

  }

  bounce() {
    const {
      chill,
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    var bounce = 0;
    var maxBounce = 2;
    var increment = 1;
    var currentFrame = 0;

    return (resolve) => {
      this.clear();
      context.drawImage(image, currentFrame * frameWidth, chill * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

      if (currentFrame === frameCount - 1) {
        increment = -1;
      }

      if (currentFrame === 0) {
        increment = 1;
        bounce++;
      }

      if (bounce == maxBounce) {
        resolve();
        return true;
      }

      currentFrame += increment;
    };


    // return (resolve) => {
      // goes up & down
      // moves left
      // goes up & down
      // moves right
      // repeat
    // };
  }
}