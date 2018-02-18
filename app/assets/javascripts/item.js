var Item = function(x, y, name, room, action = { type: "none"}, locked = false) {
	this.x = x;
	this.y = y;
	this.name = name;
	this.room = room;
	this.action = action;
	this.locked = locked;

	this.init = function() {
	    if(!(this.locked && this.room.hasItemLock)) {
            this.sprite = game.add.sprite(this.x, this.y, this.name);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.clickAction, this);
        }
	}

	this.clickAction = function () {
	    if(this.room.activeLevel == null) {
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
}