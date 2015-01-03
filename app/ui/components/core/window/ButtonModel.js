define(function(require){
   var Backbone = require("backbone");

    var Model = Backbone.Model.extend();

    Model.prototype.execute = function(){
        this.action();
    };

    Model.prototype.action = function () {
        console.log(123);
    };

    return Model;
});