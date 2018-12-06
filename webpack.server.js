const path = require("path");
const nodeExternals = require("webpack-node-externals");
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: "./server/index.js",
  target: "node",
  externals: [nodeExternals()],

  output: {
    path: path.resolve("./build"),
    filename: "index.js",
    publicPath: "/"
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
        use: "babel-loader"
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
  }
};
