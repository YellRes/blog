# 

newChildren 
oldChildren 
### 没有key情况
1. 比较newChildren和oldChildren数组长度，取数组长度较短的那个长度minLength。
2. 遍历minLength，比较newChildren[i]和oldChildren[i]，根据newChildren[i]修改真实dom。
3. 遍历完成后，如果newChildren>minLength，说明newChildren这部分是新增的，继续遍历[minLength,newChildren.length)部分，在真实dom上新增对应dom节点。
4. 遍历完成后，如果oldChildren>minLength，说明oldChildren这部分是删除的，继续遍历[minLength,oldChildren.length)部分，在真实dom上删除对应dom节点。


### 有key情况
node上面有key时候，我们知道哪些真实dom时可以复用的。
> 复用从dom层面是指：可以不用被销毁，我们直接修改下dom的属性，然后移动dom的位置。

1. 设置全局变量maxIndex 遍历newChildren
2. 当前的newChildren[i] 是否能在oldChildren中找到
   1. 找到则记录当前在oldChildren位置的索引，判断当前index是否大于全局的maxIndex
      1. 若大于maxIndex，则将maxIndex设置为当前index
      2. 若小于maxIndex，则移动newChildren[i].el到原有dom的最后
   2. 没找到，则直接在dom上新增dom
3. 遍历oldChildren，查找oldChildren[i]在newChildren中是否存在
   1. 不存在的话随即删除对应的真实dom

关键点：全局变量maxIndex，通过判断当前节点在oldChildren的index和maxIndex的关系。用来判断dom节点位置的移动。