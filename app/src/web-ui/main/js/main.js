define(function(require){
    var Marionette = require("marionette");
    var Splash = require("../splash/SplashView");

    return {
        main: function(app){
            debugger;
            var router = new Marionette.AppRouter({
                controller: {
                    intro: function(){
                        app.view.uiRegion.show(new Splash());
                    }
                },
                appRoutes: {
                    'intro':'intro'
                }
            });

            app.on('start', function (options) {
                console.log('intro start', arguments);
            });
        }
    }
});
