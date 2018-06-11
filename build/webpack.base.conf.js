'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.findEntry(`${config.base.viewsSubDirectory}/**/index.js`),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      jquery: 'jquery/jquery.min.js',
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      src: resolve('src'),
      '@': resolve('src')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }],
    postLoaders: [{
      test: /\.js$/,
      loader: "es3ify-loader"
    }]
  },
  sassResources: ['./src/styles/vars.scss', './src/styles/mixins.scss'],
  externals: {
    $: 'window.jQuery',
    handlebars: 'window.Handlebars'
  }
}