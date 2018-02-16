var Dialogue = function (i18nScope, callback = () => {}, bottom=true) {

	this.textIndex = 0;
	this.callback = callback;
	this.bottom = bottom;

	this.y = game.world.height*0.6;

	this.draw = function () {
        room1.entrySpeech = [
            {
                image: "mouse",
                text: I18n.t('r1.m1')
            },
            {
                image: "eric",
                text: "Eric: Ja. Lass uns gucken was wir da borgen können."
            }
        ];

        I18n.locale = "de";
		var i18nArray = I18n.translate(i18nScope);
        this.speech = [];
        for (var i = 0; i < i18nArray.length; i++) {
        	this.speech.push({
				image: (i18nArray[i].toString().charAt(0).toLowerCase() === "m" ? "mouse" : "eric"),
				text: i18nArray[i]
			});
		}
        var x, y, w, h;
        if (bottom) {
            x = 20;
            y = game.world.height*0.6;
            w = game.world.width - 40;
            h = game.world.height - this.y - 40;
        } else {
        	x = game.world.width*0.6;
        	y = 20;
        	w = game.world.width*0.4 - 20;
        	h = game.world.height - 40;
		}
		this.graphics = game.add.graphics(x, y);
		this.graphics.beginFill(0xAAAAAA);


		this.graphics.drawRect(0, 0, w, h);

		this.graphics.lineStyle(2, "", 1);
		this.graphics.endFill();


		this.sprite = game.add.sprite(40, this.y+40, this.speech[this.textIndex].image);

		var style = { font: "20px Arial", fill: "black", wordWrap: true, wordWrapWidth: game.world.width-300 };//, align: "center" };
		this.text = game.add.text(200, this.y+50,
			"", style);
		this.graphics.inputEnabled = true;
		this.graphics.events.onInputUp.add(this.textClick, this);


		this.setUpSpeaker(this.textIndex);

		window.graphics = this.graphics;
	}	

	this.textClick = function (){
		if (++this.textIndex < this.speech.length) {
			this.setUpSpeaker(this.textIndex);
		} else {
			this.graphics.destroy();
			this.text.destroy();
			this.sprite.destroy();
			dialogueOpen = false;
			this.callback();
		}

	}

	this.setUpSpeaker = function(index) {
		this.text.text = this.speech[this.textIndex].text;
		this.sprite.loadTexture(this.speech[this.textIndex].image);
	}

	this.draw();

}