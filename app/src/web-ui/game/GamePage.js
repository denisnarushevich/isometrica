var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');
var Client = require('client/main');
var Core = require('core/main');
var CityController = require('./city/CityController');
var WorldController = require('./world/WorldController');
var ViewportView = require('./viewport/ViewportView');

class GamePage extends LayoutView {
    constructor(){
        super();

        this.app = Scope.inject(this, 'app');
        Scope.register(this, 'page', this);
        this.view = new LayoutView();
    }

    init(){
        this.core = Scope.register(this, 'core', Scope.create(this, Core.Logic));
        this.client = Scope.register(this, 'client', Scope.create(this, Client.Vkaria, this.core));
        this.core.start();

        this.client.start();
        this.client.startServices();
    }

    onShow(){
        super.onShow();
        this.body.show(Scope.create(this, ViewportView, {
            camera: this.client.camera
        }));
    }

    onDestroy(){
        this.core.stop();
        this.client.stop();
    }

    showWorld(){
        this.app.navigate('game/world');
        var worldController = Scope.create(this, WorldController);
        worldController.start();
    }

    showCity(id){
        this.app.navigate('game/city/'+id);
        var cityController = Scope.create(this, CityController);
        cityController.start();
    }
}

module.exports = GamePage;
