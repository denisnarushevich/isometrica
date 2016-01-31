define(function(require){
    var Backbone = require("backbone");

    var Model = require("./TabButton");
    var Collection = Backbone.Collection.extend();

    Collection.prototype.model = Model;

    return Collection;
});