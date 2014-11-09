define(function (require) {
    var WorldAction = require("./worldaction");

    function API(app, fallback) {
        this.app = app;
        this.fallback = fallback || false;
    }

    API.prototype.show = function(id){
      if(this.fallback){
          switch(id){
              case "viewport":
                  this.app.gameScreen().showWorld();
          }
          return;
      }
        this.openWindow();
        console.log("UI:API:show", id);
    };

    API.prototype.openWindow = function(){
        if(!this.fallback)
            this.app.windows.display.apply(this.app.windows, arguments);
    };

    API.prototype.showHint = function(text){
        if(this.fallback)
            return this.app.gameScreen().worldScreen().showHint(text);

      console.log("UI:API:showHint",text);
    };

    API.prototype.hideHint = function(){
      if(this.fallback)
          this.app.gameScreen().worldScreen().hideHint();

        console.log("UI:API:hideHint");
    };

    API.prototype.showButtons = function(groupName){
        if(this.fallback)
            return this.app.gameScreen().showActionControls();

        var proxy = new WorldAction();

        this.app.viewport.controller.showButtons(proxy);

        console.log("UI:API:showButtons", groupName);

        return proxy;
    };

    API.prototype.navigate = function(path){
        if(this.fallback)
            return this.app.navigate(path);

        console.log("UI:API:navigate", path);
    };

    API.prototype.showPrompt = function(message, callback, value, placeholder){
        if(this.fallback)
            return this.app.gameScreen().showPrompt(message, callback, value, placeholder);

        this.app.windows.display("prompt", message, callback, value, placeholder);
    };

    return API;
});