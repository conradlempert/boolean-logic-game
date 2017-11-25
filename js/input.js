var Input = function (x, y, on) {

    // Attributes /////////////////////////////////////////
    this.on = on || true;
    this.nextGates = [];
    this.sprite = game.add.sprite(x * 25, y * 25, 'on');


    // Methods ///////////////////////////////////////////
    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.toggle = function () {
        this.on = !this.on;
        this.show();
    };

    this.drawConnections = function () {
        for(var i = 0; i < this.nextGates.length; i++) {
            var graphics = game.add.graphics(100, 100);
            graphics.lineStyle(10, 0xffd900, 1);
            graphics.moveTo(50,50);
            graphics.lineTo(250, 50);
            graphics.lineTo(100, 100);
            graphics.lineTo(250, 220);
            graphics.lineTo(50, 220);
            graphics.lineTo(50, 50);
            window.graphics = graphics;
        }
    }

    // Signals ///////////////////////////////////////////
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.toggle, this);
    this.show()
}
