const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackbar = require('webpackbar')

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        // .tsx用typescript-loader解析解析
        test: /\.(ts|tsx|js|jsx)?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(
                __dirname,
                '../src/assets/styles/variable.scss'
              )
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[hash:4].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackbar(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/**/*',
          to: './',
          globOptions: {
            ignore: ['**/favicon.png', '**/index.html']
          },
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html存放路径，相对于 output.path
      favicon: './public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      template: './public/index.html', // html模板路径
      inject: true // 是否将js放在body的末尾
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.svg'], // 后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
