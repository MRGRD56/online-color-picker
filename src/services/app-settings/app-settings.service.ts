import {Injectable} from "@angular/core";
import {ColorFormat} from "../../models/ColorFormat";
import {ColorMode} from "../../models/ColorMode";

@Injectable({
    providedIn: "root"
})
export class AppSettingsService {
    public pixelInfoPopup = {
        scaledImageSize: 11,
        elementWidth: 300,
        get elementSize() {
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

    public load() {
        const settingsJson = localStorage.getItem("app-settings");
        if (settingsJson == null) {
            return;
        }
        const settings = <AppSettingsService>JSON.parse(settingsJson);
        if (settings == null) {
            return;
        }

        this.pixelInfoPopup.scaledImageSize = settings.pixelInfoPopup.scaledImageSize;
        this.pixelInfoPopup.elementWidth = settings.pixelInfoPopup.elementWidth;
        this.colorPicker = settings.colorPicker;
    }

    public save() {
        localStorage.setItem("app-settings", JSON.stringify(this));
    }
}
