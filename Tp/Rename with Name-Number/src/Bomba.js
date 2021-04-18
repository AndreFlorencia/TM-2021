class Bomba extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, "bomb");

        scene.add.existing(this);
        scene.bombas.add(this);

        this.play("bomba");
        scene.physics.world.enableBody(this);

    }



}