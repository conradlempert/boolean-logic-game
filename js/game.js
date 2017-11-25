
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;

var GameElements = function () {
    this.gates = [];
    this.inputs = [];
    this.outputs = [];
};

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
}

function create() {
	ourGame = new GameElements();
	input1 = new Input(2, 2, true);
	input2 = new Input(3, 3, true);
	gate1 = new Gate('or', 8, 2);

	ourGame.gates.push(gate1);
	ourGame.inputs.push(input1);
	ourGame.inputs.push(input2);


	input1.nextGates.push(gate1);
	input1.addChild(gate1);
	input2.addChild(gate1);
    ourGame.outputs.push(new Output(true, 'off', 200, 25));
	ourGame.outputs.push(new Output(false, 'off', 200, 100));
	gate1.addChild(ourGame.outputs[0]);
	for (var i = 0; i < ourGame.inputs.length; i++) {
	    ourGame.inputs[i].updated.dispatch();
    }
}

function update() {
	// Drawing Connectios between
	for(var i = 0; i < ourGame.inputs.length; i++) {
		ourGame.inputs[i].drawConnections();
	}
}

