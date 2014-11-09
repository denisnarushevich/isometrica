define(function(require){
   var Marionette = require("marionette");
    var View = require("./views/view");

    function setupViewport(app, view) {
        app.client.game.graphics.createViewport(view.getCanvas()).setCamera(app.client.camera);
    }

    var Controller = Marionette.Controller.extend();

    Controller.prototype.initialize = function(options){
        var app = this.app = options.app;
        var view = this.view = new View({
            controller: this
        });

        view.on("show", function(){
            setupViewport(app, view);
            view.showMainButtons();
        });

        options.region.show(view);
    };

    Controller.prototype.showButtons = function(controls){
        this.view.showActionButtons(controls);
    };

    return Controller;
});