canvas 位置计算

可以先将 canvas 的原先的坐标轴(原点在左上角 x 轴是当前屏幕的水平向右 y 轴是当前屏幕的垂直向下)移动

具体操作如下：

- ctx.translate(canvasDom.width / 2, canvasDom.height) // 移动原点到画布下边的中点
- ctx.scale(1, -1) // 翻转 y 轴

向量描述点和线段
