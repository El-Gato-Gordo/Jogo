var mainGame = new Phaser.Scene("Main Game");

//Declaração de objetos
var player;
var platforms;
var skull;
var fullScreen_button;

var playerX;
var playerY;
var bhp_bar;
var psc_counter;
var cursors;
var gameOver = false;
var isPaused;

//Declaração de variáveis de estado
var php = 5; //Define HP do Cavaleiro e Mago
var pmn = 3; //Define Mana do Mago

var wasJumping = false; //Serve para tocar o som de aterrisagem, assim muda a variável e toca o som
var SFX_Hit;
var SFX_HitGround;
var SFX_HoverButton;
var SFX_Jump;
var SFX_Land;
var SFX_Parry;
var SFX_ParryHit;
var SFX_SpellCast;
var SFX_Step;

var airSpeed = 0; //Aceleração no ar

var jumpTimer = 0; //Tempo no ar
var jumpTune = 0; //

var last_direction = "R"; //Verifica qual a última direção que o jogador se moveu
var is_running = false;
//Declarando teclas do jogo
let keyP;

//Cavaleiro
let keyA;
let keyS;
let keyD;
let keyW;
let keyJ;
let keyK;

//Ações Mago
let keyNum0;
let keyNum1;
let keyNum2;
let keyNum3;

//Direções Mago
let keyUp;
let keyDown;
let keyRight;
let keyLeft;

