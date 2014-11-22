define(function (require) {
    var Backbone = require("backbone");
    var View = require("./views/city");

    function getCity(self, id){
        return new CityModel({
            name: city.name()
        },{
            city: city
        });
    }

    function City(city){
        this.model = City.cityModel(city);

        this.view = new View({
            model: this.model
        });
    }

    City.Model = Backbone.Model;
    City.View = View;

    //TODO: subscribe to city events, and unsubscribe on model destroy
    City.cityModel = function(city){
        return new Backbone.Model({
            cityId: city.id(),
            name: city.name()
        });
    };

    return City;

    function Module(game) {
        this.game = game;
        this.ui = game.ui;
    }

    Module.prototype._mainView = undefined;
    Module.prototype._infoView = null;
    Module.prototype._mapView = null;

    Module.prototype.mainView = function () {
        if(this._mainView !== undefined)
            return this._mainView;

        var mainView = this._mainView = new MainView({
            ui: this.ui
        });
        mainView.addTab("info", this.infoView());
        mainView.addTab("map", this.mapView());

        return mainView;
    };

    Module.prototype.infoView = function () {
        return this._infoView || (this._infoView = new InfoView({
            model: getCity(this, 0),
            cityView: this
        }));
    };

    Module.prototype.mapView = function () {
        return this._mapView || (this._mapView = new MapView());
    };

    Module.prototype.execute = function (id, tab) {
        switch(tab) {
            case "info":
            case "map":
                break;
            default:
                tab = "info";
        }

        var mainView = this.mainView();
        this.mainView().render();
        mainView.show(tab);

        return mainView;
    };

    return Module;
});