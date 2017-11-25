var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('and', 'img/and.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
    game.load.image('gates', 'img/gates.png');
}

function create() {
	//game.add.sprite(100, 100, 'logo');
	gate1 = new Gate('and', 50, 50);
	input1 = new Input(50, 150, true);
	input1.show();

}

function update() {
}

function getGateSprite(type) {
	switch (type) {
		case "and":
            return game.add.tileSprite(0, 0, 330, 170, 'gates');
		case "or":
			return game.add.tileSprite(0, 0, 330, 170, 'gates');


	}
}

function Gate(type, x, y) {
	this.type = type;
	this.sprite = game.add.sprite(x, y, type);
}

function Input(x, y, on) {

	this.show = function () {
		if(this.on) {
			this.sprite.loadTexture('on');
		} else {
			this.sprite.loadTexture('off');
		}
	}

	this.toggle = function () {
		this.on = !this.on;
		this.show();
	}

	this.on = on || true;
	this.sprite = game.add.sprite(x, y, 'on');
	this.show();
}