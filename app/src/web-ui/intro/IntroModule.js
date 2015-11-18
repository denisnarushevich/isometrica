var Scope = require('src/common/Scope');
var IntroRouter = require('./IntroRouter');
var IntroController = require('./IntroController');

class IntroModule {
    constructor(){
        this.router = Scope.inject(this.scope, IntroRouter, {
            controller: Scope.inject(this.scope, IntroController)
        });
    }
}

module.exports = IntroModule;