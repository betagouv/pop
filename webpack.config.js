const path = require("path");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
  const mode = env["production"] ? "production" : "staging";
  console.log("MODE :", mode);
  const plugins = [
    new ManifestPlugin({
      seed: require("./public/manifest.json")
    }),
    new CopyWebpackPlugin(
      [{ from: "./public/robots.txt", to: "./robots.txt" }],
      {}
    ),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index-template.html",
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
    }),
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: "/index.html",
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /index\.html$/]
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
  };
};
