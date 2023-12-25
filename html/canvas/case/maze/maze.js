import { Union } from './util.js'

function twoDimensionalArr(width, height) {
  let arr = [];
  for (let i = 0; i < width; i++) {
    let innerArr = [];
    for (let j = 0; j < height; j++) {
      innerArr.push(0);
    }
    arr.push(innerArr);
  }

  return arr;
}
// 构建 - 初始化
// const maze = twoDimensionalArr(3, 4);

class Maze {
  constructor(column, row, canvas) {
    this.row = row
    this.column = column
    this.cells = column * row
    this.cellArr = twoDimensionalArr(column, row)
    this.linkedMap = new Map()
    this.union = new Union(this.cells)
    this.ctx = canvas
  }

  /**
   * 初始化迷宫 打通迷宫的墙
   * */ 
  init() {
    while(!this.isEntryLinkedOutPut()) {
      const [preCell, nextCell] = this.getRandomTwoCells()
      console.log(preCell, nextCell)
      if (!this.union.sameRoot(preCell, nextCell)) {
        this.union.unionElement(preCell, nextCell)
        this.addLinkedMap(preCell, nextCell)
      }
    }
  }

  /**
   * 起点和终点相通
  */
  isEntryLinkedOutPut() {
    return this.union.sameRoot(0, this.cells - 1)
  }

  /**
   * 任取两个随机相连的格子
  */
 getRandomTwoCells() {
  const currentCell = Math.floor(Math.random() * this.cells)
  const row = Math.floor(currentCell / this.column) 
  const column = currentCell % this.column
  const sidingCell = []

  // if (row + 1 < this.row) sidingCell.push(this.cellArr[row + 1][column])
  if (row + 1 < this.row) sidingCell.push((row + 1) * this.row + column)
  if (row - 1 >= 0) sidingCell.push((row - 1) * this.row + column)
  if (column - 1 >= 0) sidingCell.push(row * this.row + column - 1)
  if (column + 1 < this.column) sidingCell.push(row * this.row + column + 1)

  const randomCellIndex = Math.floor(Math.random() * sidingCell.length)
  return [row * this.row + column, sidingCell[randomCellIndex]]
 }

 /**
  * linkMap
 */
 addLinkedMap(preCell, nextCell) {
   this.linkedMap.set(preCell, this.linkedMap.get(preCell) || []) 
   this.linkedMap.set(nextCell, this.linkedMap.get(nextCell) || []) 

   if (!this.linkedMap.get(preCell).includes(nextCell)) {
    this.linkedMap.get(preCell).push(nextCell)
   }

   if (!this.linkedMap.get(nextCell).includes(preCell)) {
    this.linkedMap.get(nextCell).push(preCell)
   }
 }

}


export default Maze;
