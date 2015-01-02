/**
 * Created by User on 21.08.2014.
 */
define(function(require){
    var Events = require("events");
    /**
     * @type {TileParam}
     */
    var Resource = require("../resourcecode");
    var TileParamsMan = require("../world/tileparamsmanager");

    var ReactiveProperty = require("reactive-property");
    var namespace = require("namespace");
    var CityService = namespace("Isometrica.Core.CityService");
    CityService.Population = CityPopulation;

    var MAX_PARAM_VAL = TileParamsMan.MAX_PARAM_VAL;
    var TAX_MONEY = 1;

    /**
     * @param city {City}
     * @constructor
     */
    function CityPopulation(city){
        this.city = city;
        this._population = 0;
    }

    CityPopulation.prototype.init = function(){
        var world = this.city.world;

        Events.on(world, world.events.tick, onTick, this);

        this.capacity(this.capacity());
        this.city.buildings.changed(function (buildings, buildings, self) {
            self.capacity(calculateCapacity(self));
        }, this);

        this.population(actualPopulation(this));
    };

    CityPopulation.prototype.population = ReactiveProperty(0);

    CityPopulation.prototype.capacity = ReactiveProperty(0);

    CityPopulation.prototype.getTaxIncomeAmount = function(){
        return TAX_MONEY * this.population();
    };

    function onTick(world, args, self){
        var pop = actualPopulation(self);

        populationChangePerTick(self);

        if (pop !== actualPopulation(self)) {
            self.population(actualPopulation(self));
        }

        payTaxes(self);
    }

    function actualPopulation(self) {
        return Math.max(self._population | 0, 0);
    }

    function calculateCapacity(self){
        var r = 0;
        var buildings = self.city.buildingService.getBuildings();
        for (var key in buildings) {
            var building = buildings[key];
            r += building.citizenCapacity();
        }
        return r;
    }

    function populationChangePerTick(self) {
        var pop = actualPopulation(self);
        var totalCap = calculateCapacity(self);
        var avgEco = self.city.tilesParams.avgEco();
        var change = 0;
        var cap = totalCap - pop;
        var citizensLeaveDueBadRatings = pop * 0.01; //1% of population
        var maxCitizensCanJoin = cap > 0 ? Math.max(1, Math.sqrt(cap)) : 0;

        //calculate overralEffect
        var ecoEffect = avgEco / (MAX_PARAM_VAL / 2) - 1; // (-1,1)
        var ecoWeight = 1;
        var overallEffect = ecoEffect * ecoWeight; // (-1,1)

        //if effect is low , citizens leave
        if (overallEffect < 0) {
            change = citizensLeaveDueBadRatings * overallEffect;
        } else if (cap < 0) {//if capacity is not enough citizens leave by one
            change = -1;
        } else {//if effect is high enough , citizens join
            change = maxCitizensCanJoin * overallEffect;
        }

        //console.log("CAP:"+cap,"AECO:"+avgEco,"ECO:"+ecoEffect, "OVRL:"+overallEffect,"CHNG:"+change);

        self._population += change;
    }

    function payTaxes(self){
        var money = {};
        money[Resource.money] = self.getTaxIncomeAmount();
        self.city.resourcesModule.add(money);
    }

    return CityPopulation;
});
