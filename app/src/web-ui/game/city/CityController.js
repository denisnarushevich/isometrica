var Scope = require('src/common/Scope');
var ButtonModel = require('../../common/buttons/button/ButtonModel');

class CityController {
    constructor(){
        this.page = Scope.inject(this, 'page');
        this.logger = Scope.inject(this, 'logger');
    }
    start(opts){
        this.page.buttons.reset([
            new ButtonModel({
               icon: 'briefcase',
                type: 'primary',
                text: 'Buy'
            }, {
                action: ()=>{
                    this.logger.log('City #'+opts.cityId);
                }
            }),
            new ButtonModel({
                icon: 'remove',
                type: 'warning',
                text: 'Exit city'
            }, {
                action: ()=>{
                    this.page.gotoWorld();
                }
            })
        ]);
    }
}

module.exports = CityController;