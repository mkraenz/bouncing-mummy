import { IBoundaryCollisionDetection } from "./iBoundaryCollisionDetection";
import { IReflector } from "./iReflector";

export class Reflector implements IReflector {
    constructor(private detector: IBoundaryCollisionDetection) {}

    public getReflected(vec: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        if (this.detector.hitsVertical()) {
            return this.reflectOverYAxis(vec);
        }
        if (this.detector.hitsHorizontal()) {
            return this.reflectOverXAxis(vec);
        }
        throw new Error("won't hit boundary in next update");
    }

    private reflectOverXAxis(vec: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        return vec.multiply(new Phaser.Math.Vector2(1, -1));
    }

    private reflectOverYAxis(vec: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        return vec.multiply(new Phaser.Math.Vector2(-1, 1));
    }
}
