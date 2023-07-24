
最近项目打包发布项目文件没有更新


```javascript
const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const mime = require('mime')

http
  .createServer((req, res) => {
    console.log(url.parse(req.url).pathname, 'url.parse(req.url).pathname')
    const uri = url.parse(req.url).pathname
    // console.log(uri.split('/').pop().indexOf('.') === -1, 'url.parse(req.url).pathname')
    let isFileRequestOrRoute = uri.split('/').pop().indexOf('.') === -1
    const resource = path.join(process.cwd(), uri)

    // 请求文件的区别
    fs.readFile(isFileRequestOrRoute ? './index.html' : resource, (err, file) => {
      if (err) return console.log('error happen')
      else {
        if (isFileRequestOrRoute) {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.write(file)
        } else {
          // 指定文件类型
          res.writeHead(200, { 'Content-Type': mime.getType(resource) })
          res.write(file, 'binary')
        }
        res.end()
      }
    })
  })
  .listen(3082)

```

参考链接：
- [http-server-spa](https://www.npmjs.com/package/http-server-spa?activeTab=code)
- []()