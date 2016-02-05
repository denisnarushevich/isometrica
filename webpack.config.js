module.exports = {
    context: __dirname + '/app',
    entry: './src/web-ui/main',
    devtool: 'source-map',
    output: {
        path: './app/dist',
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /marionette/,
                loader: 'exports?Backbone.Marionette!imports?backbone'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.png$|\.ttf$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015'],
                    compact: false
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            //bootstrap specifics
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            //{ test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' }
        ]
    },
    resolve: {
        modulesDirectories: ['./node_modules'],
        alias: {
            src: __dirname + '/app/src',
            data: __dirname + '/app/src/data',
            vendor: __dirname + '/app/vendor',
            ui: __dirname + '/app/src/web-ui',
            'web-ui': __dirname + '/app/src/web-ui',
            client: __dirname + '/app/src/client/js',
            core: __dirname + '/app/src/core',
            helpers: './vendor/helpers',
            "simplex-noise": __dirname + '/app/vendor/simplex-noise',
            "legacy-events": __dirname + '/app/src/common/events-wrapper',
            "object-pool": __dirname + '/app/vendor/object-pool',
            enumeration: __dirname + '/app/vendor/enumeration',
            binaryheap: __dirname + '/app/vendor/binaryheap',
            namespace: __dirname + '/app/vendor/namespace',
            "reactive-property": __dirname + '/app/vendor/reactive-property',
            marionette: 'backbone.marionette',
            engine: __dirname + '/app/vendor/engine/main'
        }
    }
};