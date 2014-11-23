define(function (require) {
    var Marionette = require("marionette");
    var ButtonView = require("./ButtonView");

    var View = Marionette.CollectionView.extend();

    View.prototype.childView = ButtonView;

    View.prototype.className = "buttons";

    View.prototype.onShow = function(){
      this.$el.removeClass("count-1", "count-2", "count-3", "count-4", "count-5");
      this.$el.addClass("count-"+this.collection.length);
    };

    return View;
});