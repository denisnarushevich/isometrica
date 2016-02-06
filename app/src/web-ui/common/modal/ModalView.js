require('./ModalView.less');
const template = require('./ModalView.hbs');
const Marionette = require('marionette');

class ModalView extends Marionette.LayoutView {
    constructor(opts){
        super(opts);
    }
}

ModalView.prototype.className = 'modalView';
ModalView.prototype.template = template;
ModalView.prototype.regions = {
    'contentRegion':'.modalView-container'
};

module.exports = ModalView;