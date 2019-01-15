import { BoundaryCollisionDetection } from "./collision-detection";
import { Reflector } from "./reflector";

export class Logic {
    public pos = new Phaser.Math.Vector2(700, 100);
    public readonly SPEED = 1;
    public velocity = new Phaser.Math.Vector2(1, 1)
        .normalize()
        .scale(this.SPEED);
    private collisionDetector!: BoundaryCollisionDetection;
    private reflector!: Reflector;

    public setCollisionDetection(detector: BoundaryCollisionDetection) {
        this.collisionDetector = detector;
    }
    public setReflector(reflector: Reflector) {
        this.reflector = reflector;
    }

    public move() {
        if (this.collisionDetector.hitsBoundary()) {
            this.moveStraightThenReflect();
        } else {
            this.moveStraight();
        }
    }

    private moveStraightThenReflect() {
        this.moveStraight(); // hit boundary in this frame
        this.velocity = this.reflector.getReflected(this.velocity);
    }

    private moveStraight() {
        this.pos.add(this.velocity);
    }
}
