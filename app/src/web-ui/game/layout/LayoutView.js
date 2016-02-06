require('./layout.less');
var template = require('./layout.hbs');
var Marionette = require("marionette");
var ButtonView = require('../../common/buttons/button/ButtonView');
var ButtonModel = require('../../common/buttons/button/ButtonModel');
var Backbone = require('backbone');
var Scope = require('src/common/Scope');

class LayoutView extends Marionette.LayoutView {
    constructor(opts) {
        super(opts);

        this.buttons = new Backbone.Collection([], {
            model: ButtonModel
        });
    }

    onShow() {
        this.footer.show(new Marionette.CollectionView({
            childView: ButtonView,
            collection: this.buttons,
            template: false,
            className: 'layout-buttons'
        }));
    }

    showDefaultButtons() {
        this.buttons.reset([
            new ButtonModel({
                icon: 'briefcase'
            }, {
                action: ()=> {
                    console.log('chemodan');
                }
            }),
            new ButtonModel({
                icon: 'arrow-left'
            }, {
                action: ()=> {
                    this.app.back();
                }
            })
        ]);
    }

    showConfirmationButtons(opts) {
        return new Promise((resolve, reject)=> {
            var buttons = [];

            opts && !opts.ok || buttons.push(new ButtonModel({
                icon: 'ok',
                text: 'Ok',
                type: 'success'
            }, {
                action: resolve
            }));

            opts && !opts.cancel || buttons.push(new ButtonModel({
                icon: 'remove',
                text: 'Cancel',
                type: 'warning'
            }, {
                action: reject
            }));

            this.buttons.reset(buttons);
        });
    }
}

LayoutView.prototype.className = "layout";
LayoutView.prototype.template = template;
LayoutView.prototype.regions = {
    body: ".layout-body",
    footer: ".layout-footer",
};

module.exports = LayoutView;

