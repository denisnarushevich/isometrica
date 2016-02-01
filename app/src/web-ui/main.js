var Application = require('./Application');
var Scope = require('src/common/Scope');
var Logger = require('src/common/Logger');

var scope = {};
Scope.register(scope, 'logger', new Logger());
var app = Scope.create(scope, Application);
app.start();