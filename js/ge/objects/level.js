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
            eventHandler: null,
            startTime: null,
            detectFn: null,
            gameOver: false,
            finished: false,
            init: function(index, canvas) {
                this.detectFn = require('./../game/collisionDetector');
                this.canvas = canvas;
                this.startTime = new Date().getTime();
                this.log = require('util/log')("level.js");
                var settings = require('./../util/settings');
                var props = settings.getProperty("game.levels")[index];
                this.playerPos = props.startPosition;
                this.background = require('./background')();
                this.background.init(props.background, canvas.createCanvas());
                this.eventHandler = require('./../game/eventHandler')();
                this.eventHandler.init(props.events, settings, canvas);
                this.player = require('./player')();
                var playerProps = settings.getProperty("game.player")
                this.player.init(playerProps, canvas.createCanvas(playerProps.size[0], playerProps[1]), this.playerPos);
            },
            draw: function(pressedKeys) {
                this._handlePlayerObjects(pressedKeys);
                var ctx = this.canvas.getContext();
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.backgroundImage = this.background.draw();
                this.playerImage = this.player.draw();
                ctx.drawImage(this.backgroundImage, 0, 0);
                var plPos = this.player.getPosition();
                ctx.drawImage(this.playerImage, plPos[0], plPos[1]);
                this._drawPlayerObjects(ctx);
                this.eventHandler.loop(ctx);
                this.detectFn(this.player, this.playerObjects, this.eventHandler.getLiveEvents());
            },
            _handlePlayerObjects: function(pressedKeys) {
                if (this.player.getLife() < 1) {
                    this.gameOver = true;
                }
                else {
                    this.playerObjects = this.player.handlePressedKeys(pressedKeys, this.canvas, this.playerObjects);
                    for (var i = 0; i < this.playerObjects.length; i++) {
                        var o = this.playerObjects[i];
                        o.draw();
                    }
                }
            },
            _drawPlayerObjects: function(ctx) {
                for (var i = 0; i < this.playerObjects.length; i++) {
                    var po = this.playerObjects[i];
                    var pos = po.getPosition();
                    ctx.drawImage(po.getImage(), pos[0], pos[1]);
                }
            },
            isFinished() {
                return false;
            },
            isGameOver() {
                return this.gameOver;
            }

        }
    }
});
