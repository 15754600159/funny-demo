var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成自动加上JS、CSS依赖的html代码

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: ['transform-decorators-legacy', 'transform-decorators']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]"
      },
      { // less处理
        test: /\.less$/,
        loaders: [
          'style?sourceMap',
          'css?modules&localIdentName=[name]-[local]-[hash:base64:5]',
          'less?sourceMap'
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({ // 生成自动加上JS、CSS依赖的html代码
      template: __dirname + "/src/index.tmpl.html",
    }),
  ]
};
