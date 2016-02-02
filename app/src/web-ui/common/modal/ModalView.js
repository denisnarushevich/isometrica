require('./ModalView.less');
var Marionette = require('marionette');

class ModalView extends Marionette.ItemView {

}

ModalView.prototype.className = 'modalView';
ModalView.prototype.template = false;

module.exports = ModalView;