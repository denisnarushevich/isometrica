var Core = require("core/main");
var Events = require("legacy-events");
var Event = require('vendor/events/event');
var CityLabel = require("./gameObjects/citylabel");
var Config = require("./config");
var WorldCamera = require("./components/camerascript");
var CityComponent = require("./components/city");

function addCityGO(self, city) {
    var gos = self._cityGOs;
    var tile = city.tile();

    if (gos[tile] !== undefined)
        throw "There already is some city GO on tile " + tile;

    var go = new CityLabel(city);
    self.root.game.scene.addGameObject(go);

    gos[tile] = go;

    return gos[tile];
}

function setupLabel(self, city) {
    var go = addCityGO(self, city);
    var tile = city.tile();
    var x = self.root.terrain.tileXPos(tile);
    var y = self.root.terrain.tileYPos(tile);
    var z = self.root.terrain.tileZPos(tile);

    go.transform.setPosition(x, y, z);
    go.textRenderer.text = city.name();
}

function onNewCity(sender, city, self) {
    setupLabel(self, city);

    city.name(city.name.CHANGE, onCityRename, false, self);
    //Events.on(city, City.events.rename, onCityRename, self)
}

function onCityRename(city, name, self) {
    self._cityGOs[city.tile()].textRenderer.text = name;
}

class Cityman {
    constructor(root) {
        this.root = root;
        this._cityGOs = {};
        this.click = new Event();
    }

    init() {
        var root = this.root;
        var cam = root.camera.cameraScript;

        Events.on(root.core.cities, Core.CityService.events.cityNew, onNewCity, this);
        Events.on(cam, WorldCamera.events.inputClick, function (sender, e, self) {
            var gos = cam.pickGameObject(e.gameViewportX, e.gameViewportY);
            for (var i in gos) {
                var item = gos[i];
                if (item instanceof CityLabel) {
                    var cmp = item.getComponent(CityComponent);
                    self.click.fire(self, cmp.city);
                }
            }
        }, this);
    }

    locate(city) {
        this.root.camera.cameraScript.moveTo(this._cityGOs[city.tile()].go.transform);
    }

    getCityGameObject(cityId) {
        var city = this.root.core.cities.getCity(cityId);
        var tile = city.tile();
        return this._cityGOs[tile];
    }
}

module.exports = Cityman;