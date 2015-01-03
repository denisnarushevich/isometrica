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

        this.addButton(0, "cross", "Cancel", function () {
            console.log("Cancel");
        });

        var bodyRegion = this.bodyRegion;

        this.addButton(1, "tick", "Submit", function () {
            cb(bodyRegion.currentView.value());
        });
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