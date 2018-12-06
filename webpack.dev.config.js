const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = env => {

  const plugins = [
    new ManifestPlugin({
      seed: require('./public/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index-template.html",
      inject: 'body',
      favicon: path.join('public/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }),
  ];


  return {
    mode: 'development',
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
      path: path.resolve('build'),
      filename: '[hash].index.js',
      publicPath: '/'
    },
    devServer: {
      proxy: {
        '/': 'http://localhost:8081',
      }
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('autoprefixer')
                ]
              }
            },
          ]
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
          test: /\.(woff|woff2)$/i,
          exclude: /node_modules/,
          use: ["file-loader"]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "[name].[hash:8].[ext]"
          }
        }
      ]
    },
    plugins: plugins
  }
};
