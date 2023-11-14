function floor(val) {
  return Math.floor(val)
}

function getAllPoint(mazeItem, gridItem) {
  const { x, y } = mazeItem;
  const { width } = gridItem;
  const pointArr = [];
  const originX = y * width;
  const originY = x * width;

  for (let i = 0; i < mazeItem.length ; i++) {
    switch (i) {
      case 0:
        pointArr.push([originX + width, originY])
        break;
      case 1:
        pointArr.push([originX + width, originY + width])
        break
      case 2:
        pointArr.push([originX, originY + width])
        break
      case 3:
        pointArr.push([originX , originY])
        break
    }
  }

  return pointArr;
}

/**
 * 节点排序
*/
function sortAllPoint(mazeItem) {
  let nextPointArr = []
  let prePointArr = []
  let isGetFalse = false

  for (let i = 0; i < mazeItem.length; i++) {
   
    if (isGetFalse) {
      prePointArr.push(mazeItem[i])
      continue
    }

    if (mazeItem[i]) {
      nextPointArr.push(mazeItem[i])
    } else {
      prePointArr.push(mazeItem[i])
      isGetFalse = true
    }
  }

  return [...prePointArr, ...nextPointArr]
}

/**
 * 并交集
 * */ 
class Union {
  unionSet = []

  constructor(cells) {
    this.unionSet = new Array(cells).fill(-1)
  }

  setUnion(root1, root2) {
    this.unionSet[root1] = root2
  }

  findRoot(x) {
    while(this.unionSet[x] !== -1) {
      x = this.unionSet[x]
    }

    return x
  }

  sameRoot(x, y) {
    return this.findRoot(x) === this.findRoot(y)
  }

  unionElement(x, y) {
    this.setUnion(this.findRoot(x), this.findRoot(y))
  }

}

export { getAllPoint, sortAllPoint, Union };
