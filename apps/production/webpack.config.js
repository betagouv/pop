const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
  const mode = env["production"] ? "production" : "staging";
  console.log("MODE :", mode);
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
    new TerserPlugin({
      test: /\.js($|\?)/i,
      exclude: /node_modules/,
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
          use: [
            "file-loader",
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]',
          },
        },
      ]
    },
    plugins: plugins
  };
};
