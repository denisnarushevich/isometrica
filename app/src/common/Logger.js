class Logger {
    log(...args){
        console.log.apply(console, args);
    }
}

module.exports = Logger;