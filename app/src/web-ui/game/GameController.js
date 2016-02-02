var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');

class GameController {
    constructor(){
        this.app = Scope.inject(this, 'app');
    }

    init(...args) {
        var layout = Scope.create(this, LayoutView);



        this.app.render(layout);
    }
}

module.exports = GameController;