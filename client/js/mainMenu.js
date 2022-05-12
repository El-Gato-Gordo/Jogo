var mainMenu = new Phaser.Scene("Main Menu");

var logo;
var fullScreen_button;
var logoPlayed = false;

mainMenu.preload = function () {

    this.load.spritesheet("fullScreen_button", "assets/hud/fullScreen_button.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("LOGO_Intro", "assets/spritesheets/LOGO_Intro.png", {
        frameWidth: 800,
        frameHeight: 600
    });

    this.load.spritesheet("fullScreen_button", "assets/hud/fullScreen_button.png", {
        frameWidth: 128,
        frameHeight: 128
    });
};

mainMenu.create = function () {

    fullScreen_button = this.physics.add.staticSprite(
        760,
        560,
        "fullScreen_button"
    ).setScale(0.7).setInteractive().setScrollFactor(0);
        
    
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

    logo = this.physics.add.staticSprite(
        400,
        300,
        "LOGO_Intro"
    );

    this.anims.create({
        key: "logoIntro",
        frames: this.anims.generateFrameNumbers("LOGO_Intro", {
            start: 0,
            end: 47,
        }),

        frameRate: 20,
        repeat: 1,
    });
};

mainMenu.update = function () {
    if (logoPlayed === false) {
        logo.anims.play("logoIntro", true);
        if (logo.currentFrame === 47) {
            logoPlayed = true;
            logo.setFrame(47);

        }
    }

};

export { mainMenu };
