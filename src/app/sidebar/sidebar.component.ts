import {Component} from "@angular/core";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
    constructor (public readonly colorPickerImageService: ColorPickerImageService) {
    }

    public get selectedPixelColor() {
        return {
            hex: this.colorPickerImageService.selectedPixel?.hex ?? '#ffffff',
            rgb: this.colorPickerImageService.selectedPixel?.rgb ?? 'rgb(255,255,255)'
        };
    }
}
