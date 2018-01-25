var Room = function (name, background) {
	this.name = name;
	this.background = background;
	this.items = [];
	this.activeLevel = null;
	this.dialogeShown = false;
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
        if(name === 'room1' && !this.dialogeShown) {
        	this.dialogeShown = true;
		    var speech = [
	        {
	            image: "mouse",
	            text: "Maus: Hi Eric! Lust auf einen kleinen Coup im Louvre?"
	        },
	        {
	            image: "eric",
	            text: "Eric: Ja. Lass uns gucken was wir da borgen können."
	        }
	    	];
	    	myDialogue = new Dialogue(speech);
		}
    }

	this.show = () => {
		game.state.start(this.name);
	}

	this.addItem = function(item) {
		this.items.push(item);
	} 
}