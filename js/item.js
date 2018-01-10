var Item = function(x, y, name, animationFPS, callback) {
	this.x = x;
	this.y = y;
	this.callback = callback;
	this.name = name;
	this.fps = animationFPS;

	this.init = function() {
		this.sprite = game.add.sprite(this.x, this.y, this.name);
		this.sprite.inputEnabled = true;
		if(this.fps != 0) {
			//This sprite is animated
			this.sprite.animations.add(this.name);
			this.sprite.events.onInputDown.add(function () {
				this.sprite.animations.play(this.name, this.fps, false);
			}, this);
		} else {
			//This sprite isnt animated, so the callback will be executed
        	this.sprite.events.onInputDown.add(this.callback, this);
		}
	}
}