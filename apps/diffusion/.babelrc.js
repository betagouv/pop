const env = require("./env-config.js");

module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          loose: true,
          modules: false,
          targets: {
            browsers: [">0.03%"]
          }
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["transform-define", env]
  ]
};
