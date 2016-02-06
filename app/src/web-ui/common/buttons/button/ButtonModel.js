var Backbone = require('backbone');

class ButtonModel extends Backbone.Model {
    constructor(attrs, opts){
        super(attrs, opts);
        this.options = opts;
    }

    defaults(){
        return {
            type: 'default',
            disabled: false,
            icon: 'ok',
            text: ''
        }
    }

    get disabled(){
        return this.get('disabled');
    }

    get type(){
        return this.get('type');
    }

    action(){
        return !this.disabled && this.options.action();
    }

    disable(){
        this.set('disabled', true);
    }

    enable(){
        this.set('disabled', false);
    }
}

module.exports = ButtonModel;