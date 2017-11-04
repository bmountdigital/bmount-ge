define(function(require) {
    var currentLevel = 0;
    var canvas = null;
    var level = null;
    var player = null;
    var pressedKeys = {};
    var instance = {
        level: null,
        init: function() {
            var log = require('util/log')("game.js");
            log.log("Initialize game");
            canvas = require("./../graphics/canvas");
            canvas.init(this);
            this.loadLevel();
            this.loop();
            document.addEventListener("keydown", this.keyDown, false);
            document.addEventListener("keyup", this.keyUp, false);
        },
        loadLevel: function() {
            level = require("./../objects/level")(currentLevel);
            level.init(currentLevel, canvas);
        },
        loop: function() {
            canvas.reset();
            level.draw(pressedKeys);
            canvas.updateDisplay();
            if (!level.isFinished()) {
                requestAnimationFrame(instance.loop);
            }
        },
        keyDown: function(e){
            pressedKeys[e.keyCode] = true;
        },
        keyUp: function(e){
            pressedKeys[e.keyCode] = false;
        },
    }
    return instance;
});
