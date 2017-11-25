var Output = function (expected, type, x, y) {
    this.on = false;
    this.type = type;
    this.expected = expected;
    this.sprite = game.add.sprite(x, y, type);

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
