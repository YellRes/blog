import Maze from "./maze.js";
// import { getAllPoint, sortAllPoint } from './util.js'



let canvas = document.querySelector("#mazeDom");
let ctx = canvas.getContext("2d");


const maze = new Maze(10, 10, ctx) 
maze.init()
console.log(maze)

const width = 60

function drawMaze(maze) {

  maze.ctx.beginPath()

  for (let i = 0; i < maze.cells; i++) {
    const row = Math.floor(i / maze.row) 
    const column = i % maze.column

    console.log(row, column, 'row', 'column')
    // 画右边的线
    if (column + 1 < maze.column && !(maze.linkedMap.get(i) || []).includes(i + 1)) {
      maze.ctx.moveTo((column + 1) * width, row * width)
      maze.ctx.lineTo((column + 1) * width, (row + 1) * width)
    }

    // 画下面的线
    if (row + 1 < maze.column && !(maze.linkedMap.get(i) || []).includes(i + maze.row)) {
      maze.ctx.moveTo(column  * width, (row + 1) * width)
      maze.ctx.lineTo((column + 1) * width, (row + 1) * width)
    }

  }

  maze.ctx.moveTo(0, 0)
  maze.ctx.lineTo(600, 0)
  maze.ctx.lineTo(600, 600)
  maze.ctx.lineTo(0, 600)

  maze.ctx.stroke()

}

drawMaze(maze);


/**
 * canvas user 
 */
let canvasUser = document.querySelector("#userPath");
let ctxUser = canvasUser.getContext("2d");

let currentPoint = {
  x: 0,
  y: 0
}

let timer
function move() {
  const { x, y } = currentPoint


  ctxUser.clearRect(0, 0, 600, 600)
  console.log(x, y, 'x', 'y')
  ctxUser.beginPath()
  ctxUser.arc((x + .5) * width, (y + .5) * width, width / 2,  0, Math.PI * 2, )
  ctxUser.stroke()


  
  timer = window.requestAnimationFrame(move)

  if (x === maze.row - 1 && y === maze.column - 1) {
    alert('成功通关')
    return window.cancelAnimationFrame(timer)
    
  } 
}

window.requestAnimationFrame(move)

document.addEventListener('keydown', event => {
  const {x, y} = currentPoint
  const index = y * maze.row + x 
  switch (event.key.toLocaleLowerCase()) {
    case 'w':
      if (y - 1 >= 0 && maze.linkedMap.get(index).includes(x + maze.row * (y - 1))) {
        currentPoint.y = currentPoint.y - 1
      }
      break
    case 'a':
      if (x - 1 >= 0 && maze.linkedMap.get(index).includes(maze.row * y + x +  - 1)) {
        currentPoint.x = currentPoint.x - 1
      }
      break
    case 's':

    if (y + 1 < maze.row && maze.linkedMap.get(index).includes(x + maze.row * (y + 1))) {
      currentPoint.y = currentPoint.y + 1
    }
      break
    case 'd':
      console.log(maze.row * y + x  + 1, x )
      console.log(x + 1 < maze.row, 'x + 1 < maze.row')
      console.log( maze.linkedMap.get(index).includes(maze.row * y + x  + 1), ' maze.linkedMap.get(index).includes(maze.row * y + x  + 1)')
      console.log(maze.linkedMap.get(index), 'maze.linkedMap.get(index)')
      if (x + 1 < maze.row && maze.linkedMap.get(index).includes(maze.row * y + x  + 1)) {
        currentPoint.x = currentPoint.x + 1
      }
      break
  }
})
