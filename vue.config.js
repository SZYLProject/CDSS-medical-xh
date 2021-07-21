const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  publicPath: process.env.NODE_ENV === 'prodection' ? './' : './',
  productionSourceMap: false, // 生产源映射 如果不需要生产时的源映射，可以加速生产构建
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true,
  runtimeCompiler: false,
  devServer: {
    port: 8090,
    https: false,
    // http://172.16.116.154:5039/v1/diseaseInfoSelectHC
    proxy: {
      '/api': {
        target: 'http://172.16.115.253:5039/', // 原地址
        // secure: false,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/tool': {
        target: 'http://172.16.115.253:5037/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tool': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
  // css: {
  //   loaderOptions: {

  //     sass: {

  //       data: '@import "@/assets/commonScss.scss;"' // assets是src目录下的, ``：是反引号不要写成英文单引号

  //     }

  //   }

  // },
}
