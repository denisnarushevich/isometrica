define(function(require){
    var Marionette = require("marionette");

    var Controller = Marionette.Controller.extend();

    Controller.prototype.initialize = function(options){
        this.region = options.region;
    };

    Controller.prototype.region = null;

    Controller.prototype.execute = function(){
        this.region.show();
    };

    return Controller;
});