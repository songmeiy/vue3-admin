const {
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
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['html', 'js', 'css', 'svg']
const dayjs = require('dayjs')
const dateTime = dayjs().format('YYYY-M-D HH:mm:ss')
const FileManagerPlugin = require('filemanager-webpack-plugin')

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
            name: 'experiment-platform-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementPlus: {
            name: 'experiment-platform-element-plus',
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
