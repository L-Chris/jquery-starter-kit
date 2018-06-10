'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader!sass-resources-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new TransferWebpackPlugin([
      {
        from: resolve('static'),
        to: config.dev.assetsSubDirectory
      }
    ], resolve('src')),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

const pages = utils.findEntry(`${config.base.viewsSubDirectory}/**/*.html`)

for (let pathName in pages) {
  const conf = {
    filename: `${pathName}.html`,
    template: pages[pathName],
    chunks: [pathName, 'vendors', 'manifest'],
    inject: true
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))  
}

module.exports = webpackConfig