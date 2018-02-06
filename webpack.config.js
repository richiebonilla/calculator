const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map', // creates source map. cmd: npx webpack -d --watch
  entry: './src/app.js',
  output: {
    devtoolLineToLine: true, // srcmap
    sourceMapFilename: './bundle.js.map', // srcmap
    pathinfo: true, // srcmap
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // loc of output file
  },
  module: {
    rules: [{
      test: /\.(s*)css$/, // regex for .scss and .css file extensions
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) // loaders are chained in reverse order
    }]
  },
  plugins: [
    new ExtractTextPlugin({ // creates separate css file
      filename: 'css/app.bundle.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      math: 'mathjs'
    })
  ]
}
