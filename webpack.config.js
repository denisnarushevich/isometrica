module.exports = {
    context: __dirname + '/app',
    entry: './main',
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
                test: /\.png$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['./node_modules'],
        alias: {
            data: __dirname + '/app/src/data',
            ui: __dirname + '/app/src/web-ui',
            'web-ui': __dirname + '/app/src/web-ui',
            client: __dirname + '/app/src/client/js',
            core: __dirname + '/app/src/core',
            helpers: './vendor/helpers',
            "simplex-noise": __dirname + '/app/vendor/simplex-noise',
            events: __dirname + '/app/src/events-wrapper',
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