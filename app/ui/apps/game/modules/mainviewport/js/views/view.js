define(function (require) {
    var Marionette = require("marionette");
    var template = require("hbs!../../templates/worldscreen");

    var $ = require("jquery");

    function setBtn(self, index, icon, f) {
        var state = self._state;
        var btn = state[index] || (state[index] = {});
        btn.icon = icon;
        btn.action = f;
    }

    function unsetBtn(self, index) {
        delete self._state[index];
    }

    function unsetBtns(self) {
        unsetBtn(self, 0);
        unsetBtn(self, 1);
        unsetBtn(self, 2);
        unsetBtn(self, 3);
        unsetBtn(self, 4);
    }

    function renderBtns(self) {
        var $btns = $(".btn", self.$el);

        //reset
        $btns.removeClass().addClass("btn").off("click");

        var state = self._state;
        for (var key in state) {
            var btn = state[key];
            if (btn !== undefined) {
                var $btn = $btns.eq(parseInt(key, 10));
                $btn.addClass(btn.icon);
                $btn.on("click", btn.action);
            }
        }
    }

    var View = Marionette.ItemView.extend();

    View.prototype.className = "world-view ui-window";
    View.prototype.template = template;

    View.prototype.initialize = function(options){
        this._state = {};
        this._controller = options.controller;
    };

    View.prototype.getCanvas = function () {
        return this.$(".mainViewport").get(0);
    };

    View.prototype.showMainButtons = function () {
        var view = this;
        unsetBtns(this);
        setBtn(this, 0, "back-icon", function () {
            view._controller.app.api.back();
        });
        setBtn(this, 1, "hammer-icon", function () {
            view._controller.app.api.navigate("world/build");
        });

        renderBtns(this);
    };

    View.prototype.showBuildButtons = function () {
        var view = this;
        unsetBtns(this);
        setBtn(this, 0, "back-icon", function () {
            view._controller.app.api.back();
        });
        setBtn(this, 1, "house-icon", function () {
            view._controller.app.api.navigate("catalogue");
        });
        setBtn(this, 2, "road-icon", function () {
            view._controller.app.api.navigate("build/" + BuildingCode.road);
        });
        setBtn(this, 3, "bulldozer-icon", function () {
            view._controller.app.api.navigate("destroy");
        });

        renderBtns(this);
    };

    View.prototype.showActionButtons = function (controls) {
        unsetBtns(this);

        setBtn(this, 3, "tick-icon", function () {
            controls.submit();
        });
        setBtn(this, 4, "cross-icon", function () {
            controls.discard();
        });

        renderBtns(this);
    };


    View.prototype.hint = function (text) {
        $(".hint", this.$el).text(text);
    };

    return View;
});
