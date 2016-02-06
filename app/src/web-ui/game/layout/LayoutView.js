require('./layout.less');
var template = require('./layout.hbs');
var Marionette = require("marionette");
var LayoutButton = require('./button/Button');
var LayoutButtonModel = require('./button/LayoutButtonModel');
var Backbone = require('backbone');
var Scope = require('src/common/Scope');

class LayoutView extends Marionette.LayoutView {
    constructor(opts) {
        super(opts);

        this.buttons = new Backbone.Collection([], {
            model: LayoutButtonModel
        });
    }

    onShow() {
        this.footer.show(new Marionette.CollectionView({
            childView: LayoutButton,
            collection: this.buttons,
            template: false,
            className: 'layout-buttons'
        }));
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

    showConfirmationButtons(opts) {
        return new Promise((resolve, reject)=> {
            var buttons = [];

            opts && !opts.ok || buttons.push(new LayoutButtonModel({
                icon: 'ok'
            }, {
                action: resolve
            }));

            opts && !opts.cancel || buttons.push(new LayoutButtonModel({
                icon: 'remove'
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

