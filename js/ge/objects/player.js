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
            init: function(props, canvas, playerPos) {
                this.props = props;
                this.canvas = canvas;
                this.life = props.life;
                this.maxLife = props.life;
                this.ctx = canvas.getContext("2d");
                this.shapeCreator = require("./../graphics/shapeCreator");
                this.pos = playerPos;
            },
            draw: function() {
                if (this.needsRefresh()) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for (var i = 0; i < this.props.shapes.length; i++) {
                        var p = this.props.shapes[i];
                        this.shapeCreator.draw(p, this.ctx);
                    }
                    this.drawn = true;
                }
                return this.canvas;
                
            },
            handlePressedKeys: function(pressedKeys, canvasClass, playerObjects){
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
            _move: function(pressedKeys){
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
            _handleEvent: function(keyCode, canvasClass){
                var playerObject = require('./playerObject')();
                this.lastEvents[keyCode] = playerObject.init(this.pos[0], this.pos[1], this.props.keyEvent[keyCode], this.lastEvents[keyCode], canvasClass);
                if (!playerObject.isAlive()) {
                    playerObject = null;
                } else {
                    this.playerObjects.push(playerObject);
                }
            },
            getPosition: function(){
              return this.pos;  
            },
            addLife: function(amount){
              this.life += amount;
              if (this.life > this.maxLife) {
                  this.life = this.maxLife;
              }
            },
            hurt:function(amount) {
                this.life -= amount;
            },
            getLife: function(){
              return this.life;  
            },
            needsRefresh: function() {
                return !this.drawn;
            },
            getBounds: function(){
                var x1 = this.pos[0];
                var y1 = this.pos[1];
                var x2 = x1 + this.canvas.width;
                var y2 = y1 + this.canvas.height;
                return [x1,y1,x2,y2];
            }
        }
    }
});
