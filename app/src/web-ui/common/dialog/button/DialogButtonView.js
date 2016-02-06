const Marionette = require('marionette');
const style = require('./DialogButtonView.less');
const template = require('./DialogButtonView.hbs');

class DialogButtonView extends Marionette.ItemView {
    constructor(opts) {
        super(opts);

        this.model.disabled ? this.$el.addClass('disabled') : this.$el.removeClass('disabled');
        this.model.on('change:disabled', (model, disabled)=> {
            disabled ? this.$el.addClass('disabled') : this.$el.removeClass('disabled');
        });
    }

    events() {
        return {
            'click': this.model.action
        }
    }
}

DialogButtonView.prototype.template = template;
DialogButtonView.prototype.tagName = 'button';
DialogButtonView.prototype.attributes = {
    type: 'button'
};
DialogButtonView.prototype.className = 'dialogButton btn btn-default';

module.exports = DialogButtonView;