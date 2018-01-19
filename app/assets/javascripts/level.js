var Level = function (name, isChallenge = false, winAction = function() {}) {
	this.name = name;
	this.inputs = [];
	this.outputs = [];
	this.gates = [];
	this.winAction = winAction;
	this.isChallenge = isChallenge;
	this.simulationMode = true;
	this.inputsDisabled = false;
	this.window = {x:0, y:0, width:game.width, height:game.height};
	this.backgroundImage = "defaultBg";

	this.addInput = function (x, y, on) {
		var input = new Input(x, y, on, this);
		this.inputs.push(input);
		return input;
	}
	this.addOutput = function (expected, x, y) {
		var output = new Output(expected, x, y, this);
		this.outputs.push(output);
		return output;
	}
	this.addGate = function (type, x, y) {
		var gate = new Gate(type, x, y, this);
		this.gates.push(gate);
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

	    console.log("wow");
        this.bgSprite = game.add.sprite(this.window.x, this.window.y, this.backgroundImage);
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
        if(this.isChallenge) {
            this.playButton = game.add.button(140, 0, 'play', this.checkWin, this, 2, 1, 0);
            this.simulationMode = false;
        } else {
            //this.modeButton = game.add.button(0, 0, 'autoplay', this.activateChallengeMode, this, 2, 1, 0);
            this.simulationMode = true;
        }
        this.backButton = game.add.button(0, 0, 'back', this.room.closeLevel, this, 2, 1, 0);
        this.winText = game.add.text(300, 20, "", style);
	}

	this.checkWin = function() {
    
    	this.simulationMode = true;
    	this.inputsDisabled = true;

    	this.playButton.destroy();
    	this.retryButton = game.add.button(140, 0, 'retry', this.retry, this, 2, 1, 0);

    	var gameWon = true;
    	for (var i = 0; i < this.outputs.length; i++) {
        	gameWon = (this.outputs[i].on === this.outputs[i].expected) && gameWon;
    	}
    	if (gameWon) {
        	this.winText.text = "You win!";
        	window.setTimeout(this.winAction, 1000);
    	} else {
    		this.winText.text = "You lose!"
    	}
	}

	this.activateAutoPlay = function() {
		if(this.simulationMode) {
			this.retryButton.destroy();
		} else {
			this.playButton.destroy();
		}
		this.simulationMode = true;
		this.modeButton.destroy();
		this.winText.text = '';
		this.modeButton = game.add.button(0, 0, 'autoplay', this.activateChallengeMode, this, 2, 1, 0);
	}

	this.activateChallengeMode = function() {
		this.simulationMode = false;
		this.modeButton.destroy();
		this.modeButton = game.add.button(0, 0, 'challenge', this.activateAutoPlay, this, 2, 1, 0);
		this.playButton = game.add.button(140, 0, 'play', this.checkWin, this, 2, 1, 0);
	}

	this.retry = function() {
		this.simulationMode = false;
		this.inputsDisabled = false;
		this.winText.text = '';
		this.retryButton.destroy();
		this.playButton = game.add.button(140, 0, 'play', this.checkWin, this, 2, 1, 0);
	}

	this.drawConnection = function(startX, startY, goalX, goalY, on) {
		var midX = (startX + goalX) / 2;
		var graphics = game.add.graphics(0, 0);
    	graphics.lineStyle(3, 0xffff00, 1);
    	if(this.simulationMode) {
        	if(on) {
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