'use strict';

var scopeKey = '___scope___';

class Scope {
    static create(host, ctor, ...params){
        var instance = Object.create(ctor.prototype);
        instance[scopeKey] = Object.create(host[scopeKey] || null);
        ctor.apply(instance, params);
        return instance;
    }

    static register(host, key, value){
        if(host[scopeKey] === undefined){
            host[scopeKey] = Object.create(null);
        }
        host[scopeKey][key] = value;
    }

    static inject(host, key){
        var scope = host[scopeKey];
        return scope && scope[key];
    }
}

module.exports = Scope;