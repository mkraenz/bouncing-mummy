import { IMovable } from "./IMovable";

export class Controls {
    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;

    constructor(
        private movable: IMovable,
        private input: Phaser.Input.InputPlugin
    ) {
        this.left = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.right = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
    }

    public update() {
        if (this.left.isDown) {
            this.movable.moveLeft();
        } else if (this.right.isDown) {
            this.movable.moveRight();
        }
    }
}
