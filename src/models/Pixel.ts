import Point from "./Point";
import Color from "./Color";

export default interface Pixel {
    screenPosition: Point;
    position: Point;
    color: Color;
    mouseEvent: MouseEvent;
}
