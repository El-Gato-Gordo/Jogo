var mainGame = new Phaser.Scene("Main Game");

//Declaração de objetos
var player;
var platforms;
var eye; //BICHO PAPÃO!!
var fullScreen_button;

var playerX;
var playerY;
var bhp_bar;
var psc_counter;
var cursors;
var gameOver = false;
var isPaused;
var rustedGateLoop = 0;

//Declaração de variáveis de estado
var php = 5; //Define HP do Cavaleiro e Mago
var pmn = 3; //Define Mana do Mago

var wasJumping = false; //Serve para tocar o som de aterrisagem, assim muda a variável e toca o som

var MK_onGround = false;
var MK_overlapBoss = false;

var SFX_Land;
var SFX_knightHit;
var SFX_swordHit;
var SFX_swordSwing;
var SFX_mageParry; 
var SFX_mageDeflected; 
var SFX_mageLeap;
var SFX_mageFireball;

var MUSIC_preparing1;
var MUSIC_preparing2;
var MUSIC_rustedGate;

var VFX_yOffset = 0;

var vfx_mageParry;

var airSpeed = 0; //Aceleração no ar

var jumpTimer = 0; //Tempo no ar
var jumpTune = 0; //

var last_direction = "R"; //Verifica qual a última direção que o jogador se moveu
var MK_isRunning = false;

var MK_isAttacking = false;
var MK_attackDuration = 0;
var MK_canAttack = true;
var MK_attackCooldown = 0;

var MK_isEvading = false;
var MK_evadeDuration = 0;
var MK_justEvaded = false;
var MK_evadeCooldown = 0;

var MK_isCasting = false;
var MK_justCasted = false;
var MK_castCooldown = 0;

var MK_isParrying = false;
var MK_parryDuration = 0;
var MK_justParried = false;
var MK_parryCooldown = 0;
var MK_canParry = true;

var preparingCount = 0;
var pointer;

//Olhão!!

var EYE_justHit = false; //Se o jogador acabou de acertar o bicho
var EYE_hitCooldown; //Cooldown para poder acertar de novo
var EYE_healthPower = 100;

var EYE_isAwakened = false;
var EYE_cycleValue = 0;
var EYE_isActing = false;
var EYE_actionChoice = 0;
var EYE_isDead = false;
var EYE_isDying = 0

var EYE_awakeningDuration = 0;
var EYE_dyingDuration = 0;

var EYE_actionDuration = 0;
var EYE_moveDurationX = 0;
var EYE_moveDurationY = 0;

var PROJECTILE_electricOrb;
var PROJECTILE_eyeCurse;
var PROJECTILE_mageSpell;

var UP_isPressed = false;
var RIGHT_isPressed = false;
var LEFT_isPressed = false;
var CIRCLE_isPressed = false;
var SQUARE_isPressed = false;

var BUTTON_CIRCLE;
var BUTTON_SQUARE;
var BUTTON_UP;
var BUTTON_RIGHT;
var BUTTON_LEFT;

var playersOnline = false;


//Declarando teclas do jogo

//Cavaleiro
let keyA;
let keyS;
let keyD;
let keyW;
let keyJ;
let keyK;
var keyP;

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

//Hospedagem e MP
var jogador;
var socket;
var ice_servers = {
  iceServers: [
    {
      urls: "stun:ifsc.cloud",
    },
    {
      urls: "turns:ifsc.cloud",
      username: "etorresini",
      credential: "matrix",
    },
  ],
};

var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");
var sala;


