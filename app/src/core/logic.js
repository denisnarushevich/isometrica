define(function (require) {
    var Events = require("legacy-events"),
        Terrain = require("./terrain"),
        Buildings = require("./buildings"),
        VTime = require("./vtime"),
        EnvService = require("./ambient"),
        Config = require("./config"),
        InfluenceMap = require("./influencemap");
    var TileParamsMan = require("./world/tileparamsmanager");
    var MarketService = require("./world/marketsrv");
    var MessagingService = require("./msgsrv");
    var CityService = require("./citysrv");
    var namespace = require("namespace");

    namespace("Isometrica.Core").Logic = Logic;

    function Logic() {
        this.world = this;

        this.messagingService = new MessagingService(this);
        this.time = new VTime(this);
        this.terrain = new Terrain(this);
        this.buildingService = this.constructionService = this.buildings = new Buildings(this);
        this.envService = new EnvService(this);
        this.tileParams = new TileParamsMan(this);
        this.marketService = new MarketService(this);
        this.cities = new CityService(this);

        this.influenceMap = this.areaService = new InfluenceMap(this);
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

    Logic.prototype.stop = function(){
        clearInterval(this._interval);
    };

    return Logic;
});
