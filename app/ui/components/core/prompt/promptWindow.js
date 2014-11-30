define(function (require) {
    var Window = require("ui/components/core/window/window");
    var PromptView = require("./view");
    var Backbone = require("backbone");

    var View = Window.View.extend();

    View.prototype.initialize = function (options) {
        Window.View.prototype.initialize.apply(this, arguments);

        var cb = options.cb;

        this.options = options;

        this.model = new Window.Model({

        });

        var buttons = this.model.buttons;

        buttons.add({
            icon: "cross",
            text: "Cancel",
            index: 0
        });

        var bodyRegion = this.bodyRegion;

        buttons.add({
            icon: "tick",
            text: "Submit",
            index: 1
        }).action = function () {
            cb(bodyRegion.currentView.value());
        };
    };

    View.prototype.onShow = function () {
        Window.View.prototype.onShow.apply(this, arguments);

        this.bodyRegion.show(new PromptView({
            model: new Backbone.Model({
                msg: this.options.msg,
                val: this.options.val,
                ph: this.options.ph
            })
        }));
    };

    return View;
});