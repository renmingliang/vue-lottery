/* eslint-disable */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'
const port = 9302
const pageTitle = process.env.VUE_APP_SYS_NAME

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: isDev,
  lintOnSave: true,
  chainWebpack: config => {
    // 页面title
    config.plugin('html').tap(args => {
      args[0].title = pageTitle
      return args
    })

    // 设置别名
    config.resolve.alias
      .set('@/', resolve('src'))
      .set('#/', resolve('types'))
  },
  // 自定义webpack配置
  configureWebpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /element-plus[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]en/,
        'element-plus/lib/locale/lang/zh-cn'
      )
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: '.cache/',
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: !isDev, // 删除console语句
              drop_debugger: !isDev // 移除debugger语句
            }
          }
        })
      ]
    }
  },
  // 服务代理配置
  devServer: {
    open: false, // 是否自启浏览器
    host: '0.0.0.0',
    port,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
