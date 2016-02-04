var Marionette = require('marionette');
var SplashView = require('./splash/SplashView');
var Scope = require('src/common/Scope');

class IntroPage extends SplashView {
    constructor(){
        super();
        this.app = Scope.inject(this, 'app');
    }

    init() {
        this.app.replace('/intro');
    }

    onShow(){
        setTimeout(()=>{
            "use strict";
            this.app.navigate('/game', {
                trigger: true
            });
        }, 2000);
    }

    onDestroy(){

    }
}

module.exports = IntroPage;