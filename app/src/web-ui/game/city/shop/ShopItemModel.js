const Backbone = require('backbone');

class ShopItemModel extends Backbone.Model {
    defaults(){
        return {
            name: 'Item',
            id: 0
        }
    }
}

module.exports = ShopItemModel;