import { mainMenu } from "./mainMenu.js";

var gameOver = new Phaser.Scene("Game Over");
var background;
var restartButton;
var keyENTER; //Não funciona, no log se tento verificar a varíavel, diz que não está definida

gameOver.preload = function () {
  this.load.image("gameOver_bg", "../assets/background/gameOver_bg.png");

  this.load.spritesheet("startButton", "../assets/hud/start_button.png", {
    frameWidth: 192,
    frameHeight: 192,
  });
};

gameOver.create = function () {
  keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Enter

  //this.add.image(400, 300, "gameOver_bg"); //.setScale(2);
  restartButton = this.physics.add.sprite(400, 300, "startButton");

  this.anims.create({
    key: "startButtonGild",
    frames: this.anims.generateFrameNumbers("startButton", {
      start: 1,
      end: 19,
    }),
    frameRate: 15,
    repeat: -1,
  });

  restartButton.anims.play("startButtonGild", true);
};

gameOver.update = function () {
  if (keyENTER.isDown) {
    //startButton.anims.play("startButtonGild", true);
    this.scene.start("Main Menu");
  }
};

export { gameOver };
