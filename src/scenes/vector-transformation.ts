export function getLeftNormal(vec: Phaser.Math.Vector2) {
    return new Phaser.Math.Vector2(vec.y, -vec.x);
}

export function getRightNormal(vec: Phaser.Math.Vector2) {
    return new Phaser.Math.Vector2(-vec.y, vec.x);
}

export function getLeftUnitNormal(vec: Phaser.Math.Vector2) {
    return getLeftNormal(vec).normalize();
}

export function getRightUnitNormal(vec: Phaser.Math.Vector2) {
    return getRightNormal(vec).normalize();
}
