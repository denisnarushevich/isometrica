const template = require('./PromptView.hbs');
const style = require('./PromptView.less');
const Marionette = require('marionette');

class PromptView extends Marionette.ItemView {
    get value() {
        return this.$el.find('.prompt-input').val();
    }

    events() {
        return {
            'input .prompt-input': 'onInput'
        }
    }

    onInput() {
        this.trigger('valid', this.isValid());
    }

    isValid() {
        var validator = this.options.validator;
        return !validator || validator(this.value);
    }

    serializeData() {
        return {
            label: this.options.label
        }
    }
}

PromptView.prototype.template = template;
PromptView.prototype.className = 'prompt';

module.exports = PromptView;