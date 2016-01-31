define(function(require){
   var Backbone = require("backbone");

    var Model = Backbone.Model.extend();

    Model.prototype.focus = function(){
        this.trigger("focus", this);
    };

    Model.prototype.active = function(toggle){
        this.set("active", toggle);
    };

    return Model;
});