define(function(require){
   return {
     session: null,  
     localCanvas: null,
     localCtx: null,
     init: function(){
         this.session = require('./../game/session');
         this.localCanvas = this.session.getCanvas().createCanvas(200, 100);
         this.localCtx = this.localCanvas.getContext('2d');
     },
     draw: function(){
         this.localCtx.clearRect(0,0,200,100);
         this.localCtx.beginPath();
         this.localCtx.font = "12px Arial";
         this.localCtx.fillStyle = "#ffffff";
         this.localCtx.fillText("Life: " + this.session.getPlayer().getLife(),100,30);
         this.localCtx.closePath();
         this.localCtx.beginPath();
         this.localCtx.font = "12px Arial";
         this.localCtx.fillStyle = "#ffffff";
         this.localCtx.fillText("Points: " + this.session.getPoints(),100,50);
         this.localCtx.closePath();
         return this.localCanvas;
     }
       
       
   } 
});