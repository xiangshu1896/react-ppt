const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin') // 优化js
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 为了单独打包css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 对CSS进行压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次打包前清除旧的build文件夹
const PUBLIC_PATH = './'

const prodConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src', 'index'),
  output: {
    path: path.resolve(__dirname, '../build'), // 将文件打包到此目录下
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: 'dist/[name].[chunkhash:8].js',
    chunkFilename: 'dist/[name].[chunkhash:8].chunk.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            // drop_console: true, // 删除所有的console.*
            drop_debugger: true, // 删除所有的debugger
            pure_funcs: ['console.log'] // 删除所有的console.log
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'dist/[name].[chunkhash:8].css', // 生成的文件名
      ignoreOrder: true // 忽略因CSS文件引入顺序不一致而抛出的警告信息，多为antd内部css引起
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)
