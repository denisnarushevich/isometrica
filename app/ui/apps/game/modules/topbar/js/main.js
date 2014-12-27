define(function (require) {
    var View = require("./ViewAAA");
    var Marionette = require("marionette");
    var Backbone = require("backbone");
    var Model = require("./Model");
    var Core = require("core/main");
    var ResourceCode = Core.ResourceCode;

    function onAdvance(s,a, self){
        var model = self._model;
        model.set("dt", s.toMDY());
        model.set("gold", self.city.resources.getResources()[ResourceCode.money]);
        model.set("population", self.city.population.getPopulation());
    }

    function onNameChange(city, args, self) {
        self._model.set("cityName", city.name());
    }

    var Module = Marionette.Module.extend();

    var p = Module.prototype;

    p.startWithParent = false;

    p.onStart = function (options) {
        var client = this.app.client;
        var player = client.player;

        player.city(player.city.CHANGE, function (player, city, self) {
            self._unsubscribe();

            if (city) {
                self.city = city;

                var model = self._model = new Model({
                    cityName: city.name(),
                    dt: client.core.time.toMDY()
                });

                self._onNameTkn = city.name(city.name.CHANGE, onNameChange, false, self);

                self._onAdvanceTkn = client.core.time.onAdvance(onAdvance, self);

                options.region.show(new View({
                    model: model
                }));
            }else{
                options.region.reset();
            }
        }, true, this);
    };

    p.onStop = function(){
        this._unsubscribe();
    };

    p._unsubscribe = function(){
        if(this._onAdvanceTkn)
            this.app.client.core.time.onAdvance(this._onAdvanceTkn);

        if(this.city && this._onNameTkn)
            this.city.name(this.city.name.CHANGE, this._onNameTkn);
    };

    return Module;
});
