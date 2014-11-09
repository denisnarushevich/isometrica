define(function(require){
    var Marionette = require("marionette");
    var View = require("./view");

    /**
     * @constructor
     */
    var Controller = Marionette.Controller.extend();

    Controller.prototype._region = null;

    Controller.prototype.initialize = function(options){
        this._region = options.region;
        this._app = options.app;
        this.showSplashScreen();
    };

    Controller.prototype.showSplashScreen = function(){
        var view = new View();
        this._region.show(view);
        var app = this._app;
        this.on("destroy", function(){
            console.log("ctr:dstr");
            view.destroy();
        });
        var self = this;
        setTimeout(function(){
            self.trigger("over");
        },1000);
    };

    return Controller;
});
