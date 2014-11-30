define(function (require) {
    var View = require("./promptWindow");

    return {
        View: View,
        create: function(msg, cb, val, ph){
            return new View({
                msg: msg,
                cb: cb,
                val: val,
                ph: ph
            });
        }
    };
});