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
> 复用从dom层面是指：可以不用被销毁，我们直接修改下dom的属性即可。
