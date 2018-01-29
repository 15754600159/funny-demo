# 前端Web工程 #


## 安装 ##

1.  安装[nodejs](https://nodejs.org/download/)

2.  设置 npm registry 替换国外的npm地址为淘宝镜像

    `npm config set registry https://registry.npm.taobao.org`

3.  安装插件。在工程根目录下运行:

    `npm install`


## 运行 ##

*   开发(启动浏览器调试)

    `npm run dev`

*   JavaScript代码检查 ( 能自动修复一些小的问题 )

    `npm run eslint` 

*   生成发布包 ( 生成雪碧图 )

    `npm run build`

*   生成性能分析文件 state.json  分析网站：http://webpack.github.io/analyse/

    `npm run analyse`



## 打包性能优化 ##

1.  去除 webpack build 配置文件中的sourceMap和devtool能大大缩小最终打包文件的大小

## 代码风格 ##
1. 去除没用的空行
2. class中的函数之后不用加 分号‘;’  
3. 对象属性之后都要加 逗号‘,’
4. JS中字符串用 单引号‘’ 来包裹
5. 拼接字符串'' + '' => 用ES6字符串模板``来替代
6. react元素的key属性不要用array的index