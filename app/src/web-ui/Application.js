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

        this.appView = Scope.create(this, Marionette.LayoutView, {
            el: 'body',
            regions: {
                'uiRegion': '.game-ui'
            }
        });

        this.appRouter = Scope.create(this, Marionette.AppRouter);

        Scope.create(this, Intro);
        Scope.create(this, GameModule);
    }

    navigate(path, opts){
        this.appRouter.navigate(path, opts);
    }

    back(){
        history.back();
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