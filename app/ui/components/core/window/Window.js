define(function(require){
    var View = require("./WindowView");
    var Model = require("./WindowModel");
    var Button = require("./ButtonModel");

    return {
        View: View,
        Model: Model,
        Button: Button,
        create: function(){
            return new View({
                model: new Model()
            });
        }
    };
});