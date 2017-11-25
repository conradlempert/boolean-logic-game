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
	var outputs = [Output(true, 'off', 200, 25), Output(false, 'off', 200, 100)];
	output = new Output(outputs);
	input1.show();
}

function update() {
}

var Gate = function (type, x, y) {
	this.type = type;
	this.sprite = game.add.sprite(x, y, type);
};

var Input = function (x, y, defaultOn) {

    this.sprite = game.add.sprite(x, y, 'on');
    this.on = defaultOn;
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

    console.log(this.switch);
	this.show();

    game.input.onDown.add(this.toggle, this);
};

var Output = function (expected, type, x, y) {
    this.on = false;
    this.type = type;
    this.expected = expected;
    this.sprite = game.add.sprite(x, y, type);

    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.switch = function () {
        this.on = !this.on;
        this.show();
    };
};
