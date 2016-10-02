require('./ShopView.less');
const template = require('./ShopView.hbs');
const Marionette = require('marionette');
const ShopCategoryView = require('./category/ShopCategoryView');

class ShopView extends Marionette.CollectionView {
    getChildView(){
        return ShopCategoryView;
    }

    // childViewOptions(){
    //     return {
    //         template: itemTemplate
    //     }
    // }

    // template(){
    //     return template({
    //         name: this.get('name'),
    //         image: this.get()
    //     });
    // }
}

ShopView.prototype.className = 'shopView';
ShopView.prototype.template = template;

module.exports = ShopView;