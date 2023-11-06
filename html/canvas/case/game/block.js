class Block {
  constructor({ x, y, rotation }) {
    this.x = x;
    this.y = y;
    this.rotation = rotation || 0;
  }

  draw(context) {
    context.clearRect(0, 0, 500, 500);
    context.save();

    context.translate(this.x, this.y);
    context.scale(1, -1);
    context.rotate(this.rotation);
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(45, 0);
    context.closePath();
    context.fill();
    context.stroke();

    context.restore();
  }
}

export default Block;
