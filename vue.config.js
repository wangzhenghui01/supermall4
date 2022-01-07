/* eslint-disable prettier/prettier */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const CompressionWebpackPlugin = require('compression-webpack-plugin') //代码压缩
const productionGzipExtensions = ['js', 'css']
const webpack = require('webpack')
const productionGzip = true // 是否开启代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去掉注释
module.exports = {
  // publicPath:process.env.NODE_ENV === 'production' ? '/vue_workspac/aihuhuproject/' : '/',
  //基本路径
  publicPath: './',//默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
  },
  devServer: {
    open: true,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    hot:true,
    port: 1005,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8089/manage', //目标接口域名
        secure: false, //false为http访问，true为https访问
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '' //重写接口
        }
      }
    }, // 设置代理
    // before: app => { }
  },
  // webpack-dev-server 相关配置
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      myConfig.plugins = []
      // gzip
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          deleteOriginalAssets:true,
          minRatio: 0.8
        })
      )

      // myConfig.plugins.push(
      //     new webpack.HashedModuleIdsPlugin()
      // )
      // 去掉注释
      myConfig.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      //   myConfig.devServer = {
      //     disableHostCheck: true
      //   }
    }
    return myConfig
  },

  chainWebpack: config => {

    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('router',resolve('src/router'))
      .set('utils',resolve('src/utils'))
      .set('static',resolve('src/static'))
      .set('store',resolve('src/store'))
      .set('views',resolve('src/views'))
      .set('network',resolve('src/network'))
    // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: '65-90', speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   })
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
