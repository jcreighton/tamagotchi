// Get canvas
var canvas = document.querySelector('.animation');
canvas.width = 280;
canvas.height = 120;
var context = canvas.getContext('2d');

var { animate, clear } = new Animation(canvas);
var egg = new Egg();
var tamagotchi = new Tamagotchi();

var chooseButton = document.querySelector('.choose');

chooseButton.addEventListener('click', () => {
  egg.bounce(3)
    .then(() => {
      console.log('Bouncing complete!');
      console.log('Time to hatch!');
      return egg.hatch();
    }).then(() => {
      clear();
      canvas.height = tamagotchi.sprite.frameHeight;
      console.log('BABY TAMAGOTCHI!')
      return tamagotchi.bounce();
    }).then(tamagotchi.moveRight).then(tamagotchi.moveLeft);
});