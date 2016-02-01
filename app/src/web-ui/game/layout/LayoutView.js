require('./layout.less');
var template = require('./layout.hbs');
var Marionette = require("marionette");
var LayoutButton = require('./button/Button');

class LayoutView extends Marionette.LayoutView {
    addButton(icon, action = null){
        "use strict";
        var button = new LayoutButton();
        button.setIcon(icon);
        this.$el.find('.layout-footer').append(button.el);
    }
}

LayoutView.prototype.className = "layout";
LayoutView.prototype.template = template;
LayoutView.prototype.regions = {
    body: ".layout-body",
    footer: ".layout-footer",
};

module.exports = LayoutView;

