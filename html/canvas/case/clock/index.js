let canvas = document.querySelector("#container");
let ctx = canvas.getContext("2d");

let pointerCanvas = document.querySelector("#pointer");
let pointerCtx = pointerCanvas.getContext("2d");

function initContainer() {
  ctx.translate(300, 300);
  ctx.scale(1, -1);
  ctx.beginPath();

  const RADIUS = 100;
  const SCALE_LENGTH = 20;
  const PI = Math.PI * 2;
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, RADIUS, 0, PI);

  for (let i = 0; i < 12; i++) {
    ctx.moveTo(0, 0);
    ctx.lineTo(
      RADIUS * Math.cos((PI * i) / 12),
      RADIUS * Math.sin((PI * i) / 12)
    );
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.fillStyle = "#fff";
  ctx.arc(0, 0, RADIUS - SCALE_LENGTH, 0, PI);
  ctx.fill();

  ctx.closePath();
}

initContainer();

const HOUR_HAND = 30;
const MINUTE_HAND = 50;
const SECOND_HAND = 70;
const tikTokNum = 0;
function initPointer() {
  const drawPoint = () => {
    // TODO: 时针秒针 canvas 内容没有清除
    // pointerCtx.transform 后 clearRect的位置不对
    pointerCtx.clearRect(0, 0, 600, 600);
    pointerCtx.save();

    pointerCtx.translate(300, 300);
    pointerCtx.scale(1, -1);
    pointerCtx.beginPath();
    pointerCtx.arc(0, 0, 3, 0, Math.PI * 2);
    pointerCtx.fill();

    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();

    pointerCtx.beginPath();

    // 时针
    pointerCtx.moveTo(0, 0);
    pointerCtx.lineTo(
      HOUR_HAND * Math.sin(((hour % 12) / 12) * Math.PI * 2),
      HOUR_HAND * Math.cos(((hour % 12) / 12) * Math.PI * 2)
    );

    // 分针
    pointerCtx.moveTo(0, 0);
    pointerCtx.lineTo(
      MINUTE_HAND * Math.sin(((minute % 60) / 60) * Math.PI * 2),
      MINUTE_HAND * Math.cos(((minute % 60) / 60) * Math.PI * 2)
    );

    // 秒针
    pointerCtx.moveTo(0, 0);
    pointerCtx.lineTo(
      Math.floor(SECOND_HAND * Math.sin(((second % 60) / 60) * Math.PI * 2)),
      Math.floor(SECOND_HAND * Math.cos(((second % 60) / 60) * Math.PI * 2))
    );

    pointerCtx.stroke();
    pointerCtx.restore();
    window.requestAnimationFrame(drawPoint);
  };

  window.requestAnimationFrame(drawPoint);
}

initPointer();
