import {Component} from "@angular/core";
import {FileOpenService} from "../../services/file-open/file-open.service";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";

@Component({
    selector: "app-upload-image",
    templateUrl: "./upload-image.component.html",
    styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent {

    constructor(private readonly fileOpenService: FileOpenService,
                private readonly colorPickerImageService: ColorPickerImageService) {
    }

    public async onLoadImageAreaClick(e: MouseEvent) {
        const files = await this.fileOpenService.openFile("image/*");
        if (files.length === 0) return;
        this.colorPickerImageService.loadFromFile(files[0]);
    }
}
