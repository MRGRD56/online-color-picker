import {BigInteger} from "@angular/compiler/src/i18n/big_integer";

export function getColorHex(r: number, g: number, b: number, a: number | undefined = undefined) {
    if (r > 255 || g > 255 || b > 255 || (a !== undefined && a > 255))
        throw new Error("Invalid color component(s)");
    const isRgba = a !== undefined;
    const hex = isRgba
        ? ((BigInt(r) << BigInt(0x18)) | BigInt(g << 0x10) | BigInt(b << 0x8) | BigInt(a!)).toString(16)
        : ((r << 0x10) | (g << 0x8) | b).toString(16);
    return "#" + ((isRgba ? "00000000" : "000000") + hex).slice(isRgba ? -8 : -6);
}

export function getColorRgb(r: number, g: number, b: number, a: number | undefined = undefined) {
    if (r > 255 || g > 255 || b > 255 || (a !== undefined && a > 255))
        throw new Error("Invalid color component(s)");
    const isRgba = a !== undefined;
    return isRgba
        ? `rgba(${r},${g},${b},${Math.round((a! + Number.EPSILON) / 255 * 100) / 100})`
        : `rgb(${r},${g},${b})`;
}
