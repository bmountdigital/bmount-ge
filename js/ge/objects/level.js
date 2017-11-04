define(function(require) {
    return function(index) {
        return {
            index: index,
            background: null,
            backgroundImage: null,
            player: null,
            playerImage: null,
            playerPos: null,
            isDone: false,
            log: null,
            canvas: null,
            playerObjects: [],
            init: function(index, canvas) {
                this.canvas = canvas;
                this.log = require('util/log')("level.js");
                var settings = require('./../util/settings');
                var props = settings.getProperty("game.levels")[index];
                this.playerPos = props.startPosition;
                this.background = require('./background')();
                this.background.init(props.background, canvas.createCanvas());
                this.player = require('./player')();
                var playerProps = settings.getProperty("game.player")
                this.player.init(playerProps, canvas.createCanvas(playerProps.size[0], playerProps[1]));
            },
            draw: function(pressedKeys) {
                var movingX = pressedKeys[39] != pressedKeys[37];
                var movingY = pressedKeys[38] != pressedKeys[40];
                if (pressedKeys[39]) {
                    this.playerPos[0] += movingY ? 4 : 6;
                } 
                if (pressedKeys[37]) {
                    this.playerPos[0] -= movingY ? 4 : 6;
                }
                if (pressedKeys[38]) {
                    this.playerPos[1] -= movingX ? 4 : 6;
                }
                if (pressedKeys[40]) {
                    this.playerPos[1] += movingX ? 4 : 6;
                }
                this.playerObjects = this.player.handlePressedKeys(pressedKeys, this.playerPos, this.canvas, this.playerObjects);
                var poImages = [];
                for (var i = 0; i < this.playerObjects.length; i++) {
                    var o = this.playerObjects[i];
                    o.draw();
                }
                var ctx = this.canvas.getContext();
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                if (this.background.needsRefresh()) {
                    this.backgroundImage = this.background.draw();
                }
                if (this.player.needsRefresh()) {
                    this.playerImage = this.player.draw();
                }
                ctx.drawImage(this.backgroundImage, 0,0);
                ctx.drawImage(this.playerImage, this.playerPos[0], this.playerPos[1]);
                for (var i = 0; i < this.playerObjects.length; i++) {
                    var po = this.playerObjects[i];
                    var pos = po.getPosition();
                    ctx.drawImage(po.getImage(), pos[0], pos[1]);
                }
            },
            isFinished(){
                return false;
            }
        }
    }
});
