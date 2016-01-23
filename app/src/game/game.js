"use strict";

var Scope = require('src/common/Scope');
var Application = require('src/web-ui/Application');
var Intro = require('src/web-ui/intro/IntroModule');
var GameModule = require('src/web-ui/game/gameModule');

class Game {
    constructor(){
        this.ui = Scope.create(this, Application);
        Scope.register(this, 'app', this.ui);
        Scope.create(this, Intro);
        Scope.create(this, GameModule);
        debugger;
    }

    start(){
        this.ui.start();

        setTimeout(()=> {
            this.ui.navigate('#game');
        }, 2000);
    }
}

module.exports = Game;