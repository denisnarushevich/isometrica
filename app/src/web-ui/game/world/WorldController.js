var TileSelector = require('client/tileselector');
var Scope = require('src/common/Scope');
var Events = require('vendor/events/events');
var Button = require('../layout/button/LayoutButtonModel');

class WorldController {
    constructor() {
        this.client = Scope.inject(this, 'client');
        this.core = Scope.inject(this, 'core');
        this.page = Scope.inject(this, 'page');
        this.app = Scope.inject(this, 'app');
    }

    start() {
        this.showEstablishButtons();
        this.onCityClick = this.client.cityman.click((sender, city)=>{
            this.page.gotoCity(city.id());
        });
    }

    showEstablishButtons(){
        this.page.buttons.reset([
            new Button({
                icon: 'map-marker'
            }, {
                action: ()=> {
                    this.establish();
                }
            })
        ]);
    }

    establish() {
        var selector = new TileSelector(this.client);
        var token = -1;
        var s = Events.on(selector, TileSelector.events.change, (a, b, c)=> {
            this.client.hiliteMan.disable(token);
            token = this.client.hiliteMan.hilite({
                tile: a.selectedTile(),
                borderColor: "rgba(255,255,255,1)",
                borderWidth: 2
            });
        });

        this.page.showConfirmationButtons().then(()=> {
            var tile = selector.selectedTile();

            //root.ui.showPrompt("Give city a name!", function (val) {
            //    var mayor = root.player;
            //    var city = root.core.cities.establishCity(tile, val, mayor);
            //    mayor.city(city);
            //    root.ui.show("viewport");
            //    root.ui.hideHint();
            //}, "My City");


            var city = this.core.cities.establishCity(tile, 'MyCity', this.client.player);
            this.client.player.city(city);
            this.page.gotoCity(city.id());
        },()=>{
            this.showEstablishButtons();
        }).then(()=>{
            this.client.hiliteMan.disable(token);
            Events.off(selector, TileSelector.events.change, s);
            selector.dispose();
        });
    }
    stop(){
        this.client.cityman.click(this.onCityClick);
    }
}

module.exports = WorldController;