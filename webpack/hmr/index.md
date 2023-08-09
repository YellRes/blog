# hmr 过程

1. webpack 创建实例 complier, complier监听文件打包完成的钩子。
2. 创建node本地服务器。
3. 创建socket连接。
4. 本地访问服务器后，连接socket。
5. 本地打包后，socket发送消息给浏览器。
6. 浏览器查询本次热跟新的模块信息，并请求对应的模块。
7. 将对应的模块更新掉。