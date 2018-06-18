'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  devtool: 'source-map',
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
    new es3ifyPlugin(),
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
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      index: '/home/index.html'
    },
    progress: true,
    quiet: true,
    open: config.dev.autoOpenBrowser,
    outputPath: config.build.assetsRoot,
    proxy: config.dev.proxyTable,
    host: 'localhost',
    port: config.dev.port
  }
})

const entries = utils.findEntry(`${config.base.viewsSubDirectory}/*/index.js`)
const pages = utils.findEntry(`${config.base.viewsSubDirectory}/*/index.hbs`)

for (let pathName in entries) {
  const conf = {
    title: 'jquery-starter-kit',
    filename: `${pathName}.html`,
    template: pages[pathName] || resolve('src/index.hbs'),
    meta: {},
    chunks: [pathName]
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))  
}

const rewrites = Object.entries(pages).reduce((pre, [name]) => {
  if (!name.includes('home/index')) {
    pre.push({
      from: new RegExp(`\/${name.replace(/\/index$/, '')}$`),
      to: `/${name}.html`
    })
  }
  return pre
}, [])

webpackConfig.devServer.historyApiFallback.rewrites = rewrites

module.exports = webpackConfig