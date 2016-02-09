var Scope = require('src/common/Scope');
var ButtonModel = require('../../common/buttons/button/ButtonModel');
const ShopDialogView = require('./shop/ShopDialogView');
const ShopCategoryModel = require('./shop/ShopCategoryModel');
const Backbone = require('backbone');

class CityController {
    constructor() {
        this.page = Scope.inject(this, 'page');
        this.logger = Scope.inject(this, 'logger');
        this.modals = Scope.inject(this, 'modals');
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
        var items = Scope.create(this, Backbone.Collection, [
            Scope.create(this, ShopCategoryModel, {
                name: 'Houses'
            }),
            Scope.create(this, ShopCategoryModel, {
                name: 'Factories'
            }),
            Scope.create(this, ShopCategoryModel, {
                name: 'Municipal'
            })
        ]);

        var modal = this.modals.get();
        modal.show(Scope.create(this, ShopDialogView, {
            collection: items,
            close: ()=>{
                modal.close();
            }
        }));
    }
}

module.exports = CityController;