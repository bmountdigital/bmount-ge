define(function(require) {
    return function() {
        return {
            props: null,
            drawn: false,
            canvas: null, //html canvas
            ctx: null,
            session: null,
            speed: 0,
            startTime: 0,
            surroundings: [],
            surroundingsFn: null,
            init: function(props, speed) {
                this.startTime = new Date().getTime();
                this.props = props;
                if (props.speed) {
                    this.speed = speed;
                }
                var srProp = props.objects;
                if (srProp) {
                    if (srProp == "star") {
                        this.surroundingsFn = require('./surroundings/starObject');
                    }
                }
                this.session = require('./../game/session');
                this.canvas = this.session.getCanvas().createCanvas();
                this.ctx = this.canvas.getContext("2d");
            },
            draw: function() {
                if (this.needsRefresh()) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    if (this.props.type == "color") {
                        this.ctx.beginPath();
                        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.fillStyle = this.props.color;
                        this.ctx.fill();
                        this.ctx.closePath();
                        this.drawn = true;
                    }
                }
                return this.canvas;
            },
            needsRefresh: function() {
                return !this.drawn;
            },
            handleSurroundings: function() {
                var mainCtx = this.session.getCanvas().getContext();
                if (this.surroundingsFn) {
                    var result = [];
                    for (var i = 0; i < this.surroundings.length; i++) {
                        var surrounding = this.surroundings[i];
                        if (surrounding.isOutside()) {
                            surrounding = null;
                        }
                        else {
                            var img = surrounding.draw(this.session.getLevel().getSpeed());
                            var pos = surrounding.getPosition();
                            mainCtx.drawImage(img, pos[0], pos[1]);
                            result.push(surrounding);
                        }
                    }
                    var sur = this.surroundingsFn();
                    if (sur) {
                        sur.init();
                        result.push(sur);
                    }
                    this.surroundings = result;
                }
                
            }
        }
    }
});
