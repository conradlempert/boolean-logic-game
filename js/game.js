
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
	input1 = new Input(2, 2, true);
	input2 = new Input(2, 10, true);
	gate1 = new Gate('or', 8, 2);

	gameElements.gates.push(gate1);
	gameElements.inputs.push(input1);
	gameElements.inputs.push(input2);

	gate1.inputs.push(input1);
	gate1.inputs.push(input2);
    gameElements.outputs.push(new Output(true, 'off', 200, 25));
	gameElements.outputs.push(new Output(false, 'off', 200, 100));
}

function update() {
	// Drawing Connectios between
	for(var i = 0; i < gameElements.gates.length; i++) {
		gameElements.gates[i].drawConnections();
	}
}

