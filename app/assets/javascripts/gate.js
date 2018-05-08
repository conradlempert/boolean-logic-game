var Gate = function (type, x, y, level, group) {
    // Attributes

    this.x = x * gridUnit;
    this.y = y * gridUnit + statusBarHeight;
    this.type = type;
    this.level = level;
    
    this.updated = new Phaser.Signal();
    this.onClickUpdated = new Phaser.Signal();
    this.input1 = false;
    this.input2 = false;

    this.parents = [];

    // Methods
    this.init = function () {
        this.sprite = game.add.sprite(this.x, this.y, this.type);
    }

    this.drawConnections = function () {
        for(var i = 0; i < this.parents.length; i++) {
        	var parent = this.parents[i];
            var goalX = this.x;
            if(this.type == "not") {
            	var goalY = this.y + 25;
            } else {
            	if(i === 0) {
            		var goalY = this.y + 13;
            	} else {
                	var goalY = this.y + 37;
            	}
            }
            if(parent.type == "input") {
            	var startX = parent.x + 40;
            	var startY = parent.y + 20;
            } else {
            	var startX = parent.x + 50;
            	var startY = parent.y + 25;
            }
            this.level.drawConnection(startX, startY, goalX, goalY, this.parents[i].on);
        }
    };

    this.register = function (parent) {
        this.parents.push(parent);
        parent.updated.add(this.updateValues, this);
    };

    this.updateValues = function (args) {
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

        switch (this.type){
            case 'and': this.on = this.input1 && this.input2;
                break;
            case 'or': this.on = this.input1 || this.input2;
                break;
            case 'not': this.on = !this.input1;
                break;
            case 'equals': this.on = this.input1 == this.input2;
                break;
            case 'notequals': this.on = this.input1 != this.input2;
                break;
            default: this.on = false;
        }
        this.updated.dispatch(args);
    };

    this.addChild = function (child) {
        child.register(this);
    };

    this.destroy = function () {
        if (this.sprite)
            this.sprite.destroy();
    }

}

