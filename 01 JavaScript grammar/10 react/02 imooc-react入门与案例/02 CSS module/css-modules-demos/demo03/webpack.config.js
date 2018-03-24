var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react','stage-1'],
          plugins: ['transform-decorators-legacy','transform-decorators']
      }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
