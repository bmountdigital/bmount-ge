define(function(require) {
    return function() {
        return {
            props: null,
            drawn: false,
            canvas: null, //html canvas
            ctx: null,
            session: null,
            init: function(props) {
                this.props = props;
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
            }
        }
    }
});
