define(function (require) {
    var Backbone = require("backbone");
    var View = require("./view");
    var Window = require("ui/components/core/window/window");

    function Prompt(msg, cb, val, ph) {
        Window.call(this);

        var v = new View({
            model: new Backbone.Model({
                msg: msg,
                val: val,
                ph: ph
            })
        });

        var buttons = this.view.model.buttons;

        buttons.add({
            icon: "cross",
            text: "Cancel",
            index: 0
        });

        buttons.add({
            icon: "tick",
            text: "Submit",
            index: 1
        }).action = function () {
            cb(v.value());
        };

        var self = this;
        this.view.on("show", function () {
            self.view.bodyRegion.show(v);
        });
    }

    Prompt.prototype = Object.create(Window.prototype);

    return Prompt;
});