var Marionette = require("marionette");
var SplashView = require('./splash/SplashView');

module.exports = Marionette.AppRouter.extend({
    initialize: function(scope){
        this.scope = scope;
    },
    routes : {
        'intro' : function(){
            this.scope.app.view.uiRegion.show(new SplashView());
        }
    }
});