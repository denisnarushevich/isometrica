define(function (require) {
    var Window = require("../window/Window");
    var View = require("./TabWindowView");
    var Model = require("./TabWindowModel");
    var TabContentView = require("./TabContentView");

    return {
        View: View,
        Model: Model,
        TabContentView: TabContentView,
        create: function () {
            return new View({
                model: new Model()
            });
        }
    }
});