var engine = require("engine"),
    RenderLayer = require("client/renderlayer"),
    Config = require("./config"),
    Core = require("core/main");
var Terrain = Core.Terrain;
var Resources = require('../assets/Resources.js');
var road = require('../assets/images/road/road');

function BuildingView() {
    this.gameObject = new engine.GameObject("building");
}

BuildingView.prototype.gameObject = null;
BuildingView.prototype.building = null;

BuildingView.prototype.setRoad = function (road) {
    this.road = road;
};

BuildingView.prototype.update = function () {
    var b = this.road;

    if (b !== null && b.staticData !== null) {
        var staticData = b.staticData,
            tileSize = Config.tileSize,
            tileZStep = Config.tileZStep;

        //
        if (this.gameObject.transform.children.length === 0) {
            var part = new engine.GameObject(),
                sprite = new engine.SpriteRenderer();
            sprite.layer = RenderLayer.roadLayer;
            sprite.setSprite(Resources.getSprite(road[this.road.typeCode])).setPivot(32, 24);
            part.addComponent(sprite);
            this.gameObject.transform.addChild(part.transform);
            part.transform.translate(0, 0, 0);
        } else {
            this.gameObject.transform.children[0].gameObject.spriteRenderer.setSprite(Resources.getSprite(road[this.road.typeCode]));
        }

        //position gameObject
        var data = b.data,
            x = Terrain.extractX(data.tile),// + data.subPosX,
            y = Terrain.extractY(data.tile),// + data.subPosY,
            z = vkaria.core.world.terrain.getHeight(x + 0.5, y + 0.5);

        this.gameObject.transform.setPosition(x * tileSize, z * tileZStep, y * tileSize);
    }
};

BuildingView.prototype.render = function () {
    if (this.gameObject.world === null)
        vkaria.game.logic.world.addGameObject(this.gameObject);
};

module.exports = BuildingView;
