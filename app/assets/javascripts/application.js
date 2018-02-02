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
//= require i18n.js
//= require i18n/translations
//= require_tree .

if (window.location.pathname === '/') {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create});
    var gridUnit = 25;
    var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
}

function postScore(score) {
    window.location.href = '/quiz_finished?score=' + score
}

gameElements = {
    gates: [],
    inputs: [],
    outputs: []
}

function preload() {
    game.load.video('intro', 'assets/intro.mp4');
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
    game.load.image('defaultBg', 'assets/defaultBg.jpg')
    game.load.image('play', 'assets/button_play.png');
    game.load.image('back', 'assets/button_back.png');
    game.load.image('retry', 'assets/button_retry.png');
    game.load.image('computer', 'assets/computer.png');
    game.load.image('pad', 'assets/pad.jpg');
    game.load.image('robot', 'assets/robot.png');
    game.load.image('grid', 'assets/gitter.jpg');
    game.load.image('pixel', 'assets/bubble.png');
    game.load.image('toaster', 'assets/toaster.png');
    game.load.image('lock', 'assets/lock.png');
    game.load.spritesheet('pigeon', 'assets/pigeon.png', 84, 84);
    game.load.image('eric', 'assets/eric.png');
    game.load.image('mouse', 'assets/mouse.png');
}

function create() {

    room1 = new Room('room1','room1.jpg');
    room1.addItem(new Item(500, 500, 'computer', room1, { type: "endlevel" }));
    room1.addItem(new Item(100, 500, 'pigeon', room1,
        {
            type: "animation",
            fps: 30
        }
    ));
    room1.addItem(new Item(300, 500, 'toaster', room1,
        {
            type: "level",
            level: createDemo()
        }
    ));

    room2 = new Room('room2','room2.png');
    room2.addItem(new Item(530, 240, 'grid', room2, { type: "endlevel" }));

    room3 = new Room('room3','room3.jpg');
    robotPopUp = new PopUp(450, 290, 'pixel');
    room3.addItem(new Item(250, 300, 'pad', room3, { type: "endlevel" }));
    room3.addItem(new Item(500, 350, 'robot', room3,
        {
            type: "popup",
            popup: robotPopUp
        }
    ));

    room1.endLevels = [createLevel1()];
    room2.endLevels = [multipleChoice1(), multipleChoice2(), multipleChoice3()];
    room3.endLevels = [createLevelX()];

    room1.nextRoom = room2;
    room2.nextRoom = room3;
    room3.nextRoom = room1;

    room1.entrySpeech = [
        {
            image: "mouse",
            text: "Maus: Hi Eric! Lust auf einen kleinen Coup im Louvre?"
        },
        {
            image: "eric",
            text: "Eric: Ja. Lass uns gucken was wir da borgen können."
        }
    ];

    video = game.add.video('intro');
    video.onComplete.dispatch = function () {room1.show()};
    video.play(false)


    score = 0;

    video.addToWorld();

}

function raiseScore() {
    score++;
    console.log(score);
}
