require('./layout.less');
var template = require('./layout.hbs');

var Marionette = require("marionette");

var LayoutView = Marionette.LayoutView.extend();

LayoutView.prototype.className = "game-view";
LayoutView.prototype.template = template;
LayoutView.prototype.regions = {
    headRegion: ".head-slot",
    bodyRegion: ".body-slot",
    overlayRegion: ".body-overlay-slot"
};

module.exports = LayoutView;

