import {ColorMode} from "./ColorMode";
import {getColorHex, getColorRgb} from "../extensions/colors";

export default class Color {
    constructor(public r: number,
                public g: number,
                public b: number,
                public a: number) {
    }

    private isRgbaMode(colorMode: ColorMode): boolean {
        return colorMode === ColorMode.Rgba
            ? true
            : colorMode === ColorMode.Auto && this.a < 255;
    }

    private getAlpha(colorMode: ColorMode): number | undefined {
        return this.isRgbaMode(colorMode) ? this.a : undefined;
    }

    public getHex(colorMode: ColorMode): string {
        return getColorHex(this.r, this.g, this.b, this.getAlpha(colorMode));
    }

    public getRgb(colorMode: ColorMode): string {
        return getColorRgb(this.r, this.g, this.b, this.getAlpha(colorMode));
    }

    public equals(color: Color) {
        return this.r === color.r
            && this.g === color.g
            && this.b === color.b
            && this.a === color.a;
    }
}
