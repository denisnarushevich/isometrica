define(function(require) {
    require("config");
    requirejs(["ui/js/ui"], function(ui){
        ui();
    });
});