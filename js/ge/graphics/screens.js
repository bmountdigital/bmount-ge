define(function() {
    return {
        loading: function(ctx){
            ctx.beginPath();
            ctx.font = "64px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("Loading...",300,170);
            ctx.closePath();
        },
        gameOver: function(ctx){
            
            ctx.beginPath();
            ctx.font = "64px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("Oops, you're dead!",250,270);
            ctx.closePath();
        }     
    }
});