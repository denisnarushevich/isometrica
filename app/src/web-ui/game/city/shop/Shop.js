const shopData = require('./ShopData.js');
const Scope = require('src/common/Scope');
const ShopDialogView = require('./ShopDialogView');
const ShopCategoryModel = require('./ShopCategoryModel');
const Backbone = require('backbone');
const ModalService = require('src/web-ui/common/modal/ModalService');

class Shop {
    constructor(){
        this.modals = Scope.inject(this, ModalService.TOKEN);
    }

    open(){
        var modal = this.modals.get();
        modal.show(Scope.create(this, ShopDialogView, {
            collection: this.getCategories(),
            close: ()=>{
                modal.close();
                modal.show(Scope.create(this, ShopDialogView, {
                    collection: this.getItems(2),
                    close: ()=>{
                        modal.close();
                    }
                }));
            }
        }));
    }

    getCategories(){
        return Scope.create(this, Backbone.Collection, shopData.categories.map((category)=>{
            return Scope.create(this, ShopCategoryModel, category);
        }));
    }

    getItems(categoryId){
        var items = {};
        shopData.items.forEach((item)=>{
            items[item.buildingCode] = item;
        });

        var category = shopData.categories.find((category)=>{
            return category.code == categoryId;
        });
        if(category){
            var itemModels = category.items.map((itemId)=>{
                var item = items[itemId];
                return Scope.create(this, ShopCategoryModel, item);
            });
            return Scope.create(this, Backbone.Collection, itemModels);
        }
        return null;
    }
}

module.exports = Shop;