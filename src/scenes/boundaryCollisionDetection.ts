import { IBoundaryCollisionDetection } from "./iBoundaryCollisionDetection";
import { IDimensions } from "./IDimensions";
import { ISimpleBoundaryCollisionDetection } from "./iSimpleCollisionDetection";

export class BoundaryCollisionDetection
    implements ISimpleBoundaryCollisionDetection, IBoundaryCollisionDetection {
    private posInNextFrame!: Phaser.Math.Vector2;

    constructor(
        private originalPos: Phaser.Math.Vector2,
        private velocity: Phaser.Math.Vector2,
        private canvas: IDimensions,
        private halfCollisionBox: IDimensions
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
            this.canvas.width - this.halfCollisionBox.width
        );
    }

    private hitsBottom(): boolean {
        this.updatePos();
        return (
            this.posInNextFrame.y >=
            this.canvas.height - this.halfCollisionBox.height
        );
    }

    private hitsTop(): boolean {
        this.updatePos();
        return this.posInNextFrame.y <= 0 + this.halfCollisionBox.height;
    }

    private hitsLeft(): boolean {
        this.updatePos();
        return this.posInNextFrame.x <= 0 + this.halfCollisionBox.width;
    }

    private updatePos() {
        const currentPos = this.originalPos.clone();
        this.posInNextFrame = currentPos.add(this.velocity);
    }
}
