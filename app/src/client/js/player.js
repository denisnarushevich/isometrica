define(function (require) {
    var reactiveProperty = require("reactive-property");

    function Player(root) {
        this.root = root;
    }

    Player.prototype.name = function(){
        return "unnamed";
    };

    Player.prototype.city = reactiveProperty(null);

    return Player;
});