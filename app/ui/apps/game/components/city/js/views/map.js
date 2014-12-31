define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var template = require("hbs!../../templates/map");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");

    var View = TabWindow.TabContentView.extend({
        className: "map-tab-content",
        template: template
    });

    View.prototype.onFocus = function(){
        console.log(9999);
    };

    return View;
});