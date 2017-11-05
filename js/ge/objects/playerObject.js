define(function(require) {
    return function() {
        return {
            objectPos: [0, 0],
            alive: true,
            prop: null,
            shapeCreator: null,
            canvas: null, //html canvas
            ctx: null,
            drawn: false,
            objectProp: null,
            mainCanvas: null,
            init: function(startX, startY, prop, lastHandled, mainCanvas) {
                this.mainCanvas = mainCanvas;
                var settings = require('./../util/settings');
                if (prop.relPos) {
                    startX += prop.relPos[0];
                    startY += prop.relPos[1];
                }
                this.objectProp = JSON.parse(JSON.stringify(settings.getProperty("game.object")))[prop.id];
                this.objectPos = [startX, startY];
                this.prop = prop;
                this.canvas = mainCanvas.createCanvas(this.objectProp.size[0], this.objectProp.size[1]);
                this.ctx = this.canvas.getContext("2d");
                this.shapeCreator = require("./../graphics/shapeCreator");
                var now = new Date().getTime();
                if (lastHandled && prop.minWait && now - lastHandled < prop.minWait) {
                    this.kill();
                }
                else {
                    lastHandled = now;
                }
                return lastHandled;
            },
            setPosition: function(pos) {
                this.objectPos = pos;
            },
            getPosition: function() {
                return this.objectPos;
            },
            getObject: function() {
                return this.obj;
            },
            kill: function() {
                this.alive = false;
            },
            isAlive: function() {
                return this.alive;
            },
            getImage: function() {
                return this.canvas;
            },
            draw: function() {
                if (this.isOutsideCanvas()) {
                    this.kill();
                }
                else {
                    if (!this.drawn) {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        for (var i = 0; i < this.objectProp.shapes.length; i++) {
                            var p = this.objectProp.shapes[i];
                            this.shapeCreator.draw(p, this.ctx);
                        }
                        this.drawn = true;
                    }
                    this.objectPos[0] = this.objectPos[0] + this.objectProp.xvel;
                    this.objectPos[1] = this.objectPos[1] + this.objectProp.yvel;
                }
            },
            isOutsideCanvas: function() {
                var x = this.objectPos[0];
                var y = this.objectPos[1];
                var mainSize = this.mainCanvas.getSize();
                if (x < -100 || y < -100) {
                    return true;
                }
                if (x > mainSize[0] + 100 || y > mainSize[1] + 100) {
                    return true;
                }
            },
            getBounds: function(){
                var x1 = this.objectPos[0];
                var y1 = this.objectPos[1];
                var x2 = x1 + this.canvas.width;
                var y2 = y1 + this.canvas.height;
                return [x1,y1,x2,y2];
            }
        }
    };
});
