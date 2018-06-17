var { animate } = new Animation();
var egg = new Egg();
var tamagotchi = new Tamagotchi();
// Get canvas
var canvas = document.querySelector('.animation');
canvas.width = 180;
canvas.height = 120;
var context = canvas.getContext('2d');
var chooseButton = document.querySelector('.choose');

chooseButton.addEventListener('click', () => {
  animate(egg.bounce(3))
    .then(() => {
      console.log('Bouncing complete!');
      console.log('Time to hatch!');
      return animate(egg.hatch());
    }).then(() => {
      egg.clear();
      canvas.width = tamagotchi.sprite.frameHeight;
      canvas.height = tamagotchi.sprite.frameWidth;
      console.log('BABY TAMAGOTCHI!')
      animate(tamagotchi.bounce());
    });
});