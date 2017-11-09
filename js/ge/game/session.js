define(function(require){
    return {
        game: null,
        canvas: null,
        currentLevel: 0,
        screens: null,
        settings: null,
        soundManager: null,
        background: null,
        eventHandler: null,
        shapeCreator: null,
        points: 0,
        level: null,
        init: function(game){
            this.game = game;
            this.canvas = require("./../graphics/canvas");
            this.canvas.init(this);
            this.screens = require('./../graphics/screens');
            this.screens.loading(this.canvas.getContext());
            this.canvas.updateDisplay();
            this.settings = require('./../util/settings');
            var soundProps = this.settings.getProperty("game.sound");
            this.soundManager = require('./../sound/soundManager');
            this.soundManager.init(soundProps);
            this.background = require('./../objects/background')();
            this.eventHandler = require('./../game/eventHandler')();
            this.player = require('./../objects/player')();
            var props = this.settings.getProperty("game.levels")[this.currentLevel];
            this.playerPos = props.startPosition;
            var playerProps = this.settings.getProperty("game.player")
            this.player.init(playerProps, this.getCanvas().createCanvas(playerProps.size[0], playerProps[1]), this.playerPos);
            this.shapeCreator = require("./../graphics/shapeCreator");
        },
        addPoints: function(points){
          this.points += points;  
        },
        getPoints: function(){
          return this.points;  
        },
        getCurrentLevel: function(){
            return this.currentLevel;
        },
        getSoundManager: function(){
            return this.soundManager;
        },
        getSettings: function(){
            return this.settings;
        },
        getBackground: function(){
            return this.background;
        },
        getEventHandler: function(){
            return this.eventHandler;
        },
        getCanvas: function(){
            return this.canvas;
        },
        getPlayer: function(){
            return this.player;
        },
        getScreens: function(){
            return this.screens;
        },
        getShapeCreator: function(){
            return this.shapeCreator;
        },
        setLevel: function(level){
            this.level = level;
        },
        getLevel: function(){
            return this.level;
        }
        
        
        
    }
});