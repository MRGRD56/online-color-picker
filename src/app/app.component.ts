import {Component, Inject, Injectable} from "@angular/core";
import {ColorPickerImageService} from "../services/color-picker-image/color-picker-image.service";
import {AppSettingsService} from "../services/app-settings/app-settings.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public title = "online-color-picker";

    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                public readonly appSettings: AppSettingsService) {
        window.addEventListener("paste", e => this.windowOnPaste(<ClipboardEvent>e));
    }

    private windowOnPaste(e: ClipboardEvent) {
        if (!e.clipboardData) return;

        this.colorPickerImageService.loadFromDataTransfer(e.clipboardData, () => {
            console.log("now loading...");
        });
    }
}
