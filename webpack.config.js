const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: require.resolve('snapsvg/dist/snap.svg.js'),
        use: 'imports-loader?this=>window,fix=>module.exports=0'
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      snapsvg: 'snapsvg/dist/snap.svg.js'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
