define(function() {
    return {
        draw(p, ctx) {
                ctx.beginPath();
                if (p.type =="rect") {
                    ctx.rect(p.arguments[0], p.arguments[1], p.arguments[2], p.arguments[3]);
                }
                if (p.type == "arc") {
                    ctx.arc(p.arguments[0], p.arguments[1], p.arguments[2], p.arguments[3], p.arguments[4]);
                }
                if (p.fill) {
                    ctx.fillStyle = p.fillColor;
                    ctx.fill();
                }
                if (p.color) {
                    ctx.lineWidth = p.lineWidth;
                    ctx.strokeStyle = p.color;
                    ctx.stroke();
                }
                ctx.closePath();
                
            },
    }
});