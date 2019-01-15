import { Scene } from "phaser";
import { BoundaryCollisionDetection } from "./boundaryCollisionDetection";
import { CST } from "./constants";
import { Logic } from "./logic";
import { Reflector } from "./reflector";

export class MainScene extends Scene {
    private logic!: Logic;
    private collisionDetector!: BoundaryCollisionDetection;
    private mummy!: Phaser.GameObjects.Sprite;
    private previousVelocity!: Phaser.Math.Vector2;

    constructor() {
        super({
            key: CST.scenes.main
        });
    }

    public preload(): void {
        this.load.image("background", "/assets/images/sand.jpg");
        this.load.spritesheet(
            CST.images.mummy,
            "./assets/images/metalslug_mummy37x45.png",
            {
                endFrame: 17,
                frameHeight: 45,
                frameWidth: 37
            }
        );
        this.load.audio("growl", "./assets/sounds/growl.wav");
    }

    public create(): void {
        this.add.image(0, -50, CST.images.background).setOrigin(0);
        this.mummy = this.add
            .sprite(-1000, -1000, CST.images.mummy)
            .setScale(2);
        this.createLogic(this.mummy);
        this.mummy.setRotation(this.logic.velocity.angle());
        this.addAnim();
        this.addSound();
    }

    public update(): void {
        this.previousVelocity = this.logic.velocity.clone();
        this.logic.move();
        this.updateGraphics();
    }

    private createLogic(sprite: Phaser.GameObjects.Sprite) {
        this.logic = new Logic();
        this.collisionDetector = new BoundaryCollisionDetection(
            this.logic.pos,
            this.logic.velocity,
            this.game.canvas,
            sprite
        );
        this.logic.setCollisionDetection(this.collisionDetector);
        this.logic.setReflector(new Reflector(this.collisionDetector));
        this.previousVelocity = this.logic.velocity;
    }

    private updateGraphics(): void {
        this.mummy.setPosition(this.logic.pos.x, this.logic.pos.y);
        if (this.hitsBoundary()) {
            this.mummy.setRotation(this.logic.velocity.angle());
        }
        if (this.collisionDetector.hitsVertical()) {
            this.mummy.toggleFlipY();
        }
    }

    private hitsBoundary(): boolean {
        return !this.previousVelocity.equals(this.logic.velocity);
    }

    private addAnim() {
        this.anims.create({
            frameRate: 20,
            frames: this.anims.generateFrameNumbers(CST.images.mummy, {}),
            key: CST.anims.walk,
            repeat: -1
        });
        this.mummy.anims.load(CST.anims.walk);
        this.mummy.anims.play(CST.anims.walk);
    }

    private addSound(): void {
        this.sound.add(CST.sounds.growl).play("", { loop: true });
    }
}
