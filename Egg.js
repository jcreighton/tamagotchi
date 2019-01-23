class Egg {
  constructor() {
    this.sprite = {
      image: new Image(),
      height: 120,
      width: 900,
      frameCount: 5,
    };

    this.sprite.image.src = 'images/Egg.png';

    this.sprite.frameWidth = this.sprite.width / this.sprite.frameCount;
    this.sprite.frameHeight = 120;

    this.positionX = (canvas.width / 2) - (this.sprite.frameWidth / 2);
    this.positionY = 0;
    this.ms = 500;

    this.drawFrame = this.drawFrame.bind(this);
    this.bounce = this.bounce.bind(this);
    this.break = this.break.bind(this);
    this.hatch = this.hatch.bind(this);
  }

  drawFrame(frame, positionX = this.positionX, positionY = this.positionY) {
    const {
      image,
      frameCount,
      frameHeight,
      frameWidth,
    } = this.sprite;

    return () => context.drawImage(image,
      frame * frameWidth, 0,
      frameWidth, frameHeight,
      positionX, positionY,
      frameWidth, frameHeight);
  }

  bounce(max) {
    const { drawFrame } = this;

    return animateWithGenerator(
      function* () {
        while (max > 0) {
          yield drawFrame(2);
          yield drawFrame(3);
          yield drawFrame(4);
          yield drawFrame(3);
          yield drawFrame(2);
          max--;
        }
      },
      this.ms
    );
  }

  break() {
    const { drawFrame } = this;

    return animateWithGenerator(
      function* () {
        yield drawFrame(2);
        yield drawFrame(1);
        yield drawFrame(0);
      },
      this.ms
    );
  }

  hatch() {
    function* animation() {
      yield* this.bounce(3);
      yield* this.break();
    };

    return animation.bind(this);
  }
}
