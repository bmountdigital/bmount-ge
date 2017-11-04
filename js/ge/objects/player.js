define(function(require) {
    return function() {
        return {
            props: null,
            drawn: false,
            canvas: null, //html canvas
            ctx: null,
            shapeCreator: null,
            lastEvents: {},
            pos: [],
            playerObjects: [],
            init: function(props, canvas, playerPos) {
                this.props = props;
                this.canvas = canvas;
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
                //remove dead and null objects
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
            getPosition(){
              return this.pos;  
            },
            needsRefresh: function() {
                return !this.drawn;
            }
        }
    }
});
