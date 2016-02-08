var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');
var Client = require('client/main');
var Core = require('core/main');
var Logic = require('core/logic');
var CityController = require('./city/CityController');
var WorldController = require('./world/WorldController');
var ViewportView = require('./viewport/ViewportView');

class GamePage extends LayoutView {
    constructor() {
        super();

        this.app = Scope.inject(this, 'app');
        Scope.register(this, 'page', this);
        this.view = new LayoutView();
    }

    init() {
        this.core = Scope.register(this, 'core', Scope.create(this, Logic));
        this.client = Scope.register(this, 'client', Scope.create(this, Client.Vkaria, this.core));
        this.core.start();

        this.client.start();
        this.client.startServices();
    }

    onShow() {
        super.onShow();
        this.body.show(Scope.create(this, ViewportView, {
            camera: this.client.camera
        }));
    }

    onDestroy() {
        this.core.stop();
        this.client.stop();
    }

    gotoWorld() {
        this.app.navigate('game/world');
        this.showWorld();
    }

    gotoCity(id) {
        this.app.navigate('game/city/' + id);
        this.showCity(id);
    }

    showWorld() {
        var worldController = Scope.create(this, WorldController);
        this.currentController && this.currentController.stop && this.currentController.stop();
        this.currentController = worldController;
        worldController.start();
    }

    showCity(id) {
        var cityController = Scope.create(this, CityController);
        this.currentController && this.currentController.stop && this.currentController.stop();
        this.currentController = cityController;
        cityController.start({
            cityId: id
        });
    }
}

module.exports = GamePage;
