class Animation {
  constructor(canvas) {
    this.canvas = canvas;

    this.animate = this.animate.bind(this);
    this.animateWithGenerator = this.animateWithGenerator.bind(this);
    this.clear = this.clear.bind(this);
  }

  animateWithGenerator(animFunc, ms = 500) {
    const animate = animFunc();
    let done = false;

    const promise = (draw) => {
      return new Promise((resolve, reject) => {

        const animation = () => {
          this.clear();
          draw();
          resolve();
        }

        setTimeout(() => {
          requestAnimationFrame(animation);
        }, ms);
      });
    }

    function* animationLoop() {
      while (true) {
        const next = animate.next();

        if (next.done) {
          return;
        }

        yield promise(next.value);
      }
    }

    return animationLoop();
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
        done = next.done;
        yield next.value;
      }

      return;
    }
  }
}
