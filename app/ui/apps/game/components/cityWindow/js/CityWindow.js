define(function (require) {
    var Backbone = require("backbone");
    var CityModel = require("../../../models/CityModel");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");
    var MapView = require("./views/map");
    var InfoView = require("./views/info");

    var CityWindow = TabWindow.View.extend();

    CityWindow.prototype.initialize = function (options) {
        TabWindow.View.prototype.initialize.apply(this, arguments);

        this.$el.addClass("city-window");

        var buttons = this.model.buttons;

        buttons.add({
            icon: "cross",
            text: "Cancel",
            index: 0
        });

        buttons.add({
            icon: "tick",
            text: "Submit",
            index: 1
        });

        var city = options.cityModel;

        this.addTab("info", function () {
            return new InfoView({
                model: city
            });
        }).active(true);

        this.addTab("map", function () {
            return new MapView({
                model: city
            });
        });
    };

    CityWindow.create = function (city) {
        var view = new CityWindow({
            cityModel: CityModel.createFromCity(city)
        });
        return view;
    };

    return CityWindow;
});