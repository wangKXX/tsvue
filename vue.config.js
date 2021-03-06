const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('common', resolve('common'))
  },
  devServer: {
    disableHostCheck: true,
    port: 3000
  }
}