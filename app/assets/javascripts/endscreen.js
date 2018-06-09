var Endscreen = function () {

    this.y = game.world.height*0.6;



    this.draw = function () {
        padding = 40;
        w = game.world.width - 2*padding;
        this.group = game.add.group();
        this.group.x = padding;
        this.group.y = 2*padding;
        this.graphics = game.add.graphics(0, 0);
        this.graphics.beginFill(0xAAAAAA);
        this.graphics.alpha = 0.9;
        this.graphics.drawRect(0, 0, w, 300);
        this.group.add(this.graphics);
        var style = {font: "30px Arial", fill: "black", wordWrap: true, wordWrapWidth: w-40, align: "center"};
        var text = game.add.text(20, 30, "Du hast es geschafft! Schick deinen Punktestand ab.", style, this.group);

        this.sendButton = drawButton(I18n.t("game.buttons.send"), w/2, 130, "#ffffff", this.senden, this);
        this.group.add(this.sendButton.group);

        style.font = "20px Arial";
        var text2 = game.add.text(20, 190, "Konzeption: Christiane, Max - Entwicklung: Conrad, Aron, Jacob, Max - Graphik: Lea", style, this.group);



    }

    this.senden = function() {
        updateScore();
        this.sendButton.group.destroy();

        var restartButton = drawButton(I18n.t("game.buttons.restart"), w/2, 130, "#ffffff", () => {
            score = 0;
            room1_1.show();
    }, null);
        this.group.add(restartButton.group);
    }

    this.destroy = function() {
        this.group.destroy;
    }

    this.draw();

}