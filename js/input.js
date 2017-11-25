var Input = function (x, y, on) {

    // Attributes /////////////////////////////////////////
    this.on = on || true;
    this.x = x * gridUnit;
    this.y = y * gridUnit;
    this.nextGates = [];
    this.sprite = game.add.sprite(this.x, this.y, 'on');

    this.updated = new Phaser.Signal();

    // Methods ///////////////////////////////////////////
    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.toggle = function () {
        this.on = !this.on;
        this.show();
        this.updated.dispatch();
    };

    this.drawConnections = function () {
        for(var i = 0; i < this.nextGates.length; i++) {
            var startX = this.x + 25;
            var startY = this.y + 12;
            var goalX = this.nextGates[i].x;
            var goalY = this.nextGates[i].y + 25;
            var midX = (startX + goalX) / 2;
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(3, 0xffd900, 1);
            graphics.moveTo(startX, startY);
            graphics.lineTo(midX, startY);
            graphics.lineTo(midX, goalY);
            graphics.lineTo(goalX, goalY);

            window.graphics = graphics;
        }
    };

    this.addChild = function (child) {
        this.nextGates.push(child);
        child.register(this);
        this.updated.dispatch();
    };


    this.show();

    // Signals ///////////////////////////////////////////
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.toggle, this);
    this.show()
};
