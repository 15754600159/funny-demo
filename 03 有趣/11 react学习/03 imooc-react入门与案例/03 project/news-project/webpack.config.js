const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //从JS中分离出CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成自动加上JS、CSS依赖的html代码

module.exports = {
    devtool: 'eval-source-map', //一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试
    entry: __dirname + '/src/js/root.js',
    output: {
        path: __dirname + "/build",
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true //热加载插件
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
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    }, 'postcss-loader']
                })
            },
            { // css module： less处理
                test: /\.less$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]',
                    'less-loader?sourceMap'
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
        new HtmlWebpackPlugin({ // 生成自动加上JS、CSS依赖的html代码
            template: __dirname + "/src/index.tmpl.html",
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ]
};
