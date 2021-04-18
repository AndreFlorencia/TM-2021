let gameScene = new Phaser.Scene('Game');
var player,cursors,block,bg,bomb,bombcounter=1;
//load assets
gameScene.preload = function(){

  this.load.spritesheet('flame','assets/Flame/Flame_f00.png', {
    frameWidth: 48, frameHeight: 48});
  this.load.spritesheet('bomb', 'assets/Bomb/Bomb_f01.png', {
    frameWidth: 48, frameHeight: 48});
  this.load.image('background', 'assets/Blocks/BackgroundTile.png');
  this.load.image('block', 'assets/Blocks/SolidBlock.png');
  this.load.spritesheet('player', 'assets/Bomberman/front.png', {
      frameWidth: 64, frameHeight: 128});
  this.load.spritesheet('playerS', 'assets/Bomberman/side.png', {
    frameWidth: 64, frameHeight: 128});
  this.load.spritesheet('playerB', 'assets/Bomberman/back.png', {
    frameWidth: 64, frameHeight: 128});
};

gameScene.create = function(){
    this.bombas=this.physics.add.group();
    this.block=this.physics.add.staticGroup();
    this.bg=this.physics.add.staticGroup();
  for(var i=1;i<15;i++){
    for(var k=1;k<11;k++){
      this.bg.create(32+64*i,32+64*k,'background');
    }
  }
  for(var i =0;i<16;i++){

   this.block.create(32+64*i,32,'block');
   this.block.create(32+64*i,736,'block');
  }
  for(var k =1;k<11;k++){
    this.block.create(32,32+64*k,'block');
    this.block.create(992,32+64*k,'block');
  }
  this.player=this.physics.add.sprite(100,450,'player');

  this.physics.add.collider(this.player,this.block);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('playerS', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('playerS', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('playerB', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'bomba',
    frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chama',
    frames: this.anims.generateFrameNumbers('flame', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,

  });
  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(this.bombas,this.player);



}


gameScene.update = function(){

  if(cursors.space.isDown){
      if(bombcounter>=0) {
          bombcounter--;
         var bomba = new Bomba(this);
         setTimeout(function() { onEvent(bomba); }, 5000);
      }
  }
  if (cursors.left.isDown)
  {
    this.player.setVelocityX(-160);
    this.player.setVelocityY(0);
    this.player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    this.player.setVelocityX(160);
    this.player.setVelocityY(0);
    this.player.anims.play('right', true);
  }
  else if(cursors.up.isDown){
    this.player.setVelocityX(0);
    this.player.setVelocityY(-160);
    this.player.anims.play('up', true);
  }
  else if(cursors.down.isDown){
    this.player.setVelocityX(0);
    this.player.setVelocityY(160);
    this.player.anims.play('down', true);
  }
  else
  {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    this.player.anims.play('turn');
  }


}
function onEvent(bomba){

  bombcounter++;

  bomba.destroy();

}


let config={
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: false
    }
  },
  scene: gameScene
};

let game = new Phaser.Game(config);