define(function(require){
   var Marionette = require("marionette");
    var Controller = require("./controller");

   var Module = Marionette.Module.extend();

    Module.prototype.startWithParent = false;

    Module.prototype.onStart = function(options){
        this.controller = new Controller({
            region: options.region,
            app: this.app
        });
    };

    Module.prototype.onStop = function(){

    };

    return Module;
});