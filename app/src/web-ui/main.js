require('./less/main.less');
var main = require("./main/js/main");
var Marionette = require("marionette");

var app = new Marionette.Application();

//app.router = new Marionette.AppRouter({
//    controller: {}
//});

app.view = new Marionette.LayoutView({
    el: 'body'
});

app.view.addRegions({
    uiRegion: ".game-ui"
});

main.main(app);

app.on('start', function () {
    Backbone.history.start();
});

app.start();

module.exports = app;