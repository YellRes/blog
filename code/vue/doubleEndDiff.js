/**
 *
 * 双端diff
 * const arr = [1, 2, 3, 4]
 * const arr2 = [2, 1, 4, 3]
 *
 * 如何修改arr 使得arr变成arr2的数据
 *
 */
const patch = () => {};
const doubleEndDiff = (n1, n2, container) => {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 4个指针 分别指向老数组首尾  新数组首尾
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length;

  // 依次从[oldStartId, oldEndIdx] 和 [newStartIdx, newEndIdx] 各取出一个值进行比较
  // 每次遍历完 [oldStartId, oldEndIdx] 和 [newStartIdx, newEndIdx] 区间外的真实dom位置已经固定
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 当前节点已经被处理过
    if (!oldChildren[oldStartIdx]) {
      oldStartIdx++;
    } else if (!oldChildren[oldEndIdx]) {
      oldEndIdx--;
    } else if (oldChildren[oldStartIdx].key === newChildren[newStartIdx].key) {
      patch(oldChildren[oldStartIdx], newChildren[newStartIdx]);
      oldStartIdx++;
      newStartIdx++;
    } else if (oldChildren[oldEndIdx].key === newChildren[newEndIdx].key) {
      patch(oldChildren[oldEndIdx], newChildren[newEndIdx]);
      oldEndIdx--;
      newEndIdx--;
    } else if (oldChildren[oldStartIdx].key === newChildren[newEndIdx].key) {
      patch(oldChildren[oldStartIdx], newChildren[newEndIdx]);
      insertAfter(oldChildren[oldEndIdx], oldChildren[oldStartIdx].el);
      oldStartIdx++;
      newEndIdx--;
    } else if (oldChildren[oldEndIdx].key === newChildren[newStartIdx].key) {
      patch(oldChildren[oldEndIdx], newChildren[newStartIdx]);
      // 把当前节点放到 开始节点的前面
      insertBefore(oldChildren[oldEndIdx], oldChildren[oldStartIdx]);
      // insert();
      oldEndIdx--;
      newEndIdx++;
    } else {
      const idxInOld = oldChildren.findIndex(
        (item) => item.key === newChildren[newStartIdx].key
      );

      if (idxInOld) {
        patch(oldChildren[idxInOld], newChildren[newStartIdx]);
        insert(oldChildren[idxInOld], container, oldChildren[oldStartIdx]);
        // Q: 设置为undefined后 会影响到 oldStartIdx oldEndIdx
        oldChildren[idxInOld] = undefined;
        newStartIdx++;
      } else {
        // 节点是新增的
      }
    }
  }

  // 判断是否有新增节点 和 删除的节点
  if (oldStartIdx > oldEndIdx && newStartIdx <= newEndIdx) {
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // 新增newChildren[i] 对应的真实节点  到dom结尾
    }
  } else if (oldStartIdx <= oldEndIdx && newStartIdx > newEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 删除oldChildren[i] 对应的节点
    }
  }
};
