const ShopView = require('./ShopView.js');
const Backbone = require('backbone');
const Scope = require('src/common/Scope');
const shopData = require('./ShopData.js');

var scope = {};
var col = Scope.create(scope, Backbone.Collection, shopData.categories);

var view = new ShopView({
    collection: col
});
view.render();
document.body.appendChild(view.el);