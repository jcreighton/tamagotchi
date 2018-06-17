class Animation {
  animate(draw) {
    return new Promise((resolve, reject) => {
      var animation = () => {

        var isComplete = draw(resolve);
        console.log('is complete?  ', isComplete);
        if (!isComplete) {
          setTimeout(() => requestAnimationFrame(animation), 500);
        }
      }

      requestAnimationFrame(animation);
    });
  }
}
