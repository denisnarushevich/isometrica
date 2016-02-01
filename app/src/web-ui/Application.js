"use strict";

require('./common/less/main.less');

var Scope = require('src/common/Scope');
var Intro = require('src/web-ui/intro/IntroModule');
var GameModule = require('src/web-ui/game/gameModule');

var Marionette = require('marionette');

class Application extends Marionette.Application {
    constructor(opts){
        super(opts);

        Scope.register(this, 'app', this);

        this.appView = new Marionette.LayoutView({
            el: 'body',
            regions: {
                'uiRegion': '.game-ui'
            }
        });

        this.appRouter = new Marionette.AppRouter();

        Scope.create(this, Intro);
        Scope.create(this, GameModule);
    }

    navigate(path, opts){
        this.appRouter.navigate(path, opts);
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