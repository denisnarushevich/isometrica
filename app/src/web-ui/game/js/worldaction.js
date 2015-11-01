define(function(require){
   var ReactiveProperty = require("reactive-property");

    function WorldAction(){

    }

    WorldAction.prototype.rotation = ReactiveProperty(false);
    WorldAction.prototype.canRotate = ReactiveProperty(true);
    WorldAction.prototype.canSubmit = ReactiveProperty(true);
    WorldAction.prototype.canDiscard = ReactiveProperty(true);
    
    WorldAction.prototype.onSubmit = function(){};
    WorldAction.prototype.onDiscard = function(){};
    WorldAction.prototype.onRotate = function(){};

    WorldAction.prototype.submit = function(){
        this.onSubmit();
    };

    WorldAction.prototype.discard = function(){
        this.onDiscard();
    };

    WorldAction.prototype.rotate = function(){
        this.onRotate();
    };

    return WorldAction;
});