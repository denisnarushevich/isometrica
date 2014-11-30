define(function(require){
   var Backbone = require("backbone");
    var ButtonCollection = require("./core/window/ButtonCollection");

    var Model = Backbone.Model.extend();

    Model.prototype.initialize = function(){
        this.buttons = new ButtonCollection();
    };

    Model.prototype.buttons = null;

    return Model;
});