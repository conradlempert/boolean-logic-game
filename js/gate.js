var Gate = function (type, x, y) {
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.type = type;
    this.sprite = game.add.sprite(this.x, this.y, type);
    this.nextGates = [];
}
