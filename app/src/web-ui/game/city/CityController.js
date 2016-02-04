var Scope = require('src/common/Scope');
var Button = require('../layout/button/LayoutButtonModel');

class CityController {
    constructor(){
        this.game = Scope.inject(this, 'game');
        this.logger = Scope.inject(this, 'logger');
    }
    start(){
        this.game.buttons.reset([
            new Button({
               icon: 'briefcase'
            }, {
                action: ()=>{
                    this.logger.log('CHEMODAN!!!');
                }
            })
        ]);
    }
    stop(){}
}

module.exports = CityController;