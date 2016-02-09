const Marionette = require('marionette');
const itemTemplate = require('./ShopItemView.hbs');

class ShopView extends Marionette.CollectionView {
    getChildView(){
        return Marionette.ItemView;
    }

    childViewOptions(){
        return {
            template: itemTemplate
        }
    }
}

module.exports = ShopView;