var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.state = {
		preload: () => {
			game.load.image(this.name, 'img/' + this.background);
		},
		create: () => {
			game.add.sprite(0, 0, this.name);
			for(var i = 0; i < this.items.length; i++) {
				this.items[i].init();
			}
		}
	}
	game.state.add(this.name, this.state);

	this.show = function () {
		game.state.start(this.name);
	}
	this.addItem = function(x, y, name, callback) {
		var item = new Item(x, y, name, callback);
		this.items.push(item);
		return item;
	} 
}