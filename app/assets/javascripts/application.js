// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var gridUnit = 25;

var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

gameElements = {
    gates: [],
    inputs: [],
    outputs: []
}

function preload() {
    game.load.image('logo', 'assets/openhpi.jpg');
    game.load.image('on', 'assets/on.png');
    game.load.image('off', 'assets/off.png');
    game.load.image('neutral', 'assets/neutral.png');
    game.load.image('and', 'assets/and.png');
    game.load.image('or', 'assets/or.png');
    game.load.image('not', 'assets/not.png');
    game.load.image('equals', 'assets/equals.png');
    //game.load.image('autoplay', 'assets/button_autoplay.png');
    //game.load.image('challenge', 'assets/button_challenge.png');
    game.load.image('play', 'assets/button_play.png');
    game.load.image('back', 'assets/button_back.png');
    game.load.image('retry', 'assets/button_retry.png');
    game.load.image('computer', 'assets/computer.png');
    game.load.image('pad', 'assets/pad.jpg');
    game.load.image('robot', 'assets/robot.png');
    game.load.image('pixel', 'assets/bubble.png');
    game.load.spritesheet('pigeon', 'assets/pigeon.png', 84, 84);
}

function create() {

    level1 = createLevel1();
    levelx = createLevelX();

    room1 = new Room('room1','room1.jpg');
    room1.addItem(new Item(500, 500, 'computer', 0, level1.show));
    room1.addItem(new Item(100, 500, 'pigeon', 30));

    room2 = new Room('room2','room2.jpg');
    robotPopUp = new PopUp(450, 290, 'pixel');
    room2.addItem(new Item(250, 300, 'pad', 0, levelx.show));
    room2.addItem(new Item(500, 350, 'robot', 0, robotPopUp.show));


    var speech = [
        {
            speaker: "A",
            text: "Hallo"
        },
        {
            speaker: "B",
            text: "Tschau"
        }
    ];
    dialogue = new Dialogue(speech);

    level1.room = room1;
    level1.winAction = room2.show;

    levelx.room = room2;
    levelx.winAction = function () {
        alert("Lernspiel abgeschlossen!");
    }

    room1.show();

}

function update() {
}