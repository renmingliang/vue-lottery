
module.exports = {
  proxyTable: {
    // 开发环境
    '/dev': {
      target: 'http://www.jaja365.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/dev': ''
      }
    }
  }
}
