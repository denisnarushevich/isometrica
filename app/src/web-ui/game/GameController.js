var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');

class GameController {
    constructor(){
        this.app = Scope.inject(this, 'app');
    }

    init(...args) {
        var layout = Scope.create(this, LayoutView);

        layout.addButton('briefcase', ()=>{
            console.log('chemodan');
        });

        layout.addButton('euro', ()=>{

        });

        layout.addButton('star', ()=>{
            this.app.navigate('intro', {
                trigger: true
            })
        });

        this.app.render(layout);
    }
}

module.exports = GameController;