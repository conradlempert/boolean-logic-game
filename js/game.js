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
	gate1 = new Gate('and', 8, 10);
	
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
	this.x = x * gridUnit;
	this.y = y * gridUnit;
	this.type = type;
	this.sprite = game.add.sprite(this.x, this.y, type);
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
			var startX = this.x + 25;
			var startY = this.y + 12;
			var goalX = this.nextGates[i].x;
			var goalY = this.nextGates[i].y + 25;
			var midX = (startX + goalX) / 2;
			var graphics = game.add.graphics(0, 0);
			graphics.lineStyle(3, 0xffd900, 1);
			graphics.moveTo(startX, startY);
			graphics.lineTo(midX, startY);
			graphics.lineTo(midX, goalY);
			graphics.lineTo(goalX, goalY);
    		
    		window.graphics = graphics;
		}
	}

	this.x = x * gridUnit;
	this.y = y * gridUnit;
	this.on = defaultOn;
	this.nextGates = [];
	this.sprite = game.add.sprite(this.x, this.y, 'on');
	this.show();
	
}

function GameElements() {
	this.gates = [];
	this.inputs = [];
	this.outputs = [];
}