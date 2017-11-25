
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;
var simulationMode = true;
var showConnectionColors = true;
var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

gameElements = {
    gates: [],
    inputs: [],
    outputs: []
}

function preload() {
	game.load.image('logo', 'img/openhpi.jpg');
	game.load.image('on', 'img/on.png');
	game.load.image('off', 'img/off.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
    game.load.image('autoplay', 'img/button_autoplay.png');
    game.load.image('challenge', 'img/button_challenge.png');
    game.load.image('play', 'img/button_play.png');
}

function create() {
	createLevel1()


	// Updating all gates/outputs
	for (var i = 0; i < gameElements.inputs.length; i++) {
	   gameElements.inputs[i].updated.dispatch();
    }
    winText = game.add.text(300, 20, "", style);

    renderButtons();
}

function update() {
	for(var i = 0; i < gameElements.gates.length; i++) {
		gameElements.gates[i].drawConnections();
		gameElements.outputs[i].drawConnections();
	}
}

function checkWin() {
    var gameWon = true;
    showConnectionColors = true;
    for (var i = 0; i < gameElements.outputs.length; i++) {
        gameWon = (gameElements.outputs[i].on === gameElements.outputs[i].expected) && gameWon;
    }
    if (gameWon) {
        winText.text = "You win!";
    } else {
    	winText.text = "You lose!"
    }

}

function renderButtons() {
	
	if(simulationMode) {
		modeButton = game.add.button(0, 0, 'autoplay', changeSimulationMode, this, 2, 1, 0);
	} else {
		modeButton = game.add.button(0, 0, 'challenge', changeSimulationMode, this, 2, 1, 0);
		playButton = game.add.button(140, 0, 'play', checkWin, this, 2, 1, 0);
	}

}

function changeSimulationMode() {
	simulationMode = !simulationMode;
	modeButton.destroy();
	if(simulationMode) {
		playButton.destroy();
		showConnectionColors = true;
	} else {
		showConnectionColors = false;
	}
	renderButtons();
}

