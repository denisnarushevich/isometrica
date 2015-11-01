define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!./templates/tabWindow");
    var TabsView = require("./TabButtonCollectionView");
    var Window = require("../window/Window");
    var TabWindowModel = require("./TabWindowModel");
    var TabsContentCollectionView = require("./TabContentCollectionView");

    var View = Window.View.extend();

    View.prototype.template = template;

    View.prototype.initialize = function (opts) {
        this.model = new TabWindowModel();

        Window.View.prototype.initialize.apply(this, arguments);

        this.$el.addClass("ui-tab-window");
    };

    View.prototype.regions = function (opts) {
        var regions = Window.View.prototype.regions.call(this, opts);
        regions["headRegion"] = ".header";
        return regions;
    };

    View.prototype.onShow = function () {
        Window.View.prototype.onShow.call(this);

        this.headRegion.show(new TabsView({
            collection: this.model.tabs
        }));

        this.bodyRegion.show(new TabsContentCollectionView({
            collection: this.model.tabs
        }));
    };

    View.prototype.addTab = function (text, view) {
        var model = this.model.tabs.add({
            text: text
        });
        model.view = view;
        return model;
    };

    return View;
});