const Scope = require('src/common/Scope');

var City = require("./city");
var namespace = require("namespace");

var Terrain = require("./terrain");

var Core = namespace("Isometrica.Core");
Core.CityService = CityService;

var events = {
    cityNew: 0,
    cityRemove: 1
};

function addCity(self, city) {
    if (self._citiesById[city.id()] === undefined) {
        self._cities.push(city);
        self._citiesByName[city.name()] = city;
        self._citiesByTile[city.tile()] = city;
        self._citiesById[city.id()] = city;
    } else
        throw "City with id: " + city.id() + " already exists";
}

function removeCity(self, city) {
    var index = this._cities.indexOf(city);
    if (index !== -1)
        this._cities.splice(index, 1);
    delete this._citiesByName[city.name()];
    delete this._citiesById[city.id()];
    delete this._citiesByTile[city.tile()];
}

function CityService(root) {
    this.root = root;
    this._cities = [];
    this._citiesByName = {};
    this._citiesByTile = {};
    this._citiesById = {};

    this.onNewCity = Events.event(events.cityNew);
}

CityService.events = events;

CityService.prototype.init = function () {
};

CityService.prototype.establishCity = function (tile, name, mayor) {
    if (!CityService.canEstablish(this.root, tile))
        return null;

    var city = Scope.create(this, City, this.root, tile);
    city.name(name);
    city.mayor(mayor.name());

    addCity(this, city);
    Events.fire(this, events.cityNew, city);
    city.init();

    return city;
};

CityService.prototype.getCity = function (id) {
    return this._citiesById[id];
};

CityService.canEstablish = function (world, tile) {
    return !Terrain.isSlope(world.terrain.tileSlope(tile));
};

module.exports = CityService;