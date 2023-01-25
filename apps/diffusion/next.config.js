const Dotenv = require('dotenv-webpack');

const withPWA = require('next-pwa')({
  dest: "public",
  disable: "development" === process.env.NODE_ENV,
  swSrc: 'service-worker.js'
});

module.exports = withPWA({
  webpack: (config, options) => {
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
    config.plugins.push(new Dotenv());

    // Source: https://github.com/zeit/styled-jsx#nextjs
    config.module.rules.push({
      test: /\.css$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: "global"
          }
        }
      ]
    });

    return config;
  }
});

/*
module.exports = withPWA({
  useFileSystemPublicRoutes: false,
  distDir: ".next",
  compiler: {
    styledComponents: true,
  },
  webpack: (config, options) => {
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
    config.plugins.push(new Dotenv());

    // Source: https://github.com/zeit/styled-jsx#nextjs
    config.module.rules.push({
      test: /\.css$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: "global"
          }
        }
      ]
    });

    return config;
  },
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ]
  },
});
*/