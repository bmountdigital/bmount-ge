define(function(require) {
    return {
        sounds: {},
        loadSound: function(key, prop) {
            var snd = document.createElement('audio');
            snd.volume = prop.vol ? prop.vol : 0.8;
            snd.loop = prop.loop ? true : false;
            snd.src = prop.src;
            this.sounds[key] = snd;
        },
        init: function(props) {
            for (var name in props) {
                this.loadSound(name, props[name]);
            }
        },
        play: function(key) {
            var sound = this.sounds[key];
            if (sound) {
                sound.play();
            }
        },
        stop: function(key) {
            var sound = this.sounds[key];
            sound.pause();
            sound.currentTime = 0;
        }
    }
});
