import { mainMenu } from "./mainMenu.js";

var pressStart = new Phaser.Scene("Press Start");
var background_pressStart;
var startButton;

pressStart.preload = function () {
  this.load.spritesheet(
    "START_SCREEN",
    "assets/background/START_SCREEN.png",
    {
      frameWidth: 800,
      frameHeight: 600,
    }
  );

}

pressStart.create = function () {

  background_pressStart = this.physics.add
    .staticSprite(400, 300, "START_sCREEN")
    .setInteractive()
    .setScrollFactor(0);

    background_pressStart.on(
      "pointerover",
      function () {
        this.scene.start("Main Menu");
        
      },
      this
    );

  this.anims.create({
    key: "backgroundLoop",
    frames: this.anims.generateFrameNumbers("START_SCREEN", {
      start: 0,
      end: 1,
    }),

    frameRate: 1,
    repeat: -1,
  });

};

pressStart.update = function () {
  background_pressStart.anims.play("backgroundLoop", true);

};

export { pressStart };
