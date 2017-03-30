function Tamagotchi(context, x, y) {
  this.tamagotchi = {
    color: '#666666',
    happyLevel: 0,
    hungerLevel: 0,
    activeState: '',
    idleStates: ['Bounce', 'Stand', 'Jump'],
    animationQueue: []
  };

  this.context = context;
  this.x = x;
  this.y = y;

  this.update = this.update.bind(this);
};

Tamagotchi.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;

  this.draw();
};

Tamagotchi.prototype.getCoordinates = function() {
  return {
    x: this.x,
    y: this.y
  };
}

Tamagotchi.prototype.draw = function() {
  this.drawBody();
  this.drawEyes();
  this.drawMouth();
};

Tamagotchi.prototype.drawBody = function() {
  this.context.beginPath();
  this.context.fillStyle = this.tamagotchi.color;
  this.context.fillRect(this.x, this.y, 4, 4);

  // Bottom row
  for (var i = 6; i <= 36; i += 6) {
    this.context.fillRect(this.x + i, this.y + 4, 4, 4);
  }

  this.context.fillRect(this.x + 42, this.y, 4, 4);

  // Right row
  for (var i = 6; i <= 30; i += 6) {
    this.context.fillRect(this.x + 48, this.y - i, 4, 4);
  }

  this.context.fillRect(this.x + 42, this.y - 36, 4, 4);

  // Top row
  for (var i = 6; i <= 36; i += 6) {
    this.context.fillRect(this.x + i, this.y - 42, 4, 4);
  }

  this.context.fillRect(this.x, this.y - 36, 4, 4);

  // Left row
  for (var i = 6; i <= 30; i += 6) {
    this.context.fillRect(this.x - 6, this.y - i, 4, 4);
  }
};

Tamagotchi.prototype.drawEyes = function() {
  this.context.beginPath();
  this.context.fillStyle = this.tamagotchi.color;
  this.context.fillRect(this.x + 16, this.y - 26, 4, 4);
  this.context.fillRect(this.x + 28, this.y - 26, 4, 4);
};

Tamagotchi.prototype.drawMouth = function() {
  this.context.beginPath();
  this.context.fillStyle = this.tamagotchi.color;
  this.context.fillRect(this.x + 20, this.y - 12, 4, 4);
  this.context.fillRect(this.x + 25, this.y - 12, 4, 4);
};