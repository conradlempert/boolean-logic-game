var Output = function (expected, type, x, y) {
    this.on = false;
    this.expected = expected;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.sprite = game.add.sprite(this.x, this.y, this.on ? 'on' : 'off');

    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.switch = function () {
        this.on = !this.on;
        this.show();
    };
};