//PRELOAD
mainGame.preload = function () {
  //Plano de fundo
  this.load.image("MAP_background", "./assets/background/MAP_background.png");

  //Tileset e personagens
  this.load.image("MAP_floor", "./assets/background/MAP_floor.png");

  this.load.audio("SFX_Land", ["./assets/sfx/SFX_Land.wav"]);
  this.load.audio("SFX_swordHit", ["./assets/sfx/SFX_swordHit.wav"]);
  this.load.audio("SFX_swordSwing", ["./assets/sfx/SFX_swordSwing.wav"]);
  this.load.audio("SFX_knightHit", ["./assets/sfx/SFX_knightHit.wav"]);
  this.load.audio("SFX_mageFireball", ["./assets/sfx/SFX_mageFireball.wav"]);
  this.load.audio("SFX_mageLeap", ["./assets/sfx/SFX_mageLeap.wav"]);
  this.load.audio("SFX_mageParry", ["./assets/sfx/SFX_mageParry.wav"]);
  this.load.audio("SFX_mageDeflected", ["./assets/sfx/SFX_mageDeflected.wav"]);

  this.load.audio("MUSIC_preparing1", [
      "./assets/music/MUSIC_preparing1.wav",
    ]);

    this.load.audio("MUSIC_preparing2", [
      "./assets/music/MUSIC_preparing2.wav",
    ]);

  this.load.audio("MUSIC_rustedGate", ["./assets/music/MUSIC_Rusted_Gate.wav"]);

  this.load.spritesheet(
    "fullScreen_button",
    "./assets/hud/fullScreen_button.png",
    {
      frameWidth: 128,
      frameHeight: 128,
    }
  );

  this.load.spritesheet(
    "BUTTON_CIRCLEK",
    "./assets/buttons/BUTTON_CIRCLEK.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );
  
  this.load.spritesheet(
    "BUTTON_CIRCLEM",
    "./assets/buttons/BUTTON_CIRCLEM.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

this.load.spritesheet(
    "BUTTON_SQUAREK",
    "./assets/buttons/BUTTON_SQUAREK.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

this.load.spritesheet(
    "BUTTON_LEFTK",
    "./assets/buttons/BUTTON_LEFTK.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

  this.load.spritesheet(
    "BUTTON_LEFTM",
    "./assets/buttons/BUTTON_LEFTM.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

this.load.spritesheet(
    "BUTTON_RIGHTK",
    "./assets/buttons/BUTTON_RIGHTK.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

  this.load.spritesheet(
    "BUTTON_RIGHTM",
    "./assets/buttons/BUTTON_RIGHTM.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

  this.load.spritesheet(
    "BUTTON_UPK",
    "./assets/buttons/BUTTON_UPK.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

  this.load.spritesheet(
    "BUTTON_UPM",
    "./assets/buttons/BUTTON_UPM.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

    this.load.spritesheet(
    "BUTTON_ROOM1",
    "./assets/buttons/ROOM1.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

     this.load.spritesheet(
    "BUTTON_ROOM2",
    "./assets/buttons/ROOM2.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

     this.load.spritesheet(
    "BUTTON_ROOM3",
    "./assets/buttons/ROOM3.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

     this.load.spritesheet(
    "BUTTON_ROOM4",
    "./assets/buttons/ROOM4.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

     this.load.spritesheet(
    "BUTTON_ROOM5",
    "./assets/buttons/ROOM5.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );


  //Cavaleiro e Mago

  this.load.spritesheet(
    "MK-idleRight",
    "./assets/spritesheets/mageknight/MK-idleRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-idleLeft",
    "./assets/spritesheets/mageknight/MK-idleLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-lookupRight",
    "./assets/spritesheets/mageknight/MK-lookupRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

    this.load.spritesheet(
      "MK-lookupLeft",
      "./assets/spritesheets/mageknight/MK-lookupLeft.png",
      {
        frameWidth: 616,
        frameHeight: 500,
      }
  );
  
  this.load.spritesheet(
    "MK-walkRight",
    "./assets/spritesheets/mageknight/MK-walkRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-walkLeft",
    "./assets/spritesheets/mageknight/MK-walkLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-riseRight",
    "./assets/spritesheets/mageknight/MK-riseRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-riseLeft",
    "./assets/spritesheets/mageknight/MK-riseLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-fallRight",
    "./assets/spritesheets/mageknight/MK-fallRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-fallLeft",
    "./assets/spritesheets/mageknight/MK-fallLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-runRight",
    "./assets/spritesheets/mageknight/MK-runRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-runLeft",
    "./assets/spritesheets/mageknight/MK-runLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-GsideatkRight",
    "./assets/spritesheets/mageknight/MK-GsideatkRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-GsideatkLeft",
    "./assets/spritesheets/mageknight/MK-GsideatkLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-AsideatkRight",
    "./assets/spritesheets/mageknight/MK-AsideatkRight.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "MK-AsideatkLeft",
    "./assets/spritesheets/mageknight/MK-AsideatkLeft.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  //Inimigo

  this.load.spritesheet(
    "bichopapao",
    "./assets/spritesheets/bichopapao.png",
    {
      frameWidth: 150,
      frameHeight: 150,
    }
  );

  //Olhão Louco

  this.load.spritesheet(
    "EYE_electricCharge",
    "./assets/spritesheets/eye/EYE_electricCharge.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "EYE_electricDash",
    "./assets/spritesheets/eye/EYE_electricDash.png",
    {
      frameWidth: 616,
      frameHeight: 500,
    }
  );

  this.load.spritesheet(
    "EYE_heAwakens",
    "./assets/spritesheets/eye/EYE_heAwakens.png",
    {
      frameWidth: 600,
      frameHeight: 600,
    }
  );

  this.load.spritesheet(
    "EYE_idleFloat",
    "./assets/spritesheets/eye/EYE_idleFloat.png",
    {
      frameWidth: 600,
      frameHeight: 600,
    }
  );

  this.load.spritesheet(
    "EYE_slainDead",
    "./assets/spritesheets/eye/EYE_slainDead.png",
    {
      frameWidth: 600,
      frameHeight: 600,
    }
  );

  //Efeitos Visuais

  this.load.spritesheet(
    "VFX_mageParry",
    "./assets/spritesheets/vfx/VFX_mageParry.png",
    {
      frameWidth: 616,
      frameHeight: 528,
    }
  );

  //Projéteis

  this.load.spritesheet(
    "PROJECTILES_spellDown",
    "./assets/spritesheets/projectiles/PROJECTILES_spellDown.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellUp",
    "./assets/spritesheets/projectiles/PROJECTILES_spellUp.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellRight",
    "./assets/spritesheets/projectiles/PROJECTILES_spellRight.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellLeft",
    "./assets/spritesheets/projectiles/PROJECTILES_spellLeft.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellLeftDown",
    "./assets/spritesheets/projectiles/PROJECTILES_spellLeftDown.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

    this.load.spritesheet(
    "PROJECTILES_spellLeftUp",
    "./assets/spritesheets/projectiles/PROJECTILES_spellLeftUp.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellRightUp",
    "./assets/spritesheets/projectiles/PROJECTILES_spellRightUp.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_spellRightDown",
    "./assets/spritesheets/projectiles/PROJECTILES_spellRightDown.png",
    {
      frameWidth: 200,
      frameHeight: 200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_blastOrb",
    "./assets/spritesheets/projectiles/PROJECTILES_blastOrb.png",
    {
      frameWidth: 1200,
      frameHeight: 1200,
    }
  );

  this.load.spritesheet(
    "PROJECTILES_blastImpact",
    "./assets/spritesheets/projectiles/PROJECTILES_blastImpact.png",
    {
      frameWidth: 1200,
      frameHeight: 1200,
    }
  );

  cursors = this.input.keyboard.createCursorKeys();

};

//CREATE
mainGame.create = function () {

  //Conexão do servidor
  socket = io("https://mage0knight.herokuapp.com/");

  sala = 1
  socket.emit("entrar-na-sala", sala);
/*  var mensagem = this.add.text(10, 10, "Sala para entrar:", {
    font: "32px Courier",
    fill: "#ffffff",
  });

  var mensagemEntrada = this.add.text(10, 50, "", {
    font: "32px Courier",
    fill: "#ffff00",
  });

  this.input.keyboard.on("keydown", function (event) {
    if (event.keyCode === 8 && mensagemEntrada.text.length > 0) {
      mensagemEntrada.text = mensagemEntrada.text.substr(
        0,
        mensagemEntrada.text.length - 1
      );
    } else if (
      event.keyCode === 32 ||
      (event.keyCode >= 48 && event.keyCode < 90)
    ) {
      mensagemEntrada.text += event.key;
    } else if (event.keyCode === 13) {
      sala = mensagemEntrada.text;
      console.log("Pedido de entrada na sala %s.", sala);
      mensagem.destroy();
      mensagemEntrada.destroy();
    }
  });
*/
  socket.on("jogadores", (jogadores) => {
    if (jogadores.primeiro === socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
      
    } else if (jogadores.segundo === socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate && socket.emit("candidate", sala, candidate);
          };

          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };

          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit("offer", sala, localConnection.localDescription);
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {

      playersOnline = true;

    }
  });

  socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", sala, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", sala, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  
  //this.cameras.main.setBounds(0, -150, 1000, 800);

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
  this.add.image(400, 300, "MAP_background");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 565, "MAP_floor")

  //Inimigo!
  eye = this.physics.add.sprite(600, 400, "EYE_heAwakens").setImmovable(true)
  eye.body.setAllowGravity(false);
  eye.setCollideWorldBounds(true);
  eye.setSize(130, 130, true);
  this.physics.add.collider(eye, platforms, null, null, this)

  // The player and its settings
  player = this.physics.add.sprite(100, 400, "MK-idleRight").setScale(0.40);
  player.setSize(200, 250, true);
  player.setOffset(207, 250, false);

  //Player physics properties.
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms, function () {
    MK_onGround = true
  });


  //Toque de tela:
  pointer = this.input.addPointer(1);
  //this.cameras.main.startFollow(player);

  vfx_mageParry = this.physics.add.staticSprite(0, 0, "VFX_invisibleThing").setScale(0.30)

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


  //Controles

  if (jogador === 1) {
    BUTTON_CIRCLE = this.physics.add
      .staticSprite(740, 495, "BUTTON_CIRCLEK")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

    BUTTON_SQUARE = this.physics.add
      .staticSprite(690, 550, "BUTTON_SQUAREK")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);
  

    BUTTON_LEFT = this.physics.add
      .staticSprite(50, 550, "BUTTON_LEFTK")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);


    BUTTON_RIGHT = this.physics.add
      .staticSprite(150, 550, "BUTTON_RIGHTK")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);


    BUTTON_UP = this.physics.add
      .staticSprite(100, 500, "BUTTON_UPK")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

  }

  if (jogador === 2) {
    BUTTON_CIRCLE = this.physics.add
      .staticSprite(740, 495, "BUTTON_CIRCLEM")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

    BUTTON_SQUARE = this.physics.add
      .staticSprite(690, 550, "BUTTON_SQUAREM")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

    BUTTON_LEFT = this.physics.add
      .staticSprite(50, 550, "BUTTON_LEFTM")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

    BUTTON_RIGHT = this.physics.add
      .staticSprite(150, 550, "BUTTON_RIGHTM")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);

    BUTTON_UP = this.physics.add
      .staticSprite(100, 500, "BUTTON_UPM")
      .setScale(0.7)
      .refreshBody()
      .setInteractive()
      .setScrollFactor(0);
  }

  BUTTON_RIGHT.on(
    "pointerover",
    function () {
      RIGHT_isPressed = true;
      MK_isRunning = true;

    },
    this,
  )

  BUTTON_LEFT.on(
    "pointerover",
    function () {
      LEFT_isPressed = true;
      MK_isRunning = true;

    },
    this,
  )
  
  BUTTON_CIRCLE.on(
    "pointerover",
    function () {
      CIRCLE_isPressed = true;
    },
    this,
  )

  BUTTON_SQUARE.on(
    "pointerover",
    function () {
      SQUARE_isPressed = true;
    },
    this,
  )

  BUTTON_UP.on(
    "pointerover",
    function () {
      UP_isPressed = true;
    },
    this,
  );

  //Sem apertar
  BUTTON_RIGHT.on(
    "pointerout",
    function () {
      RIGHT_isPressed = false;
      MK_isRunning = false;
    },
    this,
  )

  BUTTON_UP.on(
    "pointerout",
    function () {
      UP_isPressed = false;
    },
    this,
  )
  BUTTON_LEFT.on(
    "pointerout",
    function () {
      LEFT_isPressed = false;
      MK_isRunning = false;

    },
    this,
  )

  BUTTON_CIRCLE.on(
    "pointerout",
    function () {
      CIRCLE_isPressed = false;
    },
    this,
  )

  BUTTON_SQUARE.on(
    "pointerout",
    function () {
      SQUARE_isPressed = false;
    },
    this,
  )

  this.physics.add.overlap(eye, player, function () {
    MK_overlapBoss = true;
    
    if (MK_isAttacking === true && EYE_justHit === false) {
    SFX_swordHit.play()
    EYE_healthPower = EYE_healthPower - 1;
    eye.tint = 0xff0000
    EYE_justHit = true;
    EYE_hitCooldown = 25;
    }}, null, this);

  //SONS
  SFX_Land = this.sound.add("SFX_Land", { loop: false });
  SFX_knightHit = this.sound.add("SFX_knightHit", { loop: false });
  SFX_swordHit = this.sound.add("SFX_swordHit", { loop: false });
  SFX_swordSwing = this.sound.add("SFX_swordSwing", { loop: false });
  SFX_mageParry = this.sound.add("SFX_mageParry", { loop: false });
  SFX_mageDeflected = this.sound.add("SFX_mageDeflected", { loop: false });
  SFX_mageLeap = this.sound.add("SFX_mageLeap", { loop: false });
  SFX_mageFireball = this.sound.add("SFX_mageFireball", { loop: false });

  MUSIC_preparing1 = this.sound.add("MUSIC_preparing1", { loop: false });
  MUSIC_preparing2 = this.sound.add("MUSIC_preparing2", { loop: true });
  MUSIC_rustedGate = this.sound.add("MUSIC_rustedGate", { loop: true });



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
    key: "MK-lookupRight",
    frames: this.anims.generateFrameNumbers("MK-lookupRight", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

   this.anims.create({
     key: "MK-lookupLeft",
     frames: this.anims.generateFrameNumbers("MK-lookupLeft", {
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
    frameRate: 11,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-walkLeft",
    frames: this.anims.generateFrameNumbers("MK-walkLeft", {
      start: 0,
      end: 5,
    }),
    frameRate: 11,
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

  this.anims.create({
    key: "MK-runRight",
    frames: this.anims.generateFrameNumbers("MK-runRight", {
      start: 0,
      end: 5,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-runLeft",
    frames: this.anims.generateFrameNumbers("MK-runLeft", {
      start: 0,
      end: 5,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-GsideatkRight",
    frames: this.anims.generateFrameNumbers("MK-GsideatkRight", {
      start: 0,
      end: 3,
    }),
    frameRate: 18,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-GsideatkLeft",
    frames: this.anims.generateFrameNumbers("MK-GsideatkLeft", {
      start: 0,
      end: 3,
    }),
    frameRate: 18,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-AsideatkRight",
    frames: this.anims.generateFrameNumbers("MK-AsideatkRight", {
      start: 0,
      end: 2,
    }),
    frameRate: 15,
    repeat: -1,
  });

  this.anims.create({
    key: "MK-AsideatkLeft",
    frames: this.anims.generateFrameNumbers("MK-AsideatkLeft", {
      start: 0,
      end: 2,
    }),
    frameRate: 15,
    repeat: -1,
  });

  //Animações Inimigo
  this.anims.create({
    key: "bichopapao",
    frames: this.anims.generateFrameNumbers("bichopapao", {
      start: 0,
      end: 4,
    }),
    frameRate: 16,
    repeat: -1,
  });

  //Animações do Olhão Louco!

  this.anims.create({
    key: "EYE_electricCharge",
    frames: this.anims.generateFrameNumbers("EYE_electricCharge", {
      start: 0,
      end: 1,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "EYE_electricDash",
    frames: this.anims.generateFrameNumbers("EYE_electricDash", {
      start: 0,
      end: 1,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "EYE_heAwakens",
    frames: this.anims.generateFrameNumbers("EYE_heAwakens", {
      start: 0,
      end: 25,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "EYE_idleFloat",
    frames: this.anims.generateFrameNumbers("EYE_idleFloat", {
      start: 0,
      end: 15,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "EYE_slainDead",
    frames: this.anims.generateFrameNumbers("EYE_slainDead", {
      start: 0,
      end: 9,
    }),
    frameRate: 16,
    repeat: -1,
  });
  

  //Animações de Efeitos Visuais

  this.anims.create({
    key: "VFX_mageParry",
    frames: this.anims.generateFrameNumbers("VFX_mageParry", {
      start: 0,
      end: 7,
    }),
    frameRate: 20,
    repeat: 0,
  });


  //Animações dos Projéteis

  this.anims.create({
    key: "PROJECTILES_blastOrb",
    frames: this.anims.generateFrameNumbers("PROJECTILES_blastOrb", {
      start: 0,
      end: 1,
    }),
    frameRate: 20,
    repeat: -1,
  });

  this.anims.create({
    key: "PROJECTILES_blastImpact",
    frames: this.anims.generateFrameNumbers("PROJECTILES_blastImpact", {
      start: 0,
      end: 7,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellDown",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellDown", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellUp",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellUp", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellRight",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellRight", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellLeft",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellLeft", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellRightUp",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellRightUp", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellRightDown",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellRightDown", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellLeftUp",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellLeftUp", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });

  this.anims.create({
    key: "PROJECTILES_spellLeftDown",
    frames: this.anims.generateFrameNumbers("PROJECTILES_spellLeftDown", {
      start: 0,
      end: 3,
    }),
    frameRate: 16,
    repeat: 0,
  });


};


//UPDATE
mainGame.update = function () {

  //Preparing Loop START
  if (playersOnline === false) {

    if (preparingCount === 0) {
     preparingCount = preparingCount + 1
     MUSIC_preparing1.play()
    }
    if (preparingCount > 0 && preparingCount < 3480)
    {
      preparingCount = preparingCount + 1;

     }

    if (preparingCount === 3480) {
     preparingCount = preparingCount + 1
     MUSIC_preparing2.play();
    }

    if (preparingCount > 3480 && preparingCount < 6960) {
       preparingCount = preparingCount + 1;

    }

    if (preparingCount === 6960) {
      preparingCount = 3480
    }
  }

  //Preparing Loop END

  if (playersOnline === true) {
    MUSIC_preparing1.stop();
    MUSIC_preparing2.stop();

    if (rustedGateLoop === 0) {
      rustedGateLoop = rustedGateLoop + 1
      MUSIC_rustedGate.play();
    }
    
    if (rustedGateLoop > 0 && rustedGateLoop < 3480) {
      rustedGateLoop = rustedGateLoop + 1
    }

    if (rustedGateLoop === 3480) {
      rustedGateLoop = 0
    }

    if (MK_isParrying === true) {
      MK_parryDuration = MK_parryDuration + 1;
      if (MK_parryDuration <= 10) {
        VFX_yOffset = player.y + 55
        vfx_mageParry.setPosition(player.x, VFX_yOffset);
        vfx_mageParry.anims.play("VFX_mageParry", false)
        SFX_mageParry.play();
      }

      if (MK_parryDuration >= 18) {
        MK_isParrying = false;
        MK_canParry = false;
        MK_parryCooldown = 100;

      }
    }

    if (MK_isParrying === false && MK_canParry === false) {
    
      MK_parryCooldown = MK_parryCooldown - 1
      if (MK_parryCooldown <= 0) {
        MK_canParry = true;
        MK_parryDuration = 0;
      }
    }

    if (player.body.touching.down === false) {
      MK_onGround = false;
    }
    MK_overlapBoss = false;

    //PULAR INÍCIO
    if (SQUARE_isPressed === true && MK_isAttacking === false && jogador === 1) {
  
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


    //Aparo de Ataques
  
    if (CIRCLE_isPressed && MK_isParrying === false && MK_canParry === true && jogador === 2) {
      MK_isParrying = true;
    }
    //Ataques Laterais
    if (CIRCLE_isPressed && MK_isEvading === false && MK_isAttacking === false && MK_canAttack === true && jogador === 1) {
      MK_isAttacking = true
      SFX_swordSwing.play()
    }

    if (MK_isAttacking === false && MK_canAttack === false) {
      if (wasJumping === true && MK_onGround === true) {
        MK_canAttack = true;
        MK_attackCooldown = 0;
        MK_attackDuration = 0;
      }
      MK_attackCooldown = MK_attackCooldown - 1
      if (MK_attackCooldown <= 0) {
        MK_canAttack = true;
        MK_attackDuration = 0;
      }
    }

    if (EYE_justHit === true) {
      EYE_hitCooldown = EYE_hitCooldown - 1
      if (EYE_hitCooldown <= 8) {
        eye.tint = 0xffffff
      }
      if (EYE_hitCooldown <= 0) {
        EYE_justHit = false;
      }
    }

    //SE ESTÁ NO CHÃO
    if (player.body.touching.down && MK_onGround === true && MK_overlapBoss === false) {

      if (wasJumping === true) {
        SFX_Land.play();
        wasJumping = false;
      }

      if (MK_isAttacking === true) {
        if (last_direction === "R") {
          player.setSize(400, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-GsideatkRight", true)
        }
        else if (last_direction === "L") {
          player.setSize(400, 250, true);
          player.setOffset(9, 250, false);
          player.anims.play("MK-GsideatkLeft", true)
        }
        MK_attackDuration = MK_attackDuration + 1;
        if (MK_attackDuration >= 13) {
          MK_isAttacking = false;
          MK_canAttack = false;
          MK_attackCooldown = 10;
        }
      }

      //ANDAR E CORRER INÍCIO
      if (RIGHT_isPressed && MK_isAttacking === false && MK_isEvading === false && jogador === 1) {

        last_direction = "R";

        if (MK_isRunning === false) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.setVelocityX(115);
          player.anims.play("MK-walkRight", true);
        } else {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.setVelocityX(350);
          player.anims.play("MK-runRight", true);
        }

      } else if (LEFT_isPressed && MK_isAttacking === false && MK_isEvading === false && jogador === 1) {

        last_direction = "L";

        if (MK_isRunning === false) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.setVelocityX(-115);
          player.anims.play("MK-walkLeft", true);
        } else {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.setVelocityX(-350);
          player.anims.play("MK-runLeft", true);
        }
      } else {
        player.setVelocityX(0);
      }

      //ANDAR E CORRER FIM

      //PARADO INÍCIO
      if (player.body.velocity.x === 0 && MK_isAttacking === false) {
        if (last_direction === "R" && UP_isPressed === false && jogador === 1) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-idleRight", true);
        }

        if (last_direction === "R" && UP_isPressed === true && jogador === 1) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-lookupRight", true);
        }

        if (last_direction === "L" && UP_isPressed === false && jogador === 1) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-idleLeft", true);
        }

        if (last_direction === "L" && UP_isPressed === true && jogador === 1) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-lookupLeft", true);
        }
      }

      //PARADO FIM
    } else {

      //SE ESTÁ NO AR
      wasJumping = true;
      if (MK_isAttacking === true) {
        if (last_direction === "R") {
          player.setSize(400, 450, true);
          player.setOffset(207, 50, false);
          player.anims.play("MK-AsideatkRight", true)
        }
        else if (last_direction === "L") {
          player.setSize(400, 450, true);
          player.setOffset(9, 50, false);
          player.anims.play("MK-AsideatkLeft", true)
        }
        MK_attackDuration = MK_attackDuration + 1;
        if (MK_attackDuration <= 5) {
          player.setVelocityY(-150)
        }
        if (MK_attackDuration >= 16) {
          MK_isAttacking = false;
          MK_canAttack = false;
          MK_attackCooldown = 100;
        }
      }

      if (last_direction === "R" && MK_isAttacking === false && MK_isEvading === false) {
        if (player.body.velocity.y < 0) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-riseRight", true);
        } else if (player.body.velocity.y > 0) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-fallRight", true);
        }
      } else if (last_direction === "L" && MK_isAttacking === false && MK_isEvading === false) {
        if (player.body.velocity.y < 0) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
          player.anims.play("MK-riseLeft", true);
        } else if (player.body.velocity.y > 0) {
          player.setSize(200, 250, true);
          player.setOffset(207, 250, false);
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
  
    //Loop do Boss


    if (EYE_isAwakened === false) {
      EYE_awakeningDuration = EYE_awakeningDuration + 1

      if (EYE_awakeningDuration >= 0 && EYE_awakeningDuration <= 95) {
        eye.anims.play("EYE_heAwakens", true);
      }

      if (EYE_awakeningDuration > 95 && EYE_awakeningDuration <= 120) {

        eye.setVelocityX(-75)
        eye.setVelocityY(-75)
        eye.anims.play("EYE_idleFLoat", true)

      }

      if (EYE_awakeningDuration > 95) {
        EYE_isAwakened = true;
      }
    }

  
    if (EYE_isAwakened === true && EYE_isDead === false) {

      if (EYE_isActing === false) {
        EYE_cycleValue = EYE_cycleValue + 1
        eye.setVelocityX(0)
        eye.setVelocityY(0)
        eye.anims.play("EYE_idleFloat", true);

        if (EYE_cycleValue >= 0 && EYE_cycleValue <= 30) {
          eye.setVelocityX(-350)
          eye.setVelocityY(-400)
        }

        if (EYE_cycleValue > 30 && EYE_cycleValue <= 50) {
          eye.setVelocityX(-110)
        }

      }


    }
  }
  };

export { mainGame };