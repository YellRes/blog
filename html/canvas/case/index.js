import Ball from "./ball.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let { width, height } = canvas;

// 移动的小球
const radius = 10;
const ball = new Ball(0, height / 2, radius, 10, 10);
function drawBall() {
  ball.move();
  const { x, y } = ball;
  ctx.restore();
  ctx.beginPath();
  ctx.clearRect(0, 0, width, height);

  // 判断边界x
  if (x + radius >= width) {
    // 挡板没有碰到小球
    if (
      y < currentYPos - blockLength / 2 ||
      y > currentYPos + blockLength / 2
    ) {
      // 不绘制小球
      return;
    }
    ball.xSpeed = -Math.abs(ball.xSpeed);
  } else if (x - radius <= 0) {
    ball.xSpeed = Math.abs(ball.xSpeed);
  }

  // 判断边界y
  if (y + radius >= height) {
    ball.ySpeed = -Math.abs(ball.ySpeed);
  } else if (y - radius <= 0) {
    ball.ySpeed = Math.abs(ball.ySpeed);
  }

  ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.save();

  window.requestAnimationFrame(drawBall);
}

// 右边界
const blockLength = 100;
const lineWidth = 10;
function drawBlock() {
  const yPos = currentYPos;
  ctx.beginPath();
  ctx.clearRect(width - lineWidth, 0, width, height);
  ctx.lineWidth = lineWidth;
  ctx.moveTo(width, yPos - blockLength / 2);
  ctx.lineTo(width, yPos + blockLength / 2);
  ctx.closePath();
  ctx.stroke();

  window.requestAnimationFrame(drawBlock);
}

function draw() {
  window.requestAnimationFrame(drawBall);
  window.requestAnimationFrame(drawBlock);
}

/**
 * 监听鼠标位置变化
 */
let currentYPos = height / 2;
document.addEventListener("mousemove", (event) => {
  const { x, y } = event;

  // 在canvas内部
  if (x >= 0 && x <= width && y >= 0 && y <= height) {
    currentYPos = y;
  }
});

draw();
