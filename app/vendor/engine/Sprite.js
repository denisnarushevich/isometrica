class Sprite {
    setImage(image){
        this.sourceImage = image;
    }

    setSize(width, height){
        this.width = width;
        this.height = height;
    }
}

Sprite.prototype.width = 0;

Sprite.prototype.height = 0;

Sprite.prototype.offsetX = 0;

Sprite.prototype.offsetY = 0;

Sprite.prototype.sourceImage = null;

module.exports = Sprite;