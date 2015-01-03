define(function (require) {
    var Marionette = require("marionette");
    var Backbone = require("backbone");

    var Model = Backbone.Model.extend();

    Model.destroy = function () {
        Backbone.Model.prototype.destroy.apply(this, arguments);
        console.log("CITY MODEL DESTROY", this);
    };

    Model.createFromCity = function (city) {
        var model = new Model({
            id: city.id(),
            mayor: city.mayor(),
            tile: city.tile(),
            population: city.population.population(),
            capacity: city.population.capacity(),
            name: city.name()
        }, {
            city: city
        });

        var mayorSub = city.mayor(city.mayor.CHANGE, function (sender, args, data) {
            model.set("mayor", args);
        });

        var nameSub = city.name(city.name.CHANGE, function (sender, args, data) {
            model.set("name", args);
        });

        var popSub = city.population.population(city.population.population.CHANGE, function (sender, args, data) {
            model.set("population", args);
        });

        var maxPopSub = city.population.capacity(city.population.capacity.CHANGE, function (sender, args, data) {
            model.set("capacity", args);
        });

        model.listenTo(model, "destroy", function () {
            city.name(city.name.CHANGE, nameSub);
            city.mayor(city.mayor.CHANGE, mayorSub);
            city.population.population(city.population.population.CHANGE, popSub);
            city.population.capacity(city.population.capacity.CHANGE, maxPopSub);
            model.stopListening();
        });

        return model;
    };

    return Model;
});