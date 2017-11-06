define(function(require) {
    var currentLevel = 0;
    var canvas = null;
    var level = null;
    var player = null;
    var pressedKeys = {};
    var soundManager = null;
    var instance = {
        level: null,
        init: function() {
            var log = require('util/log')("game.js");
            log.log("Initialize game");
            canvas = require("./../graphics/canvas");
            canvas.init(this);
            var settings = require('./../util/settings');
            var soundProps = settings.getProperty("game.sound");
            soundManager = require('./../sound/soundManager');
            soundManager.init(soundProps);
            this.loadLevel();
            this.loop();
            document.addEventListener("keydown", this.keyDown, false);
            document.addEventListener("keyup", this.keyUp, false);
        },
        loadLevel: function() {
            level = require("./../objects/level")(currentLevel);
            level.init(currentLevel, canvas, soundManager);
        },
        loop: function() {
            canvas.reset();
            if (level.isGameOver()) {
                alert('You are dead');
            }
            else {
                level.draw(pressedKeys);
                canvas.updateDisplay();
                if (!level.isFinished()) {
                    requestAnimationFrame(instance.loop);
                }
            }
        },
        keyDown: function(e) {
            pressedKeys[e.keyCode] = true;
        },
        keyUp: function(e) {
            pressedKeys[e.keyCode] = false;
        },
    }
    return instance;
});
