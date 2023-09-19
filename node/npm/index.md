# npm 相关

## npm 安装包时候的规则
有一个包结构 A{B,C}, B{C}, C{D}, npm安装的结构如下：
```html
A
+-- B
+-- C
+-- D
```

A，B依赖的C没有版本冲突，D包直接被提升到最高一层。

对于 A{B,C}, B{C,D@1}, C{D@2}, 这个安装的结构如下:
```html
A
+-- B
+-- C
   `-- D@2
+-- D@1
```

B依赖的D@1被提升到最高一层，C依赖的D@2安装到自己的node_modules中。


## npm 报错

###  Conflicting peer dependency: 系列

当npm安装一个 package 时，会去检查package中的peer dependence中的依赖。

当npm版本小于7.0时，npm只会安装package，对于peer dependence中的依赖，npm会忽略，但npm会给出提示：xxx对应的依赖没有安装。

当npm版本大于7.0时，npm不仅会安装package, 还会安装peer dependence中的依赖。

此时如果peer dependence中的依赖与已安装的依赖发生版本冲突，则Conflicting peer dependency就会出现。

解决办法：
- 使用 npm i [packageName] --legacy-peer-deps，--legacy-peer-deps这个命令告诉npm使用v7之前安装package方法，不安装peer dependence中的依赖，之间安装package。
- 使用 npm i [packageName] --force


