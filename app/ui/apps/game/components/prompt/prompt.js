define(function(require){
    var Backbone = require("backbone");
    var View = require("./view");
    var Window = require("ui/components/core/window/window");

    function Prompt(msg, cb, val, ph){
        var window = new Window();

        this.view = window.view;

        this.model = new Backbone.Model({
            msg: msg,
            val: val,
            ph: ph
        });

        var v = new View({
            model: this.model,
            callback: cb
        });

        window.view.on("show", function() {
            window.view.bodyRegion.show(v);
            window.setupButton(2, "Submit", "tick", function(){
                cb(v.value());
            });
            window.setupButton(1, "Cancel", "cross", function(){

            });
        });
    }

    return Prompt;
});