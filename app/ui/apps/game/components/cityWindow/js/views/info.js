define(function (require) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var template = require("hbs!../../templates/info");
    //var ResourceBarView = require("ui/modules/valbar/js/views/view");
    var TabWindow = require("ui/components/core/tabWindow/TabWindow");

    var View = TabWindow.TabContentView.extend({
        className: "info-tab-content",
        template: template,
        modelEvents: {
            "change": "render"
        }
    });

    View.prototype.initialize = function (opts) {
        TabWindow.TabContentView.prototype.initialize.apply(this, arguments);

        //vp cam
        //var client = opts.cityView.game.client;
        //var cam = client.cameraman.createCamera();
        //var cityId = this.model.city.id();
        //var go = client.cityman.getCityGameObject(cityId);
        //var pos = go.transform.getPosition();
        //cam.transform.setPosition(pos[0], pos[1], pos[2]);
        //var viewport = client.game.graphics.createViewport();
        //viewport.setCamera(cam);
        //$(".bird-eye-container", this.$el).append(viewport.canvas);
        //viewport.setSize(400, 400);
    };

    View.prototype.onFocus = function () {
    };

    View.prototype.onBlur = function () {
    };

    return View;
});