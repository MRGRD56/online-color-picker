import {Injectable} from '@angular/core';
import {ColorFormat} from "../../models/ColorFormat";
import {ColorMode} from "../../models/ColorMode";

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    public pixelInfoPopup = {
        scaledImageSize: 11,
        elementWidth: 150,
        get elementSize(): { width: number, height: number } {
            return {
                width: this.elementWidth,
                get height(): number {
                    return this.width + 30;
                }
            };
        }
    };

    public colorPicker: {
        isReversedDragScrolling: boolean,
        dragScrollingSpeed: number,
        autoCopyColor: ColorFormat | null,
        colorMode: ColorMode
    } = {
        isReversedDragScrolling: false,
        dragScrollingSpeed: 1,
        autoCopyColor: null,
        colorMode: ColorMode.Rgb
    }
}
