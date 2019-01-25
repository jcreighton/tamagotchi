class Animatable {
  constructor(canvas, standardFrameWidth = 120, standardFrameHeight = 120, ms = 300) {
    const context = canvas.getContext('2d');
    this.standardFrameWidth = standardFrameWidth;
    this.initialPositionX = this.center(canvas.width, standardFrameWidth);
    this.initialPositionY = canvas.height - standardFrameHeight;

    this.positionX = this.initialPositionX;
    this.positionY = this.initialPositionY;
    this.ms = ms;

    this.clear = this.clear.bind(this, context, canvas.width, canvas.height);
    this.center = this.center.bind(this);
    this.delay = this.delay.bind(this);
    this.reset = this.reset.bind(this);
    this.drawFrame = this.drawFrame.bind(this, context);
    this.moveImage = this.moveImage.bind(this);
  }

  clear(context, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  center(canvasWidth, frameWidth) {
    return (canvasWidth / 2) - (frameWidth / 2);
  }

  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  drawFrame(
    context,
    image,
    frame = [0, 0],
    width,
    height,
    ms = this.ms,
    positionX = this.positionX,
    positionY = this.positionY,
  ) {
    const {
      clear,
      delay,
    } = this;

    const draw = () => requestAnimationFrame(() => {
      context.drawImage(image,
        ...frame,
        width, height,
        positionX, positionY,
        width, height,
      );
    });

    function* animation() {
      yield clear;
      yield draw;
      yield delay(ms);
    }

    return animation.call(this);
  }

  moveImage(
    draw,
    direction,
    moveXBy = 0,
    moveYBy = 0,
    ms = 40
  ) {
    const moveTo = {
      right: 3,
      left: -3,
      up: -3,
      down: 3,
    };

    let incrementX = 0;
    let incrementY = 0;
    if (moveXBy && moveYBy) {
      const [directionX, directionY] = direction.split('.');
      incrementX = directionX && moveTo[directionX];
      incrementY = directionY && moveTo[directionY];
    }

    if (moveXBy && !moveYBy) {;
      incrementX = moveTo[direction];
    }

    if (moveYBy && !moveXBy) {;
      incrementY = moveTo[direction];
    }

    const x = this.positionX;
    const y = this.positionY;
    const boundaryX = x + (moveXBy * incrementX);
    const boundaryY = y + (moveYBy * incrementY);

    function* animation() {
      while (true) {
        if ((incrementX && (this.positionX === boundaryX)) || (incrementY && (this.positionY === boundaryY))) {
          return;
        }

        yield* draw(ms, this.positionX, this.positionY);

        if (moveXBy) this.positionX += incrementX;
        if (moveYBy) this.positionY += incrementY;
      }
    }

    return animation.call(this);
  }

  move(action, frame) {
    let draw = this.frame(this.animations[action]);
    draw = draw.bind(null, frame);

    return (direction, x, y, ms) => this.moveImage(draw, direction, x, y, ms);
  }

  frame(animation) {
    const {
      image,
      frames,
      frameWidth,
      frameHeight,
    } = animation;

    return (frame, ...args) => {
      return this.drawFrame(image, frames[frame], frameWidth, frameHeight, ...args);
    }
  }

  reset() {
    this.positionX = this.initialPositionX;
    this.positionY = this.initialPositionY;
  }
}