define(function(require) {
    var level = null;
    var player = null;
    var pressedKeys = {};
    var session = null;
    var eventListeners = [];
    var instance = {
        level: null,
        init: function() {
            session = require('./session');
            session.init(this);
            this.loadLevel();
            this.start();
        },
        start: function() {
            var info = require('./../graphics/info');
            info.init();
            this.loop();
            eventListeners.push(document.addEventListener("keydown", this.keyDown, false));
            eventListeners.push(document.addEventListener("keyup", this.keyUp, false));
        },
        loadLevel: function() {
            var currentLevel = session.getCurrentLevel();
            level = require("./../objects/level")(currentLevel);
            level.init(currentLevel);
        },
        loop: function() {
            session.getCanvas().reset();
            if (level.isGameOver()) {
                session.getSoundManager().play("lost");
                var points = session.getPoints();
                setTimeout(function(){
                    session.getScreens().gameOver(session.getCanvas().getContext());
                    session.getCanvas().updateDisplay();    
                }, 700);
            }
            else {
                level.draw(pressedKeys);
                session.getCanvas().updateDisplay();
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
