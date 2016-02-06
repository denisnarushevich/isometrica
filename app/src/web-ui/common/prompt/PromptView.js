const template = require('./PromptView.hbs');
const style = require('./PromptView.less');
const Marionette = require('marionette');

class PromptView extends Marionette.ItemView {
    constructor(opts) {
        super(opts);
        this.label = opts.label || 'Enter value';
        this.validator = opts.validator || (()=> {
            return true;
        });
    }

    events() {
        return {
            'input .prompt-input': ()=> {
                this.trigger('valid', this.isValid());
            }
        }
    }

    isValid(){
        return this.validator(this.getValue());
    }

    serializeData() {
        return {
            label: this.label
        }
    }

    getValue() {
        return this.$el.find('.prompt-input').val();
    }
}

PromptView.prototype.template = template;
PromptView.prototype.className = 'prompt';

module.exports = PromptView;