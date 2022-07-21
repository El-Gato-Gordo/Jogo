import { mainMenu } from "./mainMenu.js";

var pressStart = new Phaser.Scene("Press Start");
var background_pressStart;
var startButton;
var keyENTER; //Não funciona, no log se tento verificar a varíavel, diz que não está definida

pressStart.preload = function () {
  this.load.spritesheet(
    "pressStart_bg",
    "assets/background/pressStart_bg.png",
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
    "pressStart_bg"
  );
  
  startButton = this.physics.add.staticSprite(400, 300, "startButton");

  this.anims.create({
    key: "backgroundLoop",
    frames: this.anims.generateFrameNumbers("pressStart_bg", {
      start: 0,
      end: 9,
    }),

    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "startButtonGild",
    frames: this.anims.generateFrameNumbers("startButton", {
      start: 1,
      end: 19,
    }),

    frameRate: 15,
    repeat: -1,
  });
};

pressStart.update = function () {
  background_pressStart.anims.play("backgroundLoop", true);

  if (keyENTER.isDown) {
    startButton.anims.play("startButtonGild", true);
    this.scene.start("Main Menu");
  }
};

export { pressStart };
