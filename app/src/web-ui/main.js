require('./less/main.less');

var Intro = require('./intro/intro');
var Marionette = require("marionette");

var scope = Object.create(null);

var app = new Marionette.Application();

scope.app = app;

app.view = new Marionette.LayoutView({
    el: 'body'
});

app.view.addRegions({
    uiRegion: ".game-ui"
});

app.on('start', function () {
    new Intro(scope);
    Backbone.history.start();
});

app.start();

module.exports = app;