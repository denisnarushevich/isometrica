var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');
var ViewportView = require('./viewport/ViewportView');
var Client = require('client/main');
var Core = require('core/main');

class GameController {
    init(...args) {
        var layout = new LayoutView();

        Scope.inject(this, 'app').render(layout);

        var core = Scope.create(this, Core.Logic);
        var client = Scope.create(this, Client.Vkaria, core, {
            showHint: function () {
            },
            showButtons: function () {
                return {
                    onSubmit: function () {
                    },
                    canDiscard: function () {
                    }
                }
            },

        });

        Scope.register(this, 'client', client);
        Scope.register(this, 'core', core);


        core.start();
        client.start();
        //callback(client);
        client.startServices();

        layout.body.show(Scope.create(this, ViewportView, {
            camera: client.camera
        }));

        layout.addButton('briefcase');
        layout.addButton('euro');
        layout.addButton('star');
    }
}

module.exports = GameController;