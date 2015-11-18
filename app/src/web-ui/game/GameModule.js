'use strict';

var Scope = require('src/common/Scope');
var GameRouter = require('./GameRouter');
var GameController = require('./GameController');

class GameModule {
    constructor() {
        Scope.inject(this.scope, GameRouter, {
            controller: Scope.inject(this.scope, GameController)
        });
    }
}

module.exports = GameModule;