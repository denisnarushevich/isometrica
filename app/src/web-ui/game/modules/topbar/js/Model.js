define(function (require) {
    var Backbone = require("backbone");

    var Model = Backbone.Model.extend();

    Model.prototype.defaults = {
        dt: "",
        name: "unnamed",
        population: 0,
        gold: 0
    };

    return Model;
});