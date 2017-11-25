
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;

gameElements = {
    gates: [],
    inputs: [],
    outputs: []
}

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
}

function create() {
	createLevelX();


	// Updating all gates/outputs
	for (var i = 0; i < gameElements.inputs.length; i++) {
        gameElements.inputs[i].updated.dispatch();
    }
    // for (i = 0; i < gameElements.outputs.length; i++) {
    //     gameElements.outputs[i].updated.add(checkWin, this);
    // }
}

function update() {
	for(var i = 0; i < gameElements.gates.length; i++) {
		gameElements.gates[i].drawConnections();
	}
	for(var i = 0; i < gameElements.outputs.length; i++) {
        gameElements.outputs[i].drawConnections();
    }
}

function checkWin() {
    var gameWon = true;
    for (var i = 0; i < gameElements.outputs.length; i++) {
        gameWon = (gameElements.outputs[i].on === gameElements.outputs[i].expected) && gameWon;
    }
    if (gameWon) {
        window.alert("you won!");
    }
}

