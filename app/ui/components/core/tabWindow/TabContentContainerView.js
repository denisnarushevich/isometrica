define(function(require){
   var Marionette = require("marionette");

    var View = Marionette.ItemView.extend();

    View.prototype.className = "tab-content";

    View.prototype.template = false;

    View.prototype.initialize = function(){
        this.region = new Marionette.Region({
            el: this.el
        })
    };

    View.prototype.modelEvents = {
        "change:active" : function(){
            var val = this.model.get("active");

            if(val){
                this.$el.addClass("active");
                this.model.view.onFocus();
            }else{
                this.$el.removeClass("active");
                this.model.view.onBlur();
            }

        }
    };

    View.prototype.onShow = function(){
        this.region.show(this.model.view);

        if(this.model.get("active")){
            this.$el.addClass("active");
        }
    };

    return View;
});