/**
 * Created with JetBrains WebStorm.
 * User: User
 * Date: 09.02.14
 * Time: 15:09
 * To change this template use File | Settings | File Templates.
 */
define(function (require) {
    var engine = require("engine"),
        RenderLayer = require("client/renderlayer"),
        SmokeSource = require("./components/smokesource"),
        Config = require("./config"),
        BuildingState = require("core/buildingstate"),
        Core = require("core/main");
    var Resources = require('../assets/Resources.js');
    var buildings = require('../assets/images/buildings/buildings');
    var misc = require('../assets/images/misc/misc');

    var Terrain = Core.Terrain;

    function BuildingView() {
        this.gameObject = new engine.GameObject("building");
    }

    BuildingView.prototype.gameObject = null;
    BuildingView.prototype.building = null;

    BuildingView.prototype.setBuilding = function (building) {
        this.building = building;
    };

    BuildingView.prototype.update = function () {
        var b = this.building;
        if (b !== null && b.staticData !== null) {
            var staticData = b.staticData,
                tileSize = Config.tileSize,
                tileZStep = Config.tileZStep;

            //clear old GOs
            var children = this.gameObject.transform.children,
                len = children.length;
            for (var i = 0; i < len; i++) {
                var child = children[i];
                child.gameObject.destroy();
            }

            if (b.data.getState() === BuildingState.underConstruction) {
                var sizeX = 0,
                    sizeY = 0;

                if (this.building.data.rotation) {
                    sizeX = staticData.sizeX;// >> 4;
                    sizeY = staticData.sizeY;// & 0x0F;
                } else {
                    sizeX = staticData.sizeX;// & 0x0F;
                    sizeY = staticData.sizeY;// >> 4;
                }


                for (var x = 0; x < sizeX; x++) {
                    for (var y = 0; y < sizeY; y++) {
                        var part = new engine.GameObject(),
                            sprite = new engine.SpriteRenderer();

                        sprite.layer = RenderLayer.buildingsLayer;
                        sprite.setSprite(Resources.getSprite(misc['site.png'])).setPivot(32, 24);

                        part.addComponent(sprite);
                        this.gameObject.transform.addChild(part.transform);
                        part.transform.translate(x * Config.tileSize, 0, y * Config.tileSize);
                    }
                }
            } else if (b.data.getState() === BuildingState.ready) {
                var spritesData;

                if (b.data.rotation && staticData.spritesRotate) {
                    spritesData = staticData.spritesRotate;
                } else if (staticData.sprites) {
                    var spritesData = staticData.sprites;
                }

                var len = spritesData.length;
                for (var i = 0; i < len; i++) {
                    var spriteData = spritesData[i];

                    var spriteRenderer = new engine.SpriteRenderer();
                    spriteRenderer.layer = spriteData.layer;
                    spriteRenderer.setSprite(Resources.getSprite(buildings[spriteData.path]));
                    spriteRenderer.pivotX = spriteData.pivotX;
                    spriteRenderer.pivotY = spriteData.pivotY;

                    var spriteGO = new engine.GameObject();
                    spriteGO.addComponent(spriteRenderer);
                    this.gameObject.transform.addChild(spriteGO.transform);
                    spriteGO.transform.setLocalPosition(spriteData.x * tileSize, spriteData.y * tileZStep, spriteData.z * tileSize);
                }

                //add smoke
                if (staticData.smokeSource !== undefined) {
                    var smokeSource = new engine.GameObject();
                    smokeSource.transform.setLocalPosition(staticData.smokeSource[0] * tileSize, staticData.smokeSource[1] * tileZStep, staticData.smokeSource[2] * tileSize);
                    smokeSource.addComponent(new SmokeSource());
                    this.gameObject.transform.addChild(smokeSource.transform);
                }
            }

            //position gameObject
            var data = this.building.data,
                //this.building.tile.gameObject.transform.getPosition()[1] + this.building.tile.subpositionZ(data.subPosX, data.subPosY),
                x = Terrain.extractX(data.tile),// + data.subPosX,
                y = Terrain.extractY(data.tile),// + data.subPosY,
                z = vkaria.core.world.terrain.getGridPointHeight(x+1, y);

            this.gameObject.transform.setPosition(x * tileSize, z * tileZStep, y * tileSize);
        }
    };

    BuildingView.prototype.render = function () {
        if (this.gameObject.world === null)
            vkaria.game.logic.world.addGameObject(this.gameObject);
    };


    return BuildingView;
});