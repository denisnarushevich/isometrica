define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var template = require("hbs!../../../templates/map");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");

    var View = Marionette.ItemView.extend({
        className: "map-tab-content-container",
        template: template,
        modelEvents: {
            "change": "render"
        }
    });

    return View;
});