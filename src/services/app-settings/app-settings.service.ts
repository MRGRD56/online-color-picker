import {Injectable} from "@angular/core";
import {ColorFormat} from "../../models/ColorFormat";
import {ColorMode} from "../../models/ColorMode";

@Injectable({
    providedIn: "root"
})
export class AppSettingsService {
    public magnifier = {
        scaledImageSize: 11,
        elementWidth: 150,
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
        try {
            const settingsJson = localStorage.getItem("app-settings");
            if (settingsJson == null) {
                return;
            }
            const settings = <AppSettingsService>JSON.parse(settingsJson);
            if (settings == null) {
                return;
            }

            this.magnifier.scaledImageSize = settings.magnifier.scaledImageSize;
            this.magnifier.elementWidth = settings.magnifier.elementWidth;
            this.colorPicker = settings.colorPicker;
        } catch (error) {
            this.save();
            console.warn("Failed to load settings from the localStorage, the saved settings overwritten.");
        }
    }

    public save() {
        localStorage.setItem("app-settings", JSON.stringify(this));
    }
}
