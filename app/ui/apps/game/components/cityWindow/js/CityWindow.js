define(function (require) {
    var Backbone = require("backbone");
    var CityModel = require("../../../models/CityModel");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");
    var MapView = require("./views/map/CityMapLayoutView");
    var InfoView = require("./views/info/CityInfoLayoutView");

    var CityWindow = TabWindow.View.extend();

    CityWindow.prototype.initialize = function (options) {
        TabWindow.View.prototype.initialize.apply(this, arguments);

        var self = this;

        this.$el.addClass("city-window");

        this.addButton(0, "back", "Back", function () {
            console.log("Back");
        });

        this.addButton(1, "cross", "Close", function () {
            console.log("Close");
            self.windows().closeAll();
        });


        var city = options.cityModel;


        this.addTab("info", function () {
            return new InfoView({
                cityModel: city,
                window: self,
            });
        }).active(true);

        this.addTab("map", function () {
            return new MapView({
                cityModel: city,
                window: self
            });
        });
    };

    CityWindow.prototype.windows = function (windows) {
        if (windows !== undefined)
            this._windows = windows;
        return this._windows;
    };

    CityWindow.create = function (city) {
        var view = new CityWindow({
            cityModel: CityModel.createFromCity(city)
        });
        return view;
    };

    return CityWindow;
});