define(function(require){
    var Marionette = require("marionette");
    var template = require("./splash.hbs");
    require('./splash.less');

    var View = Marionette.ItemView.extend();

    View.prototype.template = template;

    View.prototype.className = "is-splash";

    return View;
});
