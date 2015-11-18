var Scope = require('src/common/Scope');
var LayoutView = require('./layout/LayoutView');
var ViewportView = require('./viewport/ViewportView');
var Client = require('client/main');
var Core = require('core/main');

class GameController {
    init(){
        var layout = new LayoutView();

        this.scope.app.render(layout);

        var core = Scope.inject(this.scope, Core.Logic);
        var client = Scope.inject(this.scope, Client.Vkaria, core, {
            showHint: function(){},
            showButtons: function(){
                return {
                    onSubmit: function(){},
                    canDiscard: function(){}
                }
            },

        });

        Scope.register(this.scope, 'client', client);
        Scope.register(this.scope, 'core', core);

        client.prepare(()=>{
            core.start();
            client.start();
            //callback(client);
            client.startServices();

            layout.bodyRegion.show(Scope.inject(this.scope, ViewportView, {
                camera: client.camera
            }));
        });
    }
}

module.exports = GameController;