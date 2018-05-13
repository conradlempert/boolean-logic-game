var Dialogue = function (i18nScope, callback = () => {}, bottom = true) {

	this.textIndex = 0;
	this.callback = callback;
	this.bottom = bottom;

	this.y = game.world.height*0.6;

	this.draw = function () {
        room1_1.entrySpeech = [
            {
                image: "mouse",
                text: I18n.t('r1.m1')
            },
            {
                image: "eric",
                text: "Eric: Ja. Lass uns gucken was wir da borgen können."
            }
        ];

        this.group = game.add.group();

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
		var textx = (bottom ? 200 : 30);
        var texty = (bottom ? 30 : 150);
		this.group.x = x;
        this.group.y = y;
		this.graphics = game.add.graphics(0, 0);
        this.group.add(this.graphics);
		this.graphics.beginFill(0xAAAAAA);


		this.graphics.drawRect(0, 0, w, h);
		this.graphics.alpha = 0.9;

		this.graphics.lineStyle(2, "", 1);
		this.graphics.endFill();


		this.sprite = game.add.sprite((bottom == true ? 40 : w/2), (bottom?40:20), this.speech[this.textIndex].image);
		if (!bottom) {
            this.sprite.anchor = new Phaser.Point(0.5, 0);
        }
		this.group.add(this.sprite);

		var style = { font: "20px Arial", fill: "black", wordWrap: true, wordWrapWidth: w-textx-30 };//, align: "center" };
		this.text = game.add.text(textx, texty,
			"", style);
		this.group.add(this.text);
		this.graphics.inputEnabled = true;
		this.graphics.events.onInputUp.add(this.textClick, this);


		this.setUpSpeaker(this.textIndex);

//		window.graphics = this.graphics;
	}	

	this.textClick = function (){
		if (++this.textIndex < this.speech.length) {
			this.setUpSpeaker(this.textIndex);
		} else {
			this.group.destroy();
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