const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  webpack: config => {
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
    return config;
  }
});
