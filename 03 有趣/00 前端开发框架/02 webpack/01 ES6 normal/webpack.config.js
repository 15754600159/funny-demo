/**
 * 1. 入门: https://segmentfault.com/a/1190000006178770
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //从JS中分离出CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成自动加上JS、CSS依赖的html代码


module.exports = {
    devtool: 'eval-source-map', //一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试
    entry: __dirname + "/app/js/app.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true //热加载插件
    },
    module: {
        rules: [
            { // JS处理
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            { // CSS处理
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    }, 'postcss-loader'] //post-loader现用于添加浏览器兼容css前缀
                })
            },
            { // less处理
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                    }
                }, {
                    loader: "less-loader",
                    options: {
                        sourceMap: true, //开发阶段的less需要sourceMap来映射，便于调试
                        strictMath: true,
                        noIeCompat: true
                    }
                }]
            },
            { // 图片处理
                test: /\.(jpeg|jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024',
                            name: 'images/[name].[ext]' //参数参考 http://blog.csdn.net/qq_38652603/article/details/73835153
                        }
                    },
                ]
            },
            // bootstrap相关文件处理
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader", options: {name: 'fonts/[name].[ext]'}},
            { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000", options: {name: 'fonts/[name].[ext]'} },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream", options: {name: 'fonts/[name].[ext]'} },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml", options: {name: 'fonts/[name].[ext]'} },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({ // 生成自动加上JS、CSS依赖的html代码
            template: __dirname + "/app/index.tmpl.html",
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]



}