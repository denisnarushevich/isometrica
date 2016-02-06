require('./Button.less');
var Marionette = require('marionette');
var template = require('./Button.hbs');

class LayoutButton extends Marionette.ItemView {
    events(){
        return {
            'click':()=>{
                this.model.action();
            }
        }
    }
}

LayoutButton.prototype.template = template;
LayoutButton.prototype.tagName = 'button';
LayoutButton.prototype.attributes = {
    type: 'button'
};
LayoutButton.prototype.className = 'layoutButton btn btn-default btn-lg';

module.exports = LayoutButton;