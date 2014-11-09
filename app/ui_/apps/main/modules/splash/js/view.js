define(function(require){
    var Marionette = require("marionette");
    var template = require("hbs!../templates/splash");

    var View = Marionette.ItemView.extend();

    View.prototype.template = template;

    View.prototype.id = "splash";

    return View;
});
