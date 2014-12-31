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

    return View;
});