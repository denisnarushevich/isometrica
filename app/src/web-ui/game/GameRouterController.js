var Scope = require('src/common/Scope');
var GamePage = require('./GamePage');

class GameRouterController {
    constructor() {
        this.app = Scope.inject(this, 'app');
    }

    city(id) {
        this.app.replace('game/city/' + id);
        var page = this.app.setPage(GamePage);
        page.showCity(id);
    }

    world() {
        this.app.replace('game/world');
        var page = this.app.setPage(GamePage);
        page.showWorld();
    }
}

module.exports = GameRouterController;