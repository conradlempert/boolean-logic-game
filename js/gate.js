var Gate = function (type, x, y) {
    // Attributes

    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.type = type;
    this.sprite = game.add.sprite(this.x, this.y, type);
    this.updated = new Phaser.Signal();
    this.input1 = false;
    this.input2 = false;

    this.parents = [];

    // Methods

    this.drawConnections = function () {
        for(var i = 0; i < this.parents.length; i++) {
            var goalX = this.x;
            var goalY = this.y + 13;
            if(i == 1) {
                goalY = this.y + 37;
            }
            var startX = this.parents[i].x + 25;
            var startY = this.parents[i].y + 12;
            var midX = (startX + goalX) / 2;
            var graphics = game.add.graphics(0, 0);
            if(this.parents[i].on) {
            	graphics.lineStyle(3, 0x00ff00, 1);
            } else {
            	graphics.lineStyle(3, 0xff0000, 1);
            }
            graphics.moveTo(startX, startY);
            graphics.lineTo(midX, startY);
            graphics.lineTo(midX, goalY);
            graphics.lineTo(goalX, goalY);

            window.graphics = graphics;
        }
    }

    this.register = function (parent) {
        this.parents.push(parent);
        parent.updated.add(this.updateValues, this);
    };

    this.updateValues = function () {
        if (this.parents[0]) {
            this.input1 = this.parents[0].on;
        } else {
            this.input1 = false;
        }
        if (this.parents[1]) {
            this.input2 = this.parents[1].on;
        } else {
            this.input2 = false;
        }
        this.evaluate();
    };

    this.evaluate = function () {
        switch (this.type){
            case 'and': this.on = this.input1 && this.input2;
                break;
            case 'or': this.on = this.input1 || this.input2;
                break;
            case 'not': this.on = !this.input1;
                break;
            default: this.on = false;
        }
        this.updated.dispatch();
    };

    this.addChild = function (child) {
        child.register(this);
    };

}

