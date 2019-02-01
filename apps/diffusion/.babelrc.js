const env = require("./env-config.js");

module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: [">0.03%"]
          }
        }
      }
    ]
  ],
  plugins: [
    ["transform-define", env]
  ]
};
