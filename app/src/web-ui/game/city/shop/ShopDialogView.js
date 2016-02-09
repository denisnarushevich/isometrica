const Scope = require('src/common/Scope');
const DialogView = require('src/web-ui/common/dialog/DialogView');
const ShopView = require('./ShopView');
const ButtonModel = require('src/web-ui/common/buttons/button/ButtonModel');

class ShopDialogView extends DialogView {
    constructor(opts){
        super({
            title: 'Shop'
        });

        this.shopView = Scope.create(this, ShopView, {
            collection: opts.collection
        });

        this.close = new ButtonModel({
            icon: 'remove',
            type: 'warning'
        }, {
            action: ()=>opts.close()
        });

        this.buttons.add(this.close);
    }

    onShow(opts){
        super.onShow(opts);
        this.bodyRegion.show(this.shopView)
    }
}

module.exports = ShopDialogView;