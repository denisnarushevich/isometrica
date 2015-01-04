define(function (require) {

    var ResourceCode = require("core/resourcecode");
    var Events = require("events");
    var namespace = require("namespace");

    var Core = namespace("Isometrica.Core");
    Core.Resources = Resources;

    function Resources(values) {
        this._res = Object.create(null);
        var code;
        for (var name in ResourceCode) {
            code = ResourceCode[name];
            this._res[code] = 0;
        }

        if (values !== undefined) {
            for (var key in values) {
                this.set(key, values[key], true);
            }
        }

        this._dirty = false;
    }

    Resources.prototype.get = function (code) {
        return this._res[code];
    };

    Resources.prototype.set = function (code, value, silent) {
        this._res[code] = value;

        this._dirty = true;

        if (!silent)
            this.changed(this, this);
    };

    Resources.prototype.announce = function () {
        if (this._dirty)
            this.changed(this, this);

        this._dirty = false;
    };

    Resources.prototype.changed = Events.event();

    /**
     * @export Resources
     * @type {{}}
     */
    Resources.zero = null;

    Resources.ResourceCode = ResourceCode;

    /**
     *
     * @param values
     * @returns {*}
     */
    Resources.create = function (values) {
        return new Resources(values);
    };

    Resources.add = function (out, a, b) {
        if (!(a instanceof Resources) || !(b instanceof Resources))
            throw "error";

        var va, vb, key;
        for (var name in ResourceCode) {
            key = ResourceCode[name];
            va = a.get(key);//a[key] || 0;
            vb = b.get(key);//b[key] || 0;
            va = va + vb;
            if (va !== 0 || out[key] !== undefined)
                out.set(key, va);//out[key] = va;
        }
        out.announce();

        return out;
    };

    Resources.sub = function (out, a, b) {
        if (!(a instanceof Resources) || !(b instanceof Resources))
            throw "error";

        var va, vb, key;
        for (var name in ResourceCode) {
            key = ResourceCode[name];
            va = a.get(key);//a[key] || 0;
            vb = b.get(key);//b[key] || 0;
            va = va + vb;
            if (va !== 0 || out[key] !== undefined)
                out.set(key, va);//out[key] = va;
        }
        out.announce();

        return out;
    };

    Resources.addOne = function (out, res, resCode, amount) {
        var a = res.get(resCode);//res[resCode] || 0;
        out.set(resCode, a + amount);//out[resCode] = a + amount;
        return out;
    };

    Resources.subOne = function (out, res, resCode, amount) {
        var a = res.get(resCode);//res[resCode] || 0;
        out.set(resCode, a - amount);//out[resCode] = a - amount;
        return out;
    };

    Resources.mul = function (out, a, number) {
        for (var key in a) {
            out.set(key, a.get(key) * number, true);
        }
        out.announce();

        return out;
    };

    Resources.clone = function (a) {
        var out = {};
        Resources.copy(out, a);
        return out;
    };

    Resources.copy = function (to, from) {
        for (var key in from) {
            to.set(key, from.get(key), true);//to[key] = from[key];
        }
        to.announce();

        return to;
    };

    Resources.every = function (r, callback, args) {
        for (var key in ResourceCode) {
            var code = ResourceCode[key];

            if (!callback(code, r.get(code), args))
                return false;
        }

        return true;
    };

    Resources.clear = function (input) {
        var key;
        for (var name in ResourceCode) {
            key = ResourceCode[name];
            input.set(key, 0);
        }
    };

    return Resources;
});