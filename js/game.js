
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;

var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

gameElements = {
    gates: [],
    inputs: [],
    outputs: []
}

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
	game.load.image('neutral', 'img/neutral.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
    game.load.image('autoplay', 'img/button_autoplay.png');
    game.load.image('challenge', 'img/button_challenge.png');
    game.load.image('play', 'img/button_play.png');
    game.load.image('retry', 'img/button_retry.png');
    game.load.image('computer', 'img/computer.png');
    game.load.image('pad', 'img/pad.jpg');
    game.load.spritesheet('pigeon', 'img/pigeon.png', 84, 84);
}

function create() {

    level1 = createLevel1();
    levelx = createLevelX();

    room1 = new Room('room1','room1.jpg');
    room1.addItem(new Item(500, 500, 'computer', 0, level1.show));
    room1.addItem(new Item(100, 500, 'pigeon', 30));

    room2 = new Room('room2','room2.jpg');
    room2.addItem(new Item(250, 300, 'pad', 0, levelx.show));

    level1.winAction = room2.show;
    levelx.winAction = function () {
        alert("Lernspiel abgeschlossen!");
    }

    room1.show();
    
}

function update() {
	
}