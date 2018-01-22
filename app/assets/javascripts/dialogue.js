

var Dialogue = function (speech) {
	this.speech = speech;
	this.textIndex = 0;

	this.y = game.world.height*0.6;

	this.draw = function () {
		this.graphics = game.add.graphics(0, this.y);
		this.graphics.beginFill(0x00ff00);
		this.graphics.drawRect(0,40,game.world.width, game.world.height-this.y);
		this.graphics.lineStyle(2, 0x0000FF, 1);
		this.graphics.endFill();

		this.sprite = game.add.sprite(0, this.y+50, this.speech[this.textIndex].image);

		var style = { font: "20px Arial", fill: "#ff0044" };//, align: "center" };
		this.text = game.add.text(150, this.y+50, 
			"", style);
		this.graphics.inputEnabled = true;
		this.graphics.events.onInputUp.add(this.textClick, this);


		this.setUpSpeaker(this.textIndex);

		window.graphics = this.graphics;
	}	

	this.textClick = function (){
		console.log("Click");
		if (++this.textIndex < this.speech.length) {
			this.setUpSpeaker(this.textIndex);
		} else {
			this.graphics.destroy();
			this.text.destroy();
			this.sprite.destroy();
		}

	}

	this.setUpSpeaker = function(index) {
		this.text.text = this.speech[this.textIndex].text;
		this.sprite.loadTexture(this.speech[this.textIndex].image);
	}

	this.draw();

}