'use strict'
const glob = require('glob')
const path = require('path')
const config = require('../config')

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.findEntry = _path => {
  let baseName, tmp, pathName
  
  return glob.sync(_path).reduce((pre, entry) => {
    baseName = path.basename(entry, path.extname(entry))
    pathName = `${entry.split('/').slice(-2, -1)}/${baseName}`
    pre[pathName] = entry
    return pre
  }, Object.create(null))
}