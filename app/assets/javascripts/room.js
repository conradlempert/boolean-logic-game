var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.activeLevel = null;
	this.endLevels = [];
	this.currentEndLevel = 0;
	this.nextRoom = null;
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
	    this.activeLevel = level;
	    level.show(this);
    }

    this.endLevel = () => {
	    var nextLevel = this.endLevels[this.currentEndLevel];
	    if(this.endLevels.length == this.currentEndLevel + 1) {
	        //This is the last endLevel in this room

            nextLevel.winAction = this.nextRoom.show;
            console.log("name: " + nextLevel.name + ", winAction: " + nextLevel.winAction);
        } else {
	        //There is another level to be done in this room
            this.currentEndLevel++;
	        nextLevel.winAction = this.endLevel;
        }

	    this.showLevel(nextLevel);
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