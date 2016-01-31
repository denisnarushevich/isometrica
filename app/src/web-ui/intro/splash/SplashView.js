'use strict';

var Marionette = require("marionette");
var template = require("./splash.hbs");
require('./splash.less');

class SplashView extends Marionette.ItemView {
    conctructor() {}
}

SplashView.prototype.template = template;
SplashView.prototype.className = 'splash-root';

module.exports = SplashView;