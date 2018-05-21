

var Endscreen = function () {

    this.textIndex = 0;
    this.callback = callback;
    this.bottom = bottom;

    this.y = game.world.height*0.6;
    this.group;

    this.draw = function () {

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
        var p = 40;
        if (bottom) {
            x = p;
            y = p;
            w = game.world.width - p;
            h = game.world.height - p;
        }
        this.group.x = x;
        this.group.y = y;
        this.graphics = game.add.graphics(0, 0);
        this.group.add(this.graphics);
        this.graphics.beginFill(0xAAAAAA);


        this.graphics.drawRect(0, 0, w, h);
        this.graphics.alpha = 0.9;

        this.graphics.lineStyle(2, "", 1);
        this.graphics.endFill();


        this.sprite = game.add.sprite((bottom == true ? 40 : w/2), (bottom?40:20), "mouse");
        if (!bottom) {
            this.sprite.anchor = new Phaser.Point(0.5, 0);
        }
        this.group.add(this.sprite);

        var style = { font: "20px Arial", fill: "black", wordWrap: true, wordWrapWidth: w-textx-30 };//, align: "center" };
        this.text = game.add.text(textx, texty,
            "Geschafft!!!", style);
        this.group.add(this.text);
        this.graphics.inputEnabled = true;
        this.graphics.events.onInputUp.add(this.textClick, this);
        var sendButton = drawButton(I18n.t("game.buttons.send"), 300, 120, "black", this.room.closeLevel, this);
        this.group.add(sendButton.group);


    }

    this.destroy = function() {
        this.group.destroy();
    }

    this.draw();

}