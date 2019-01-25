class Egg extends Animatable {
  constructor(canvas) {
    super(canvas, 180);
    const egg = new Sprite('images/Egg.png', 900, 120, 5, 1);

    this.animations = {
      egg: egg.get(0),
    }

    this.bounce = this.bounce.bind(this);
    this.break = this.break.bind(this);
    this.hatch = this.hatch.bind(this);
  }

  bounce(max) {
    const frame = this.frame(this.animations.egg);

    function* animation() {
      while (max > 0) {
        yield* frame(2);
        yield* frame(3);
        yield* frame(4);
        yield* frame(3);
        yield* frame(2);
        max--;
      }
    };

    return animation.call(this);
  }

  break() {
    const frame = this.frame(this.animations.egg);

    function* animation() {
      yield* frame(2);
      yield* frame(1);
      yield* frame(0);
    };

    return animation.call(this);
  }

  hatch() {
    function* animation() {
      yield* this.bounce(3);
      yield* this.break();
    };

    return animation.call(this);
  }
}
