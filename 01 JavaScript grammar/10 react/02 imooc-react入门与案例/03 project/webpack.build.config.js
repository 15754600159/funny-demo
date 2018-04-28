const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //从JS中分离出CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成自动加上JS、CSS依赖的html代码
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 去除build文件中的残余文件

module.exports = {
    entry: {
        app: __dirname + '/src/js/root.js',
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-responsive', 'antd'],
    },
    output: {
        path: __dirname + "/build",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy', 'transform-decorators']
                }
            },
            // css module 的css处理
            // {
            //   test: /\.css$/,
            //   loader: "style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]"
            // },
            //下面是使用 ant-design 的配置文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader", 'postcss-loader']
                })
            },
            { // css module： less处理
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]',
                    'less-loader'
                ]
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
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new webpack.optimize.UglifyJsPlugin({ // 代码压缩
            compress: { warnings: false }
        }),
        new HtmlWebpackPlugin({ // 生成自动加上JS、CSS依赖的html代码
            template: __dirname + "/src/index.tmpl.html",
        }),
        new CleanWebpackPlugin('build/*', { // 去除build文件中的残余文件
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor" // 指定公共 bundle 的名字。
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), // webpack3新特性 提高编译后JS文件运行效率
    ]
};
