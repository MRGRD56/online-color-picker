import Point from "./Point";

export default interface Pixel {
    screenPosition: Point;
    position: Point;
    hex: string;
    rgb: string;
}
