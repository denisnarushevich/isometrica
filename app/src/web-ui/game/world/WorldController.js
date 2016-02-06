var TileSelector = require('client/tileselector');
var Scope = require('src/common/Scope');
var Events = require('vendor/events/events');
var ButtonModel = require('../../common/buttons/button/ButtonModel');
var PromptDialogView = require('../../common/prompt/PromptDialogView');

class WorldController {
    constructor() {
        this.client = Scope.inject(this, 'client');
        this.core = Scope.inject(this, 'core');
        this.page = Scope.inject(this, 'page');
        this.app = Scope.inject(this, 'app');
        this.modals = Scope.inject(this, 'modals');

        this.modal = this.modals.get();

        this.onCityClick = (sender, city)=> {
            this.page.gotoCity(city.id());
        };
    }

    start() {
        this.showEstablishButtons();
        this.client.cityman.click.on(this.onCityClick);
    }

    showEstablishButtons() {
        this.page.buttons.reset([
            new ButtonModel({
                icon: 'map-marker',
                type: 'primary',
                text: 'Establish city'
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
            return new Promise((resolve, reject)=>{
                this.modal.show(new PromptDialogView({
                    title: 'Enter city name',
                    label: 'City name',
                    ok: resolve,
                    cancel: reject,
                    validator: (value)=>{
                        console.log(value);
                        return value.length > 0;
                    }
                }));
            });
        }).then((name)=> {
            var tile = selector.selectedTile();
            var city = this.core.cities.establishCity(tile, name, this.client.player);
            this.client.player.city(city);
            this.page.gotoCity(city.id());
        }, ()=> {
            this.showEstablishButtons();
        }).then(()=> {
            this.modal.close();
            this.client.hiliteMan.disable(token);
            Events.off(selector, TileSelector.events.change, s);
            selector.dispose();
        });
    }

    stop() {
        this.client.cityman.click.off(this.onCityClick);
    }
}

module.exports = WorldController;