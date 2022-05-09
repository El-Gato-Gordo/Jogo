var mainMenu = new Phaser.Scene("Main Menu");

var logo;
var logoPlayed = false;


mainMenu.preload = function () {

    this.load.spritesheet("LOGO_Intro", "assets/spritesheets/LOGO_Intro.png", {
        frameWidth: 800,
        frameHeight: 600
    });
};
mainMenu.create = function () {
    ;

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

        frameRate: 10,
        repeat: -1,
    });
};
mainMenu.update = function () {
    if (logoPlayed === false) {
        logo.anims.play("logoIntro", true);
        if (logo.frames === 47) {
            logoPlayed = true;
            logo.setFrame(47);

        }
    }

};
export { mainMenu };
