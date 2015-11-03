'use strict';

var Marionette = require('marionette');
var LayoutView = require('./layout');

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