function twoDimensionalArr(width, height) {
  let arr = [];
  for (let i = 0; i < width; i++) {
    let innerArr = [];
    for (let j = 0; j < height; j++) {
      let direction = [];

      for (let k = 0; k < 4; k++) {
        direction.push(true);
      }
      innerArr.push(direction);
    }
    arr.push(innerArr);
  }

  return arr;
}
// 构建 - 初始化
const maze = twoDimensionalArr(3, 4);

function getRandomSide(x, y, maxXIndex, maxYIndex) {
  if (x + 1 <= maxXIndex && !maze[x + 1][y].isGet) return maze[x + 1][y];

  if (x - 1 >= 0 && !maze[x - 1][y].isGet) return maze[x - 1][y];

  if (y + 1 <= maxYIndex && !maze[x][y + 1].isGet) return maze[x][y + 1];

  if (y - 1 >= 0 && !maze[x][y - 1].isGet) return maze[x][y - 1];

  return false;
}

function linkMaze(maze) {
  const entryPoint = maze[0][0];
  const outputPoint = maze[maze.length - 1][maze[0].length - 1];
  const _getRandomSide = (x, y) =>
    getRandomSide(x, y, maze.length - 1, maze[0].length - 1);
  let totalNum = maze.length * maze[0].length;

  let stack = [];

  stack.push(entryPoint);
  entryPoint.isGet = true;
  totalNum--;

  while (totalNum) {
    const currentGridItem = stack[stack.length - 1];
    const nextGridItem = getRandomSide;
    totalNum--;
  }
}
