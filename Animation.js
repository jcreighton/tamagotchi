class Animation {
  constructor(canvas) {
    this.canvas = canvas;

    this.animate = this.animate.bind(this);
    this.clear = this.clear.bind(this);
  }

  animate(draw, ms = 500) {
    return new Promise((resolve, reject) => {
      var animation = () => {
        this.clear();

        var isComplete = draw(resolve);

        if (!isComplete) {
          setTimeout(() => requestAnimationFrame(animation), ms);
        }
      }

      requestAnimationFrame(animation);
    });
  }

  clear() {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  generate(genFunc) {
    const generator = genFunc();
    let done = false;

    return function* (shouldPause) {
      while (!done && (shouldPause && !shouldPause())) {
        const next = generator.next();
        yield next.value;
        done = next.done;
      }

      return generator.return();
    }
  }
}
