define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!./templates/prompt");

    return Marionette.ItemView.extend({
        className: "prompt-view",
        template: template,
        events: {
            "click .button.submit": "submit",
            "click .button.discard": "discard"
        },
        value: function(){
            var v = $("input", this.$el).val();
            return v;
        },
        submit: function(){
            this.options.callback(this.value());
        },
        discard: function(){

        }
    });
});