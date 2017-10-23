module.exports = {

    /**
     * devtool选项配置结果
     * source-map	                 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
     * cheap-module-source-map	     在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
     * eval-source-map	             使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
     * cheap-module-eval-source-map	 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
     */
    devtool: 'eval-source-map',// webpack可以在打包时为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
    entry: __dirname + "/app/main.js", //唯一入口文件 “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出的文件名
    },

    /**
     * devserver的配置选项
     * contentBase	        默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
     * port	                设置默认监听端口，如果省略，默认为”8080“
     * inline	            设置为true，当源文件改变时会自动刷新页面
     * historyApiFallback	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
     */
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    },

    module: {
        rules: [
            /**
             * loader配置
             * test：            一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
             * loader：          loader的名称（必须）
             * include/exclude:  手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
             * query：           为loaders提供额外的设置选项（可选）
             */
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    // options: { //babel的配置比较复杂，所以单独提取到.babelrc文件中
                    //     presets: ["es2015", 'react']
                    // }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader", //style-loader将所有的计算后的样式加入页面中
                    },{
                        loader: "css-loader", //css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
                        options: {
                            modules: true,
                        }
                    }
                ]
            }

        ]
    },
}