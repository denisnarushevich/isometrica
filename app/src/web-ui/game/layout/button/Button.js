require('./Button.less');
var Marionette = require('marionette');
var template = require('./Button.hbs');

class LayoutButton extends Marionette.ItemView {
    constructor(){
        super();
        "use strict";
        this.$el.append('<span></span>');
    }
    setIcon(icon){
        "use strict";
        this.$el.find('span').addClass('glyphicon-'+icon);
    }
}

//LayoutButton.prototype.template = template;
LayoutButton.prototype.tagName = 'button';
LayoutButton.prototype.attributes = {
    type: 'button'
};
LayoutButton.prototype.className = 'LayoutButton';

module.exports = LayoutButton;