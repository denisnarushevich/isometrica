var Scope = require('src/common/Scope');
var Button = require('../layout/button/LayoutButtonModel');

class CityController {
    constructor(){
        this.page = Scope.inject(this, 'page');
        this.logger = Scope.inject(this, 'logger');
    }
    start(){
        this.page.buttons.reset([
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