
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;

gameElements = {
    gates: [],
    parents: [],
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
	input1 = new Input(2, 2, true);
	input2 = new Input(2, 8, true);
	gate1 = new Gate('or', 8, 4);

	gameElements.gates.push(gate1);
	gameElements.parents.push(input1);
	gameElements.parents.push(input2);

	input1.nextGates.push(gate1);
	input1.addChild(gate1);
	input2.addChild(gate1);
    gameElements.outputs.push(new Output(true, 'off', 24, 8));
	gate1.addChild(gameElements.outputs[0]);

	// Updating all gates/outputs
	for (var i = 0; i < gameElements.parents.length; i++) {
	   gameElements.parents[i].updated.dispatch();
    }
    for (i = 0; i < gameElements.outputs.length; i++) {
	    gameElements.outputs[i].updated.add(checkWin, this);
    }
}

function update() {
	for(var i = 0; i < gameElements.gates.length; i++) {
		gameElements.gates[i].drawConnections();
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

