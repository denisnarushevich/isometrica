var Marionette = require("marionette");

class IntroRouter extends Marionette.AppRouter {}

IntroRouter.prototype.appRoutes = {
    'intro': 'showSplash',
    '': 'showSplash'
};

module.exports = IntroRouter;