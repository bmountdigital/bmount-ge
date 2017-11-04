define(function(require) {
    return function() {
        return {
            events: [],
            startTime: null,
            settings: null,
            init: function(events, settings, ctx){
                this.ctx = ctx;
                this.settings = settings;
                this.startTime = new Date().getTime();
                var creatureConstructor = require('./../objects/events/creatureEvent');
                for (var name in events) {
                    var eventData = events[name];
                    var event = null;
                    if (eventData.creature) {
                        event = creatureConstructor(eventData, settings);
                        event.init(ctx);
                    }
                    this.events.push(event);
                }
            },
            loop: function(ctx){
                var elapsed = new Date().getTime();
                var newEvents = [];
                for (var i = 0; i < this.events.length; i++) {
                    var event = this.events[i];
                    if (event.isAlive(elapsed)) {
                        event.draw();
                        var image = event.getImage();
                        var pos = event.getPosition();
                        ctx.drawImage(event.getImage(), pos[0], pos[1]);
                    } 
                    if (!event.isKilled()){
                        newEvents.push(event);
                    }
                }
                this.events = newEvents;
            },
            getLiveEvents: function(){
                var live = [];
                for (var i = 0; i < this.events.length; i++){
                    if (this.events[i].isAlive()){
                        live.push(this.events[i]);
                    }
                } 
                return live;
            }
        }
    }
});