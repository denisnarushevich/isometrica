define(function (require) {
    var Backbone = require("backbone");
    var View = require("./views/city");
    var Window = require("ui/components/core/tabWindow/TabWindow");
    var MapView = require("./views/map");

    var CityWindow = Window.View.extend();

    CityWindow.prototype.initialize = function (options) {
        Window.View.prototype.initialize.apply(this, arguments);

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

        var city = this.model;

        this.addTab("test1", function () {
            return new MapView({
                model: city
            });
        }).active(true);

        this.addTab("test2", function () {
            return new MapView({
                model: city
            });
        });
    };

    CityWindow.prototype.onShow = function () {
        Window.View.prototype.onShow.apply(this, arguments);

        //this.bodyRegion.show(new View());
    };

    return CityWindow;

    function getCity(city, id) {
        return new CityModel({
            name: city.name()
        }, {
            city: city
        });
    }

    function City(city) {
        this.model = City.cityModel(city);

        this.view = new View({
            model: this.model
        });
    }

    City.Model = Backbone.Model;
    City.View = View;

    //TODO: subscribe to city events, and unsubscribe on model destroy
    City.cityModel = function (city) {
        return new Backbone.Model({
            cityId: city.id(),
            name: city.name()
        });
    };

    return City;
});