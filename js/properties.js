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
                        "creature": "enemy4",
                        "startTime": 3000 + Math.random() * 7000
                    },
                    "enemy2": {
                        "creature": "enemy3",
                        "startTime": 3000 + Math.random() * 7000
                    },
                    "enemy3": {
                        "creature": "enemy2",
                        "startTime": Math.random() * 11000
                    },
                    "enemy4": {
                        "creature": "enemy1",
                        "startTime": Math.random() * 11000
                    },
                    "enemy5": {
                        "creature": "enemy2",
                        "startTime": 4000 + Math.random() * 7000
                    },
                    "enemy6": {
                        "creature": "enemy4",
                        "startTime": 2000 + Math.random() * 9000
                    },
                    "enemy7": {
                        "creature": "enemy1",
                        "startTime": Math.random() * 13000
                    },
                    "enemy8": {
                        "creature": "enemy1",
                        "startTime": 2000 + Math.random() * 8000
                    },
                    "enemy9": {
                        "creature": "enemy3",
                        "startTime": Math.random() * 11000
                    },
                    "enemy10": {
                        "creature": "enemy3",
                        "startTime": 2000 + Math.random() * 4000
                    },
                    "enemy11": {
                        "creature": "enemy4",
                        "startTime": Math.random() * 9000
                    },
                    "enemy12": {
                        "creature": "enemy2",
                        "startTime": Math.random() * 13000
                    },
                    "enemy13": {
                        "creature": "enemy3",
                        "startTime": Math.random() * 9000
                    },
                    "enemy14": {
                        "creature": "enemy1",
                        "startTime": Math.random() * 13000
                    }
                },
                "startPosition": [480, 500],
            }],
            "physics": [],
            "player": {
                "size": [40, 40],
                "life": 12,
                "shapes": [{
                    "type": "rect",
                    "fill": true,
                    "fillColor": "#555555",
                    "color": "#555555",
                    "lineWidth": 1,
                    "arguments": [0, 26, 40, 3]
                }, {
                    "type": "cust",
                    "fill": true,
                    "fillColor": "#888888",
                    "color": "#888888",
                    "lineWidth": 0,
                    "arguments": [
                        [20, 10],
                        [40, 22],
                        [40, 26],
                        [20, 28],
                        [0, 26],
                        [0, 22],
                        [20, 10]
                    ]
                }, {
                    "type": "cust",
                    "fill": true,
                    "fillColor": "#aaaaaa",
                    "color": "#aaaaaa",
                    "lineWidth": 0,
                    "arguments": [
                        [15, 7],
                        [20, 0],
                        [25, 7],
                        [27, 35],
                        [13, 35],
                        [15, 6]
                    ]
                }, {
                    "type": "rect",
                    "fill": true,
                    "fillColor": "#888888",
                    "color": "#888888",
                    "lineWidth": 1,
                    "arguments": [17, 35, 6, 5]
                }, {
                    "type": "cust",
                    "fill": true,
                    "fillColor": "#333333",
                    "color": "#333333",
                    "lineWidth": 0,
                    "arguments": [
                        [20, 12],
                        [23, 14],
                        [23, 25],
                        [20, 27],
                        [17, 25],
                        [17, 14],
                        [20, 12]
                    ]
                }],
                "keyEvent": {
                    "32": {
                        "objects": [{
                            "event": "create",
                            "type": "object",
                            "id": "bullet1",
                            "minWait": 200,
                            "relPos": [8, 20]
                        }, {
                            "event": "create",
                            "type": "object",
                            "id": "bullet1",
                            "minWait": 200,
                            "relPos": [28, 20]
                        }]

                    }
                }
            },
            "creature": {
                "enemy1": {
                    "size": [40, 40],
                    "life": 10,
                    "force": 5,
                    "startPos": [null, -100],
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [5, 0, 5, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [17, 0, 6, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [30, 0, 5, 10]
                    }, {
                        "type": "cust",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#009900",
                        "lineWidth": 2,
                        "arguments": [
                            [0, 10],
                            [20, 40],
                            [40, 10],
                            [0, 10]
                        ]
                    }],
                    "xvel": 0,
                    "yvel": 3
                },
                "enemy2": {
                    "size": [30, 30],
                    "life": 10,
                    "force": 5,
                    "startPos": [null, -100],
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#444444",
                        "color": "#444444",
                        "lineWidth": 1,
                        "arguments": [2, 10, 3, 20]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#444444",
                        "color": "#444444",
                        "lineWidth": 1,
                        "arguments": [25, 10, 3, 20]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#444444",
                        "color": "#444444",
                        "lineWidth": 1,
                        "arguments": [12, 0, 6, 30]
                    }, {
                        "type": "arc",
                        "fill": true,
                        "fillColor": "#444444",
                        "color": "#444444",
                        "lineWidth": 2,
                        "arguments": [15, 15, 10, 0.00, 7.29, false]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#3399cc",
                        "color": "#3399cc",
                        "lineWidth": 1,
                        "arguments": [0, 13, 30, 6]
                    }],
                    "xvel": 0,
                    "yvel": 3
                },
                "enemy3": {
                    "size": [40, 40],
                    "life": 10,
                    "force": 5,
                    "startPos": [null, -100],
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [5, 0, 5, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [17, 0, 6, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [30, 0, 5, 10]
                    }, {
                        "type": "cust",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#009900",
                        "lineWidth": 2,
                        "arguments": [
                            [0, 10],
                            [20, 40],
                            [40, 10],
                            [0, 10]
                        ]
                    }],
                    "xvel": 1,
                    "yvel": 4
                },
                "enemy4": {
                    "size": [40, 40],
                    "life": 10,
                    "force": 5,
                    "startPos": [null, -100],
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [5, 0, 5, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [17, 0, 6, 10]
                    }, {
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#115511",
                        "lineWidth": 1,
                        "arguments": [30, 0, 5, 10]
                    }, {
                        "type": "cust",
                        "fill": true,
                        "fillColor": "#115511",
                        "color": "#009900",
                        "lineWidth": 2,
                        "arguments": [
                            [0, 10],
                            [20, 40],
                            [40, 10],
                            [0, 10]
                        ]
                    }],
                    "xvel": -1,
                    "yvel": 4
                }

            },
            "object": {
                "bullet1": {
                    "shapes": [{
                        "type": "rect",
                        "fill": true,
                        "fillColor": "#ff9999",
                        "color": "#ff0000",
                        "lineWidth": 1,
                        "arguments": [0, 0, 4, 4]
                    }],
                    "force": 6,
                    "xvel": 0,
                    "yvel": -8,
                    "size": [4, 4]
                }
            },
            "sound": {
                "boom": {
                    vol: 1,
                    src: "sound/boom.mp3"
                },
                "bg": {
                    vol:0.1,
                    src: "sound/bg.mp3",
                    loop: true
                },
                "shot": {
                    vol: 0.5,
                    src: "sound/shot.mp3"
                }, 
                "lost": {
                    vol: 0.3,
                    src: "sound/lost.mp3"
                },
                "crash": {
                    vol: 0.5,
                    src: "sound/crash.mp3"
                }
            }

        }
    }
});
