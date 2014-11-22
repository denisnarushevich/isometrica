define(function(require){
   var Marionette = require("marionette");
    var _ = require("underscore");
    var Prompt = require("../../../components/prompt/prompt");
    var City = require("../../../components/city/js/city");

    var Module = Marionette.Module.extend();

    Module.prototype.startWithParent = false;

    Module.prototype.onStart = function(options){
        this.region = options.region;
    };

    Module.prototype.showPrompt = function(msg, cb, val, ph){
        var prompt = new Prompt(msg, cb, val, ph);

        this.region.show(prompt.view);
    };

    Module.prototype.showCity = function(cityId){
        var city = this.app.client.core.cities.getCity(cityId);
        var cityWindow = new City(city);

        this.region.show(cityWindow.view);
    };

    Module.prototype.display = function(name){
        var args = _.rest(arguments);

        switch(name){
            case "prompt":
                this.showPrompt.apply(this, args);
                break;
            case "city":
                this.showCity.apply(this, args);
                break;
            default:
                this.region.empty();
        }
    };

    return Module;
});