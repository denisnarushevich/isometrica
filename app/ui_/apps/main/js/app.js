define(function(require){
    var Marionette = require("marionette");
    var Splash = require("../modules/splash/js/module");

    var app = new Marionette.Application();

    app.module("splash", Splash);

    app.addInitializer(function(option) {
        app.splash.on("stop", function(){
            console.log("main app finished");
           app.vent.trigger("finish");
        });
    });

    return app;
});
