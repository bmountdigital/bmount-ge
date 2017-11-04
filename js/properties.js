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
                    "color": "rgba(0,0,0,0.5)"
                },
                "events": {
                    "enemy1": {
                        "creature": "enemy1",
                        "startTime": 2000
                    }    
                },
                "startPosition": [480, 500],
            }],
            "physics": [],
            "player": {
                "size": [40, 40],
                "shapes": [{
                    "type": "rect",
                    "fill": true,
                    "fillColor": "#556677",
                    "color": "#333333",
                    "lineWidth": 5,
                    "arguments": [0, 2, 40, 38]
                }, {
                    "type": "arc",
                    "fill": true,
                    "fillColor": "#776655",
                    "color": "#333333",
                    "lineWidth": 2,
                    "arguments": [20, 20, 10, 0.00, 7.28, false]
                }, {
                    "type": "rect",
                    "fill": true,
                    "fillColor": "#776655",
                    "color": "333333",
                    "lineWidth": 1,
                    "arguments": [17, 0, 6, 20]
                }],
                "keyEvent": {
                    "32": {
                        "event": "create",
                        "type": "object",
                        "id": "bullet1",
                        "minWait": 200,
                        "relPos": [18, 0]
                    }
                }
            },
            "creature": {
                "enemy1": {
                    "size": [40,40],
                    "life": 10,
                    "force": 5,
                    "shapes": [{
                        "type": "arc",
                        "fill": true,
                        "fillColor": "#ff3333",
                        "color": "#ff0000",
                        "lineWidth": 2,
                        "arguments": [20, 20, 20, 0.00, 7.29, false]
                    }],
                    "xvel": 0,
                    "yvel": 3
                }
            },
            "object": {
                "bullet1": {
                    "shapes": [{
                        "type": "rect",
                        "force": 5,
                        "fill": true,
                        "fillColor": "#cc3399",
                        "color": "#cc99cc",
                        "lineWidth": 3,
                        "arguments": [0, 0, 4, 4]
                    }],
                    "xvel": 0,
                    "yvel": -8,
                    "size": [4, 4]
                }
            }

        }
    }
});
