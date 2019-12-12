const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
//这段程序的作用是将我们的前端项目设置成静态资源这样我们在浏览器中
//就可以直接通过 http://127.0.0.1:xxxx/xxx (所在页面的目录层级)访问我们的页面,做到边开发边调试.
app.use(express.static('./public'));

var proxyPath = "http://127.0.0.1:3000";//目标后端服务地址 一定要加上http://
 
//将本地服务 localhost:8080 代理到 localhost:3000 端口上
const apiProxy = proxy('/api', { target: proxyPath, changeOrigin: true });
app.use('/api/*', apiProxy);//api目录下的都是用代理
 
app.listen(8080, () => {
  console.log('Listening on: http://localhost:8080');
});

