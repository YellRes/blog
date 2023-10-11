## 模块

一个文件就默认为一个模块，但node处理模块的方式有commonjsModule和esModule两种。

node一开始只支持commonjsModule，对应语法如下：

```javascript
// xx/src/util.js
const name = '这是commonjs模块'
module.exports = {
    name
}

// xx/src/index.js
const util = require('./util')
console.log(util)   // ==> {name: '这是commonjs模块'}
```

通过require导入内容，module.exports导出。

后来出现了esModule(es6中新出的模块规则)，node后来的版本也支持。对应语法如下：
> node中的要使用esModule, 我们新建的文件后缀名是.mjs，不是.js，默认情况下在.js中使用esModule会报错，不过也有办法修改，这个后面再说。

```javascript
// xx/src/util.mjs
const name = '这是esModule模块'
export {name}
export default name


// xx/src/index.mjs
import Util, {name} from './util.mjs'
console.log(util)  // => '这是esModule模块'
console.log(name)  // => '这是esModule模块'
```

在node环境中，.mjs结尾的文件都会使用esModule的规则来解析。除此之位还有两种方法可以让node使用esModule的规则来解析文件：
1. 在.js文件最近的package.json文件中，type属性设置为module
2.  Strings passed in as an argument to --eval, or piped to node via STDIN, with the flag --input-type=module.

与之对应的，commonjsModule的规则如下：
1. 文件拓展名是.cjs
2. 在.js文件最近的package.json文件中，type属性设置为commonjs
3. Strings passed in as an argument to --eval or --print, or piped to node via STDIN, with the flag --input-type=commonjs.

.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。


### esModule 和 commonjsModule 的加载的区别

commonjsModel 加载模块规则如下：
- 完全是同步加载
- 只能使用require()加载
- 文件夹也是一个模块
- 当模块名没有命中精准匹配时，node会尝试在模块名后面加上.js, .json, .node后缀来加载，如果还是不行会尝试把模块名当成目录名
- 将. json视为JSON文本文件
- 没有.json, .node的后缀文件时都视为js文本文件
- 默认不能直接加载esModule规则文件，可以使用import('xxx').then(res => res.default)加载
- .node files are interpreted as compiled addon modules loaded with process.dlopen().
- It is monkey patchable.

文件夹也是一个模块的解释

`require('./some-lib')`执行后，若package.json文件中没有`main`属性，则会去默认加载如下文件:
  - ./some-lib/index.js
  - ./some-lib/index.json
如果没有这些文件，node就会报错。


esModule 加载模块规则如下：
- 是异步加载的
- 使用import 或者import() 导入
- 不支持导入文件夹，不会默认添加拓展名，导入的文件路径名称必须完整
- 只能加载.js, .mjs, .cjs的js文件
- It can be used to load JavaScript CommonJS modules. Such modules are passed through the cjs-module-lexer to try to identify named exports, which are available if they can be determined through static analysis. Imported CommonJS modules have their URLs converted to absolute paths and are then loaded via the CommonJS module loader.
- It is not monkey patchable, can be customized using loader hooks.


## 入口

package.json 有两个字段定义了包的入口: main 和 exports。这两者对于esModule 和 commonjsModule 都管用。

main 所有的node版本都支持，但是只能定义一个入口文件。

exports 可以定义多入口，自动选择入口，and preventing any other entry points besides those defined in "exports"。

node10以上版本建议使用exports，node10以下版本使用必须使用main。exports和main都定义的话，exports的优先级更高。

exports 可以设置别名

- 子路径别名


```javascript

```

- main 的别名

```json
  "exports": {
    ".": "./main.js"
  }
```

由于exports字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。

```javascript
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}
```

- 条件加载
分别设置commonjs，esm加载的路径
```json
{
  "exports": {
    ".": {
      "node": "./main-node.cjs",
      "default": "./main-browser.cjs"
    }
  }
}
```

若exports没有其他导出，可以简写如下：
```json
{
  "exports": {
    "node": "./main-node.cjs",
    "default": "./main-browser.cjs"
  }
}
```


## 循环依赖

esm 和 commonjs 解决循环依赖的方式差不多，esm中import的语句会提升到代码的最前方执行，而commonjs则不会。

commonjs 和 esm 都是使用深度优先遍历所有子模块。

commonjs 和 esm 都是使用缓存解决循环依赖问题。

当一个模块加载(执行模块函数)后，内存中就有个模块对象，其结构类似于：

```javascript
{
  moduleId: 'xx',
  exports: {},
  isLoaded: '' // true/false,
  // xxx
}
```

exports是模块导出的内容，isLoaded表示模块是否加载完成。

当我们下次加载模块时候，会直接调用exports中的内容，而不会再次执行模块函数。


### commonjs 运行时候确定值

```javascript
// a.js
console.log('enter a.js')
exports.a = 2
console.log('start load b.js')
const moduleb = require('./b.js')
console.log('loaded b.js')
console.log(moduleb.b)
exports.a = 8
console.log('leave a.js')
```

```javascript
// b.js
console.log('enter b.js')
exports.b = 1
console.log('start load a.js')
const modulea = require('./a.js')
console.log('loaded a.js')
console.log(modulea.a)
exports.b = 10
console.log('leave b.js')
```

```javascript
// main.js
require('./a.js')

// 命令行执行  node main.js
```

运行结果：
```javascript
enter a.js
start load b.js
enter b.js
start load a.js
loaded a.js
2
leave b.js
loaded b.js
10
leave a.js
```



### esm 编译后所有import语句都被提升到代码的最上方


```javascript
// a.js
console.log('enter a.js')
import { b } from './b.js'
console.log(`a.js module.b ${b}`)

export let a = 2
```

```javascript
// b.js
console.log('enter b.js')
import { a } from './a.js'
console.log(`b.js module.a ${a}`)

export let b = 10
```

```javascript
// main.js
import { a } from './a.js'

console.log(`esm a: ${a}`)
```

运行结果：
```javascript
enter b.js
b.js module.a undefined
enter a.js
a.js module.b 10
esm a: 2
```