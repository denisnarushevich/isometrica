const Scope = require('src/common/Scope');

var Events = require("legacy-events"),
    Terrain = require("./terrain"),
    Buildings = require("./buildings"),
    VTime = require("./vtime"),
    EnvService = require("./ambient"),
    Config = require("./config"),
    InfluenceMap = require("./influencemap");
var TileParamsMan = require("./world/tileparamsmanager");
var MarketService = require("./world/marketsrv");
var CityService = require("./citysrv");
var TileService = require('./tiles/TileService');

function Logic() {
    this.world = this;

    this.tileService = Scope.create(this, TileService);
    this.time = Scope.create(this, VTime, this);
    this.terrain = Scope.create(this, Terrain, this);
    this.buildingService = this.constructionService = this.buildings = Scope.create(this, Buildings, this);
    this.envService = Scope.create(this, EnvService, this);
    this.tileParams = new TileParamsMan(this);
    this.marketService = Scope.create(this, MarketService , this);
    this.cities = Scope.create(this, CityService, this);

    this.influenceMap = this.areaService = Scope.create(this, InfluenceMap, this);
}

var events = Logic.events = Logic.prototype.events = {
    tick: 1
};

/**
 * Current game time
 * @type {null}
 */
Logic.prototype.now = null;

Logic.prototype.terrain = null;
Logic.prototype.buildings = null;

Logic.prototype._interval = -1;

Logic.prototype.start = function () {
    var self = this;
    this._interval = setInterval(function () {
        Events.fire(self, events.tick, self, null);
    }, Config.tickDelay);

    this.time.start();
    this.buildingService.init();
    this.envService.init();
    this.marketService.init();
    this.cities.init();
};

Logic.prototype.stop = function () {
    clearInterval(this._interval);
};

module.exports = Logic;