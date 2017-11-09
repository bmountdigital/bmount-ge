    define(function(require) {
        return function() {
            return {
                props: null,
                drawn: false,
                canvas: null, //html canvas
                ctx: null,
                shapeCreator: null,
                lastEvents: {},
                life: 0,
                maxLife: 0,
                pos: [],
                playerObjects: [],
                soundManager: null,
                init: function(props, canvas) {
                    this.session = require('./../game/session');
                    this.shapeCreator = this.session.getShapeCreator();
                    this.props = props;
                    this.canvas = canvas;
                    this.life = props.life;
                    this.maxLife = props.life;
                    this.ctx = canvas.getContext("2d");
                },
                draw: function() {
                    if (this.needsRefresh()) {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        for (var i = 0; i < this.props.shapes.length; i++) {
                            var p = this.props.shapes[i];
                            this.session.getShapeCreator().draw(p, this.ctx);
                        }
                        this.drawn = true;
                    }
                    return this.canvas;
    
                },
                handlePressedKeys: function(pressedKeys, playerObjects) {
                    var canvasClass = this.session.getCanvas();
                    this._move(pressedKeys);
                    for (var keyCode in pressedKeys) {
                        if (pressedKeys[keyCode]) {
                            if (this.props.keyEvent[keyCode]) {
                                this._handleEvent(keyCode, canvasClass);
                            }
                        }
                    }
                    var newArr = [];
                    for (var i = 0; i < this.playerObjects.length; i++) {
                        var o = this.playerObjects[i];
                        if (o && o.isAlive()) {
                            newArr.push(o);
                        }
                    }
                    return newArr;
                },
                _move: function(pressedKeys) {
                    var movingX = pressedKeys[39] != pressedKeys[37];
                    var movingY = pressedKeys[38] != pressedKeys[40];
                    if (pressedKeys[39]) {
                        this.pos[0] += movingY ? 4 : 6;
                    }
                    if (pressedKeys[37]) {
                        this.pos[0] -= movingY ? 4 : 6;
                    }
                    if (pressedKeys[38]) {
                        this.pos[1] -= movingX ? 4 : 6;
                    }
                    if (pressedKeys[40]) {
                        this.pos[1] += movingX ? 4 : 6;
                    }
                },
                _handleEvent: function(keyCode, canvasClass) {
                    var eventProp = this.props.keyEvent[keyCode];
                    var soundKey = eventProp.sound;
                    if (soundKey) {
                        this.session.getSoundManager().play(soundKey);
                    }
                    var events = eventProp.objects;
                    if (events) {
                        for (var i = 0; i < events.length; i++) {
                            var event = events[i];
                            var playerObject = require('./playerObject')();
                            var timeStamp = playerObject.init(this.pos[0], this.pos[1], event, this.lastEvents[keyCode], canvasClass, i > 0);
                            if (i == events.length - 1) {
                                this.lastEvents[keyCode] = timeStamp;
                            }
                            if (!playerObject.isAlive()) {
                                playerObject = null;
                            }
                            else {
                                this.playerObjects.push(playerObject);
                            }
                        }
                    }
                },
                getPosition: function() {
                    return this.pos;
                },
                setPosition: function(pos) {
                    this.pos = pos;
                },
                addLife: function(amount) {
                    this.life += amount;
                    if (this.life > this.maxLife) {
                        this.life = this.maxLife;
                    }
                },
                hurt: function(amount) {
                    this.life -= amount;
                },
                getLife: function() {
                    return this.life;
                },
                getLifeStatus: function() {
                    if (this.life < 0) {
                        return 0;
                    }
                    else {
                        return Math.round((this.life / this.maxLife) * 100);
                    }
                },
                needsRefresh: function() {
                    return !this.drawn;
                },
                getBounds: function() {
                    var x1 = this.pos[0];
                    var y1 = this.pos[1];
                    var x2 = x1 + this.canvas.width;
                    var y2 = y1 + this.canvas.height;
                    return [x1, y1, x2, y2];
                }
            }
        }
    });
    