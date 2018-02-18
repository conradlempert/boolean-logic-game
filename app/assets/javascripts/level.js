var Level = function (name, type = "challenge", expression = "", winAction = function() {}) {
	this.name = name;
	this.inputs = [];
	this.outputs = [];
	this.gates = [];
	this.winAction = winAction;
	this.type = type;
	this.completed = false;
	this.expression = expression;
	this.window = {x:0, y:statusBarHeight, width:game.width, height:game.height - 40};
	this.backgroundImage = "defaultBg";
	this.destroyableGraphics = [];
	this.dialogue = null;

	// element: Every element that should disappear when the level is closed is passed to this function
	this.registerToDestroy = function(element) {
        this.destroyableGraphics.push(element);
    }

	this.addInput = function (name, x, y, on, locked = false) {
		var input = new Input(name, x, y, on, this, locked);
		this.inputs.push(input);
		this.registerToDestroy(input);
		return input;
	}
	this.addOutput = function (expected, x, y, name) {
		var output = new Output(expected, x, y, this, name);
		this.outputs.push(output);
		this.registerToDestroy(output);
		return output;
	}
	this.addGate = function (type, x, y) {
		var gate = new Gate(type, x, y, this);
		this.gates.push(gate);
		this.registerToDestroy(gate);
		return gate;
	}

	this.update = () => {
        for(var i = 0; i < this.gates.length; i++) {
            this.gates[i].drawConnections();
        }
        for(var i = 0; i < this.outputs.length; i++) {
            this.outputs[i].drawConnections();
            this.outputs[i].show();
        }
    }

	this.show = (room) => {

	    this.room = room;

        this.bgSprite = game.add.sprite(this.window.x, this.window.y, this.backgroundImage);
        this.registerToDestroy(this.bgSprite);
        this.bgSprite.width = this.window.width;
        this.bgSprite.height = this.window.height;

        for (var i = 0; i < this.outputs.length; i++) {
            this.outputs[i].init();
        }
        for (var i = 0; i < this.gates.length; i++) {
            this.gates[i].init();
        }
        for (var i = 0; i < this.inputs.length; i++) {
            this.inputs[i].init();
        }
        switch(type) {
            case "challenge":
                this.playButton = drawButton(I18n.t("game.buttons.play"), 100, statusBarHeight, "black", this.checkWin, this);
                this.registerToDestroy(this.playButton);
                this.simulationMode = false;
                break;
            case "lernItem":
                this.simulationMode = true;
                break;
            case "choice":
                for(var i = 0; i < this.choices.length; i++) {
                    var button = drawButton(I18n.t("game.buttons.choose"), 100 + i*300, 300, "black", (button) => {this.checkChoice(button.id)}, this);
                    this.registerToDestroy(button);

                    button.button.id = i;
                }
                this.simulationMode = true;
                break;
            default:
                console.log(this.name + ": Invalid Level type!");
                break;
        }

        this.inputsDisabled = false;

        this.backButton = game.add.button(0, statusBarHeight, 'back', this.room.closeLevel, this, 2, 1, 0);
        this.registerToDestroy(this.backButton);

        this.winText = game.add.text(300, 60, "", style);
        this.registerToDestroy(this.winText);
    
        this.expressionText = game.add.text(0, 0, this.expression, style);
        this.expressionText.setTextBounds(0, 0, this.window.x + this.window.width - 10, this.window.y + this.window.height - 5);
        this.registerToDestroy(this.expressionText);
		this.update();

		if(this.dialogue != null) {
		    new Dialogue(this.dialogue);
		    if(this.type == "challenge") {
		        dialogueOpen = true;
            }
        }
	}


	this.checkChoice = function(index) {
        if(this.choices[index]) {
            this.completed = true;
            this.win();
        } else {
            this.fail();
        }
    }

	this.checkWin = function() {

	    if(!dialogueOpen) {

            this.simulationMode = true;
            this.inputsDisabled = true;

            this.playButton.destroy();

            this.completed = true;
            for (var i = 0; i < this.outputs.length; i++) {
                this.completed = (this.outputs[i].on === this.outputs[i].expected) && this.completed;
            }
            if (this.completed) {
                this.win();
            } else {
                this.fail();
            }
        }
	}

	this.drawConnection = function(startX, startY, goalX, goalY, on) {
		if(!dialogueOpen) {
			var midX = (startX + goalX) / 2;
			var graphics = game.add.graphics(0, 0);
			this.registerToDestroy(graphics);
			graphics.lineStyle(3, 0xffff00, 1);
			if (this.simulationMode) {
				if (on) {
					graphics.lineStyle(3, 0x00ff00, 1);
				} else {
					graphics.lineStyle(3, 0xff0000, 1);
				}
			}
			graphics.moveTo(startX, startY);
			graphics.lineTo(midX, startY);
			graphics.lineTo(midX, goalY);
			graphics.lineTo(goalX, goalY);

			window.graphics = graphics;
		}
	}

	this.fail = function() {
		this.winText.text = I18n.t("game.texts.wrong");
        new Dialogue("dialogue.fail", this.room.closeLevel);
    }


	// Löscht alle Elemente, die this.registerToDestroy() übergeben wurden
    this.destroy = () => {
	    if(this.type == "lernItem") {
	        this.winAction();
        }
        for(var i = 0; i < this.destroyableGraphics.length; i++) {
        	if (this.destroyableGraphics[i] != null) {
                this.destroyableGraphics[i].destroy();
          } 
        }
		}

    this.win = function () {
	    if(this.room.nr >= progress) {
            raiseScore();
        }
        this.winText.text = I18n.t("game.texts.correct");
        window.setTimeout(this.winAction, 1000);
    }

}