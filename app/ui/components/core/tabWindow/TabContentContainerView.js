define(function(require){
   var Marionette = require("marionette");

    var View = Marionette.LayoutView.extend();

    View.prototype.className = "tab-content";

    View.prototype.template = false;

    View.prototype.initialize = function(){
        this.addRegion("content", {
            el: this.el
        });
    };

    View.prototype.modelEvents = {
        "change:active": function (model, active) {
            this.toggleActive(active);
        }
    };

    View.prototype.onBeforeRender = function () {
        this.toggleActive(this.model.get('active'));
    };

    View.prototype.onShow = function () {
        this.getRegion("content").show(this.model.view());
    };

    View.prototype.onFocus = function () {
        var view = this.getRegion("content").currentView;
        view && view.onFocus();
    };

    View.prototype.onBlur = function () {
        var view = this.getRegion("content").currentView;
        view && view.onBlur();
    };

    View.prototype.toggleActive = function (val) {
        if (val) {
            this.$el.addClass("active");
            this.onFocus();
        } else {
            this.$el.removeClass("active");
            this.onBlur();
        }
    };

    return View;
});