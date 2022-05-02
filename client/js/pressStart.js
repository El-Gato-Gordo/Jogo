import { mainMenu } from "./mainMenu.js";

var pressStart = new Phaser.Scene("Press Start");
var background;

pressStart.preload = function () {
 this.load.spritesheet("pressStart_bg", "assets/spritesheets/pressStart_bg.png", {
   frameWidth: 800,
   frameHeight: 600,
 });
};

pressStart.create = function () {
  background = this.physics.add.sprite(800, 600, "backgroundLoop")

    this.anims.create({
      key: "background",
      frames: this.anims.generateFrameNumbers("backgroundLoop", {
        start: 0,
        end: 9,
      }),
      frameRate: 15,
      repeat: -1,
    });
};

pressStart.update = function () {
    
    background.anims.play("background");

};

export { pressStart };
