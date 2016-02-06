const Marionette = require('marionette');
const template = require('./DialogView.hbs');
const style = require('./DialogView.less');
const ButtonView = require('../buttons/button/ButtonView');
const ButtonModel = require('../buttons/button/ButtonModel');

class DialogView extends Marionette.LayoutView {
    constructor(opts) {
        super(opts);

        this.title = opts.title || 'Dialog';

        this.buttons = new Backbone.Collection([], {
            model: ButtonModel
        });

        this.buttonsView = new Marionette.CollectionView({
            childView: ButtonView,
            collection: this.buttons,
            template: false
        });
    }

    regions(){
        return {
            'bodyRegion': '.modal-body',
            'footerRegion':'.modal-footer'
        }
    }

    onShow(){
        this.footerRegion.show(this.buttonsView);
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