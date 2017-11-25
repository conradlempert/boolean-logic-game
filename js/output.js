var Output = function (expected, type, x, y) {
    this.on = false;
    this.expected = expected || false;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.sprite = game.add.sprite(this.x, this.y, this.on ? 'on' : 'off');

    this.updated = new Phaser.Signal();

    this.parents = [];

    this.register = function (parent) {
        this.parents.push(parent);
        parent.updated.add(this.updateValues, this);
    };

    this.drawConnections = function () {
        for(var i = 0; i < this.parents.length; i++) {
            var goalX = this.x;
            var goalY = this.y + 12;
            var startX = this.parents[i].x + 50;
            var startY = this.parents[i].y + 25;
            var midX = (startX + goalX) / 2;
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(3, 0xffff00, 1);
            if(showConnectionColors) {
                if(this.parents[i].on) {
                    graphics.lineStyle(3, 0x00ff00, 1);
                } else {
                    graphics.lineStyle(3, 0xff0000, 1);
                }
            }
            graphics.moveTo(startX, startY);
            graphics.lineTo(midX, startY);
            graphics.lineTo(midX, goalY);
            graphics.lineTo(goalX, goalY);
            window.graphics = graphics;
        }
    }

    this.updateValues = function () {
        if (this.parents[0] !== undefined)
            this.setValue(this.parents[0].on);
        else
            this.setValue(false);
        this.updated.dispatch(this.on === this.expected);
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
