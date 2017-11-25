var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('and', 'img/and.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
}

function create() {
	//game.add.sprite(100, 100, 'logo');
	ourGame = new GameElements();
	input1 = new Input(2, 6, true);
	gate1 = new Gate('and', 8, 2);
	
	ourGame.gates.push(gate1);
	ourGame.inputs.push(input1);

	input1.nextGates.push(gate1);
}

function update() {

	for(var i = 0; i < ourGame.inputs.length; i++) {
		ourGame.inputs[i].drawConnections();
	}
}


function Gate(type, x, y) {
	this.type = type;
	this.sprite = game.add.sprite(x * 25, y * 25, type);
	this.nextGates = [];
}

function Input(x, y, defaultOn) {

	this.show = function () {
		if(this.on) {
			this.sprite.loadTexture('on');
		} else {
			this.sprite.loadTexture('off');
		}
	}

	this.switch = function () {
		this.on = !this.on;
		this.show();
	}

	this.drawConnections = function () {
		for(var i = 0; i < this.nextGates.length; i++) {
			var graphics = game.add.graphics(100, 100);
			graphics.lineStyle(10, 0xffd900, 1);
			graphics.moveTo(50,50);
    		graphics.lineTo(250, 50);
    		graphics.lineTo(100, 100);
    		graphics.lineTo(250, 220);
    		graphics.lineTo(50, 220);
    		graphics.lineTo(50, 50);
    		window.graphics = graphics;
		}
	}

	this.on = defaultOn;
	this.nextGates = [];
	this.sprite = game.add.sprite(x * 25, y * 25, 'on');
	this.show();
	
}

function GameElements() {
	this.gates = [];
	this.inputs = [];
	this.outputs = [];
}