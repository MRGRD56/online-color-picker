export default class Point {
    constructor(public readonly x: number, public readonly y: number) {
    }

    public withX(x: number) {
        return new Point(x, this.y);
    }

    public withY(y: number) {
        return new Point(this.x, y);
    }
}
