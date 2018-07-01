var gameScreen = document.querySelector('.game__screen');
var gameOptions = document.querySelector('.game__options');
var canvas = document.querySelector('.animation');
canvas.width = 280;
canvas.height = 120;
var context = canvas.getContext('2d');

class Game {
  constructor() {
    this.started = false;
    this.optionsVisible = false;
    this.userEvents = [];

    this.start = this.start.bind(this);
    this.startLoop = this.startLoop.bind(this);
    this.isPending = this.isPending.bind(this);
    this.loop = this.loop.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  start() {
    this.started = true;
    this.startLoop();
    // coroutine(egg.hatch())
    //   .then(this.startLoop);
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
      while (game.started) {
        if (isPending()) {
          const event = userEvents.shift();
          yield tamagotchi.reset;
          yield* event();
        }

        // Grab latest action from Tamagotchi
        const idle = generate(tamagotchi.idle());
        yield* idle(isPending);
      }
    }
  }

  showOptions() {
    this.optionsVisible = true;
    const options = gameOptions.children;
    options.item(0).innerText = 'Feed';
    options.item(0).onclick = () => feed();
    options.item(1).innerText = 'Play';
    gameOptions.classList.add('visible');
  }

  hideOptions() {
    this.optionsVisible = false;
    gameOptions.classList.remove('visible');
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
  if (game.started) {
    game.userEvents.push(tamagotchi.feed());
    game.hideOptions();
  }
}

buttonA.addEventListener('click', () => {
  if (game.started) {
    game.showOptions();
  }
});

buttonB.addEventListener('click', () => {
  if (!game.started) {
    game.start();
  }
});