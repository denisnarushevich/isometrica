var Sprite = require('vendor/engine/Sprite.js');

class Resources {}

Resources.getSprite = function(url){
    var sprite = new Sprite();
    var cache = Resources._cache[url];
    var img;

    if(cache === undefined){
        img = new Image();

        Resources._cache[url] = cache = {
            loaded: new Promise(function(resolve){
                img.addEventListener('load', function(){
                    resolve();
                });
            }),
            image: img
        };

        img.src = url;
    }else{
        img = cache.image;
    }

    sprite.setImage(cache.image);
    cache.loaded.then(function(){
        sprite.setSize(img.width, img.height);
    });

    return sprite;
};

Resources._cache = {};

module.exports = Resources;

