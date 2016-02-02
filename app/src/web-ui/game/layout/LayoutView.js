require('./layout.less');
var template = require('./layout.hbs');
var Marionette = require("marionette");
var LayoutButton = require('./button/Button');
var LayoutButtonModel = require('./button/LayoutButtonModel');
var Backbone = require('backbone');
var Client = require('client/main');
var Core = require('core/main');
var Scope = require('src/common/Scope');
var ViewportView = require('../viewport/ViewportView');
var ModalView = require('src/web-ui/common/modal/ModalView');

var TileSelector = require('client/tileselector');
var Events = require('events');

class LayoutView extends Marionette.LayoutView {
    constructor(opts) {
        super(opts);

        this.app = Scope.inject(this, 'app');

        this.buttons = new Backbone.Collection([], {
            model: LayoutButtonModel
        });

        this.core = Scope.register(this, 'core', Scope.create(this, Core.Logic));
        this.client = Scope.register(this, 'client', Scope.create(this, Client.Vkaria, this.core));

        this.core.start();
        this.client.start();
        this.client.startServices();
    }

    onShow() {
        this.footer.show(new Marionette.CollectionView({
            childView: LayoutButton,
            collection: this.buttons,
            template: false
        }));

        this.body.show(Scope.create(this, ViewportView, {
            camera: this.client.camera
        }));


        var selector = new TileSelector(this.client);
        var token = -1;
        var s = Events.on(selector, TileSelector.events.change, (a, b, c)=> {
            this.client.hiliteMan.disable(token);
            token = this.client.hiliteMan.hilite({
                tile: a.selectedTile(),
                borderColor: "rgba(255,255,255,1)",
                borderWidth: 2
            });
        });

        this.showConfirmationButtons(()=> {
            var tile = selector.selectedTile();

            //root.ui.showPrompt("Give city a name!", function (val) {
            //    var mayor = root.player;
            //    var city = root.core.cities.establishCity(tile, val, mayor);
            //    mayor.city(city);
            //    root.ui.show("viewport");
            //    root.ui.hideHint();
            //}, "My City");



            var city = this.core.cities.establishCity(tile, 'MyCity', this.client.player);
            this.client.player.city(city);

            this.client.hiliteMan.disable(token);
            selector.dispose();
            Events.off(selector, TileSelector.events.change, s);

            this.showDefaultButtons();
        });


    }

    onDestroy() {
        this.client.stop();
    }

    showDefaultButtons() {
        this.buttons.reset([
            new LayoutButtonModel({
                icon: 'briefcase'
            }, {
                action: ()=> {
                    console.log('chemodan');
                }
            }),
            new LayoutButtonModel({
                icon: 'arrow-left'
            }, {
                action: ()=> {
                    this.app.back();
                }
            })
        ]);
    }

    showConfirmationButtons(ok, cancel) {
        var buttons = [];

        ok && buttons.push(new LayoutButtonModel({
            icon: 'ok'
        }, {
            action: ok
        }));

        cancel && buttons.push(new LayoutButtonModel({
            icon: 'remove'
        }, {
            action: cancel
        }));

        this.buttons.reset(buttons);
    }
}

LayoutView.prototype.className = "layout";
LayoutView.prototype.template = template;
LayoutView.prototype.regions = {
    body: ".layout-body",
    footer: ".layout-footer",
};

module.exports = LayoutView;

