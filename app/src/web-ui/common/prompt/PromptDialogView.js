const template = require('./PromptView.hbs');
const style = require('./PromptView.less');
const Marionette = require('marionette');
const DialogView = require('../dialog/DialogView');
const DialogButtonModel = require('../dialog/button/DialogButtonModel');
const PromptView = require('./PromptView');

class PromptDialogView extends DialogView {
    constructor(opts) {
        super(opts);

        this.promptView = new PromptView({
            label: opts.label,
            validator: opts.validator
        });

        var okButton = this.okButton = new DialogButtonModel({
            icon: 'ok'
        }, {
            action: ()=>this.ok()
        });

        this.promptView.on('valid', (valid)=>{
            okButton.disabled = !valid;
        });

        var cancelButton = new DialogButtonModel({
            icon: 'remove'
        }, {
            action: ()=>this.cancel()
        });

        this.buttons.add(okButton);
        this.buttons.add(cancelButton);
    }

    cancel() {
        this.options.cancel();
    }

    ok() {
        this.options.ok(this.promptView.getValue());
    }

    onShow(opts) {
        super.onShow(opts);
        this.bodyRegion.show(this.promptView);
        this.okButton.disabled = this.promptView.isValid();
    }
}

module.exports = PromptDialogView;