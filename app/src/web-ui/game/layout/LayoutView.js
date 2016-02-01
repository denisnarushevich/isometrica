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

class LayoutView extends Marionette.LayoutView {
    constructor(opts){
        super(opts);

        this.buttons = new Backbone.Collection([],{
            model: LayoutButtonModel
        });

        this.core = Scope.register(this, 'core', Scope.create(this, Core.Logic));
        this.client = Scope.register(this, 'client', Scope.create(this, Client.Vkaria, this.core));

        this.core.start();
        this.client.start();
        this.client.startServices();
    }

    onShow(){
        this.footer.show(new Marionette.CollectionView({
            childView: LayoutButton,
            collection: this.buttons,
            template: false
        }));

        this.body.show(Scope.create(this, ViewportView, {
            camera: this.client.camera
        }));
    }

    addButton(icon, action){
        this.buttons.add({
            icon: icon
        }, {
            action: action
        });
    }

    onDestroy(){
        this.client.stop();
    }
}

LayoutView.prototype.className = "layout";
LayoutView.prototype.template = template;
LayoutView.prototype.regions = {
    body: ".layout-body",
    footer: ".layout-footer",
};

module.exports = LayoutView;

