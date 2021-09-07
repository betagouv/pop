const path = require("path");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = env => {
  console.log("MODE :", process.env.NODE_ENV);
  const plugins = [
    new WebpackManifestPlugin({
      seed: require("./public/manifest.json")
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
      favicon: path.join("public/favicon.ico"),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /node_modules/,
      cache: false,
      parallel: 4
    })
  ];

  return {
    mode: "production",
    entry: ["@babel/polyfill", "./src/index.js"],
    devtool: false,
    bail: true,
    output: {
      path: path.resolve("build"),
      filename: "[contenthash].index.js",
      publicPath: "/"
    },
    resolve: {
      fallback: {
        fs: false,
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        process: require.resolve("process/browser"),
        buffer: require.resolve("buffer/")
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: path.resolve("src"),
          exclude: /node_modules|__tests__/,
          options: {
            babelrc: true,
            cacheDirectory: true,
            sourceMaps: false,
            compact: false,
            presets: [
              [
                "@babel/env",
                {
                  loose: true,
                  modules: false,
                  targets: {
                    browsers: [">0.03%"]
                  },
                  useBuiltIns: "entry",
                  corejs: 3
                }
              ]
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread"
            ]
          }
        },
        {
          test: /\.(woff|woff2)$/i,
          exclude: /(node_modules|__tests__)/,
          type: 'asset/resource'
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          type: 'asset/resource',
          generator: {
            filename: '[name].[hash:8].[ext]',
          },
        },
      ]
    },
    plugins: plugins
  };
};
