const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BabelPlugin = require("babel-webpack-plugin");


module.exports = env => {

  const plugins = [
    new ManifestPlugin({
      seed: require('./public/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: path.join('public/favicon.ico'),
    }),
  ];


  return {
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
      path: path.resolve('build'),
      filename: '[hash].index.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: 'build',
      historyApiFallback: true,
      inline: true,
      stats: 'errors-only'
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