//PRELOAD
mainGame.preload = function () {
  //Plano de fundo
  this.load.image("sky", "assets/images/sky.png");

  //Tileset e personagens
  this.load.image("ground", "assets/images/platform.png");


  this.load.spritesheet(
    "fullScreen_button",
    "assets/hud/fullScreen_button.png",
    {
      frameWidth: 128,
      frameHeight: 128
    }
  );

  //Cavaleiro e Mago

  this.load.spritesheet(
    "MK-idleRight",
    "assets/spritesheets/mageknight/MK-idleRight.png",
    {
      frameWidth: 150,
      frameHeight: 150
    }
  );

  this.load.spritesheet(
    "MK-idleLeft",
    "assets/spritesheets/mageknight/MK-idleLeft.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );

  this.load.spritesheet(
    "MK-walkRight",
    "assets/spritesheets/mageknight/MK-walkRight.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );

  this.load.spritesheet(
    "MK-walkLeft",
    "assets/spritesheets/mageknight/MK-walkLeft.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );

  this.load.spritesheet(
    "MK-riseRight",
    "assets/spritesheets/mageknight/MK-riseRight.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );
  
  this.load.spritesheet(
    "MK-riseLeft",
    "assets/spritesheets/mageknight/MK-riseLeft.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );

  this.load.spritesheet(
    "MK-fallRight",
    "assets/spritesheets/mageknight/MK-fallRight.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );
  
  this.load.spritesheet(
    "MK-fallLeft",
    "assets/spritesheets/mageknight/MK-fallLeft.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );
};

//CREATE
mainGame.create = function () {
  this.cameras.main.setBounds(0, -150, 1000, 800);

  //Criando as teclas

  keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

  //Cavaleiro
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // A
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // S
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // D
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // W
  keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); // J
  keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K); // K

  //Mago
  keyNum0 = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO
  ); // Num0
  keyNum1 = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
  ); // Num1
  keyNum2 = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO
  ); // Num2
  keyNum3 = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE
  ); // Num3

  //Setas Direcionais do Mago
  keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // UP
  keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); // DOWN
  keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // RIGHT
  keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // LEFT

  //  A simple background for our game
  this.add.image(400, 300, "sky").setScale(8);

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "MK-idleRight").setScale(0.65);
  player.setSize(90, 110, true);
  player.setOffset(25, 26, true);

  //Player physics properties.
  player.setCollideWorldBounds(false);
  this.physics.add.collider(player, platforms);

  //Now let's create some ledges
  platforms.create(1500, 500, "ground").setScale(5).refreshBody();

  this.cameras.main.startFollow(player);

  fullScreen_button = this.physics.add
    .staticSprite(760, 40, "fullScreen_button")
    .setScale(0.7)
    .setInteractive()
    .setScrollFactor(0);

  fullScreen_button.on(
    "pointerup",
    function () {
      if (this.scale.isFullscreen) {
        fullScreen_button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        fullScreen_button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  //ANIMAÇÕES MAGEKNIGHT

  this.anims.create({
    key: "MK-idleRight",
    frames: this.anims.generateFrameNumbers("MK-idleRight", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-idleLeft",
    frames: this.anims.generateFrameNumbers("MK-idleLeft", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-walkRight",
    frames: this.anims.generateFrameNumbers("MK-walkRight", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-walkLeft",
    frames: this.anims.generateFrameNumbers("MK-walkLeft", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-riseRight",
    frames: this.anims.generateFrameNumbers("MK-riseRight", {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-riseLeft",
    frames: this.anims.generateFrameNumbers("MK-riseLeft", {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-fallRight",
    frames: this.anims.generateFrameNumbers("MK-fallRight", {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-fallLeft",
    frames: this.anims.generateFrameNumbers("MK-fallLeft", {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: -1,
  });

};

//UPDATE
mainGame.update = function () {
  
  //PULAR INÍCIO

  if (keyW.isDown) {
    if (jumpTimer === 0 && player.body.touching.down) {
      //jumpTimer verifica o tempo que o jogador está no ar

      player.setVelocityY(-350); //Altura inicial do salto
      jumpTimer = 1; //Inicia o jumpTimer
    } else if (jumpTimer > 0 && jumpTimer <= 20) {
      //Enquanto o jumpTimer estiver entre 1 e 20, vai adicionar 1 ao jumpTimer e à cada verificação vai alterar a velocidade do Y

      jumpTimer = jumpTimer + 1;
      jumpTune = -350 + jumpTimer * 4; //Assim, a cada jumpTimer, a velocidade será diminuida por um fator 4 em relação ao timer, tudo isso se segurar o W e o time for menor que 20
      player.setVelocityY(jumpTune);
    }
  } else {
    jumpTimer = 0;
  }

  //PULAR FIM

  if (player.body.touching.down) {
    //SE ESTÁ NO CHÃO

    //ANDAR E CORRER INÍCIO

    if (keyD.isDown) {
      player.setSize(90, 110, true);
      player.setOffset(25, 26, true);

      if (is_running === false) {
        player.setVelocityX(115);
        player.anims.play("MK-walkRight", true);
        last_direction = "R";
      } else {
        player.setVelocityX(300);
      }
    } else if (keyA.isDown) {
      player.setSize(90, 110, true);
      player.setOffset(38, 26, true);

      if (is_running === false) {
        player.setVelocityX(-115);
        player.anims.play("MK-walkLeft", true);
        last_direction = "L";
      } else {
        player.setVelocityX(-300);
      }
    } else {
      player.setVelocityX(0);
    }

    //ANDAR E CORRER FIM

    //PARADO INÍCIO
    if (player.body.velocity.x === 0) {
      if (last_direction === "R") {
        player.anims.play("MK-idleRight", true);
      }

      if (last_direction === "L") {
        player.anims.play("MK-idleLeft", true);
      }
    }

    //PARADO FIM
  } else {
    //SE ESTÁ NO AR

    if (last_direction === "R") {
      if (player.body.velocity.y < 0) {
        player.anims.play("MK-riseRight", true);
      } else if (player.body.velocity.y > 0) {
        player.anims.play("MK-fallRight", true);
      }
    } else if (last_direction === "L") {
      if (player.body.velocity.y < 0) {
        player.anims.play("MK-riseLeft", true);
      } else if (player.body.velocity.y > 0) {
        player.anims.play("MK-fallLeft", true);
      }
    }

    if (keyD.isDown && player.body.velocity.x <= 200) {
      airSpeed = player.body.velocity.x + 5;
      player.setVelocityX(airSpeed);
       if (player.body.velocity.x > 0) {
         last_direction = "R";
       }
    }

    //Define a aceleração do jogador no ar, para que não se movimente livremente fora do chão [ESQUERDA]
    if (keyA.isDown && player.body.velocity.x >= -200) {
      airSpeed = player.body.velocity.x - 5;
      player.setVelocityX(airSpeed);
      if (player.body.velocity.x < 0) {
        last_direction = "L"
      }
    }
  }
};

  export { mainGame };
