/**
 *
 * 双端diff
 * const arr = [1, 2, 3, 4]
 * const arr2 = [2, 1, 4, 3]
 *
 * 如何修改arr 使得arr变成arr2的数据
 *
 */

const doubleEndDiff = (n1, n2, container) => {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 4个指针 分别指向老数组首尾  新数组首尾
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length;

  // 依次从[oldStartId, oldEndIdx] 和 [newStartIdx, newEndIdx] 各取出一个值进行比较
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldChildren[oldStartIdx].key === newChildren[newStartIdx].key) {
    } else if (oldChildren[oldEndIdx].key === newChildren[newEndIdx].key) {
    } else if (oldChildren[oldStartIdx].key === newChildren[newEndIdx].key) {
    } else if (oldChildren[oldEndIdx].key === newChildren[newStartIdx].key) {
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
};
