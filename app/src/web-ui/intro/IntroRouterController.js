var Scope = require('src/common/Scope');
var IntroPage = require('./IntroPage');

class IntroRouterController {
    showSplash() {
        var app = Scope.inject(this, 'app');
        var page = app.setPage(IntroPage);
    }
}

module.exports = IntroRouterController;