var Dialogue = function (speech) {
	this.speech = speech;

	this.init = function() {
		var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
		var t = game.add.text(game.world.centerX-300, 0, this.speech[0].text, style);

	}
}