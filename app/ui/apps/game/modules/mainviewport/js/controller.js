define(function(require){
   var Marionette = require("marionette");
    var View = require("./views/view");

    function setupViewport(app, view) {
        var vp = app.client.game.graphics.createViewport(view.getCanvas());
        vp.setCamera(app.client.camera);
        return vp;
    }

    var Controller = Marionette.Controller.extend();

    Controller.prototype.initialize = function(options){
        var app = this.app = options.app;
        var view = this.view = new View({
            controller: this
        });

        var self = this;
        view.on("show", function(){
            if(self.viewport === undefined)
                self.viewport = setupViewport(app, view);
            view.showMainButtons();
        });
    };

    Controller.prototype.showButtons = function(controls){
        this.view.showActionButtons(controls);
    };

    return Controller;
});