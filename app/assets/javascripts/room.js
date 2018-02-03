var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.activeLevel = null;
	this.entrySpeech = null;
	this.endLevels = [];
	this.currentEndLevel = 0;
	this.nextRoom = null;

	this.state = {
		preload: () => {
			game.load.image(this.name, 'assets/' + this.background);
		},
		create: () => {
			this.render();
			if (this.name === "room1") {
				new Dialogue("r1.d1");
			}
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
	    var thisLevel = this.endLevels[this.currentEndLevel];
	    if(this.endLevels.length == this.currentEndLevel + 1) {
	        // This is the last endLevel in this room
            thisLevel.winAction = this.nextRoom.show;
        } else {
	        // There is another level to be done in this room
            thisLevel.winAction = this.endLevel;
            if(thisLevel.completed) {
                this.currentEndLevel++;
            }
        }

	    this.showLevel(this.endLevels[this.currentEndLevel]);
    }

    this.closeLevel = () => {
	    if(this.activeLevel) {
            this.activeLevel.destroy();
        }
	    this.activeLevel = null;
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