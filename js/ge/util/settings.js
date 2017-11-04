define(function (require) {
    var properties = null;
    return {
        getProperties: function(){
            if (properties == null) {
                properties = require('/js/properties.js');
            }
            return properties;
        },
        getProperty: function(prop, defaultValue) {
            var value = defaultValue;
            var props = prop.split(".");
            var current = this.getProperties();
            for (var i = 0; i < props.length; i++) {
                var p = props[i];
                if (current[p]) {
                    current = current[p];
                    if (i == props.length -1) {
                        value = current;
                    }
                }
            }
            return value;
        }
        
    }
});