function getAllPoint(mazeItem, gridItem) {
  const { x, y } = mazeItem;
  const { width } = gridItem;
  const pointArr = [];
  const originX = x * width;
  const originY = y * width;

  for (let i = 0; i < mazeItem.length - 1; i++) {
    let degree = (Math.PI / 2) * i;
    pointArr.push([
      originX + Math.floor(Math.sin(degree)) * width,
      originY + Math.floor(Math.cos(degree)) * width,
    ]);
  }

  pointArr.push([originX, originY]);

  return pointArr;
}

export { getAllPoint };
