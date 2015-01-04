/**
 * Created by User on 20.08.2014.
 */
define(function(require){
    var Resources = require("../resources");
    var Resource = require("../resourcecode");

    var namespace = require("namespace");
    var CityService = namespace("Isometrica.Core.CityService");
    CityService.Resource = CityResources;

    /**
     * @param city {City}
     * @constructor
     */
    function CityResources(city){
        this.city = city;
        this._resources = Resources.create({
            money: 10000,
            stone: 100,
            wood: 100
        });
    }

    /**
     * @type {City}
     */
    CityResources.prototype.city = null;

    /**
     * @type {Resources}
     * @private
     */
    CityResources.prototype._resources = null;

    CityResources.prototype.add = function(resources){
        if (!(resources instanceof Resources))
            throw "error";

        Resources.add(this._resources, this._resources, resources);
    };

    CityResources.prototype.sub = function(resources){
        if (!(resources instanceof Resources))
            throw "error";

        Resources.sub(this._resources, this._resources, resources);
    };

    CityResources.prototype.addResource = function(resource, amount){
        Resources.addOne(this._resources, this._resources, resource, amount);
    };

    CityResources.prototype.subResource = function(resource, amount){
        Resources.subOne(this._resources, this._resources, resource, amount);
    };

    CityResources.prototype.addMoney = function(amount){
        this.addResource(Resource.money, amount);
    };

    CityResources.prototype.subMoney = function(amount){
        this.subResource(Resource.money, amount);
    };

    CityResources.prototype.hasEnoughResource = function(resource, amount){
        return this._resources.get(resources) >= amount;
    };

    CityResources.prototype.hasEnough = function(resReq){
        return Resources.every(resReq, hasEnoughCheck, this);
    };

    CityResources.prototype.getResources = function(){
        return this._resources;
    };

    function hasEnoughCheck(key, value, self){
        return self._resources.get(key) >= value;
    }

    return CityResources;
});
