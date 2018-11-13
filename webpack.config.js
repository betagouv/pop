const path = require("path");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = env => {
  const mode = env["production"] ? "production" : "staging";
  console.log("MODE :", mode);
  const plugins = [
    new ManifestPlugin({
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(mode)
      }
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
    entry: ["babel-polyfill", "./src/index.js"],
    devtool: false,
    bail: true,
    output: {
      path: path.resolve("build"),
      filename: "[hash].index.js",
      publicPath: "/"
    },
    node: {
      fs: "empty"
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: path.resolve("src"),
          exclude: /node_modules/,
          options: {
            babelrc: true,
            cacheDirectory: true,
            sourceMaps: false,
            compact: false,
            presets: [
              [
                "env",
                {
                  loose: true,
                  modules: false,
                  targets: {
                    browsers: [">0.03%"]
                  },
                  useBuiltIns: true
                }
              ]
            ],
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg|woff|woff2)$/i,
          exclude: /node_modules/,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true
              }
            }
          ]
        }
      ]
    },
    plugins: plugins
  };
};
