'use strict';

var Scope = require('src/common/Scope');
var GameRouter = require('./GameRouter');
var GameController = require('./GameController');

class GameModule {
    constructor() {
        Scope.create(this, GameRouter, {
            controller: Scope.create(this, GameController)
        });
    }
}

module.exports = GameModule;