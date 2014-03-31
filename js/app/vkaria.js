//TODO fix dissapearing saved buildings
//TODO fix road build on slopes
//TODO path finding using waypoints on tiles.

define(function (require) {
    var LogicInterface = require("logicapi"),
        engine = require("engine"),
        BuildMan = require("./buildman"),
        TilesMan = require("./tilesman"),
        HiliteMan = require("./hiliteman"),
        PathMan = require("./pathfinding/pathman"),
        Tools = require("./tools/tools"),
        City = require("./city"),
        PlayerScript = require("./components/playerscript"),
        CameraScript = require("./components/camerascript"),
        UIManager = require("ui"),
        RenderLayer = require("lib/renderlayer");

    function Vkaria() {
        // Vkaria is not trully isometric, it's dimetric with 2:1 ratio (Transport Tycoon used this).
        // It means, that when point goes about 1px by X, it moves 1/2 pixel by Y.
        // We can calculate camera angle around X axis like this: Math.asin(1/2)*180/Math.PI = 30deg, where 1/2 is our
        // x to y ratio.
        // Distance between tiles in 3D space can be calculated like this:
        // 1/cos(45)*TILE_WIDTH/2 = 45.255 , where 45deg angle is rotation about Y axis.

        //Tile Z is amount of how much units tile should be elevated in one step by z axis.
        //it's calculated: tileZStep = x/cos(30deg); where x is height of elevation step on image, in pixels,
        //and 30deg angle - is pitch angle of camera


        //register itself in global namespace
        window.vkariaApp = window.vkaria = this;

        //start game logic
        this.logicInterface = new LogicInterface();

        this.config = {
            tileSize: 45.255,
            tileZStep: 9.238,
            //chunkSize: (window.matchMedia("handheld").matches ? 8 : 24)
            chunkSize: (window.matchMedia("(max-width: 800px)").matches ? 8 : 24)
        };

        //alert(window.matchMedia("(max-width: 800px)").matches)
        //DO NOT USE engine.config for game-specific use! USE vkaria.config instead.
        //entries below are left for compatibility purposes, temporally.
        //custom config entries
        engine.config["tileSize"] = 45.255;
        engine.config["tileZStep"] = 9.238;

        //TODO there should be renderer layers and logical layers, and tags too
        //configure layers (render layers)
        vkaria.layers = RenderLayer;
        engine.config.layersCount = 5;
        engine.config.depthSortingMask = 12;

        //assets
        this.assets = new engine.AssetManager();
        this.sprites = new engine.SpriteManager(this.assets);

        //init engine
        this.game = new engine.Game();

        this.hiliteMan = new HiliteMan();
        this.buildman = new BuildMan();
        this.tilesman = new TilesMan();
        this.tools = new Tools();
        this.uiMgr = new UIManager();
        this.city = new City();
        window.p = this.pathman = new PathMan();

        //preload assets and, when done, start game
        var self = this;

        //прелоадинг ресурсов не нужен, т.к. идея прелоадинга идёт в разрез с идеей того, чтобы загружать ресурсы по мере необходимисти, а не все сразу.
        //Try to load spritesheet. If it is not available, then start game anyway, it will then use sprites each separately.
        //FF won't run game before any resource is ready. Empty "new Image()" shim is not helpful.
        this.assets.getAsset("assets/stone.png", engine.AssetManager.Resource.ResourceTypeEnum.image).done(function () {
            self.assets.getAsset("assets/coal.png", engine.AssetManager.Resource.ResourceTypeEnum.image).done(function () {
                self.assets.getAsset("assets/atlas.json", engine.AssetManager.Resource.ResourceTypeEnum.json).done(function (resourceJSON) {
                    if (resourceJSON.state === resourceJSON.constructor.ResourceStateEnum.ready) {
                        self.sprites.frames = resourceJSON.data.frames;

                        self.assets.getAsset("assets/atlas.png", engine.AssetManager.Resource.ResourceTypeEnum.image).done(function (resourceImage) {
                            self.sprites.atlas = resourceImage.data;
                            self.start();
                        });
                    } else
                        self.start();
                });
            });
        });
    }

    Vkaria.prototype.start = function () {
        this.camera = new engine.Camera("mainCamera");
        this.camera.addComponent(new CameraScript());
        this.camera.addComponent(new PlayerScript());
        this.game.logic.world.addGameObject(this.camera);

        this.logicInterface.start();

        this.game.run();

        this.pathman.start();

        this.buildman.start();
        this.tilesman.start();
        this.tools.start();
        this.city.start();


        this.uiMgr.start();


        window.t = require("./gameObjects/Trolley");
        setInterval(function () {

            var pa = p.findPath();
            if (pa && pa.length) {
                var b = new t;
                vkaria.game.logic.world.addGameObject(b);
                b.transform.setPosition(pa[0][0], pa[0][1], pa[0][2]);
                b.entity.setPath(pa);
            }
        }, 1000);

    };

    /**
     * engine.Game instance
     * @type {Game}
     */
    Vkaria.prototype.game = null;

    return Vkaria;
})
;
