var Gate = function (type, x, y) {
    this.type = type;
    this.sprite = game.add.sprite(x * 25, y * 25, type);
    this.nextGates = [];
}
