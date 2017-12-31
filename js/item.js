var Item = function(x, y, name, callback) {
	this.x = x;
	this.y = y;
	this.callback = callback;
	this.name = name;

	this.init = function() {
		this.sprite = game.add.sprite(this.x, this.y, this.name);
		this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.callback, this);
	}
}