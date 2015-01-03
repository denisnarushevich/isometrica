define(function (require) {
    var Marionette = require('marionette');

    var View = Marionette.ItemView.extend();

    View.prototype.tagName = "canvas";

    View.prototype.template = false;

    View.prototype.initialize = function (opts) {
        this._client = opts.client;
        this._camera = opts.camera;

        this._viewport = this._client.game.graphics.createViewport(this.el);
        this._viewport.setCamera(this._camera);
    };

    View.prototype.onShow = function () {
        this._viewport.updateSize();
    };

    View.prototype.onDestroy = function () {
        this._client.game.graphics.destroyViewport(this._viewport);
        this._viewport = null;
    };

    View.prototype.enabled = function (value) {
        this._viewport.active(value);
    };

    return View;
});