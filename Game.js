var canvas = document.querySelector('.animation');
canvas.width = 280;
canvas.height = 120;
var context = canvas.getContext('2d');

class Game {
  constructor() {
    this.started = false;
    this.userEvents = [];

    this.start = this.start.bind(this);
    this.startLoop = this.startLoop.bind(this);
    this.isPending = this.isPending.bind(this);
    this.loop = this.loop.bind(this);
  }

  start() {
    this.started = true;
    coroutine(egg.hatch())
      .then(this.startLoop);
  }

  isPending() {
    return this.userEvents.length;
  }

  startLoop() {
    coroutine(this.loop());
  }

  loop() {
    const {
      isPending,
      userEvents,
    } = this;

    return function* loop() {
      while (true) {
        if (isPending()) {
          const event = userEvents.shift();
          yield tamagotchi.reset;
          yield event();
        }

        // Grab latest action from Tamagotchi
        const idle = generate(tamagotchi.idle());
        yield* idle(isPending);
      }
    }
  }
}

var { animate, animateWithGenerator, clear, generate } = new Animation(canvas);
var egg = new Egg(canvas);
var tamagotchi = new Tamagotchi(canvas);
var game = new Game();

var buttonA = document.querySelector('.a');
var buttonB = document.querySelector('.b');
var buttonC = document.querySelector('.c');

function feed() {
  return tamagotchi.eat();
}

buttonA.addEventListener('click', () => {
  if (game.started) {
    game.userEvents.push(feed);
  }
});

buttonB.addEventListener('click', () => {
  if (!game.started) {
    game.start();
  }
});