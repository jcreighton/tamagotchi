function Layer(opts) {
  var options = {
    width: opts.width,
    height: opts.height,
    backgroundColor: 'transparent'
  }

  // Create canvas
  this.layer = document.createElement('canvas');
  this.layer.className = 'tamagotchi-game-layer';
  this.layer.style.backgroundColor = options.backgroundColor;
  this.layer.style.position = 'absolute';
  this.layer.style.top = 0;
  this.layer.style.left = 0;
  this.layer.width = options.width;
  this.layer.height = options.height;
  this.context = this.layer.getContext('2d');
  document.body.append(this.layer);

  return {
    layer: this.layer,
    context: this.context,
  };
};

Layer.prototype.clear = function() {
  // clear layer
};

Layer.prototype.toImage = function() {
  var data = this.layer.toDataURL('image/png');
  var image = new Image();
  image.src = data;

  return image;
}