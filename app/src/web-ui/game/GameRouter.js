var Marionette = require("marionette");

class GameRouter extends Marionette.AppRouter {}

GameRouter.prototype.appRoutes = {
    'game':'world',
    'game/world':'world',
    'game/city/:token':'city',
    'game/*path':'world'
};

module.exports = GameRouter;