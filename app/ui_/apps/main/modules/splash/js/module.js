define(function(require){
    var Marionette = require("marionette");
    var Controller = require("./controller");

    var Module = Marionette.Module.extend();

    Module.prototype.onStart = function(options){
        var region = options.region;

        console.log("Splash module started");

        this.controller = new Controller({
            region: region,
            app: this.app
        });

        var self = this;
        this.controller.on("over", function(){
            self.stop();
        });
    };

    Module.prototype.onStop = function(){
        console.log("Splash module stopped");
        this.controller.destroy();
    };

    return Module;
});
