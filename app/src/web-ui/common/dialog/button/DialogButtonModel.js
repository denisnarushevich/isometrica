var Backbone = require('backbone');
var Marionette = require('marionette');

class LayoutButtonModel extends Backbone.Model {
    constructor(attrs, opts){
        super(attrs, opts);
        this.action = opts.action;
    }

    get disabled(){
        return this.get('disabled');
    }

    set disabled(disabled){
        this.set('disabled', disabled);
    }
}

module.exports = LayoutButtonModel;