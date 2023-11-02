export const draw = (ctx, points, stokeStyle, fillStyle) => {
  ctx.stokeStyle = stokeStyle;
  ctx.beginPath();
  ctx.moveTo(...points[0]);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }

  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  ctx.stroke();
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
