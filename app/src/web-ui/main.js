'use strict';

var Scope = require('src/common/Scope');
var Application = require('./Application');
var Intro = require('./intro/IntroModule');
var Game = require('./game/gameModule');

var scope = Scope.spawn();

scope.app = Scope.inject(scope, Application);

Scope.inject(scope, Intro);
Scope.inject(scope, Game);

scope.app.start();