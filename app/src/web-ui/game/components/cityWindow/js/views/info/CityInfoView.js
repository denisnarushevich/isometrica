define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!../../../templates/info");

    var View = Marionette.ItemView.extend();

    View.prototype.modelEvents = {
        "change": "render"
    };

    View.prototype.template = template;

    View.prototype.className = "city-info";

    return View;
});