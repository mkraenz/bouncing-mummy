import { Scene } from "phaser";
import { BoundaryCollisionDetection } from "./collision-detection";
import { CST } from "./constants";
import { Logic } from "./logic";
import { Reflector } from "./reflector";

export class MainScene extends Scene {
    private logic!: Logic;
    private collisionDetector!: BoundaryCollisionDetection;
    private sprite!: Phaser.GameObjects.Sprite;
    private previousVelocity!: Phaser.Math.Vector2;

    constructor() {
        super({
            key: CST.scenes.main
        });
    }

    public preload(): void {
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
        this.sprite = this.createSprite();
        this.createLogic(this.sprite);
        this.sprite.setRotation(this.logic.velocity.angle());
        this.addAnim();
        this.addSound();
    }

    public update(): void {
        this.previousVelocity = this.logic.velocity.clone();
        this.logic.move();
        this.updateGraphics();
    }

    private createSprite(): Phaser.GameObjects.Sprite {
        return this.add.sprite(-1000, -1000, CST.images.mummy).setScale(2);
    }

    private createLogic(sprite: Phaser.GameObjects.Sprite) {
        this.logic = new Logic();
        this.collisionDetector = new BoundaryCollisionDetection(
            this.logic.pos,
            this.logic.velocity,
            this.game.canvas,
            sprite
        );
        const reflector = new Reflector(this.collisionDetector);
        this.logic.setCollisionDetection(this.collisionDetector);
        this.logic.setReflector(reflector);
        this.previousVelocity = this.logic.velocity;
    }

    private updateGraphics(): void {
        this.sprite.setPosition(this.logic.pos.x, this.logic.pos.y);
        if (this.hitsBoundary()) {
            this.sprite.setRotation(this.logic.velocity.angle());
        }
        if (this.collisionDetector.hitsVertical()) {
            this.sprite.toggleFlipY();
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
        this.sprite.anims.load(CST.anims.walk);
        this.sprite.anims.play(CST.anims.walk);
    }

    private addSound(): void {
        this.sound.add(CST.sounds.growl).play("", { loop: true });
    }
}
