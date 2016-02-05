var Scope = require('./Scope');

class BaseObject {
    dispose(){

    }
}

BaseObject.prototype[Scope.propertyName] = null;

module.exports = BaseObject;