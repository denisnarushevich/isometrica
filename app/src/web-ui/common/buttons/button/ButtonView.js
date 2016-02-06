const Marionette = require('marionette');
const style = require('./ButtonView.less');
const template = require('./ButtonView.hbs');

class ButtonView extends Marionette.ItemView {
    constructor(opts) {
        super(opts);

        this.model.on('change:disabled', (model, disabled)=> {
            this.disabled = disabled;
        });
    }

    events() {
        return {
            'click': ()=>{
                this.model.action();
            }
        }
    }

    set disabled(disabled){
        this.$el.toggleClass('disabled', disabled);
    }

    set type(type){
        this.$el.addClass('btn-'+type);
    }

    onShow(opts){
        this.disabled = this.model.disabled;
        this.type = this.model.type;
    }
}

ButtonView.prototype.template = template;
ButtonView.prototype.tagName = 'button';
ButtonView.prototype.attributes = {
    type: 'button'
};
ButtonView.prototype.className = 'btn';

module.exports = ButtonView;