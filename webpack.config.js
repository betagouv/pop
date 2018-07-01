const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BabelPlugin = require("babel-webpack-plugin");


module.exports = env => {
  const production = env['production'];
  console.log('PRODUCTION ', production);

  const plugins = [
    new ManifestPlugin({
      seed: require('./public/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: path.join('public/favicon.ico'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new BabelPlugin({
      test: /\.js$/,
      presets: [
        ['env', {
          exclude: ['transform-regenerator'],
          loose: true,
          modules: false,
          targets: {
            browsers: ['>1%']
          },
          useBuiltIns: true
        }]
      ],
      sourceMaps: false,
      compact: false
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /node_modules/,
      cache: false,
      parallel: 4
    })
  ];


  return {
    entry: ['babel-polyfill', './src/index.js'],
    devtool: false,
    output: {
      path: path.resolve('build'),
      filename: '[hash].index.js',
      publicPath: '/'
    },
    node: {
      fs: 'empty'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve('src'),
          exclude: /node_modules/,
          query: {
            babelrc: true
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /node_modules/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
              },
            },
          ],
        }
      ]
    },
    plugins: plugins
  }
};