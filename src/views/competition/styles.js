const files = require.context('.', true, /\.(scss|css)$/)

files.keys().forEach(key => {
  exports[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})