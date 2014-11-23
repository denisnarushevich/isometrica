define(function(require){
   var Backbone = require("backbone");

    var Model = Backbone.Model.extend();

    Model.prototype.execute = function(){
        this.action();
    };

    return Model;
});