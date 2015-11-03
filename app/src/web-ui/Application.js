'use strict';

require('./less/main.less');

var Marionette = require('marionette');

class Application extends Marionette.Application {
    constructor(opts){
        super(opts);

        this.appView = new Marionette.LayoutView({
            el: 'body',
            regions: {
                'uiRegion': '.game-ui'
            }
        });

        this.appRouter = new Marionette.AppRouter();
    }

    navigate(path){
        this.appRouter.navigate(path, {
            trigger: true
        })
    }

    render(view){
        this.appView.uiRegion.show(view);
    }

    start(opts){
        super.start(opts);

        Backbone.history.start();
    }
}

module.exports = Application;