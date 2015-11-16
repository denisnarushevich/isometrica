var SplashView = require('./splash/SplashView');

class IntroController {
    showSplash() {
        this.scope.app.render(new SplashView());

        setTimeout(()=> {
            this.scope.app.navigate('#game');
        }, 2000);
    }
}

module.exports = IntroController;