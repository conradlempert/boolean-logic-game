var Gate = function (type, x, y) {
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.type = type;
    this.inputs = [];
    this.sprite = game.add.sprite(this.x, this.y, type);
    this.nextGates = [];

    this.drawConnections = function () {
        for(var i = 0; i < this.inputs.length; i++) {
        	var goalX = this.x;
            var goalY = this.y + 13;
        	if(i == 1) {
        		goalY = this.y + 37;
        	}
            var startX = this.inputs[i].x + 25;
            var startY = this.inputs[i].y + 12;
            var midX = (startX + goalX) / 2;
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(3, 0xffd900, 1);
            graphics.moveTo(startX, startY);
            graphics.lineTo(midX, startY);
            graphics.lineTo(midX, goalY);
            graphics.lineTo(goalX, goalY);

            window.graphics = graphics;
        }
    }

}
