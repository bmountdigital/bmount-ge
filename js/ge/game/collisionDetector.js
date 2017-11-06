define(function(require) {

    var resolution = 4;
    var soundManager = null;
    
    return function(player, playerObjects, events, sndManager) {
        soundManager = sndManager;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (isBoundaryColliding(player, event)) {
                playerCollision(player, event);
            }
            for (var j = 0; j < playerObjects.length; j++) {
                var po = playerObjects[j];
                if (isBoundaryColliding(po, event)) {
                    playerObjectCollission(po, event);
                }
            }
        }
    }

    function playerCollision(player, event) {
        player.hurt(event.getForce());
        soundManager.stop("crash");
        soundManager.play("crash");
        event.kill();
    }

    function playerObjectCollission(playerObject, event) {
        event.hurt(playerObject.getForce());
        playerObject.kill();
    }

    function isBoundaryColliding(b1e, b2e) {
        var b1 = b1e.getBounds();
        var b2 = b2e.getBounds();
        var collide = false;
        var xMatch = false;
        var yMatch = false;
        var b1xstart = b1[0];
        var b1xend = b1[2];
        var b1ystart = b1[1];
        var b1yend = b1[3];
        var b2xstart = b2[0];
        var b2xend = b2[2];
        var b2ystart = b2[1];
        var b2yend = b2[3];
        if ((b2xstart < b1xend && b2xstart > b1xstart) || (b1xstart < b2xend && b1xstart > b2xstart) || (b1xend < b2xend && b1xend > b2xstart) || (b2xend < b1xend && b2xend > b1xstart)) {
            xMatch = true
        }
        if ((b1ystart < b2yend && b1ystart > b2ystart) || (b1yend < b2yend && b1yend > b2ystart)) {
            yMatch = true
        }
        
        if (xMatch && yMatch) {
            return pixelHitTest(generateRenderMap(b1e), generateRenderMap(b2e));
        } 
        return false;
    }

    function generateRenderMap(canvas) {
        var image = canvas.canvas;
        var ctx = canvas.ctx;
        if (!ctx) {
            return null;
        }
        var pixelMap = [];
        var pos = canvas.getPosition();
        for (var y = 0; y < image.width; y = y + resolution) {
            for (var x = 0; x < image.height; x = x + resolution) {
                var pixel = ctx.getImageData(x, y, resolution, resolution);
                if (pixel.data[3] != 0) {
                    pixelMap.push({ x: x + pos[0], y: y+pos[1] });
                }
            }
        }
        return {
            data: pixelMap,
            resolution: resolution
        };
    }

    function pixelHitTest(source, target) {
        if (!source || !target) {
            return false;
        }
        for (var s = 0; s < source.data.length; s++) {
            var sourcePixel = source.data[s];
            var sourceArea = {
                x: sourcePixel.x,
                y: sourcePixel.y,
                width: target.resolution,
                height: target.resolution
            };
            for (var t = 0; t < target.data.length; t++) {
                var targetPixel = target.data[t];
                var targetArea = {
                    x: targetPixel.x,
                    y: targetPixel.y,
                    width: target.resolution,
                    height: target.resolution
                };
                if (hitBox(sourceArea, targetArea)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function hitBox( source, target ) {
	return !(
		( ( source.y + source.height ) < ( target.y ) ) ||
		( source.y > ( target.y + target.height ) ) ||
		( ( source.x + source.width ) < target.x ) ||
		( source.x > ( target.x + target.width ) )
	);
}

});
