var Scope = require('src/common/Scope');
var IntroRouter = require('./IntroRouter');
var IntroController = require('./IntroController');

class IntroModule {
    constructor(){
        this.router = Scope.create(this, IntroRouter, {
            controller: Scope.create(this, IntroController)
        });
    }
}

module.exports = IntroModule;