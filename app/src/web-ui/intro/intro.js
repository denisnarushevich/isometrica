var Marionette = require("marionette");
var SplashView = require('./splash/SplashView');

module.exports = Marionette.AppRouter.extend({
    routes : {
        'intro' : function(){
            this.scope.app.render(new SplashView());

            setTimeout(()=>{
                this.scope.app.navigate('#game');
            }, 2000);
        }
    }
});