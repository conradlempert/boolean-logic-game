
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gridUnit = 25;
var simulationMode = true;
var inputsDisabled = false;
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
	game.load.image('neutral', 'img/neutral.png');
    game.load.image('and', 'img/and.png');
    game.load.image('or', 'img/or.png');
    game.load.image('not', 'img/not.png');
    game.load.image('autoplay', 'img/button_autoplay.png');
    game.load.image('challenge', 'img/button_challenge.png');
    game.load.image('play', 'img/button_play.png');
    game.load.image('retry', 'img/button_retry.png');
}

function create() {
	createLevel1()


	// Updating all gates/outputs
	for (var i = 0; i < gameElements.inputs.length; i++) {
	   gameElements.inputs[i].updated.dispatch();
    }
    winText = game.add.text(300, 20, "", style);

    simulationMode = true;
    modeButton = game.add.button(0, 0, 'autoplay', activateChallengeMode, this, 2, 1, 0);
}

function update() {
	for(var i = 0; i < gameElements.gates.length; i++) {
		gameElements.gates[i].drawConnections();
		
	}
	for(var i = 0; i < gameElements.outputs.length; i++) {
		gameElements.outputs[i].drawConnections();
		gameElements.outputs[i].show();
	}
}

function checkWin() {
    
    simulationMode = true;
    inputsDisabled = true;

    playButton.destroy();
    retryButton = game.add.button(140, 0, 'retry', retry, this, 2, 1, 0);

    var gameWon = true;
    for (var i = 0; i < gameElements.outputs.length; i++) {
        gameWon = (gameElements.outputs[i].on === gameElements.outputs[i].expected) && gameWon;
    }
    if (gameWon) {
        winText.text = "You win!";
    } else {
    	winText.text = "You lose!"
    }

}
function activateAutoPlay() {
	if(simulationMode) {
		retryButton.destroy();
	} else {
		playButton.destroy();
	}
	simulationMode = true;
	modeButton.destroy();
	winText.text = '';
	modeButton = game.add.button(0, 0, 'autoplay', activateChallengeMode, this, 2, 1, 0);
}
function activateChallengeMode() {
	simulationMode = false;
	modeButton.destroy();
	modeButton = game.add.button(0, 0, 'challenge', activateAutoPlay, this, 2, 1, 0);
	playButton = game.add.button(140, 0, 'play', checkWin, this, 2, 1, 0);
}

function retry() {
	simulationMode = false;
	inputsDisabled = false;
	winText.text = '';
	retryButton.destroy();
	playButton = game.add.button(140, 0, 'play', checkWin, this, 2, 1, 0);
}
function drawConnection(startX, startY, goalX, goalY, on) {
	var midX = (startX + goalX) / 2;
	var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(3, 0xffff00, 1);
    if(simulationMode) {
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
