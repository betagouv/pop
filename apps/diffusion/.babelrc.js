module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: [">0.03%"]
          },
          useBuiltIns: "entry"
        }
      }
    ]
  ],
};
