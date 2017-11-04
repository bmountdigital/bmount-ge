define(function() {
    var canvas = null;
    var cache = null;
    var ctx = null;
    var cacheContext = null;
    return {
        game: null,
        init: function() {
            canvas = document.getElementById("bmountcanvas");
            ctx = canvas.getContext("2d");
            cache = document.createElement('canvas');
            cache.width = canvas.width;
            cache.height = canvas.height;
            cacheContext = cache.getContext("2d");
        },
        createCanvas: function(x, y) {
            var tmp = document.createElement('canvas');
            tmp.width = x ? x : canvas.width;
            tmp.height = y ? y : canvas.height;
            return tmp;
        },
        getContext: function() {
            if (ctx == null) {
                this.init();
            }
            return cacheContext;
        },
        reset: function() {
            cacheContext.clearRect(0, 0, canvas.width, canvas.height);
        },
        getSize: function() {
            return [canvas.width, canvas.height];
        },
        updateDisplay() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(cache, 0, 0);
        }

    }
});
