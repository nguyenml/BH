module.exports = {
    entry: "./src/static/js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.jsx"
    },
    module: {
        loaders: [
          {
    test: /\.jsx?$/,         // Match both .js and .jsx files
    exclude: /node_modules/,
    loader: "babel",
    query:
      {
        presets:['react']
      }
}
}
        ]
  };
