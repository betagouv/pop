const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

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

	config.plugins.push(
		sentryWebpackPlugin({
			org: "betagouv",
			url: "https://sentry.incubateur.net",
			project: "pop-diffusion",
			authToken: process.env.SENTRY_AUTH_TOKEN,
		}),
	);

	return config;
};

module.exports = {
	publicRuntimeConfig: {
		apiUrl: process.env.API_URL,
		serverApiUrl: process.env.SERVER_API_URL,
		bucketUrl: process.env.BUCKET_URL,
		popUrl: process.env.POP_URL,
		eurelian: process.env.EURELIAN,
		sentryDsn: process.env.SENTRY_DSN,
		sentryEnv: process.env.SENTRY_ENV,
		commitHash: process.env.SRC_REF,
		ovh: process.env.OVH,
	},
	webpack: webpackConfig,
};
