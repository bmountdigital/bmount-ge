define(function(require) {
    return function(caller) {
        return {
            caller: caller,
            settings: null,
            levelInt: null,
            _prepare: function() {
                if (this.settings == null) {
                    this.settings = require('./settings');
                }
            },
            _getLevel: function() {
                this._prepare();
                var level = this.settings.getProperty("logger.level");
                return this._levelToInt(level);
            },
            _levelToInt: function(level) {
                var int = -1;
                if (level) {
                    var level = level.toLowerCase();
                    switch (level) {
                        case "trace":
                            int = 5;
                            break;
                        case "debug":
                            int = 10;
                            break;
                        case "info":
                            int = 15;
                            break;
                        case "warn":
                            int = 20;
                            break;
                        case "error":
                            int = 25;
                            break;
                    }
                }
                if (int < 0) {
                    if (level) {
                        console.error("Failed to find log level:", level);
                    }
                    else {
                        console.error("Missing log level property");
                    }
                }
                return int;
            },
            log: function(message, data) {
                var level = this._getLevel();
                if (level <= 15) {
                    console.log(this.caller+": ", message, data);
                }
            }
        }
    }

});
