define(function (require) {
    var View = require("./View");
    var Marionette = require("marionette");
    var Backbone = require("backbone");

    var Module = Marionette.Module.extend();

    var p = Module.prototype;

    p.startWithParent = false;

    p.onStart = function (options) {
        var player = this.app.client.player;
        player.city(player.city.CHANGE, function (player, city, self) {
            if (city) {
                var model = new Backbone.Model({
                    cityName: city.name()
                });

                city.name(city.name.CHANGE, function (city, args) {
                    console.log(city.name(), arguments);
                    model.set("cityName", city.name());
                }, false, self);

                options.region.show(new View({
                    model: model
                }));
            }
        }, true, this);
    };

    return Module;
});
