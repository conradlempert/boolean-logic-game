import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    room1_1 = new Room("room1_1", "Room_animals_klein.png", 1, true);
    // tuer
    room1_1.addItem(
      new Item(360, 300, 80, 120, room1_1, { type: "endlevel" }, true)
    );
    /*    room1_1.addItem(new Item(200, 500, 'pigeon', room1_1,
    {
        type: "animation",
        fps: 30
    }
)); */
    // baer
    room1_1.addItem(
      new Item(
        250,
        250,
        60,
        120,
        room1_1,
        {
          type: "level",
          level: createItemAnd(),
        },
        true
      )
    );
    // katze
    room1_1.addItem(
      new Item(170, 330, 70, 70, room1_1, {
        type: "level",
        level: createItemInput(),
      })
    );
    // flamingo
    room1_1.addItem(
      new Item(
        500,
        270,
        80,
        80,
        room1_1,
        {
          type: "level",
          level: createItemOr(),
        },
        true
      )
    );

    room1_2 = new Room("room1_2", "Room_art_locked_klein.png", 2, true);
    // door
    room1_2.addItem(
      new Item(370, 320, 100, 100, room1_2, { type: "endlevel" }, true)
    );
    // starry night
    room1_2.addItem(
      new Item(
        580,
        290,
        130,
        100,
        room1_2,
        {
          type: "level",
          level: createItemEquals(),
        },
        true
      )
    );
    room1_2.addItem(
      new Item(
        100,
        230,
        120,
        100,
        room1_2,
        {
          type: "level",
          level: createItemNot(),
        },
        true
      )
    );

    room2 = new Room("room2", "Room_history_klein.png", 3);
    room2.addItem(new Item(360, 300, 80, 100, room2, { type: "endlevel" }));

    room3 = new Room("room3", "Room_music_locked_klein.png", 4);
    robotPopUp = new PopUp(450, 290, "pixel");
    room3.addItem(new Item(350, 300, 100, 100, room3, { type: "endlevel" }));
    //room3.addItem(new Item(630, 480, 100, 100, room3));
    room3.addItem(
      new Item(570, 250, 100, 100, room3, {
        type: "level",
        level: createItemLevel3_NotEqual(),
      })
    );

    room4 = new Room("room4", "Room_final_shadow_klein.png", 5);

    room1_1.endLevels = [createLevel1_1()];
    room1_2.endLevels = [createLevel1_2()];
    room2.endLevels = [createLevel2_1(), createLevel2_2(), createLevel2_3()];
    room3.endLevels = [createlevel3_1(), createLevel3_2(), createLevel3_3()];

    room1_1.nextRoom = room1_2;
    room1_2.nextRoom = room2;
    room2.nextRoom = room3;
    room3.nextRoom = room4;

    room1_1.inDialogue = "r1.d1";
    room2.inDialogue = "r2.entrance";
    room2.outDialogue = "r2.out";
    room4.inDialogue = "r4.entrance";

    I18n.locale = "de";
    score = 0;
    if (isSafari()) {
      // room1_1.show();
      room4.show();
    } else {
      /*video = game.add.video('intro');
    video.onComplete.dispatch = function () {
        room1_1.show();
    };
    video.play(false);
    video.addToWorld();*/
      room3.show();
    }
    s;
  }
}
