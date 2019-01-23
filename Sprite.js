class Sprite {
  constructor(src, width, height, columns, rows) {
    const image = new Image();
    image.src = src;

    const frameWidth = width / columns;
    const frameHeight = height / rows;

    const frames = [];
    let i;
    let j;

    for (j = 0; j < rows; j++) {
      frames.push([]);

      for (i = 0; i < columns; i++) {
        frames[j][i] = [i * frameWidth, j * frameHeight];
      }
    }

    this.sprite = {
      image,
      width,
      height,
      columns,
      rows,
      center: frameWidth / 2,
      count: columns,
      frames,
      frameWidth,
      frameHeight,
    }

    this.get = this.get.bind(this);
  }

  get(row = 0) {
    return {
      ...this.sprite,
      frames: this.sprite.frames[row],
    };
  }
}
