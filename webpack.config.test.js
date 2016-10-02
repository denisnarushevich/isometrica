const base = require("./webpack.config.base");

module.exports = Object.assign({
    context: __dirname + '/app',
    devtool: 'source-map'
}, base);