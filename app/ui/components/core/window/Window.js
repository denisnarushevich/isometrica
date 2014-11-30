define(function(require){
    var View = require("./WindowView");
    var Model = require("./WindowModel");

    return {
        View: View,
        Model: Model,
        create: function(){
            return new View({
                model: new Model()
            });
        }
    };
});