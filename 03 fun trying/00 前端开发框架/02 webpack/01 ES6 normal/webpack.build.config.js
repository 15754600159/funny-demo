const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin'); //从JS中分离出CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成自动加上JS、CSS依赖的html代码
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 去除build文件中的残余文件

module.exports = {
    entry: __dirname + "/app/js/app.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
        // filename: "bundle-[hash].js", //hash值用来处理缓存问题
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./build", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
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
                    use: ['css-loader', 'postcss-loader']
                })
            },
            { // less处理
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            }
                        }, {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                                strictMath: true,
                                noIeCompat: true
                            }
                        }
                    ]
                })
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
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new ExtractTextPlugin({
            filename: 'style.css'
            // filename: '[name].css'
        }),
        new HtmlWebpackPlugin({ // 生成自动加上JS、CSS依赖的html代码
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(), //压缩JS代码
        new CleanWebpackPlugin('build/*', { // 去除build文件中的残余文件
            root: __dirname,
            verbose: true,
            dry: false
        }),
    ],
};
