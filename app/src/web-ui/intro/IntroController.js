var SplashView = require('./splash/SplashView');
var Scope = require('src/common/Scope');

class IntroController {
    showSplash() {
        Scope.inject(this, 'app').render(new SplashView());
    }
}

module.exports = IntroController;