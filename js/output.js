var Output = function (expected, type, x, y) {
    this.on = false;
    this.type = type;
    this.expected = expected;
    this.sprite = game.add.sprite(x, y, type);

    this.updated = new Phaser.Signal();

    this.parents = [];

    this.register = function (parent) {
        this.parents.push(parent);
        parent.updated.add(this.updateValues, this);
    };

    this.updateValues = function () {
        if (this.parents[0] !== undefined)
            this.setValue(this.parents[0].on);
        else
            this.setValue(false);
    };

    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.setValue = function (on) {
        this.on = on;
        this.show();
    };
};
