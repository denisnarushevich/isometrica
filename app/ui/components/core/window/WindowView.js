define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!./templates/window");
    var ButtonView = require("./ButtonView");
    var ButtonCollectionView = require("./ButtonCollectionView");

    var View = Marionette.LayoutView.extend();
    View.prototype.template = template;
    View.prototype.className = "ui-window";
    View.prototype.regions = function (opts) {
        return {
            bodyRegion: ".body",
            footerRegion: ".footer"
        }
    };
    View.prototype.onShow = function () {
        this.footerRegion.show(new ButtonCollectionView({
            collection: this.model.buttons
        }));
    };

    View.prototype.addButton = function (index, icon, text, cb) {
        this.model.buttons.add({
            icon: icon,
            text: text,
            index: index
        }).action = cb;
    };

    return View;
});