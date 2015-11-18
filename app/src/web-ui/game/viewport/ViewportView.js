require('./ViewportView.less');
var Marionette = require('marionette');

class ViewportView extends Marionette.ItemView {
    constructor(opts){
        super(opts);

        this._camera = opts.camera || null;
        this._viewport = this.scope.client.game.graphics.createViewport(this.el);
        this._viewport.setCamera(this._camera);
    }
}

ViewportView.prototype.tagName = "canvas";

ViewportView.prototype.className = 'game-viewport-canvas';

ViewportView.prototype.template = false;

ViewportView.prototype.onShow = function () {
    this._viewport.updateSize();
};

ViewportView.prototype.onDestroy = function () {
    this.scope.client.game.graphics.destroyViewport(this._viewport);
    this._viewport = null;
};

ViewportView.prototype.enabled = function (value) {
    this._viewport.active(value);
};

module.exports = ViewportView;