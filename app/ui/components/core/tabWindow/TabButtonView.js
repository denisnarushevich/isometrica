define(function(require){
   var Marionette = require("marionette");
    var template = require("hbs!./templates/tab");

    var View = Marionette.ItemView.extend();

    View.prototype.className = "tab";

    View.prototype.template = template;

    View.prototype.events = {
      "click" : function(){
          this.model.focus(true);
      }
    };

    View.prototype.modelEvents = {
        "change:active": function (model, active) {
            this.toggleActive(active);
        }
    };

    View.prototype.onBeforeRender = function () {
        this.toggleActive(this.model.get('active'));
    };

    View.prototype.toggleActive = function (val) {
        if (val) {
            this.$el.addClass("active");
        } else {
            this.$el.removeClass("active");
        }
    };

    return View;
});