const env = require("./src/env-config.js");

module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: [">0.03%"]
          },
          useBuiltIns: "usage"
        }
      }
    ]
  ],
  plugins: [["transform-define", env]]
};
