var Output = function (expected, x, y, level, name = "") {
    this.on = false;
    this.expected = expected || false;
    this.x = x * gridUnit;
    this.y = y * gridUnit + statusBarHeight;
    this.level = level;
    this.name = name;

    
    this.updated = new Phaser.Signal();
    this.onClickUpdated = new Phaser.Signal(); // dispatched, if the value change of this pin is triggered by a click by the user as opposed to internal updates

    this.parents = [];

    this.init = function() {
        this.sprite = game.add.sprite(this.x, this.y, 'neutral');
        this.description = game.add.text(this.x + 40, this.y - 5, this.name, style);
    }

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
            this.level.drawConnection(startX, startY, goalX, goalY, this.parents[i].on);
        }
    }

    this.updateValues = function (args) {
        if (this.parents[0] !== undefined)
            this.setValue(this.parents[0].on);
        else
            this.setValue(false);
        this.updated.dispatch(this.on === this.expected);
        if (args.onClick === true) {
            this.onClickUpdated.dispatch();
        }
    };

    this.show = function () {
        if(!this.level.simulationMode) {
            this.sprite.loadTexture('neutral');
        } else {
            if(this.on) {
                this.sprite.loadTexture('on');
            } else {
                this.sprite.loadTexture('off');
            }
        }
    };

    this.setValue = function (on) {
        this.on = on;
        this.show();
    };

    this.destroy = function() {
        this.sprite.destroy();
    }
};
