const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.resolve(__dirname, './dist')
}

module.exports = {
  entry: {
    bundle: `${PATHS.src}/app.js`,
    app: `${PATHS.src}/app.js`
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: PATHS.build
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATHS.src
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: { loader: 'url-loader' }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin()
    new HtmlWebpackPlugin({
      title: 'TW Webpack',
      template: `${PATHS.src}/index.html`
    })
  ]
}