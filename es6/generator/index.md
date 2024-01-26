# generator

generator是生成器，函数中有*的是生成器函数
```javascript
function* gen() {}
```
gen是个生成器函数，生成器函数的返回值是个迭代器对象。
```javascript
function
```


generator 可以用来处理异步编程，不过此时需要一个执行器，把创建好的generator自动执行。