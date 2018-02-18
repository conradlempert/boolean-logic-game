var Input = function (name, x, y, on, level, locked = false) {

    // Attributes /////////////////////////////////////////
    this.name = name;
    this.on = on;
    this.x = x * gridUnit;
    this.y = y * gridUnit + statusBarHeight;
    this.type = "input";
    this.level = level;
    this.locked = locked;
    this.updated = new Phaser.Signal();
    this.onClickUpdate = new Phaser.Signal();
    
    // Methods ///////////////////////////////////////////

    this.init = function () {
        this.sprite = game.add.sprite(this.x, this.y, 'on');
        this.description = game.add.text(this.x - 40, this.y + 3, this.name, style);
        this.level.registerToDestroy(this.description);
        if(this.locked) {
            this.lockSprite = game.add.sprite(this.x + 20, this.y - 20, 'lock');
        } else {
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.toggle, this);
        }
        this.updated.dispatch({onClick: false});

        this.show();
    }
    this.show = function () {
        if(this.on) {
            this.sprite.loadTexture('on');
        } else {
            this.sprite.loadTexture('off');
        }
    };

    this.toggle = function () {
        if(!this.level.inputsDisabled) {
            this.on = !this.on;
            this.show();
            this.onClickUpdate.dispatch();
            this.updated.dispatch({onClick: true});
        }
    };

    this.addChild = function (child) {
        child.register(this);
        this.updated.dispatch();
    };

    this.destroy = function () {
        this.sprite.destroy();
        if (this.lockSprite) {
            this.lockSprite.destroy();
        }
    }

};
