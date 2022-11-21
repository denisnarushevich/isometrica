"use strict";

require('src/web-ui/common/less/main.less');

var Scope = require('src/common/Scope');
var Intro = require('src/web-ui/intro/IntroModule');
var GameModule = require('src/web-ui/game/gameModule');
var ModalService = require('src/web-ui/common/modal/ModalService');

var Marionette = require('marionette');

class Application extends Marionette.Application {
    constructor(opts){
        super(opts);

        Scope.register(this, 'app', this);

        this.appView = Scope.create(this, Marionette.LayoutView, {
            el: 'body',
            regions: {
                'uiRegion': '.game-ui',
                'overlayRegion': '.overlay'
            }
        });

        this.appRouter = Scope.create(this, Marionette.AppRouter);

        Scope.register(this, ModalService.TOKEN, Scope.create(this, ModalService));

        Scope.create(this, Intro);
        Scope.create(this, GameModule);
    }

    navigate(path, opts){
        this.appRouter.navigate(path, opts);
    }

    replace(path){
        Backbone.history.navigate(path, {
            replace: true
        });
    }

    back(){
        history.back();
    }

    start(opts){
        super.start(opts);

        Backbone.history.start();
    }

    setPage(Page){
        if(!(this.currentPage instanceof Page)) {
            this.currentPage = Scope.create(this, Page);
            this.currentPage.init();
            this.appView.uiRegion.show(this.currentPage);
        }
        return this.currentPage;
    }
}

module.exports = Application;