var game = new Phaser.Game(800git, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
}

function create() {
	//game.add.sprite(100, 100, 'logo');
	gate1 = new Gate('and', 50, 50);
	gate2 = new Gate('or', 200, 200);
	gate3 = new Gate('not');
	input1 = new Input(500, 500, true);
	input1.show();

}

function update() {
}

function Gate(type, x, y) {
	this.type = type;
	this.sprite = game.add.sprite(x, y, type)
}

function Input(x, y, on) {

	this.show = function () {
		if(this.on) {
			this.sprite.loadTexture('on');
		} else {
			this.sprite.loadTexture('off');
		}
	};

	this.toggle = function () {
		this.on = !this.on;
		this.show();
	};

	this.on = on || true;
	this.sprite = game.add.sprite(x, y, 'on');
	this.show();
}