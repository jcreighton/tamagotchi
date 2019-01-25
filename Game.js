var gameScreen = document.querySelector('.game__screen');
var gameOptions = document.querySelector('.game__options');
var canvas = document.querySelector('.animation');
canvas.width = 280;
canvas.height = 280;

class Game {
  constructor(canvas) {
    const context = canvas.getContext('2d');
    context.font = '120px VT323';
    context.fillText('Start', 20, 170);
    context.beginPath();
    context.moveTo(145, 260);
    context.lineTo(100, 200);
    context.lineTo(200, 200);
    context.fill();

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
    coroutine(function* () {
      yield* egg.hatch();
      yield egg.delay(500);
    }).then(() => {
      this.started = true;
      this.startLoop();
    });
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
      let idle = tamagotchi.idle();
      let done = false;

      while (game.started) {
        if (isPending()) {
          const event = userEvents.shift();
          idle.return();
          yield tamagotchi.reset;
          yield* event();
        }

        while (!done && !isPending()) {
          const next = idle.next();
          done = next.done;
          yield next.value;
        }

        idle = tamagotchi.idle();
        done = false;
      }
    }
  }

  showOptions() {
    this.optionsVisible = true;
    const options = gameOptions.children;
    options.item(0).innerText = 'Feed';
    options.item(0).onclick = () => this.showFoodOptions();
    options.item(1).innerText = 'Play';
    gameOptions.classList.add('visible');
  }

  showFoodOptions() {
    const options = gameOptions.children;
    options.item(0).innerText = 'Burger';
    options.item(0).onclick = () => feed('burger');
    options.item(1).innerText = 'Candy';
    options.item(1).onclick = () => feed('candy');
  }

  hideOptions() {
    this.optionsVisible = false;
    gameOptions.classList.remove('visible');
  }
}

var egg = new Egg(canvas);
var tamagotchi = new Tamagotchi(canvas);
var game = new Game(canvas);

var buttonA = document.querySelector('.a');
var buttonB = document.querySelector('.b');
var buttonC = document.querySelector('.c');

function feed(food) {
  if (game.started) {
    game.userEvents.push(tamagotchi.feed.bind(null, food));
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