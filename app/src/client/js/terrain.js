/**
 * Created by User on 13.07.2014.
 */
define(function (require) {
    var Core = require("core/main");
    var Tile = require("./gameObjects/tile");
    var TerrainType = Core.TerrainType;
    var Config = require("./config");
    var TileIterator = Core.TileIterator;
    var Events = require("legacy-events");
    var CoreTerrain = Core.Terrain;
    var grass = require('../assets/images/grass/grass');
    var shore = require('../assets/images/shore/shore');
    var water = require('../assets/images/water/water');
    var Resources = require('../assets/Resources.js');

    var events = {};

    function CreateTile(self) {
        if (self.pool.length > 0) {
            return self.pool.pop();
        } else {
            return new Tile();
        }
    }

    function Terrain(root) {
        this.tiles = [];
        this.gos = [];
        this.pool = [];
        this.root = root;
    }

    Terrain.events = events;

    Terrain.prototype.init = function () {
    };

    Terrain.prototype.clear = function (x0, y0, w, l) {
        var tile0 = CoreTerrain.convertToIndex(x0, y0);
        var tile1 = CoreTerrain.convertToIndex(x0 + w - 1, y0 + l - 1);
        var iter = new TileIterator(tile0, tile1);
        var tile, index, tiles = this.tiles, pool = this.pool, gos = this.gos,
            world = vkaria.game.logic.world;
        while (true) {
            index = iter.next();
            if (index === -1)
                break;

            tile = this.tiles[index];
            if (tile) {
                world.removeGameObject(tile);
                pool.push(tile);
                delete tiles[index];
                delete gos[tile.instanceId];
            }
        }
    };

    /**
     * this will calculate slope id starting from most-left point and goings clock-wise
     * @param self
     * @param x
     * @param y
     * @returns {number}
     */
    function calcSpriteCode(self, x, y) {
        var terrain = vkaria.core.world.terrain;
        var terrainType = terrain.getTerrainType(x, y);

        if (terrainType === TerrainType.water) return 2222;

        var z0 = terrain.getGridPointHeight(x, y + 1),//gridPoints[2];
            z1 = terrain.getGridPointHeight(x + 1, y + 1),//gridPoints[3];
            z2 = terrain.getGridPointHeight(x + 1, y),//gridPoints[1];
            z3 = terrain.getGridPointHeight(x, y);//gridPoints[0];

        return 2000 + (z1 - z0 + 2) * 100 + (z2 - z0 + 2) * 10 + (z3 - z0 + 2);
    }

    var routine = function (iter, self) {
        var i = 0;
        while (i++ < 128) {

            var index = iter.next();

            if (index === -1)
                return -1;

            var coreTerrain = vkaria.core.world.terrain;

            var x = index & 0xffff;
            var y = index >>> 16;

            if (!self.tiles[index]) {
                var t = CreateTile(self);

                //var gps = coreTerrain.getGridPoints(x, y);
                var terrain = vkaria.core.world.terrain;

                var gps = [
                    terrain.getGridPointHeight(x, y),
                    terrain.getGridPointHeight(x + 1, y),
                    terrain.getGridPointHeight(x, y + 1),
                    terrain.getGridPointHeight(x + 1, y + 1),
                ];

                //var slope = coreTerrain.calcSlopeId(x,y);
                var slope = calcSpriteCode(self, x, y);
                var type = coreTerrain.getTerrainType(x, y);
                var sprite = null;

                var z = 0;

                if (type !== TerrainType.water)
                    z = gps[2]; //2 is west, most left gridpoint, it should be gps[0], but sprites are drawn with pivot point being most left gridpoint

                t.transform.setPosition(
                    x * Config.tileSize,
                    z * Config.tileZStep,
                    y * Config.tileSize
                );

                if (type === TerrainType.grass) {
                    sprite = Resources.getSprite(grass[slope]);
                } else if (type === TerrainType.shore) {
                    sprite = Resources.getSprite(shore[slope]);
                } else {
                    sprite = Resources.getSprite(water['sea']);
                }

                t.renderer.setSprite(sprite);
                vkaria.game.logic.world.addGameObject(t);

                self.tiles[index] = t;
                self.gos[t.instanceId] = index;
            }
        }

        return 0;
    };

    Terrain.prototype.draw0 = function (x0, y0, w, l) {
        var iter = new TileIterator(x0, y0, w, l);

        Isometrica.Engine.Coroutine.startCoroutine(routine, iter, this);

    };

    Terrain.prototype.draw = function (x0, y0, w, l) {
        var coreTerrain = vkaria.core.world.terrain;

        var tile0 = CoreTerrain.convertToIndex(x0, y0);
        var tile1 = CoreTerrain.convertToIndex(x0 + w - 1, y0 + l - 1);
        var iter = new TileIterator(tile0, tile1);
        var tiles = this.tiles,
            index, x, y, z, t, slope, type, sprite, gps, gos = this.gos;

        while ((index = iter.next()) !== -1) {
            x = Core.Terrain.extractX(index);
            y = Core.Terrain.extractY(index);

            if (!tiles[index]) {
                t = CreateTile(this);

                var terrain = vkaria.core.world.terrain;

                var gps = [
                    terrain.getGridPointHeight(x, y),
                    terrain.getGridPointHeight(x + 1, y),
                    terrain.getGridPointHeight(x, y + 1),
                    terrain.getGridPointHeight(x + 1, y + 1),
                ];

                //var slope = coreTerrain.calcSlopeId(x,y);
                slope = calcSpriteCode(this, x, y);
                type = coreTerrain.getTerrainType(x, y);
                sprite = null;

                z = 0;

                if (type !== TerrainType.water)
                    z = gps[2]; //2 is west, most left gridpoint, it should be gps[0], but sprites are drawn with pivot point being most left gridpoint

                t.transform.setPosition(
                    x * Config.tileSize,
                    z * Config.tileZStep,
                    y * Config.tileSize
                );

                if (type === TerrainType.grass) {
                    sprite = Resources.getSprite(grass[slope]);
                } else if (type === TerrainType.shore) {
                    sprite = Resources.getSprite(shore[slope]);
                } else {
                    sprite = Resources.getSprite(water['sea']);
                }

                t.renderer.setSprite(sprite);
                vkaria.game.logic.world.addGameObject(t);

                tiles[index] = t;
                gos[t.instanceId] = index;
            }
        }
    };

    Terrain.prototype.getTile = function (idx_or_x, y) {
        var idx;

        if (arguments.length === 2) {
            idx = Core.Terrain.convertToIndex(idx_or_x, y);
        } else {
            idx = idx_or_x;
        }

        var t = this.tiles[idx];

        return t !== undefined && t || null;
    };

    /**
     * Find tile coordinates by gameObject
     */
    Terrain.prototype.getCoordinates = function (go) {
        return this.gos[go.instanceId] || -1;
    };

    Terrain.prototype.tileXPos = function (tile) {
        return CoreTerrain.extractX(tile) * Config.tileSize;
    };

    Terrain.prototype.tileZPos = function (tile) {
        return CoreTerrain.extractY(tile) * Config.tileSize;
    };

    Terrain.prototype.tileYPos = function (tile) {
        return this.root.core.terrain.getGridPointHeight(tile) * Config.tileZStep;
    };

    return Terrain;
});
