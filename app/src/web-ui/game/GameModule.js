'use strict';

var Scope = require('src/common/Scope');
var GameRouter = require('./GameRouter');
var GameRouterController = require('./GameRouterController');

class GameModule {
    constructor() {
        Scope.create(this, GameRouter, {
            controller: Scope.create(this, GameRouterController)
        });
    }
}

module.exports = GameModule;