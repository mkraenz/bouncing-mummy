import { IReflector } from "./iReflector";
import { ISimpleBoundaryCollisionDetection } from "./iSimpleCollisionDetection";

export class Logic {
    public pos = new Phaser.Math.Vector2(700, 100);
    public readonly SPEED = 3;
    public velocity = this.setInitialVelocity();
    private collisionDetector!: ISimpleBoundaryCollisionDetection;
    private reflector!: IReflector;

    public setCollisionDetection(detector: ISimpleBoundaryCollisionDetection) {
        this.collisionDetector = detector;
    }
    public setReflector(reflector: IReflector) {
        this.reflector = reflector;
    }

    public move() {
        if (this.collisionDetector.hitsBoundary()) {
            this.moveStraightThenReflect();
        } else {
            this.moveStraight();
        }
    }

    private setInitialVelocity() {
        return new Phaser.Math.Vector2(1, 1).normalize().scale(this.SPEED);
    }

    private moveStraightThenReflect() {
        this.moveStraight(); // hit boundary in this frame
        this.velocity = this.reflector.getReflected(this.velocity);
    }

    private moveStraight() {
        this.pos.add(this.velocity);
    }
}
