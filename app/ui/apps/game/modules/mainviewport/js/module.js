define(function(require){
   var Marionette = require("marionette");
    var Controller = require("./controller");

   var Module = Marionette.Module.extend();

    Module.prototype.startWithParent = false;

    Module.prototype.onStart = function(options){
        this.region = options.region;

        this.controller = new Controller({
            region: this.region,
            app: this.app
        });

        this.region.show(this.controller.view);
    };

    return Module;
});