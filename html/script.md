# <script> 为什么要放到 <body> 中的最后面

```html
<html>
    <head></head>
    <body>

        <!-- 具体内容 -->
        <script>
            // xxx
        </script>
    </body>
</html>

```

<scirpt> 为什么要放到 <body> 的最后面 

因为一般来说(当然有一个例外) <script> 执行时 浏览器是不会执行 <body> 内部代码的

而 <body> 中代码却是浏览器 显示在页面中的内容。所以，当 <script> 内部代码执行时，浏览器的页面将会是一片空白。如果 <script> 执行时间过长，页面空白时间过长，给人一种卡顿的感觉。 

看这个例子。
```html
<html>
    <head></head>
    <body>

        <script>
           debugger
        </script>

        <h1>hi! YellRes</h1>
    </body>
</html>
```

页面卡住，把断点放开后，页面显示 "hi! YellRes"

再试试这个。
```html
<html>
    <head></head>
    <body>

        <h1>hi! YellRes</h1>
         <script>
            debugger
        </script>
    </body>
</html>
```
页面显示 "hi! YellRes"后，页面被卡住

所以，我们把 <script> 标签放到 <body> 最后面来执行，避免了 <script> 内部代码影响 <body> 内容的渲染。



