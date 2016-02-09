const Backbone = require('backbone');

class ShopCategoryModel extends Backbone.Model {
    defaults(){
        return {
            name: 'Category'
        }
    }
}

module.exports = ShopCategoryModel;