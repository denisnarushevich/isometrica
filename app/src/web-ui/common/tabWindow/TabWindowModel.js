define(function(require){
    var Window = require("../window/Window");
    var Tabs = require("./TabButtonCollection");

    var Model = Window.Model.extend();

    Model.prototype.initialize = function(attrs, opts){
        Window.Model.prototype.initialize.call(this, attrs, opts);

        this.tabs = new Tabs();
    };

    Model.prototype.tabs = null;

    return Model;
});