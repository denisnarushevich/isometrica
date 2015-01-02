define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var template = require("hbs!../../templates/map");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");

    var View = TabWindow.TabContentView.extend({
        className: "map-tab-content",
        template: template,
        modelEvents: {
            "change": "render"
        }
    });

    View.prototype.onFocus = function () {
        console.log("focus", this);
    };

    View.prototype.onBlur = function () {
        console.log("blur", this);
    };

    return View;
});