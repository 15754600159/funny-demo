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

<!-- *   格式化代码

    `npm run format`

*   JavaScript代码检查

    `npm run lint` -->

*   生成发布包

    `npm run build`

*   生成性能分析文件 state.json  分析网站：http://webpack.github.io/analyse/

    `npm run analyse`



## 打包性能优化 ##

1.  去除 webpack build 配置文件中的sourceMap和devtool能大大缩小最终打包文件的大小