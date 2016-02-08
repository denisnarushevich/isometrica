const TileMessageType = require('./TileMessageType');

class Tile {
    message(messageType, text){
        console.log(this, messageType, text);
    }
}

module.exports = Tile;