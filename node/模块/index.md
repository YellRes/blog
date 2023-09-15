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




