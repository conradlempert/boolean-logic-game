var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('gates', 'img/gates.png');
}

function create() {
	//game.add.sprite(0, 1, 'gates');
	game.add.tileSprite(0, 0, 330, 170, 'gates')
}

function update() {
}