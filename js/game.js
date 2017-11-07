var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
}

function create() {
	game.add.sprite(100, 100, 'logo');
}

function update() {
}