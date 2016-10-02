const base = require("./webpack.config.base");

module.exports = Object.assign({
    context: __dirname + '/app',
    entry: './src/web-ui/main',
    devtool: 'source-map',
    output: {
        path: './app/dist',
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
    }
}, base);