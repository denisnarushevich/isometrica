const Scope = require('src/common/Scope');

var namespace = require("namespace");
var Events = require("legacy-events");
var Laboratory = require("./city/laboratory"),
    CityStats = require("./city/citystats"),
    Area = require("./city/area"),
    CityBuildings = require("./city/citybuildings"),
    CityResources = require("./city/cityresources");
var CityTilesParams = require("./city/citytilesparams");
var CityPopulation = require("./city/citypopulation");
var Resource = require("./resourcecode");
var BuildingCode = require("data/buildingcode");
var reactiveProperty = require("reactive-property");

var Core = namespace("Isometrica.Core");

Core.City = City;

var id = 0;

var events = City.events = City.prototype.events = {
    update: 0
};

/**
 *
 * @param world
 * @param tile
 * @constructor
 */
function City(world, tile) {
    this.update = Events.event(events.update);

    this.root = this.world = world;
    this._id = id++;
    this._tile = tile;
    this.timeEstablished = world.time.milliseconds;

    this.area = this.areaService = Scope.create(this, Area, this);
    this.tilesParams = this.tileParamsService = Scope.create(this, CityTilesParams, this);
    this.resourcesModule = this.resources = this.resourcesService = Scope.create(this, CityResources, this);
    this.statsService = Scope.create('stats', CityStats, this);
    this.populationService = this.population = Scope.create(this, CityPopulation, this);
    this.lab = this.laboratoryService = Scope.create(this, Laboratory, this);
    this.buildings = this.buildingService = Scope.create(this, CityBuildings, this);

    //register city in influence map
    //this.root.areaService.registerCity(this);

    this.statsService.init();
    this.populationService.init();
    this.areaService.init();

    Events.on(world, world.events.tick, this.onTick, {self: this});


}

City.events = events;

City.prototype.world = null;
City.prototype._tile = -1;

City.prototype.mayor = reactiveProperty(null);
City.prototype.name = reactiveProperty("");

City.prototype.init = function () {
    this.buildingService.buildBuilding(BuildingCode.cityHall, this.tile());
};

City.prototype.onTick = function (sender, args, meta) {
    var self = meta.self;
    Events.fire(self, self.events.update, self);
};

City.prototype.clearTile = function (tile) {
    if (this.areaService.contains(tile)) {
        var cost = 100;

        if (this.resourcesService.hasEnoughResource(Resource.money, cost)) {
            this.world.terrain.clearTile(tile);
            this.resourcesModule.subResource(Resource.money, cost);
            return true;
        }
    }
    return false;
};

/**
 *
 * @returns {number}
 */
City.prototype.id = function () {
    return this._id;
};

/**
 *
 * @param value
 * @returns {int}
 */
City.prototype.tile = function (value) {
    if (value !== undefined)
        return this._tile = value;
    return this._tile;
};

/**
 * @deprecated
 * @returns {{name: *, population: *, maxPopulation: *, x: *, y: *, resources: *, resourceProduce: *, resourceDemand: *, maintenanceCost: *}}
 */
City.prototype.toJSON = function () {
    var data = {
        name: this.name(),
        population: this.populationService.population(),
        maxPopulation: this.populationService.capacity(),
        tile: this.tile(),
        resources: this.resources.getResources(),
        resourceProduce: this.statsService.getCityResourceProduce(),
        resourceDemand: this.statsService.getCityResourceDemand(),
        maintenanceCost: this.statsService.getCityBuildingMaintenanceCost()
    };

    return data;
};

module.exports = City;
