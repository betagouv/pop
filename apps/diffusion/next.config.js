const { withSentryConfig } = require("@sentry/nextjs");

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
	return config;
};

module.exports = withSentryConfig(
	{
		publicRuntimeConfig: {
			apiUrl: process.env.API_URL,
			serverApiUrl: process.env.SERVER_API_URL,
			bucketUrl: process.env.BUCKET_URL,
			popUrl: process.env.POP_URL,
			eurelian: process.env.EURELIAN,
			sentryDsn: process.env.SENTRY_DSN,
			sentryEnv: process.env.SENTRY_ENV,
			sentryTracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE,
			commitHash: process.env.SRC_REF,
		},
		webpack: webpackConfig,
	},
	{
		// For all available options, see:
		// https://github.com/getsentry/sentry-webpack-plugin#options

		org: "betagouv",
		project: "pop-diffusion",
		sentryUrl: "https://sentry.incubateur.net/",

		// Only print logs for uploading source maps in CI
		silent: !process.env.CI,

		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
		// This can increase your server load as well as your hosting bill.
		// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
		// side errors will fail.
		// tunnelRoute: "/monitoring",

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,
	},
);
