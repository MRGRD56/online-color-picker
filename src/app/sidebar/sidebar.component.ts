import {Component} from "@angular/core";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";
import {AppSettingsService} from "../../services/app-settings/app-settings.service";
import {ColorMode} from "../../models/ColorMode";
import Pixel from "../../models/Pixel";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                private readonly appSettings: AppSettingsService) {
    }

    public get colorMode(): ColorMode {
        return this.appSettings.colorPicker.colorMode;
    }

    public get selectedPixelColor() {
        return {
            hex: this.colorPickerImageService.selectedPixel?.color.getHex(this.colorMode)
                ?? (this.appSettings.colorPicker.colorMode == ColorMode.Rgba
                    ? "#ffffffff"
                    : "#ffffff"),
            rgb: this.colorPickerImageService.selectedPixel?.color.getRgb(this.colorMode)
                ?? (this.appSettings.colorPicker.colorMode == ColorMode.Rgba
                    ? "rgba(255,255,255,255)"
                    : "rgb(255,255,255)")
        };
    }

    public onHistoryColorClick(pixel: Pixel) {
        this.colorPickerImageService.setSelectedPixel(pixel, false);
    }
}
