import { IMovable } from "./IMovable";
import { IReflector } from "./iReflector";
import { ISimpleBoundaryCollisionDetection } from "./iSimpleCollisionDetection";
import { getLeftUnitNormal, getRightUnitNormal } from "./vector-transformation";

const SPEED = 3;
const DRAG = 0.03;

export class Logic implements IMovable {
    public pos = new Phaser.Math.Vector2(700, 100);
    public velocity = this.getInitialVelocity(1, 0);
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

    public moveLeft() {
        this.moveInDir(getLeftUnitNormal);
    }

    public moveRight() {
        this.moveInDir(getRightUnitNormal);
    }

    private moveInDir(
        getNormal: (vec: Phaser.Math.Vector2) => Phaser.Math.Vector2
    ): void {
        const slightlyInNormalDir = getNormal(this.velocity).scale(DRAG);
        this.velocity = this.velocity
            .add(slightlyInNormalDir)
            .normalize()
            .scale(SPEED);
    }

    private getInitialVelocity(x: number, y: number) {
        return new Phaser.Math.Vector2(x, y).normalize().scale(SPEED);
    }

    private moveStraightThenReflect() {
        this.moveStraight(); // hit boundary in this frame
        this.velocity = this.reflector.getReflected(this.velocity);
    }

    private moveStraight() {
        this.pos.add(this.velocity);
    }
}
