// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');


gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0,0);

  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
// scale down
  this.player.setScale(0.5);

  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

   this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
};

gameScene.update = function() {

  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameOver();
  }

  if (this.input.activePointer.isDown) {
   this.player.x += this.playerSpeed;
  }
};



// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
