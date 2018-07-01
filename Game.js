// Get canvas
var canvas = document.querySelector('.animation');
canvas.width = 280;
canvas.height = 120;
var context = canvas.getContext('2d');

var { animate, clear, generate } = new Animation(canvas);
var egg = new Egg(canvas);
var tamagotchi = new Tamagotchi(canvas);

var buttonA = document.querySelector('.a');
var buttonB = document.querySelector('.b');
var buttonC = document.querySelector('.c');

var pendingActions = [];
var time;
var timeActionHandled;

// function handleAction() {
//   var action = pendingActions.shift();
//   console.log('OKAY, I WILL FEED THE TAMAGOTCHI');
//   const date = new Date(Date.now());
//   timeActionHandled = date.getSeconds();
//   console.log((timeActionHandled - time) + ' seconds');
//   // Kick off coroutine
//   action().then(() => coroutine(loop));
// }

function* loop() {
  while (true) { // While game is active
    if (isPending()) {
      const action = pendingActions.shift();
      yield tamagotchi.reset;
      yield action();
    }

    // Grab latest action from Tamagotchi
    const idle = generate(tamagotchi.idle());
    yield* idle(isPending);
  }
}

function isPending() {
  return pendingActions.length;
}

function startLoop() {
  coroutine(loop);
}

function feed() {
  return tamagotchi.eat();
}

buttonA.addEventListener('click', () => {
  console.log('FEED TAMAGOTCHI!');
  const date = new Date(Date.now());
  time = date.getSeconds();
  pendingActions.push(feed);
});

buttonB.addEventListener('click', startLoop);


  // tamagotchi.moveRight()
  //   .then(tamagotchi.eat)
  //   .then(tamagotchi.jump);
  // egg.bounce(3)
  //   .then(() => {
  //     console.log('Bouncing complete!');
  //     console.log('Time to hatch!');
  //     return egg.hatch();
  //   }).then(() => {
  //     clear();
  //     canvas.height = tamagotchi.sprite.frameHeight;
  //     console.log('BABY TAMAGOTCHI!')
  //     return tamagotchi.bounce();
  //   })
  //   .then(tamagotchi.moveRight)
  //   .then(tamagotchi.moveLeft)
  //   .then(tamagotchi.bounce);



class Game {
  constructor() {

  }

  start() {
    // New egg
    // Hatch
    // Start loop
  }

  loop() {

  }
}