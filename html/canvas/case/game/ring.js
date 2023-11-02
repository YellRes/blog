import { getRandomColor } from "../../draw.js";

class Ring {
  constructor({ rings, x, y, r }) {
    this.x = x;
    this.y = y;
    this.r = r || 50;
    this.rings = rings;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.scale(1, -1);

    let sumRate = 0;
    for (let i = 0; i < this.rings.length; i++) {
      // const x = this.r * Math.cos((sumRate + this.rings[i].rate) * Math.PI * 2);
      // const y = this.r * Math.sin((sumRate + this.rings[i].rate) * Math.PI * 2);
      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.arc(
        0,
        0,
        this.r,
        sumRate * Math.PI * 2,
        (sumRate + this.rings[i].rate) * Math.PI * 2
      );
      sumRate += this.rings[i].rate;

      ctx.fillStyle = getRandomColor();
      ctx.fill();
      ctx.closePath();
    }

    const innerArcRadius = this.r - 10;
    ctx.beginPath();

    ctx.arc(0, 0, innerArcRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.stroke();
    ctx.fill();
  }
}

export default Ring;
