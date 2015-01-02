define(function (require) {
    var namespace = require("namespace");
    var Events = require("events");
    var Laboratory = require("./city/laboratory"),
        CityStats = require("./city/citystats"),
        Area = require("./city/area"),
        CityBuildings = require("./city/citybuildings"),
        CityResources = require("./city/cityresources");
    var CityTilesParams = require("./city/citytilesparams");
    var CityPopulation = require("./city/citypopulation");
    var Resource = require("./resourcecode");
    var BuildingCode = require("data/buildingcode");
    var Terrain = require("./terrain");
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

        this.area = this.areaService = new Area(this);
        this.tilesParams = this.tileParamsService = new CityTilesParams(this);
        this.resourcesModule = this.resources = this.resourcesService = new CityResources(this);
        this.statsService = new CityStats(this);
        this.populationService = this.population = new CityPopulation(this);
        this.lab = this.laboratoryService = new Laboratory(this);
        this.buildings = this.buildingService = new CityBuildings(this);

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

    City.prototype.init = function(){
        this.buildingService.buildBuilding(BuildingCode.cityHall, this.tile());
    };

    City.prototype.onTick = function (sender, args, meta) {
        var self = meta.self;
        Events.fire(self, self.events.update, self);
    };

    City.prototype.clearTile = function (tile) {
        if(this.areaService.contains(tile)) {
            var cost = 100;

            if(this.resourcesService.hasEnoughResource(Resource.money, cost)) {
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
    City.prototype.id = function(){
        return this._id;
    };

    /**
     *
     * @param value
     * @returns {int}
     */
    City.prototype.tile = function(value){
        if(value !== undefined)
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

    /**
     *
     * @param world
     * @param tile
     * @returns {boolean}
     */
    City.canEstablish = function(world, tile){
        return !Terrain.isSlope(world.terrain.tileSlope(tile));
    };

    /**
     *
     * @param world
     * @param tile
     * @param name
     * @returns {*}
     */
    City.establish = function(world, tile, name, mayor) {
        if(!City.canEstablish(world, tile))
            return null;

        var city = new City(world, tile);
        city.name(name);
        city.mayor(mayor);
        return city;
    };

    return City;
});
