class Tamagotchi extends Animatable {
  constructor(canvas) {
    super(canvas);

    const idle = new Sprite('images/Idle.png', 360, 120, 3, 1);
    const eat = new Sprite('images/Eat.png', 640, 240, 4, 2);
    const other = new Sprite('images/Other.png', 240, 360, 2, 3);

    this.animations = {
      dislike: other.get(2),
      jumpRight: other.get(0),
      jumpLeft: other.get(1),
      burger: eat.get(1),
      candy: eat.get(0),
      bounce: idle.get(),
    };

    this.eatLevel = 0;
    this.maxEatLevel = 3;

    this.idle = this.idle.bind(this);
    this.feed = this.feed.bind(this);
    this.dislike = this.dislike.bind(this);
    this.eat = this.eat.bind(this);
    this.jump = this.jump.bind(this);
    this.frame = this.frame.bind(this);
    this.move = this.move.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  idle() {
    const {
      bounce,
    } = this;
    const move = this.move('bounce', 0);

    function* animation() {
      // yield* this.jump('right');
      // yield* move('left', 25);
      // yield* this.jump('left');
      // yield* move('right', 25);
      yield* bounce();
      yield* move('right', 25);
      yield* move('left', 50);
      yield* bounce();
      yield* move('right', 25);
    };

    return animation.call(this);
  }

  feed(food) {
    const {
      delay,
      eat,
    } = this;

    function* animation() {
      if (this.eatLevel === this.maxEatLevel) {
        yield* this.dislike();
      } else {
        this.eatLevel++;
        yield* eat(food);
      }

      yield delay(300);
    }

    return animation.call(this);
  }

  dislike() {
    const frame = this.frame(this.animations.dislike);

    function* animation() {
      yield* frame(0);
      yield* frame(1);
    };

    return animation.call(this);;
  }

  eat(food) {
    const frame = this.frame(this.animations[food]);

    function* animation() {
        yield* frame(0);
        yield* frame(1);
        yield* frame(2);
        yield* frame(3);
    };

    return animation.call(this);
  }

  jump(direction) {
    const { delay } = this;
    const jumpTo = `jump${capitalize(direction)}`;
    const move = this.move(jumpTo, 0);
    const frame = this.frame(this.animations[jumpTo]);

    function* animation() {
      yield* move(`${direction}.up`, 30, 40, 40);
      yield* move('down', undefined, 30, 20);
      yield* frame(1);
      yield delay(300);
    };

    return animation.call(this);
  }

  bounce() {
    const frame = this.frame(this.animations.bounce);

    function* animation() {
      yield* frame(0);
      yield* frame(1);
      yield* frame(2);
      yield* frame(1);
      yield* frame(0);
    };

    return animation.call(this);
  }
}
