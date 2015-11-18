'use strict';

class Scope {
    static inject(scope, ctor, ...params){
        var F = function(){};
        F.prototype = ctor.prototype;
        var f = new F();
        f.scope = Scope.spawn(scope);
        f.constructor = ctor;
        ctor.apply(f, params);

        return f;
    }

    static spawn(parentScope = null){
        return Object.create(parentScope);
    }

    static register(scope, key, value){
        scope[key] = value;
    }
}

module.exports = Scope;