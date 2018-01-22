var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.activeLevel = null;
	this.state = {
		preload: () => {
			game.load.image(this.name, 'assets/' + this.background);
		},
		create: () => {
			this.render();
		},
		update: () => {
		    if(this.activeLevel != null) {
                this.activeLevel.update();
            }
        }
	}
	game.state.add(this.name, this.state);

	this.showLevel = (level) => {
	    if(this.activeLevel == null) {
            this.activeLevel = level;
            level.show(this);
        }
    }

    this.closeLevel = () => {
	    this.activeLevel = null;
	    this.render();
    }

    this.render = () => {
        game.add.sprite(0, 0, this.name);
        for(var i = 0; i < this.items.length; i++) {
            this.items[i].init();
        }
    }

	this.show = () => {
		game.state.start(this.name);
	}
	this.addItem = function(item) {
		this.items.push(item);
	} 
}