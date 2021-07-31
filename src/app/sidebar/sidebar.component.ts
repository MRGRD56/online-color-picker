import {Component} from "@angular/core";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";
import {AppSettingsService} from "../../services/app-settings/app-settings.service";
import {ColorMode} from "../../models/ColorMode";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                private readonly appSettings: AppSettingsService) {
    }

    public get selectedPixelColor() {
        return {
            hex: this.colorPickerImageService.selectedPixel?.hex
                ?? (this.appSettings.colorPicker.colorMode == ColorMode.Rgba
                    ? "#ffffffff"
                    : "#ffffff"),
            rgb: this.colorPickerImageService.selectedPixel?.rgb
                ?? (this.appSettings.colorPicker.colorMode == ColorMode.Rgba
                    ? "rgba(255,255,255,255)"
                    : "rgb(255,255,255)")
        };
    }
}
