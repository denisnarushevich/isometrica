'use strict';

var Marionette = require('marionette');
var LayoutView = require('./layout');

var Vkaria = require('client/main');

class Game {
    constructor() {
        new Marionette.AppRouter({
            routes: {
                'game': ()=> {
                    this.scope.app.render(new LayoutView())
                }
            }
        })
    }
}

module.exports = Game;