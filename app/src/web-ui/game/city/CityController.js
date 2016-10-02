var Scope = require('src/common/Scope');
var ButtonModel = require('../../common/buttons/button/ButtonModel');
const Shop = require('./shop/Shop');
const ModalService = require('src/web-ui/common/modal/ModalService');

class CityController {
    constructor() {
        this.page = Scope.inject(this, 'page');
        this.logger = Scope.inject(this, 'logger');
        this.modals = Scope.inject(this, ModalService.TOKEN);
        this.shop = Scope.create(this, Shop);
    }

    start(opts) {
        this.page.buttons.reset([
            new ButtonModel({
                icon: 'briefcase',
                type: 'primary',
                text: 'Buy'
            }, {
                action: ()=> {
                    this.openShop();
                }
            }),
            new ButtonModel({
                icon: 'remove',
                type: 'warning',
                text: 'Exit city'
            }, {
                action: ()=> {
                    this.page.gotoWorld();
                }
            })
        ]);
    }

    openShop() {
        this.shop.open();
    }
}

module.exports = CityController;