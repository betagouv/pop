const Dotenv = require("dotenv-webpack");

const webpackConfig = (config, options) => {
	// Unshift polyfills in main entrypoint.
	// Source: https://github.com/zeit/next.js/issues/2060#issuecomment-385199026
	const originalEntry = config.entry;
	config.entry = async () => {
		const entries = await originalEntry();
		if (entries["main.js"]) {
			entries["main.js"].unshift("./src/polyfill.js");
		}
		return entries;
	};

	// Load environment variables from ".env" file.
	if (process.env.OVH == null) {
		config.plugins.push(new Dotenv());
	}

	// Source: https://github.com/zeit/styled-jsx#nextjs
	config.module.rules.push({
		test: /\.css$/,
		use: [
			options.defaultLoaders.babel,
			{
				loader: require("styled-jsx/webpack").loader,
				options: {
					type: "global",
				},
			},
		],
	});

	return config;
};

if (process.env.OVH === "true") {
	module.exports = {
		publicRuntimeConfig: {
			apiUrl: process.env.API_URL,
			serverApiUrl: process.env.SERVER_API_URL,
			bucketUrl: process.env.BUCKET_URL,
			popUrl: process.env.POP_URL,
			eurelian: process.env.EURELIAN,
			sentryDsn: process.env.SENTRY_DSN,
			ovh: process.env.OVH,
		},
		webpack: webpackConfig,
	};
} else {
	module.exports = {
		webpack: webpackConfig,
	};
}
