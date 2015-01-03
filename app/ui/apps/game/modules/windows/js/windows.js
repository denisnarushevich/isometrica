define(function(require){
   var Marionette = require("marionette");
    var _ = require("underscore");
    var Prompt = require("ui/components/core/prompt/prompt");
    var City = require("../../../components/cityWindow/js/CityWindow");

    var Module = Marionette.Module.extend();

    Module.prototype.startWithParent = false;

    Module.prototype.onStart = function(options){
        this.region = options.region;
    };

    Module.prototype.showPrompt = function(msg, cb, val, ph){
        var promptView = Prompt.create(msg, cb, val, ph);

        this.region.show(promptView);
    };

    Module.prototype.showCity = function(cityId){
        var city = this.app.client.core.cities.getCity(cityId);
        var cityWindow = City.create(city);
        cityWindow.windows(this);

        this.region.show(cityWindow);
    };

    Module.prototype.closeAll = function () {
        this.region.empty();
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