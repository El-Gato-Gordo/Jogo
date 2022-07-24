var mainMenu = new Phaser.Scene("Main Menu");

var logo;
var fullScreen_button;
var introAnimDuration = 0;
var MUSIC_Underground

mainMenu.preload = function () {

    this.load.spritesheet("fullScreen_button", "assets/hud/fullScreen_button.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("LOGO_Intro", "assets/spritesheets/LOGO_Intro.png", {
        frameWidth: 800,
        frameHeight: 600
    });

    this.load.spritesheet("play_button", "assets/hud/play_button.png", {
        frameWidth: 400,
        frameHeight: 400
    });

     this.load.audio("MUSIC_Underground", ["./assets/music/MUSIC_Underground.wav"]);
};

mainMenu.create = function () {

    fullScreen_button = this.physics.add.staticSprite(
        760,
        560,
        "fullScreen_button"
    ).setScale(0.7).setInteractive().setScrollFactor(0);
        
    
    fullScreen_button.on(
        "pointerover",
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

    logo = this.physics.add.staticSprite(
        400,
        300,
        "LOGO_Intro"
    );

     play_button = this.physics.add.staticSprite(
        400,
        300,
        "play_button"
    ).setScale(0.7).setInteractive().setScrollFactor(0);

    play_button.on(
        "pointerover",
        function () {
            if (introAnimDuration > 150) {
                play_buton.setFrame(20)
                this.scene.start("Main Game");
            }
        },this
    )

    play_button.on(
      "pointerout",
      function () {
        if (introAnimDuration > 150) {
          play_buton.setFrame(19);
        }
      },
      this
    );


    this.anims.create({
        key: "logoIntro",
        frames: this.anims.generateFrameNumbers("LOGO_Intro", {
            start: 0,
            end: 47,
        }),

        frameRate: 20,
        repeat: 0,
    });

    this.anims.create({
      key: "playButtonIntro",
      frames: this.anims.generateFrameNumbers("play_button", {
        start: 0,
        end: 18,
      }),

      frameRate: 24,
      repeat: 0,
    });

    SFX_Land = this.sound.add("MUSIC_Underground", { loop: true });

};

mainMenu.update = function () {

    MUSIC_Underground.play();
    if (introAnimDuration <= 120) {
        introAnimDuration
            = introAnimDuration
            + 1
        logo.anims.play("logoIntro", false);
    }

    if (introAnimDuration > 120 && introAnimDuration <= 150) {
        introAnimDuration = introAnimDuration + 1

        play_button.anims.play("playBUttonIntro", false)
        
    }
};

export { mainMenu };
