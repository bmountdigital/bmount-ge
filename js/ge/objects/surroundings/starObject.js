define(function(require) {
    return function() {
        var randomNo = Math.round(Math.random() * 20);
        if (randomNo > 5) {
            return null;
        }
        return {
            canvas: null,
            ctx: null,
            no: randomNo,
            maxSize: null,
            position: null,
            drawn: false,
            init: function() {
                var mainCanvas = require('./../../graphics/canvas');
                this.maxSize = mainCanvas.getSize();
                this.position = [Math.round(Math.random() * this.maxSize[0]), 0];
                
                this.canvas = mainCanvas.createCanvas(3, 3);
                this.ctx = this.canvas.getContext("2d");
            },
            getPosition() {
                return this.position;
            },
            draw: function(levelSpeed) {
                if (!this.drawn) {
                    var blueness = 255 - Math.round(Math.random() * 90);
                    
                    var color = "rgba(" + blueness + "," + blueness + ", 255, 0.5)";
                    this.ctx.clearRect(0, 0, 3, 3);
                    this.ctx.beginPath();
                    this.ctx.arc(1, 1, Math.random() > 0.5 ? 2 : 1, 0.00, 7.29, false);
                    this.ctx.fillStyle = color;
                    this.ctx.fill();
                    this.ctx.closePath();
                    this.drawn = true;
                }
                this.position[1] += levelSpeed;
                return this.canvas;
            },
            isOutside: function() {
                return this.position[1] > this.maxSize[1];
            }
        }

    }

});
