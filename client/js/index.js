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
    default: "game-container",
    arcade: {
      gravity: { y: 900 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },

  scene: [gameOver]
};
//pressStart;
var game = new Phaser.Game(config);

//Só foi modular o jogo que o personagem ficou bugado daquele jeito na hora de andar
