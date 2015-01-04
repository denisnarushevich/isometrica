define(function(require){
    var Backbone  = require("backbone");
    var Item = require("./IconBarItemModel");

    return Backbone.Collection.extend({
        model: Item
    });
});