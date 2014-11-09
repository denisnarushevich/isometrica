define(function(require){
   var Marionette = require("marionette");
    var _ = require("underscore");
    var Prompt = require("../../../components/prompt/prompt");

    var Module = Marionette.Module.extend();

    Module.prototype.startWithParent = false;

    Module.prototype.onStart = function(options){
        this.region = options.region;
    };

    Module.prototype.showPrompt = function(msg, cb, val, ph){
        var prompt = new Prompt(msg, cb, val, ph);

        this.region.show(prompt.view);
    };

    Module.prototype.display = function(name){
        var args = _.rest(arguments);

        switch(name){
            case "prompt":
                this.showPrompt.apply(this, args);
                break;
            default:
                this.region.empty();
        }
    };

    return Module;
});