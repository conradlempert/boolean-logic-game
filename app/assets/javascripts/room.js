var Room = function (name, background, nr, hasItemLock = false) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.nr = nr;
	this.activeLevel = null;
	this.inDialogue = null;
	this.outDialogue = null;
	this.endLevels = [];
	this.currentEndLevel = 0;
	this.nextRoom = null;
	this.hasItemLock = hasItemLock;

	this.state = {
		preload: () => {
			game.load.image(this.name, 'assets/' + this.background);
		},
		create: () => {
		    this.closeLevel();
		    this.currentEndLevel = 0;
		    for(var i = 0; i < this.endLevels.length; i++) {
		        this.endLevels[i].completed = false;
            }
			this.render();

		    if(this.inDialogue != null) {
		        new Dialogue(this.inDialogue);
            }

      		if(this.nr > progress) {
         		progress = this.nr;
      		}
      		showStatusBar();
		},
		update: () => {
		    if(this.activeLevel != null) {
                this.activeLevel.update();
            }
        }
	}
	game.state.add(this.name, this.state);

	this.showLevel = (level) => {
		console.log("Room.showLevel");
	    this.activeLevel = level;
	    level.show(this);
    }

    this.endLevel = () => {
	    var thisLevel = this.endLevels[this.currentEndLevel];

	    if(thisLevel.completed) {
			this.closeLevel();
            this.currentEndLevel++;
            if(this.endLevels.length == this.currentEndLevel) {
                if(this.outDialogue != null) {
                    new Dialogue(this.outDialogue, this.nextRoom.show);
                } else {
                    this.nextRoom.show();
                }
            } else {
                thisLevel = this.endLevels[this.currentEndLevel];
                this.showLevel(thisLevel);
            }
        } else {
	        this.showLevel(thisLevel);
        }

        thisLevel.winAction = this.endLevel;
    }

    this.closeLevel = () => {
	    if(this.activeLevel) {
            this.activeLevel.destroy();
        }
	    this.activeLevel = null;
    }


    this.render = () => {
        game.add.sprite(0, statusBarHeight, this.name);
        //console.log("Room render");
        // Dadurch dass die Items initialisiert werden, werden auch die jeweiligen Level initialisiert, die sich durch
		// sie oeffnen
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

	this.unlockItems = () =>  {
	    for(var i = 0; i < this.items.length; i++) {
	        if(this.items[i].locked) {
                this.items[i].locked = false;
	            this.items[i].init();
            }
        }
    }
}