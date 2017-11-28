var Input = function (x, y, on) {

    // Attributes /////////////////////////////////////////
    this.on = on || true;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.sprite = game.add.sprite(this.x, this.y, 'on');

    this.updated = new Phaser.Signal();

    // Methods ///////////////////////////////////////////
    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.toggle = function () {
        if(!inputsDisabled) {
            this.on = !this.on;
            this.show();
            this.updated.dispatch();
        }
    };

    this.addChild = function (child) {
        child.register(this);
        this.updated.dispatch();
    };

    this.show();

    // Signals ///////////////////////////////////////////
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.toggle, this);
    this.show()
};
