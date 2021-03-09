const {
  // baseURL,
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devPort,
  providePlugin,
  build7z,
  buildGzip,
  abbreviation,
  imageCompression,
  webpackBarName,
  webpackBanner
} = require('./src/config')

const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const str =
  '\u0076\u0075\u0065\u002d\u0070\u006c\u0075\u0067\u0069\u006e\u002d\u0072\u0065\u006c\u0079'
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const { version, author, devDependencies } = require('./package.json')
if (devDependencies[unescape(str.replace(/\\u/g, '%u'))]) process.env.VUE_APP_RELY = 'success'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['html', 'js', 'css', 'svg']
const dayjs = require('dayjs')
const dateTime = dayjs().format('YYYY-M-D HH:mm:ss')
const FileManagerPlugin = require('filemanager-webpack-plugin')
process.env.VUE_APP_AUTHOR = author
process.env.VUE_APP_UPDATE_TIME = dateTime
process.env.VUE_APP_VERSION = version
const mockServer = () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    return require('./mock/mockServer.js')
  } else {
    return ''
  }
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    // proxy: {
    //   [baseURL]: {
    //     target: 'http://127.0.0.1',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + baseURL]: ''
    //     }
    //   }
    // }
    after: mockServer()
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve('')
        }
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({ name: webpackBarName })
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.symlinks(true)
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map')
    })
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'vue3-admin-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementPlus: {
            name: 'vue3-admin-element-plus',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/
          }
        }
      })
      config
        .plugin('banner')
        .use(Webpack.BannerPlugin, [`${webpackBanner}${dateTime}`])
      if (imageCompression) {
        config.module
          .rule('images')
          .use('image-webpack-loader')
          .loader('image-webpack-loader')
          .options({
            bypassOnDebug: true
          })
          .end()
      }
      if (buildGzip) {
        config.plugin('compression').use(CompressionWebpackPlugin, [
          {
            filename: '[path][base].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8
          }
        ])
      }
      if (build7z) {
        config.plugin('fileManager').use(FileManagerPlugin, [
          {
            onEnd: {
              archive: [
                {
                  source: `./${outputDir}`,
                  destination: `./${outputDir}/${abbreviation}_${dateTime}.7z`
                }
              ]
            }
          }
        ])
      }
    })
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !==
            'src/style/variables/variables.scss'
          ) {
            return '@import "~@/style/variables/variables.scss";' + content
          }
          return content
        }
      }
    }
  }
}
