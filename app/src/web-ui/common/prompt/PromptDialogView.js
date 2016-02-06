const template = require('./PromptView.hbs');
const style = require('./PromptView.less');
const Marionette = require('marionette');
const DialogView = require('../dialog/DialogView');
const ButtonModel = require('../buttons/button/ButtonModel');
const PromptView = require('./PromptView');

class PromptDialogView extends DialogView {
    constructor(opts) {
        super(opts);

        this.prompt = new PromptView({
            label: opts.label,
            validator: opts.validator
        });

        this.ok = new ButtonModel({
            icon: 'ok',
            type: 'success'
        }, {
            action: ()=>this.options.ok(this.prompt.value)
        });

        this.cancel = new ButtonModel({
            icon: 'remove',
            type: 'warning'
        }, {
            action: ()=>this.options.cancel()
        });

        this.prompt.on('valid', (valid)=> {
            valid ? this.ok.enable() : this.ok.disable();
        });

        this.buttons.add(this.ok);
        this.buttons.add(this.cancel);
    }

    onShow(opts) {
        super.onShow(opts);

        this.bodyRegion.show(this.prompt);

        this.prompt.isValid() ? this.ok.enable() : this.ok.disable();
    }
}

module.exports = PromptDialogView;