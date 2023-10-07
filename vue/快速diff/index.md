
1. 比较头部，
   1. 设置变量j指向两个数据的头部，若相等j++，不相等则结束循环。
2. 比较尾部
   1. 设置oldEnd，newEnd分别指向两个数据的尾部，若相等oldEnd--，newEnd--，不相等结束循环。
3. 一共有三种情况，其中有两种特殊情况。
   1. 若新数组遍历完毕(newEnd < j)，老数组还有剩余(oldEnd >= j)。则遍历[j, oldEnd]内容，依次卸载对应dom。
   2. 若老数组遍历完毕(oldEnd < j)，新数组还有剩余(newEnd >= j)。则遍历[j, newEnd]内容，依次把对应dom添加到树中。
   3. 第三种情况比较麻烦，老数组没有遍历完毕(oldEnd < j)，新数组也没有遍历完毕(newEnd < j)。此时要做对应dom的移动和添加。
      1. 对新数组中[j, newEnd]部分生成一个新数组arrIndexNew，其中的值是新数组[j, newEnd]中的值在老数组中的位置index。
      2. 在arrIndexNew找出一个最大递增子序列lis。lis中的老元素的位置是无需变化的
      3. 从newEnd遍历到j，查看当前arrIndexNew[index]的值，设置s=lis.length - 1
         1. 若arrIndexNew[index] === -1，当前值为新增。
         2. 若arrIndexNew[index] !== -1 且 arrIndexNew[index] !== lis[lis.length - 1]，当前值为移动，插入到上一个元素的前面。 
         3. 若arrIndexNew[index] !== -1 且 arrIndexNew[index] === lis[lis.length - 1]，当前值无需移动。s--