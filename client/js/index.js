//Importar cenas
import { pressStart } from "./pressStart.js";
import { mainMenu } from "./mainMenu.js";
import { firstLevel } from "./firstLevel.js";
import { gameOver } from "./gameOver.js";
import { endingScene } from "./endingScene.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "arcade",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },

  scene: [pressStart, mainMenu]
};

//pressStart;
var game = new Phaser.Game(config);
