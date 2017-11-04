define(function (require) {
    var log = require('util/log')("main.js");
    log.log("Starting up...");
    
    var game = require('./game/game');
    game.init();
});