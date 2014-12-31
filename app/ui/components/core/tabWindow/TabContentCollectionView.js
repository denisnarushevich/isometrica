define(function (require) {
    var Marionette = require("marionette");
    var TabContentView = require("./TabContentContainerView");

    //TODO: container is redundant. Use CollectionView.getChildView.
    var CollectionView = Marionette.CollectionView.extend();

    CollectionView.prototype.initialize = function(){
    };

    CollectionView.prototype.childView = TabContentView;

    CollectionView.prototype.className = "tabs-content";

    CollectionView.prototype.collectionEvents = {
        "focus" : function(model){
            this.collection.forEach(function(item){
                item.active(model === item);
            });
        }
    };

    return CollectionView;
});