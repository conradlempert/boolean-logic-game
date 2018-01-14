var PopUp = function (x, y, name) {
	this.name = name;
	this.x = x;
	this.y = y;

	this.show = () => {
		this.sprite = game.add.sprite(x, y, this.name);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(this.close, this);
	}

	this.close = () => {
		this.sprite.destroy();
	}
}