const path = require("node:path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
	const plugins = [
		new WebpackManifestPlugin({
			seed: require("./public/manifest.json"),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			inject: "body",
			favicon: path.join("public/favicon.ico"),
		}),
		new Dotenv(),
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
			process: "process/browser",
		}),
	];

	return {
		mode: "development",
		entry: ["./src/index.jsx"],
		devtool: "source-map",
		output: {
			path: path.resolve("build"),
			filename: "[contenthash].index.js",
			publicPath: "/",
		},
		devServer: {
			static: {
				directory: "build",
			},
			historyApiFallback: true,
			devMiddleware: {
				stats: "errors-only",
			},
		},
		resolve: {
			extensions: [".", ".js", ".jsx"],
			fallback: {
				buffer: require.resolve("buffer/"),
				fs: false,
				os: require.resolve("os-browserify/browser"),
				path: require.resolve("path-browserify"),
				process: require.resolve("process/browser"),
				stream: require.resolve("stream-browserify"),
			},
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [{ loader: "style-loader" }, { loader: "css-loader" }],
				},
				{
					test: /\.(js|jsx)$/,
					loader: "babel-loader",
					include: path.resolve("src"),
					exclude: /(node_modules|__tests__)/,
					options: {
						babelrc: true,
					},
				},
				{
					test: /\.(js|jsx)$/,
					include: path.resolve(
						"node_modules/@popproject/pop-react-elasticsearch",
					),
					exclude: path.resolve(
						"node_modules/@popproject/pop-react-elasticsearch/node_modules",
					),
					enforce: "pre",
					use: ["source-map-loader"],
				},
				{
					test: /\.(gif|png|jpe?g|svg|woff|woff2)$/i,
					exclude: /(node_modules|__tests__)/,
					type: "asset/resource",
				},
				{
					test: /\.m?js$/,
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		plugins: plugins,
	};
};
