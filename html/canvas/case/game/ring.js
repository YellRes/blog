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

      if (this.rings[i].target) {
        ctx.font = "40px";
        ctx.fillStyle = "black";
        ctx.fillText(
          "<-目标",
          this.r * Math.cos((this.rings[i].rate / 2) * Math.PI * 2),
          -this.r * Math.sin((this.rings[i].rate / 2) * Math.PI * 2)
        );
      }
      ctx.fillStyle = this.rings[i].color || getRandomColor();

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
