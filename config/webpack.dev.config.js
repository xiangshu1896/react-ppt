const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const ESLintPlugin = require('eslint-webpack-plugin')
const PUBLIC_PATH = '/'

const devConfig = {
  mode: 'development',
  devServer: {
    hot: true
  },
  entry: ['./src/index.tsx'],
  output: {
    path: __dirname + '/',
    publicPath: PUBLIC_PATH,
    filename: 'bundle-[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [new ESLintPlugin()]
}

module.exports = merge(devConfig, baseConfig)
