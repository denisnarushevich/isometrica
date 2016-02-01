var Backbone = require('backbone');
var Marionette = require('marionette');

class LayoutButtonModel extends Backbone.Model {
    constructor(attrs, opts){
        super(attrs, opts);
        this.options = opts;
    }

    action(){
        this.options.action();
    }
}

module.exports = LayoutButtonModel;