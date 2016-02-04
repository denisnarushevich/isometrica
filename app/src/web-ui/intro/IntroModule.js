var Scope = require('src/common/Scope');
var IntroRouter = require('./IntroRouter');
var IntroRouterController = require('./IntroRouterController');

class IntroModule {
    constructor(){
        this.router = Scope.create(this, IntroRouter, {
            controller: Scope.create(this, IntroRouterController)
        });
    }
}

module.exports = IntroModule;