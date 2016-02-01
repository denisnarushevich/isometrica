var SplashView = require('./splash/SplashView');
var Scope = require('src/common/Scope');

class IntroController {
    showSplash() {
        var app = Scope.inject(this, 'app');
        app.render(new SplashView());
        setTimeout(function(){
            "use strict";
            app.navigate('/game', {
                trigger: true
            });
        }, 2000);
    }
}

module.exports = IntroController;