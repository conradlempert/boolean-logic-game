var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.state = {
		preload: () => {
			game.load.image(this.name, 'assets/' + this.background);
		},
		create: () => {
			game.add.sprite(0, 0, this.name);
			for(var i = 0; i < this.items.length; i++) {
				this.items[i].init();
			}
		}
	}
	game.state.add(this.name, this.state);

	this.show = () => {
		game.state.start(this.name);
	}
	this.addItem = function(item) {
		this.items.push(item);
	} 
}