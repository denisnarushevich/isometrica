define(function (require) {
    var Marionette = require("marionette");

    var gameApp = require("ui/apps/game/js/app");
    var mainApp = require("ui/apps/main/js/app");

    var rootApp = new Marionette.Application();

    rootApp.addRegions({
       uiRegion: ".game-ui"
    });

    rootApp.addInitializer(function (options) {
        var region = this.uiRegion;

        mainApp.start({
            region: region
        });

        mainApp.vent.on("finish", function(){
            console.log("LOAD ANOTHER MODULE");
            gameApp.start({
                region: region
            });
        });

        console.log("rootApp have initialized!");
    });

    return rootApp;
});