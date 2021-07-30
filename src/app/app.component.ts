import {AfterViewInit, Component, Inject, Injectable} from "@angular/core";
import {ColorPickerImageService} from "../services/color-picker-image/color-picker-image.service";
import {AppSettingsService} from "../services/app-settings/app-settings.service";
import modals from "../services/Modals";
import {delay, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    public title = "online-color-picker";

    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                public readonly appSettings: AppSettingsService) {
        window.addEventListener("paste", e => this.windowOnPaste(<ClipboardEvent>e));
        this.appSettings.load();
    }

    private windowOnPaste(e: ClipboardEvent) {
        if (!e.clipboardData) return;

        this.colorPickerImageService.loadFromDataTransfer(e.clipboardData);
    }

    ngAfterViewInit(): void {
        modals.appSettingsModal.initializeObservables();
        modals.appSettingsModal.hide$
            ?.pipe(
                distinctUntilChanged((e1: any, e2: any) => Math.abs(e2.timeStamp - e1.timeStamp) <= 300),
            )
            .subscribe(e => {
                this.appSettings.save();
            });
    }
}
