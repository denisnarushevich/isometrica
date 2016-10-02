const Scope = require('src/common/Scope');
const ModalView = require('./ModalView');

class ModalService {
    constructor(){
        this.app = Scope.inject(this, 'app');
    }

    get(){
        return this; //TODO should return new instance
    }

    show(view){
        var modalView = Scope.create(this, ModalView);
        this.app.appView.overlayRegion.show(modalView);
        modalView.contentRegion.show(view);
    }

    close(){
        this.app.appView.overlayRegion.empty();
    }

    dispose(modal){
        //...TODO
    }
}

ModalService.TOKEN = 'modals';

module.exports = ModalService;