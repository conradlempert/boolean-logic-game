var Item = function(x, y, name, room, action) {
	this.x = x;
	this.y = y;
	this.name = name;
	this.room = room;
	this.action = action;

	this.init = function() {
		this.sprite = game.add.sprite(this.x, this.y, this.name);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(this.clickAction, this);
	}

	this.clickAction = function () {
	    if(this.room.activeLevel != null) {
            this.room.closeLevel();
        }
        console.log(this.action.type);
        switch(this.action.type) {
            case "animation":
                this.sprite.animations.add(this.name);
                this.sprite.animations.play(this.name, this.action.fps, false);
                break;
            case "level":
                this.room.showLevel(this.action.level);
                break;
            case "popup":
                this.action.popup.show();
                break;
            case "endlevel":
                this.room.endLevel();
                break;
            default:
                break;
        }
    }
}