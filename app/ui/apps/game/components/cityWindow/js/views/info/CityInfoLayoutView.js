define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var template = require("hbs!../../../templates/infoLayout");
    //var ResourceBarView = require("ui/modules/valbar/js/views/view");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");
    var ViewportView = require("ui/apps/game/components/viewport/ViewportView");
    var CityInfoView = require("./CityInfoView");

    var View = TabWindow.TabContentView.extend({
        className: "info-tab-content",
        template: template,

        regions: {
            "info": ".info-container",
            "viewport": ".bird-eye-container"
        }
    });

    View.prototype.initialize = function (opts) {
        TabWindow.TabContentView.prototype.initialize.apply(this, arguments);

        this._window = opts.window;
    };

    View.prototype.onShow = function () {
        var infoRegion = this.getRegion("info");
        var viewportRegion = this.getRegion("viewport");

        infoRegion.show(new CityInfoView({
            model: this.options.cityModel
        }));

        var client = this._window.windows().app.client;
        var cam = client.cameraman.createCamera();
        var go = client.cityman.getCityGameObject(this.options.cityModel.get('id'));
        var pos = go.transform.getPosition();
        cam.transform.setPosition(pos[0], pos[1], pos[2]);

        viewportRegion.show(new ViewportView({
            camera: cam,
            client: client
        }));
    };

    View.prototype.onFocus = function () {
        this.getRegion("viewport").currentView.enabled(true);
    };

    View.prototype.onBlur = function () {
        this.getRegion("viewport").currentView.enabled(false);
    };

    return View;
});