define(function(require) {
    return function(index) {
        return {
            index: index,
            background: null,
            backgroundImage: null,
            player: null,
            playerImage: null,
            isDone: false,
            playerObjects: [],
            eventHandler: null,
            startTime: null,
            detectFn: null,
            gameOver: false,
            finished: false,
            session: null,
            speed: null,
            init: function(index) {
                this.session = require('./../game/session');
                this.detectFn = require('./../game/collisionDetector');
                this.session.getSoundManager().play("bg");
                this.startTime = new Date().getTime();
                var props = this.session.getSettings().getProperty("game.levels")[index];
                this.speed = props.speed;
                this.session.getPlayer().setPosition(props.startPosition);
                this.session.getBackground().init(props.background, this.speed);
                this.session.getEventHandler().init(props.events);
            },
            draw: function(pressedKeys) {
                this._handlePlayerObjects(pressedKeys);
                var canvas = this.session.getCanvas();
                var ctx = canvas.getContext();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.backgroundImage = this.session.getBackground().draw();
                ctx.drawImage(this.backgroundImage, 0, 0);
                this.session.getBackground().handleSurroundings();
                var player = this.session.getPlayer();
                this.playerImage = player.draw();
                
                var info = require('./../graphics/info');
                var infoImage = info.draw();
                ctx.drawImage(infoImage, 800, 0);
                var plPos = player.getPosition();
                ctx.drawImage(this.playerImage, plPos[0], plPos[1]);
                this._drawPlayerObjects(ctx);
                this.session.getEventHandler().loop(ctx);
                
                this.detectFn(this.playerObjects, this.session.getEventHandler().getLiveEvents());
            },
            _handlePlayerObjects: function(pressedKeys) {
                if (this.session.getPlayer().getLife() < 1) {
                    this.gameOver = true;
                }
                else {
                    this.playerObjects = this.session.getPlayer().handlePressedKeys(pressedKeys, this.playerObjects);
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
            isGameOver: function() {
                if (this.gameOver) {
                    this.session.getSoundManager().stop("bg");
                }
                return this.gameOver;
            },
            getSpeed: function(){
                return this.speed;
            }

        }
    }
});
