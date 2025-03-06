import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.setUserScale(fitSize(800, 650));
    this.scale.refresh();

    window.addEventListener("resize", function () {
      game.scale.setUserScale(fitSize(800, 650));
      game.scale.refresh();
    });

    this.load.video("intro", "assets/intro.mp4");
    this.load.image("logo", "assets/openhpi.jpg");
    this.load.image("on", "assets/on.png");
    this.load.image("off", "assets/off.png");
    this.load.image("neutral", "assets/neutral.png");
    this.load.image("and", "assets/and.png");
    this.load.image("or", "assets/or.png");
    this.load.image("not", "assets/not.png");
    this.load.image("equals", "assets/equals.png");
    this.load.image("defaultBg", "assets/defaultBg.jpg");
    this.load.image("back", "assets/button_back.png");
    this.load.image("button_empty", "assets/button_empty.png");
    this.load.image("computer", "assets/computer.png");
    this.load.image("pad", "assets/pad.jpg");
    this.load.image("robot", "assets/robot.png");
    this.load.image("grid", "assets/gitter.jpg");
    this.load.image("pixel", "assets/bubble.png");
    this.load.image("toaster", "assets/toaster.png");
    this.load.image("lock", "assets/lock.png");
    this.load.spritesheet("pigeon", "assets/pigeon.png", 84, 84);
    this.load.image("eric", "assets/eric.png");
    this.load.image("status", "assets/status.jpg");
    this.load.image("finalroom", "assets/finalroom.png");
    this.load.image("samenkorn", "assets/samenkorn.png");
    this.load.image("mouse", "assets/rat.png");
    this.load.image("sterni", "assets/sterni.png");
    this.load.image("mona_lisa", "assets/mona_lisa.jpg");
    this.load.image("imac", "assets/imac.png");
    this.load.image("modern", "assets/modern.png");
    this.load.image("transparent", "assets/transparent.png");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
