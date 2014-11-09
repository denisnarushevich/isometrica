define(function(require){
    var UIMgr = require("./main");
    return function(){
        var ui = new UIMgr();
        ui.init();
    }
});
