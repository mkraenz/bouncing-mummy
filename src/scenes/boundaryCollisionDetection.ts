import { IBoundaryCollisionDetection } from "./iBoundaryCollisionDetection";
import { ISimpleBoundaryCollisionDetection } from "./iSimpleCollisionDetection";

export class BoundaryCollisionDetection
    implements ISimpleBoundaryCollisionDetection, IBoundaryCollisionDetection {
    private posInNextFrame!: Phaser.Math.Vector2;

    constructor(
        private originalPos: Phaser.Math.Vector2,
        private velocity: Phaser.Math.Vector2,
        private canvas: HTMLCanvasElement,
        private sprite: Phaser.GameObjects.Sprite
    ) {
        this.updatePos();
    }

    public hitsBoundary(): boolean {
        return (
            this.hitsRight() ||
            this.hitsLeft() ||
            this.hitsTop() ||
            this.hitsBottom()
        );
    }

    public hitsVertical(): boolean {
        return this.hitsRight() || this.hitsLeft();
    }

    public hitsHorizontal(): boolean {
        return this.hitsBottom() || this.hitsTop();
    }

    private hitsRight(): boolean {
        this.updatePos();
        return (
            this.posInNextFrame.x >=
            this.canvas.width - (this.sprite.width * this.sprite.scaleX) / 2
        );
    }

    private hitsBottom(): boolean {
        this.updatePos();
        return (
            this.posInNextFrame.y >=
            this.canvas.height - (this.sprite.height * this.sprite.scaleY) / 2
        );
    }

    private hitsTop(): boolean {
        this.updatePos();
        return (
            this.posInNextFrame.y <=
            0 + (this.sprite.height * this.sprite.scaleY) / 2
        );
    }

    private hitsLeft(): boolean {
        this.updatePos();
        return (
            this.posInNextFrame.x <=
            0 + (this.sprite.width * this.sprite.scaleX) / 2
        );
    }

    private updatePos() {
        const currentPos = this.originalPos.clone();
        this.posInNextFrame = currentPos.add(this.velocity);
    }
}
