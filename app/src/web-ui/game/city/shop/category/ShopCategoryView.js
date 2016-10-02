require('./ShopCategoryView.less');
const Marionette = require("backbone.marionette");
const template = require('./ShopCategoryView.hbs');

class ShopCategoryView extends Marionette.ItemView {
}

ShopCategoryView.prototype.className = 'shopCategoryView';
ShopCategoryView.prototype.template = template;

module.exports = ShopCategoryView;