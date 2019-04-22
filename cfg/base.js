// This file is the base configuration for the [webpack module bundler](https://webpack.github.io/).
// Use this file to edit settings that are the same for all environments (dev, test, prod).
const imageMinJpg = require('imagemin-mozjpeg')
const imageMinPng = require('imagemin-optipng')
const imageMinSvg = require('imagemin-svgo')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')

var path = require('path')
var webpack = require('webpack')

var port = 80
var srcPath = path.join(__dirname, '/../src')

module.exports = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    port: port,
    publicPath: '/',
  },
  entry: ['./src/entry'],
  module: {
    rules: [
      {
        enforce: 'pre',
        include: path.join(__dirname, 'src'),
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|eot|ttf|woff2?)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'url-loader',
          query: {limit: 8192},
        },
      },
      {
        test: /\.(png|jpg)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {limit: 8192},
          },
          {
            loader: 'img-loader',
            options: {
              enabled: process.env.REACT_WEBPACK_ENV === 'dist',
              plugins: [
                imageMinPng({}),
                imageMinJpg({}),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {limit: 8192},
          },
          'svg-transform-loader',
          {
            loader: 'img-loader',
            options: {
              enabled: process.env.REACT_WEBPACK_ENV === 'dist',
              plugins: [
                imageMinSvg({
                  removeComments: true,
                  removeDesc: true,
                  removeTitle: true,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    // fetch polyfill
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new WorkboxPlugin.GenerateSW(),
    new WebpackPwaManifest({
      'background_color': '#1fa270', // green
      icons: [{
        sizes: [192, 512],
        src: path.resolve('src/images/icon_192x192.png'),
        type: 'image/png',
      }],
      lang: 'fr-FR',
      name: 'Mime-Express',
      'theme_color': '#1e5089', // blue
    }),
  ],
  resolve: {
    alias: {
      components: srcPath + '/components/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV,
      images: srcPath + '/images/',
      store: srcPath + '/store/',
      styles: srcPath + '/styles/',
    },
    extensions: ['.js', '.jsx', '_pb.js'],
  },
}
