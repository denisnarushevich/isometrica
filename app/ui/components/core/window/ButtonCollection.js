define(function(require){
   var Backbone = require("backbone");
    var ButtonModel = require("./ButtonModel");

    var Collection = Backbone.Collection.extend();

    Collection.prototype.comparator = "index";

    Collection.prototype.model = ButtonModel;

    return Collection;
});