class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/background.png");
    this.load.image("title", "assets/spritesheets/title.png");
    this.load.image("info", "assets/spritesheets/info.png");
    this.load.image("playbutton", "assets/spritesheets/playbutton.png");

    this.load.spritesheet("icons", "assets/spritesheets/icons.png", {
      frameWidth: 150,
      frameHeight: 150
    })
    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    // 1.1 load sounds in both formats mp3 and ogg
    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
  }

  create() {





    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

    this.addGameTitle();


  }
  addGameTitle(){

    // guiGroup is the group which contains all GUI elements
    this.guiGroup = this.add.group();

    // a black overlay is added to cover the entire game area, in the same way
    // we previously added the sky background gradient
    let blackOverlay = this.add.sprite(0, 0, "background");
    blackOverlay.setOrigin(0, 0);
    blackOverlay.displayWidth = game.config.width;
    blackOverlay.displayHeight = game.config.height;
    blackOverlay.alpha = 0.8;

    // then the black overlay is added to guiGroup
    this.guiGroup.add(blackOverlay);

    // add the title
    let title = this.add.sprite(game.config.width / 2, 50, "title");
    title.setOrigin(0.5, 0);
    title.setScale(0.3);


    // add the title to guiGroup
    this.guiGroup.add(title);

    // add play button
    let playButtonX = game.config.width / 2;
    let playButtonY = game.config.height / 2 +20;
    let playButton = this.add.sprite(playButtonX, playButtonY, "playbutton");
    playButton.setScale(0.5);
    // set play button interactive, so it triggers input
    playButton.setInteractive();

    // callback function to execute when the button is released
    playButton.on("pointerup", function(){

      // make the entire guiGroup invisible
      this.guiGroup.toggleVisible();

      // make the entire group inactive
      this.guiGroup.active = false;

      // make the camera flash
      this.cameras.main.flash();

      // call addGameInfo method
      this.addGameInfo();
    }, this);

    // the button too is added to guiGroup
    this.guiGroup.add(playButton);

    // then the button is animated with a yoyo tween
    this.tweens.add({
      targets: [playButton],
      y: game.config.height / 2+50,
      duration: 5000,
      yoyo: true,
      repeat: -1
    })
  }
  addGameInfo(){
    this.scene.start("playGame");
  }
}
