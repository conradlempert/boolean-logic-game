var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('and', 'img/and.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
}

function create() {
	//game.add.sprite(100, 100, 'logo');
	gate1 = new Gate('and', 50, 50);
	input1 = new Input(50, 150, true);
	input1.show();
}

function update() {
}

function Gate(type, x, y) {
	this.type = type;
	this.sprite = game.add.sprite(x, y, type);
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

	this.on = defaultOn;
	this.sprite = game.add.sprite(x, y, 'on');
	this.show();


	
}