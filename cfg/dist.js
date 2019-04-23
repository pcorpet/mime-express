const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const _ = require('lodash')

const baseConfig = require('./base')

var config = _.merge({
  cache: false,
  devtool: 'sourcemap',
  entry: [
    '@babel/polyfill',
  ].concat(baseConfig.entry),
  mode: 'production',
  output: {
    filename: 'app.[hash].js',
    path: path.join(__dirname, '/../dist'),
    publicPath: '/',
  },
}, _.omit(baseConfig, 'entry'))

config.plugins = [].concat(
  config.plugins.filter(p =>
    !(p instanceof WebpackPwaManifest) && !(p instanceof WorkboxPlugin.GenerateSW)),
  [
    // Define free variables -> global constants.
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(config.output.publicPath),
      'process.env.NODE_ENV': '"production"',
    }),
    // Only keep the fr locale from the moment library.
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),
    // Embed the JavaScript in the index.html page.
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
  config.plugins.filter(p =>
    (p instanceof WebpackPwaManifest) || (p instanceof WorkboxPlugin.GenerateSW)),
)

config.module.rules.push({
  include: [
    path.join(__dirname, '/../src'),
  ],
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
})

module.exports = config
