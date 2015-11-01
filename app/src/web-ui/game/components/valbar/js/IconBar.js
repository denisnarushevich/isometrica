define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var IconBarItemView = require("./item/IconBarItemView");
    var IconBarItemCollection = require("./item/IconBarItemCollection");
    var template = require("hbs!../templates/valbar");

    var View = Marionette.CompositeView.extend();

    var p = View.prototype;

    p.initialize = function () {
        this.collection = new IconBarItemCollection();

    };

    p.template = template;

    p.childView = IconBarItemView;

    p.childViewContainer = ".items";

    p.className = "icon-bar";

    p.addIcon = function (icon, value, title) {
        return this.collection.add({
            icon: icon,
            value: value,
            title: title
        });
    };

    return View;
});