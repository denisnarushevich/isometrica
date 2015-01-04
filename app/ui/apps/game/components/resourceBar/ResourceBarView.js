define(function (require) {
    var Core = require("core/main");
    var Valbar = require("../valbar/js/IconBar");
    var Resources = Core.Resources;
    var ResourceCode = Resources.ResourceCode;
    var Numeral = require("numeral");

    var View = Valbar.extend();

    View.prototype.initialize = function (opts) {
        Valbar.prototype.initialize.apply(this, arguments);

        var res = this._res = opts.resources;

        this._icons = {};

        for (var key in ResourceCode) {
            this._icons[key] = this.addIcon(key, 0, 0);
        }

        var self = this;
        res.changed(function () {
            self.updateValues();
        });
        self.updateValues();
    };

    View.prototype.updateValues = function () {
        for (var key in ResourceCode) {
            var icon = this._icons[key];
            var val = this.options.resources.get(ResourceCode[key]) | 0;
            var fval = Numeral(val).format("0a");
            icon.set('value', fval);
            icon.set('title', key);
        }
    };

    return View;
});