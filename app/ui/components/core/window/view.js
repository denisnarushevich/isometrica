define(function(require){
    var Marionette = require("marionette");
    var template = require("hbs!./templates/window");
    var buttonTemplate = require("hbs!./templates/button");

    var View = Marionette.LayoutView.extend();
    View.prototype.events = {
        "click .button" : function(e){
            var button = e.target;
            var key = $(button).attr("data-key");
            this.trigger("buttonClick", key);
        }
    };
    View.prototype.template = template;
    View.prototype.className = "ui-window";
    View.prototype.regions = {
        bodyRegion: ".body"
    };
    View.prototype.ui = {
        "buttons":".buttons"
    };
    View.prototype.buttonsCount = 0;
    View.prototype.setupButton = function(n, text, iconName, cb){
        this.buttonsCount = Math.max(n, this.buttonsCount);

        this.ui.buttons.removeClass("count-1 count-2 count-3 count-4 count-5");
        this.ui.buttons.addClass("count-"+this.buttonsCount);

        this.ui.buttons.append(buttonTemplate({
            icon: iconName,
            text: text,
            key: n
        }));

        this.on("buttonClick", function(key){
            var key = parseInt(key, 10);
           if(key === n)
            cb();
        });
    };

    return View;
});