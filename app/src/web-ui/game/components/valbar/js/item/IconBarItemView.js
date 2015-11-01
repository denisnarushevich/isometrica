define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!../../templates/item");

    var View = Marionette.ItemView.extend({
        template: template,
        className: "item",
        modelEvents: {
            "change": "render"
        }
    });

    return View;
});