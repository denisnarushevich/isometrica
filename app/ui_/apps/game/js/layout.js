define(function(require){
    var Marionette = require("marionette");
    var template = require("hbs!../templates/layout");

    var LayoutView = Marionette.LayoutView.extend();

    LayoutView.prototype.className = "game-view";
    LayoutView.prototype.template = template;
    LayoutView.prototype.regions = {
        headRegion: ".head-slot",
        bodyRegion: ".body-slot"
    };

    return LayoutView;
});