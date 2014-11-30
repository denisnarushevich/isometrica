define(function(require){
    var Marionette = require("marionette");
    var template = require("hbs!./templates/button");

    var View = Marionette.ItemView.extend();

    View.prototype.template = template;

    View.prototype.className = "button ui-button";

    View.prototype.tagName = "a";

    View.prototype.events = {
      "click" : function(){
          this.model.execute();
      }
    };

    return View;
});