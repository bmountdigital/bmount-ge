define(function(require) {
    return function(eventData) {
        
        var creature = {
            time: eventData.startTime ? eventData.startTime : null,
            props: JSON.parse(JSON.stringify(require('./../../game/session').getSettings().getProperty("game.creature")[eventData.creature])),
            alive: false,
            killed: false,
            mainCanvas: null,
            drawn: false,
            pos: [0,0],
            canvas: null, //html canvas
            session: require('./../../game/session'),
            ctx: null,
            life: 0,
            isAlive: function(elapsed) {
                if (!this.alive && this.time && this.isWakeTime(elapsed)) {
                    this.wake();
                }
                return this.alive;
            },
            kill: function(killed){
                if (!this.killed && killed) {
                    this.session.getSoundManager().play("shot");
                    this.session.addPoints(this.props.point);
                }
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
            getForce: function() {
                return this.props.force;
            },
            init: function() {
                this.session = require('./../../game/session');
                this.life = this.props.life;
                this.mainCanvas = this.session.getCanvas();
                if (this.props.startPos) {
                    this.pos = this.props.startPos;
                    if (!this.pos[0]) {
                        this.pos[0] = Math.random() * (this.mainCanvas.getSize()[0] -100) + 1;
                    }
                } else {
                    this.pos = [300,-10];
                }
            },
            draw: function(ctx){
                if (!this.drawn) {
                    this.canvas = this.mainCanvas.createCanvas(this.props.size[0], this.props.size[1]);    
                    ctx = this.canvas.getContext("2d");
                    this.ctx = ctx;
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for (var i = 0; i < this.props.shapes.length; i++) {
                        var p = this.props.shapes[i];
                        this.session.getShapeCreator().draw(p, ctx);
                    }
                    this.drawn = true;
                }
                this.pos[0] = this.pos[0] + this.props.xvel;
                this.pos[1] = this.pos[1] + this.props.yvel;
                if (this.isOutsideCanvas()) {
                    this.kill();
                }
            },
            hurt: function(amount){
                this.life -= amount;
                if (this.life < 1) {
                    this.kill(true);
                }
            },
            getLife: function (amount) {
                this.life += amount;
            },
            isOutsideCanvas: function() {
                var x = this.pos[0];
                var y = this.pos[1];
                var mainSize = this.mainCanvas.getSize();
                if (x < -100 || y < -100) {
                    return true;
                }
                if (x > mainSize[0] + 100 || y > mainSize[1] + 100) {
                    return true;
                }
            },
            getImage: function(){
                return this.canvas;
            },
            getPosition: function(){
                return this.pos;
            },
            getBounds: function(){
                var x1 = this.pos[0];
                var y1 = this.pos[1];
                var x2 = x1 + this.canvas.width;
                var y2 = y1 + this.canvas.height;
                return [x1,y1,x2,y2];
            }
        }

        return creature;
    }
});
