module.exports = {
    entry: "./src/static/js/index.jsx",
    output: {
        path: __dirname,
        filename: "/src/static/js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react']
                }
            }
        ]
    }
};
