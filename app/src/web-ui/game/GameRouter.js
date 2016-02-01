var Marionette = require("marionette");

class IntroRouter extends Marionette.AppRouter {}

IntroRouter.prototype.appRoutes = {
    'game(/)(:action)': 'init',
};

module.exports = IntroRouter;