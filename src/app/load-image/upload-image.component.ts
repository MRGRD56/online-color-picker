import {Component, OnInit} from '@angular/core';
import {FileOpenService} from "../../services/file-open/file-open.service";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

    constructor(private readonly fileOpenService: FileOpenService,
                private readonly colorPickerImageService: ColorPickerImageService) {
    }

    ngOnInit(): void {
    }

    public async onLoadImageAreaClick(e: MouseEvent) {
        const files = await this.fileOpenService.openFile();
        if (files.length === 0) return;
        this.colorPickerImageService.loadFromFile(files[0]);
    }
}
