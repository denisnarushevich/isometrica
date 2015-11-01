define(function (require) {
    var Marionette = require("marionette");
    var TabView = require("./TabButtonView");

    var CollectionView = Marionette.CollectionView.extend();

    CollectionView.prototype.childView = TabView;

    CollectionView.prototype.className = "tabs";

    return CollectionView;
});