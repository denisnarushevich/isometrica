var Marionette = require("marionette");

class IntroRouter extends Marionette.AppRouter {}

IntroRouter.prototype.appRoutes = {
    'game': 'init',
};

module.exports = IntroRouter;