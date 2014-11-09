define(function (require) {
    var Marionette = require("marionette");
    var MainViewportModule = require("../modules/mainviewport/js/module");
    var LayoutView = require("./layout");
    var API = require("./api");

    function loadClient(self, callback) {
        requirejs(["client/main"], function (Vkaria) {
            var Vkaria = Vkaria.Vkaria;
            var Core = Isometrica.Core;
            var core = self._core = new Core.Logic();
            var client = self._client = new Vkaria(core, new API(self));

            //loads assets
            client.prepare(function () {
                core.start();
                client.start();
                callback(client);
                client.startServices();
            });
        });
    }

    var app = new Marionette.Application();

    app.module("mainViewportModule", MainViewportModule);

    app.addInitializer(function (options) {
        //setup layout
        this.layout = new LayoutView();
        options.region.show(this.layout);

        //load & run game client
        loadClient(this, function (client) {
            console.log("UI:GameApp:Client started");
            app.client = client;

            //start modules
            app.mainViewportModule.start({
                region: app.layout.bodyRegion
            });
        });
    });

    return app;
});