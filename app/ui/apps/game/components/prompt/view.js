define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!./templates/prompt");

    return Marionette.ItemView.extend({
        className: "prompt-view",
        template: template,
        value: function(){
            return $("input", this.$el).val();
        }
    });
});