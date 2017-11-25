var Output = function (expected, type, x, y) {
    this.on = false;
    this.expected = expected;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.sprite = game.add.sprite(this.x, this.y, this.on ? 'on' : 'off');

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
