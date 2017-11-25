var Gate = function (type, x, y) {
    this.on = false;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.type = type;
    this.sprite = game.add.sprite(this.x, this.y, type);
    this.nextGates = [];
    this.updated = new Phaser.Signal();
    this.input1 = false;
    this.input2 = false;

    this.parents = [];

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
        this.nextGates.push(child);
        child.register(this);
    };

};
