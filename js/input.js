var Input = function (x, y, on) {

    // Attributes /////////////////////////////////////////
    this.on = on || true;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.nextGates = [];
    this.sprite = game.add.sprite(this.x, this.y, 'on');

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

    


    this.show();

    // Signals ///////////////////////////////////////////
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.toggle, this);
    this.show()
}
