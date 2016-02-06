const Marionette = require('marionette');
const template = require('./DialogView.hbs');
const style = require('./DialogView.less');
const DialogButtonView = require('./button/DialogButtonView');
const DialogButtonModel = require('./button/DialogButtonModel');

class DialogView extends Marionette. LayoutView {
    constructor(opts) {
        super(opts);

        this.buttons = new Backbone.Collection([], {
            model: DialogButtonModel
        });

        this.title = opts.title || 'Dialog';
    }

    regions(){
        return {
            'bodyRegion': '.modal-body',
            'footerRegion':'.modal-footer'
        }
    }

    onShow(){
        this.footerRegion.show(new Marionette.CollectionView({
            childView: DialogButtonView,
            collection: this.buttons,
            template: false
        }));
    }

    serializeData(){
        return {
            title: this.title
        }
    }
}

DialogView.prototype.className = 'modal-dialog';
DialogView.prototype.template = template;

module.exports = DialogView;