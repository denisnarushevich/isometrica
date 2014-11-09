define(function(require){
    var Backbone = require("backbone");
    var View = require("./view");

    function Prompt(msg, cb, val, ph){
        this.model = new Backbone.Model({
            msg: msg,
            val: val,
            ph: ph
        });

        this.view = new View({
            model: this.model,
            callback: cb
        });
    }

    return Prompt;
});