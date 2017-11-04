define(function(require) {
    return function(eventData, settings) {
        var creature = {
            time: eventData.startTime ? eventData.startTime : null,
            props: settings.getProperty("game.creature")[eventData.creature],
            alive: false,
            killed: false,
            mainCanvas: null,
            drawn: false,
            pos: [0,0],
            canvas: null, //html canvas
            ctx: null,
            isAlive: function(elapsed) {
                if (!this.alive && this.time && this.isWakeTime(elapsed)) {
                    this.wake();
                }
                return this.alive;
            },
            kill: function(){
                this.killed = true;
            },
            isKilled: function(){
                return this.killed;  
            },
            wake: function() {
                this.alive = true;
            },
            isWakeTime: function(elapsed) {
                return this.time && this.time < elapsed;
            },
            init: function(mainCanvas) {
                this.shapeCreator = require("./../../graphics/shapeCreator");
                this.mainCanvas = mainCanvas;
                if (this.props.startPos) {
                    this.pos = this.props.startPos;
                } else {
                    this.pos = [300,-10];
                }
            },
            draw: function(ctx){
                if (!this.drawn) {
                    this.canvas = this.mainCanvas.createCanvas(this.props.size[0], this.props.size[1]);    
                    ctx = this.canvas.getContext("2d");
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for (var i = 0; i < this.props.shapes.length; i++) {
                        var p = this.props.shapes[i];
                        this.shapeCreator.draw(p, ctx);
                    }
                    this.drawn = true;
                }
                this.pos[0] = this.pos[0] + this.props.xvel;
                this.pos[1] = this.pos[1] + this.props.yvel;
            },
            getImage: function(){
                return this.canvas;
            },
            getPosition: function(){
                return this.pos;
            }
        }

        return creature;
    }
});
