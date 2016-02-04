var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');
var CityController = require('./city/CityController');
var WorldController = require('./world/WorldController');
var Client = require('client/main');
var Core = require('core/main');
var ViewportView = require('./viewport/ViewportView');

class GameController extends LayoutView {
    constructor(){
        super();
        this.app = Scope.inject(this, 'app');
    }

    init(module, args){
        if(this._init) {
            return;
        }

        this._init = true;

        console.log(arguments);
        Scope.register(this, 'game', this);

        this.core = Scope.register(this, 'core', Scope.create(this, Core.Logic));
        this.client = Scope.register(this, 'client', Scope.create(this, Client.Vkaria, this.core));
        this.core.start();

        this.client.start();
        this.client.startServices();

        this.app.render(this);
    }

    city(id){
        this.init();
        this.app.navigate('game/city/'+id);
        var cityController = Scope.create(this, CityController);
        cityController.start();
    }

    world() {
        this.init();
        this.app.navigate('game/world');
        var worldController = Scope.create(this, WorldController);
        worldController.start();
    }

    onShow(){
        super.onShow();
        this.body.show(Scope.create(this, ViewportView, {
            camera: this.client.camera
        }));
    }

    onDestroy() {
        this._init = false;
        this.client.stop();
    }
}

module.exports = GameController;