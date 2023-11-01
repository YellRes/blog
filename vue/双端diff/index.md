## 双端diff算法

### 算法思路
有newChildren 和 oldChildren 两个数组，newChildren 表示新数组，oldChildren 表示旧数组，
- 使用oldStartIdx, oldEndIdx指向oldChildren数组首尾。使用newStartIdx, newEndIdx指向newChildren数组首尾
- 当(newStartIdx <= newEndIdx) && (oldStartIdx <= oldEndIdx ) 新老首尾相互比较
  - 当前oldChildren[oldStartIdx]不存在 此时当前node已经被处理过
    - oldStartIdx++
  - 当前oldChildren[oldEndIdx]不存在 此时当前node已经被处理过
    - oldEndIdx--

  - 比较oldChildren[oldStartIdx].key 和 newChildren[newStartIdx].key
    - 相等说明新老dom该节点位置没有变化，直接patch新老dom。
      - newStartIdx++, oldStartIdx++

  - 比较oldChildren[oldStartIdx].key 和 newChildren[newEndIdx].key
    - 若相等，此时当前dom被移动到了[oldStartIdx, oldEndIdx]的最后面的位置，对应操作如下：
      - patch(oldChildren[oldStartIdx], newChildren[newEndIdx])
      - 把oldChildren[oldStartIdx].el 移动到oldChildren[oldEndIdx].el的后面
      - oldStartIdx++ newEndIdx--

  - 比较oldChildren[oldEndIdx].key 和 newChildren[newStartIdx].key
    - 若相等，此时当前dom被移动[oldStartIdx, oldEndIdx]的最前面的位置，对应操作如下：
      - patch(oldChildren[oldEndIdx], newChildren[newStartIdx])
      - 把oldChildren[oldEndIdx].el 移动到oldChildren[oldStartIdx].el的前面
      - oldEndIdx-- newStartIdx++

  - 比较oldChildren[oldEndIdx].key 和 newChildren[newEndIdx].key
    - 若相等，此时末尾dom位置没有变化
      - oldEndIdx-- newEndIdx--


- 上面情形都没有命中，则取出newChildren[newStartIdx]对应节点，到oldChildren中查找
  - 如果找到，说明此时oldChildren[item]是[oldStartIdx, oldEndIdx]中第一个节点，对应操作如下：
    - patch(oldChildren[item], newChildren[newStartIdx])
    - 把oldChildren[item].el移动到oldChildren[oldStartIdx].el的前面。
    - newStartIdx++

  - 如果没找到，说明此时newChildren[newStartIdx]是新增的节点，对应操作如下：
    - 新增newChildren[newStartIdx]到oldChildren[oldStartIdx]前面


- 最后比较[newStartIdx, newEndIdx]和[oldStartIdx, oldEndIdx]
  - 如果 newStartIdx > newEndIdx && oldStartIdx <= oldEndIdx，
    - 此时newChildren遍历完毕，oldChildren没有遍历完毕。说明此时oldChildren里面的dom要删除，操作很简单，删除[oldStartIdx, oldEndIdx]之间的节点即可

  - 如果 newStartIdx <= newEndIdx && oldStartIdx > oldEndIdx，
    - 此时oldChildren遍历完毕，newChildren没有遍历完毕。说明此时newChildren里面的dom要新增，操作很简单，新增[newStartIdx, newEndIdx]数据即可


### 使用index作为key？
相同type的vnode，key相同。我们会对vnode进行patch





