define(function(require) {
    return function() {
        return {
            props: null,
            drawn: false,
            canvas: null, //html canvas
            ctx: null,
            shapeCreator: null,
            lastEvents: {},
            playerObjects: [],
            init: function(props, canvas) {
                this.props = props;
                this.canvas = canvas;
                this.ctx = canvas.getContext("2d");
                this.shapeCreator = require("./../graphics/shapeCreator");
            },
            draw: function() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (var i = 0; i < this.props.shapes.length; i++) {
                    var p = this.props.shapes[i];
                    this.shapeCreator.draw(p, this.ctx);
                }
                this.drawn = true;
                return this.canvas;
            },
            handlePressedKeys: function(pressedKeys, playerPos, canvasClass, playerObjects){
                for (var keyCode in pressedKeys) {
                    if (pressedKeys[keyCode]) {
                        if (this.props.keyEvent[keyCode]) {
                           this._handleEvent(keyCode, playerPos, canvasClass); 
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
            _handleEvent: function(keyCode, playerPos, canvasClass){
                var playerObject = require('./playerObject')();
                this.lastEvents[keyCode] = playerObject.init(playerPos[0], playerPos[1], this.props.keyEvent[keyCode], this.lastEvents[keyCode], canvasClass);
                if (!playerObject.isAlive()) {
                    playerObject = null;
                } else {
                    this.playerObjects.push(playerObject);
                }
            },
            needsRefresh: function() {
                return !this.drawn;
            }
        }
    }
});
