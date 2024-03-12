const Dotenv = require('dotenv-webpack');

// const withPWA = require('next-pwa')({
//   dest: "public",
//   disable: "development" === process.env.NODE_ENV,
//   swSrc: 'service-worker.js'
// });

function deleteLastSlash(url) {
  if (url == null) return

  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }

  return url;
}

const cspHeaders = `
  default-src 'self' https://www.pop.culture.gouv.fr;
  script-src 'self' https://cdnjs.cloudflare.com https://www.pop.culture.gouv.fr http://stats.data.gouv.fr http://io1.eulerian.net 'unsafe-eval' 'unsafe-inline' http://uvvw.pop.culture.gouv.fr https://static.hotjar.com https://script.hotjar.com;
  style-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline' https://www.pop.culture.gouv.fr https://static.hotjar.com;
  font-src 'self' https://cdnjs.cloudflare.com https://www.pop.culture.gouv.fr data:;
  connect-src 'self' ${process.env.API_URL ? process.env.API_URL : "http://localhost:3000"} https://cdnjs.cloudflare.com https://s3.eu-west-3.amazonaws.com https://www.pop.culture.gouv.fr https://uvvw.pop.culture.gouv.fr http://stats.data.gouv.fr https://static.hotjar.com https://o1104995.ingest.sentry.io https://script.hotjar.com https://api.mapbox.com https://api.tiles.mapbox.com;
  img-src 'self' *.amazonaws.com http://stats.data.gouv.fr https://www.pop.culture.gouv.fr;
  object-src 'self' data:;
`;

module.exports = {
  publicRuntimeConfig: {
    apiUrl: deleteLastSlash(process.env.API_URL),
    bucketUrl: process.env.BUCKET_URL + "/",
    popUrl: process.env.POP_URL,
    eurelian: process.env.EURELIAN,
    sentryDsn: process.env.SENTRY_DSN,
  },
  serverRuntimeConfig: {
    apiUrl: deleteLastSlash(process.env.API_URL),
  },
  // webpack: (config, options) => {
  //   // Unshift polyfills in main entrypoint.
  //   // Source: https://github.com/zeit/next.js/issues/2060#issuecomment-385199026
  //   const originalEntry = config.entry;
  //   config.entry = async () => {
  //     const entries = await originalEntry();
  //     if (entries["main.js"]) {
  //       entries["main.js"].unshift("./src/polyfill.js");
  //     }
  //     return entries;
  //   };
  //
  //   // Load environment variables from ".env" file.
  //   config.plugins.push(new Dotenv());
  //
  //   // Source: https://github.com/zeit/styled-jsx#nextjs
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: [
  //       options.defaultLoaders.babel,
  //       {
  //         loader: require("styled-jsx/webpack").loader,
  //         options: {
  //           type: "global"
  //         }
  //       }
  //     ]
  //   });
  //
  //   return config;
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeaders.replace(/\n/g, "")
  //         },
  //       ],
  //     },
  //   ];
  // },
};

