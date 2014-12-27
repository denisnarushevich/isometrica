define(function (require) {
    var View = require("./ViewAAA");
    var Marionette = require("marionette");
    var Backbone = require("backbone");
    var Model = require("./Model");
    var Core = require("core/main");
    var ResourceCode = Core.ResourceCode;

    var Module = Marionette.Module.extend();

    var p = Module.prototype;

    p.startWithParent = false;

    p.onStart = function (options) {
        var player = this.app.client.player;
        var client = this.app.client;

        player.city(player.city.CHANGE, function (player, city, self) {
            if (city) {
                var model = new Model({
                    cityName: city.name(),
                    dt: client.core.time.toMDY()
                });

                city.name(city.name.CHANGE, function (city, args) {
                    model.set("cityName", city.name());
                }, false, self);

                client.core.time.onAdvance(function(s,a){
                    model.set("dt", s.toMDY());
                    model.set("gold", city.resources.getResources()[ResourceCode.money]);
                    model.set("population", city.population.getPopulation());
                });



                options.region.show(new View({
                    model: model
                }));
            }
        }, true, this);
    };

    return Module;
});
