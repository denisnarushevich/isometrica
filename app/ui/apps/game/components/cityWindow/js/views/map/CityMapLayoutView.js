define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    //var ResourceBarView = require("ui/modules/valbar/js/views/view");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");
    var ViewportView = require("ui/apps/game/components/viewport/ViewportView");
    var CityMapView = require("./CityMapView");

    var View = TabWindow.TabContentView.extend({
        className: "map-tab-content",
        template: false
    });

    View.prototype.initialize = function (opts) {
        TabWindow.TabContentView.prototype.initialize.apply(this, arguments);

        this.addRegion("map", {
            el: this.el
        });

        this._window = opts.window;
    };

    View.prototype.onShow = function () {
        var mapRegion = this.getRegion("map");

        mapRegion.show(new CityMapView({
            model: this.cityModel
        }));
    };

    View.prototype.onFocus = function () {
    };

    View.prototype.onBlur = function () {
    };

    return View;
});