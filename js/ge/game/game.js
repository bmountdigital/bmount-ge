define(function(require) {
    var currentLevel = 0;
    var canvas = null;
    var level = null;
    var player = null;
    var pressedKeys = {};
    var soundManager = null;
    var eventListeners = [];
    var screens = null;
    var instance = {
        level: null,
        init: function() {
            var log = require('util/log')("game.js");
            log.log("Initialize game");
            canvas = require("./../graphics/canvas");
            canvas.init(this);
            screens = require('./../graphics/screens');
            screens.loading(canvas.getContext());
            canvas.updateDisplay();
            var settings = require('./../util/settings');
            var soundProps = settings.getProperty("game.sound");
            soundManager = require('./../sound/soundManager');
            soundManager.init(soundProps);
            this.loadLevel();
            var t = this;
            t.start();
        },
        sleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        start: function() {
            this.loop();
            eventListeners.push(document.addEventListener("keydown", this.keyDown, false));
            eventListeners.push(document.addEventListener("keyup", this.keyUp, false));
        },
        loadLevel: function() {
            level = require("./../objects/level")(currentLevel);
            level.init(currentLevel, canvas, soundManager);
        },
        loop: function() {
            canvas.reset();
            if (level.isGameOver()) {
                soundManager.play("lost");
                setTimeout(function(){
                    screens.gameOver(canvas.getContext());
                    canvas.updateDisplay();    
                }, 700);
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
