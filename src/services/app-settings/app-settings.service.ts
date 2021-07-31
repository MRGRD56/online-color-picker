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
        isGridEnabled: false,
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
        isInvertedDragScrolling: boolean,
        dragScrollingSpeed: number,
        autoCopyColor: ColorFormat | null,
        colorMode: ColorMode,
        colorPixelsCount: number
    } = {
        isInvertedDragScrolling: false,
        dragScrollingSpeed: 1,
        autoCopyColor: null,
        colorMode: ColorMode.Auto,
        colorPixelsCount: 1
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
            this.magnifier.isGridEnabled = settings.magnifier.isGridEnabled;
            this.colorPicker.colorPixelsCount = settings.colorPicker.colorPixelsCount;
            this.colorPicker.dragScrollingSpeed = settings.colorPicker.dragScrollingSpeed;
            this.colorPicker.autoCopyColor = settings.colorPicker.autoCopyColor;
            this.colorPicker.colorMode = settings.colorPicker.colorMode;
            this.colorPicker.isInvertedDragScrolling = settings.colorPicker.isInvertedDragScrolling;
        } catch (error) {
            this.save();
            console.warn("Failed to load settings from the localStorage, the saved settings overwritten.");
        }
    }

    public save() {
        localStorage.setItem("app-settings", JSON.stringify(this));
    }
}
