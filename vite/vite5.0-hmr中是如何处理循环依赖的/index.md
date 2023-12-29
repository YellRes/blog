# vite5.0 hmr中是如何处理循环依赖的

vite是依靠浏览器支持原生es模块来解析文件的，所以我们先看看es模块(简称为esm)中是如何处理循环依赖的。
<a name="mJZDz"></a>
## 案例
假如有3个文件，a.js, b.js, c.js，其中a.js导入了b.js且a.js 中有对b.js内容的使用，b.js中导入了c.js，c.js中导入了a.js。它们的代码如下：
```javascript
import b from './b.js'
// a.js 中导入了b模块的内容，这一块就要求b模块一定要在a.js模块模块加载之前加载
console.log(b)

const a = 'aaaaaaa'
export default a

```
```javascript
import c from './c.js'
export default 'moduleB'

```
```javascript
import a from './a.js'
const c = 'ccc'
export default c
```
![](https://cdn.nlark.com/yuque/0/2023/jpeg/394182/1703818549135-92d73bd2-baf2-4f91-aefd-945aac5a4ba5.jpeg)

再创建一个`indexEntryA.html`，`indexEntryB.html`。
```html
<!-- indexEnteryA.html  -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>circle import in vite/webpack</title>
</head>
<body>
    <!-- 入口是a.js -->
    <script src="./a.js" type="module"></script>
</body>
</html>
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>circle import in vite/webpack</title>
</head>
<body>
  	<!-- 入口是b.js -->
    <script src="./b.js" type="module"></script>
</body>
</html>
```
两个文件，入口文件不同，我们放到浏览器中执行它们。<br />`indexEntryA.html`中所有js文件能够执行成功，而`indexEntryB.html`中会报错<br />Uncaught ReferenceError: Cannot access 'b' before initialization<br />这个错误产生的原因是，当前b这个变量还没有定义，而我们却使用了。<br />那为什么`indexEntryA.html`中导入`a.js`不会报错，而`indexEntryB.html`导入的`b.js`就会报错呢？
<a name="wOeGL"></a>
## esm处理循环依赖
`esm`处理循环依赖的方式和`nodejs`中`commonjs`相似，都是使用了缓存，深度优先遍历。<br />只不过浏览器中的`esm`加载模块的时候是异步的，`commonjs`加载模块的时候是同步的。而且esm的导入值和`commonjs`中也有很大区别。<br />具体如何处理循环依赖的可以看下面文章：<br />[从模块的循环加载看ESM与CJS - 掘金](https://juejin.cn/post/7027778119050362917)<br />[ES6 入门教程](https://es6.ruanyifeng.com/#docs/module-loader#%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)<br />简单描述下`indexEntryA.html`中`a.js`的加载过程：

- `indexEntryA.html`发现导入a.js，此时浏览器去缓存中查找，没有找到去请求`a.js`的文件
- `a.js`下载好后，开始执行。执行第一行发现导入了`b.js`，还是先去查找缓存，当发现没有缓存时候会去下载`b.js`。
- `b.js`下载好后，开始执行。执行第一行发现导入了`c.js`，还是先去查找缓存，当发现没有缓存时候会去下载`c.js`
- `c.js`下载好后，开始执行。执行第一行发现导入了`a.js`，还是先去查找缓存，此时发现了缓存中`a.js`。此时直接使用缓存中的`a.js`，继续执行`c.js`剩余代码内容，然后`c.js`执行完毕。
- `c.js`执行完毕后，执行`b.js`剩余代码内容 直到模块加载完毕。
- `b.js`执行完毕后，最后执行`a.js`剩余内容直到模块执行完毕。
- 这边`a.js`能够导入不报错的原因是，`b.js`在`a.js`加载之前已经全部加载完毕了。`b.js`中的内容对`a.js`是完全可访问的。

同理`indexEntryB.html`中执行`b.js`时，当代码执行到`a.js`时此时`b.js`中已经在模块缓存中，但由于深度优先遍历的原因，此时模块`b.js`没有导出内容，而此时`a.js`中使用了`b.js`中的内容，由于`esm`默认使用了严格模式，变量必须定义才能使用(函数可能会有提升)。导致了报错<br />所以对于 a.js -> b.js -> c.js -> a.js 这种循环依赖，从`a.js`加载是可以成功加载文件的，但是如果我们从`b.js`加载是会报错的。
<a name="uZ56O"></a>
## Vite5.0 判断循环依赖
这几天在看`vite`热更新的源码，其中发现当文件内容改变后，vite会根据文件判断页面是热更新，还是页面重载。这两者的区别是：热更新vite只会请求触发热更新的文件(xxx.js?v=时间戳)，而页面重载的vite会重新请求项目入口文件(一般是main.{js,ts})。<br />vite找到热更新文件b.js后，vite5.0新增了一个查找`b.js`文件是否存在于一个循环依赖中。<br />就拿上面例子来说，a.js -> b.js -> c.js -> a.js 如果`b.js`是个热更新边界，当`c.js`中代码变动后，`vite`找到了热更新边界`b.js`，此时`vite`会查找导入`b.js`模块(vite源码里面的变量叫`importers`)，查找`importers`中有没有被`c.js`导入从而形成了循环依赖，如果有的话，停止热更新，直接重载页面。没有的话则继续热更新。<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/394182/1703828299382-079fed23-4d91-4038-894e-4e0290567bc1.jpeg)<br />具体的代码：
```typescript
/**
 * Check importers recursively if it's an import loop. An accepted module within
 * an import loop cannot recover its execution order and should be reloaded.
 * 递归的检查接受热更新的模块的importers是否形成了循环依赖，一个循环依赖不能恢复重新执行的顺序
 * 并且应该重载
 *
 * @param node The node that accepts HMR and is a boundary
 * 接受hmr的moduleNode
 * @param nodeChain The chain of nodes/imports that lead to the node.
 * 文件发生变动的moduleNode到接受hmr moduleNode之间的路径
 *   (The last node in the chain imports the `node` parameter)
 * @param currentChain The current chain tracked from the `node` parameter
 * hmr moduleNode到其importer之间的路径
 * @param traversedModules The set of modules that have traversed
 */
function isNodeWithinCircularImports(
  node: ModuleNode,
  nodeChain: ModuleNode[],
  currentChain: ModuleNode[] = [node],
  traversedModules = new Set<ModuleNode>(),
): HasDeadEnd {
  // To help visualize how each parameters work, imagine this import graph:
  //
  // A -> B -> C -> ACCEPTED -> D -> E -> NODE
  //      ^--------------------------|
  //
  // ACCEPTED: the node that accepts HMR. the `node` parameter.
  // NODE    : the initial node that triggered this HMR.
  //
  // This function will return true in the above graph, which:
  // `node`         : ACCEPTED
  // `nodeChain`    : [NODE, E, D, ACCEPTED]
  // `currentChain` : [ACCEPTED, C, B]
  //
  // It works by checking if any `node` importers are within `nodeChain`, which
  // means there's an import loop with a HMR-accepted module in it.

  if (traversedModules.has(node)) {
    return false
  }
  traversedModules.add(node)

  for (const importer of node.importers) {
    // Node may import itself which is safe
    // 自己导入自己的模块
    if (importer === node) continue

    // a PostCSS plugin like Tailwind JIT may register
    // any file as a dependency to a CSS file.
    // But in that case, the actual dependency chain is separate.
    if (isCSSRequest(importer.url)) continue
    

    // Check circular imports
    // 这边判断importer 是否在nodeChain中
    const importerIndex = nodeChain.indexOf(importer)
    if (importerIndex > -1) {
      // Log extra debug information so users can fix and remove the circular imports
      if (debugHmr) {
        // Following explanation above:
        // `importer`                    : E
        // `currentChain` reversed       : [B, C, ACCEPTED]
        // `nodeChain` sliced & reversed : [D, E]
        // Combined                      : [E, B, C, ACCEPTED, D, E]
        const importChain = [
          importer,
          ...[...currentChain].reverse(),
          ...nodeChain.slice(importerIndex, -1).reverse(),
        ]
        debugHmr(
          colors.yellow(`circular imports detected: `) +
            importChain.map((m) => colors.dim(m.url)).join(' -> '),
        )
      }
      return 'circular imports'
    }

    // Continue recursively
    // 递归查找importer的importer
    if (!currentChain.includes(importer)) {
      const result = isNodeWithinCircularImports(
        importer,
        nodeChain,
        currentChain.concat(importer),
        traversedModules,
      )
      if (result) return result
    }
  }
  return false
}
```
<a name="zWC1j"></a>
## 拓展：
<a name="Yyh48"></a>
### 深拷贝中如何处理循环依赖？
```javascript
// 使用weakmap 来保存已经创建的对象，避免重复创建
const wm = new WeakMap();
const deepClone = (obj) => {
  let cloneObj = {};
  // 非对象直接返回
  if (typeof obj !== "function" && typeof obj !== "object") {
    return obj;
  }

  // 查看是否有缓存
  if (wm.has(obj)) {
    return wm.get(obj);
  }

  // 对象
  wm.set(obj, cloneObj);
  for (let key of Object.keys(obj)) {
    cloneObj[key] = deepClone(obj[key]);
  }

  return cloneObj;
};

```

<a name="XeGXz"></a>
### 链表中里面有个环节点，如何找到环开始的节点?
[leetcode链接](https://leetcode-cn.com/problems/linked-list-cycle-ii/description/)
```javascript
var detectCycle = function(head) {
    let cur = head
    const ws = new WeakSet()

    while(!ws.has(cur) && cur) {
        ws.add(cur)
        cur = cur.next
    }

    return cur ?  cur : null
    
};
```









