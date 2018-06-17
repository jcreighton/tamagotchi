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
        console.log('is complete?  ', isComplete);
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
}
