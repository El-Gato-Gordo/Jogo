import { mainMenu } from "./mainMenu.js";

var pressStart = new Phaser.Scene("Press Start");
var background_pressStart;
var startButton;
var keyENTER; //Não funciona, no log se tento verificar a varíavel, diz que não está definida

pressStart.preload = function () {
  this.load.spritesheet(
    "START_SCREEN",
    "assets/background/START_SCREEN.png",
    {
      frameWidth: 800,
      frameHeight: 600,
    }
  );

  this.load.spritesheet("startButton", "assets/hud/start_button.png", {
    frameWidth: 192,
    frameHeight: 192,
  });
};

pressStart.create = function () {
  keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Enter

  background_pressStart = this.physics.add.staticSprite(
    400,
    300,
    "START_sCREEN"
  );
  
  startButton = this.physics.add.staticSprite(400, 300, "startButton");

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

  if (keyENTER.isDown) {
    this.scene.start("Main Menu");
  }
};

export { pressStart };
