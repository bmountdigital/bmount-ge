define(function(require) {
    return {
        "logger": {
            "level": "DEBUG"
        },
        "game": {
            "title": "BMount-spaceships",
            "levels": [{
                "name": "Level 1",
                "background": {
                    "type": "color",
                    "color": "#000000"
                },
                "startPosition": [350, 280],
            }],
            "physics": [],
            "player": {
                "size": [100, 100],
                "shapes": [{
                    "type": "rect",
                    "fill": true,
                    "fillColor": "#3399cc",
                    "color": "#44aadd",
                    "lineWidth": 5,
                    "arguments": [0, 0, 100, 100]
                }, {
                    "type": "arc",
                    "fill": true,
                    "fillColor": "#33cc99",
                    "color": "#44ddaa",
                    "arguments": [50, 50, 20, 0.00, 7.28, false]
                }],
                "keyEvent": {
                    "32": {
                        "event": "create",
                        "type": "object",
                        "id": "bullet1",
                        "minWait": 200,
                        "relPos": [45, 0]
                    }
                }
            },
            "creature": {

            },
            "object": {
                "bullet1": {
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#cc3399",
                        "color": "#cc99cc",
                        "lineWidth": 3,
                        "arguments": [0, 0, 10, 10]
                    }],
                    "xvel": 0,
                    "yvel": -8,
                    "test": "apa",
                    "size": [10, 10]
                }
            }

        }
    }
});
