import {Component, Inject, Injectable} from "@angular/core";
import {ColorPickerImageService} from "../services/color-picker-image.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public title = "online-color-picker";

    constructor(private readonly colorPickerImageService: ColorPickerImageService) {
    }

    onPaste(e: ClipboardEvent) {
        if (!e.clipboardData) return;

        this.colorPickerImageService.loadFromDataTransfer(e.clipboardData);
    }
}
