define(function(require){
    var rootApp = require("./app");

    return function(){
        rootApp.start();
    }
});