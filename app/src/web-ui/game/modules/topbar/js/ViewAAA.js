/**
 * Created by denis on 30/11/14.
 */
define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!../templates/topbar");

    var View = Marionette.ItemView.extend();

    var p = View.prototype;

    p.template = template;

    p.modelEvents = {
        "change": "render"
    };

    return View;
});