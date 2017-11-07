define(function(require) {
    return function() {
        return {
            events: [],
            startTime: null,
            settings: null,
            soundManager: null,
            session: null,
            ctx: null,
            init: function(events){
                this.session = require("./session"); 
                this.ctx = this.session.getCanvas().getContext();
                this.settings = this.session.getSettings();
                this.startTime = new Date().getTime();
                var creatureConstructor = require('./../objects/events/creatureEvent');
                for (var name in events) {
                    var eventData = events[name];
                    var event = null;
                    if (eventData.creature) {
                        event = creatureConstructor(eventData);
                        event.init(this.ctx);
                    }
                    this.events.push(event);
                }
            },
            loop: function(ctx){
                var elapsed = new Date().getTime() - this.startTime;
                var newEvents = [];
                for (var i = 0; i < this.events.length; i++) {
                    var event = this.events[i];
                    if (event.isAlive(elapsed)) {
                        event.draw();
                        var image = event.getImage();
                        var pos = event.getPosition();
                        this.ctx.drawImage(event.getImage(), pos[0], pos[1]);
                    } 
                    if (!event.isKilled()){
                        newEvents.push(event);
                    } else {
                        event = null;
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