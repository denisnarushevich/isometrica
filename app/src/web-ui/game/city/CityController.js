var Scope = require('src/common/Scope');
var Button = require('../layout/button/LayoutButtonModel');

class CityController {
    constructor(){
        this.page = Scope.inject(this, 'page');
        this.logger = Scope.inject(this, 'logger');
    }
    start(opts){
        this.page.buttons.reset([
            new Button({
               icon: 'briefcase'
            }, {
                action: ()=>{
                    this.logger.log('City #'+opts.cityId);
                }
            }),
            new Button({
                icon: 'remove'
            }, {
                action: ()=>{
                    this.page.gotoWorld();
                }
            })
        ]);
    }
}

module.exports = CityController;